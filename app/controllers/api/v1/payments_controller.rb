class Api::V1::PaymentsController < ApiController
  require 'sendgrid-ruby'
  require 'rubygems'
  require 'twilio-ruby'

  include SendGrid

  TRANSACTION_SUCCESS_STATUSES = [
    Braintree::Transaction::Status::Authorizing,
    Braintree::Transaction::Status::Authorized,
    Braintree::Transaction::Status::Settled,
    Braintree::Transaction::Status::SettlementConfirmed,
    Braintree::Transaction::Status::SettlementPending,
    Braintree::Transaction::Status::Settling,
    Braintree::Transaction::Status::SubmittedForSettlement,
  ]

  def generate_braintree_token
    render json: {:token => gateway.client_token.generate}
  end

  def checkout
    @booking = Booking.find(params[:booking_id])

    if @booking.payment_status == "success"
      render json: {:message => "This trip has already been paid"}
    end

    amount = @booking.final_price
    nonce = params["payment_method_nonce"]

    result = gateway.transaction.sale(
      amount: amount,
      payment_method_nonce: nonce,
      :options => {
        :submit_for_settlement => true
      }
    )

    if result.success? || result.transaction
      @booking.payment_status = "success"

      if @booking.save
        infos = get_booking_infos(@booking)
        send_confirmation_email(infos)
        send_slack_bot(infos)
        send_whatsapp(infos)
        render json: @booking
      else
        render json: @booking.errors, status: :unprocessable_entity
      end

    else
      error_messages = result.errors.map { |error| "Error: #{error.code}: #{error.message}" }
      render json: error_messages, status: :unprocessable_entity
    end

  end

  def test
    @booking = Booking.find("c9638d4b-8c1a-4467-8b6f-86ea908155c1")
    infos = get_booking_infos(@booking)
    send_confirmation_email(infos)
    send_slack_bot(infos)
    send_whatsapp(infos)
  end

  def gateway
    env =  :sandbox

    @gateway ||= Braintree::Gateway.new(
      :environment => env && env.to_sym,
      :merchant_id => ENV['BRAINTREE_CLIENT_ID'],
      :public_key => ENV['BRAINTREE_PUBLIC'],
      :private_key => ENV['BRAINTREE_PRIVATE'],
    )
  end

  private
  def get_booking_infos(booking)
    infos = BookingInfos.new
    infos.id = booking.id
    infos.tickets_size = booking.tickets.size
    infos.booking_email = booking.booking_email
    infos.final_price =  booking.final_price.to_s.concat(booking.tickets[0].trip.currency)
    infos.departure_trip_name =  booking.tickets[0].trip.name
    infos.quantity = booking.quantity
    infos.departure_date = booking.tickets[0].date.strftime("%A %d %B %Y")
    infos.departure_time_departure =  booking.tickets[0].trip.departure_time
    infos.departure_time_arrival =  booking.tickets[0].trip.arrival_time
    infos.departure = booking.tickets[0].trip.from.name
    infos.destination =  booking.tickets[0].trip.to.name
    infos.pickup_name = booking.tickets[0].pickup_name
    infos.pickup_phone = booking.tickets[0].pickup_phone
    infos.pickup_address = booking.tickets[0].pickup_address
    infos.departure_operator =  booking.tickets[0].trip.operator.name
    infos.passengers = booking.passengers
    infos.whatsapp_for_notif_departure = booking.tickets[0].trip.operator.whatsapp_for_notif
    if booking.tickets.size == 2
    infos.return_trip_name = booking.tickets[1].trip.name
    infos.return_date = booking.tickets[1].date.strftime("%A %d %B %Y")
    infos.return_time_departure = booking.tickets[1].trip.departure_time
    infos.return_time_arrival =  booking.tickets[1].trip.arrival_time
    infos.return_operator = booking.tickets[1].trip.operator.name
    infos.dropoff_name = booking.tickets[1].pickup_name
    infos.dropoff_phone = booking.tickets[1].pickup_phone
    infos.dropoff_address = booking.tickets[1].pickup_address
    infos.whatsapp_for_notif_return = booking.tickets[1].trip.operator.whatsapp_for_notif
    end
    return infos
  end

  def send_whatsapp(infos)
    WhatsappJob.perform_async(infos)
  end


  def send_confirmation_email(infos)
      MailingJob.perform_async(infos)
    end

    def send_slack_bot(infos)
      SlackJob.perform_async(infos)
    end
  end
