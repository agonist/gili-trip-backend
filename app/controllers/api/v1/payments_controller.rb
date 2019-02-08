class Api::V1::PaymentsController < ApiController
  require 'sendgrid-ruby'
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
        send_confirmation_email(@booking)
        render json: @booking
      else
        render json: @booking.errors, status: :unprocessable_entity
      end

    else
      error_messages = result.errors.map { |error| "Error: #{error.code}: #{error.message}" }
      render json: error_messages, status: :unprocessable_entity
    end

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

  @sg ||= SendGrid::API.new(api_key: ENV['SENDGRID'])

  def send_confirmation_email(booking)
    trip_name_dep = booking.tickets[0].trip.name
    quantity = booking.tickets[0].quantity
    date_departure = booking.tickets[0].date.strftime("%d-%m-%Y")
    time_departure = booking.tickets[0].trip.departure_time
    datas = {}

    if booking.tickets.size == 1
      datas = { trip_name_dep: trip_name_dep, quantity: quantity, date_departure: date_departure, time_departure: time_departure}
    else
      trip_name_return = booking.tickets[1].trip.name
      date_return = booking.tickets[1].date.strftime("%d-%m-%Y")
      time_return = booking.tickets[1].trip.departure_time
      datas = { trip_name_dep: trip_name_dep, quantity: quantity, date_departure: date_departure, time_departure: time_departure,
      trip_name_return: trip_name_return, date_return: date_return, time_return: time_return}
    end

    data = { personalizations: [ {
      to: [ { email: booking.booking_email   } ],
      dynamic_template_data: datas,
      subject: "Order confirmation" } ],
      from: { email: "test@gilitrip.com" },
      template_id: "d-54cb46cd5f564a369c678cae75b9fd56" }

    response = @sg.client.mail._('send').post(request_body: data)

  end
end
