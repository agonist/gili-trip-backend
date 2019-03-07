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
        send_confirmation_email(@booking)
        send_slack_bot(@booking)
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
    @booking = Booking.find("cfea4170-91ff-4b08-8a20-67b7c850dacc")
    send_confirmation_email(@booking)
    send_slack_bot(@booking)
    send_whatsapp(@booking)
  end

  def send_whatsapp(booking)

# Your Account Sid and Auth Token from twilio.com/console
account_sid = 'AC2e472102b662f78b9ca11d5a4dbc48a5'
auth_token = '19f536092fa60a12a88b33f9ddd64074'
@client = Twilio::REST::Client.new(account_sid, auth_token)

departure_trip_name = booking.tickets[0].trip.name
quantity = booking.quantity
departure_date = booking.tickets[0].date.strftime("%A %d %B %Y")
departure_time_departure = booking.tickets[0].trip.departure_time
departure_time_arrival = booking.tickets[0].trip.arrival_time
total_price = booking.final_price.to_s.concat(booking.tickets[0].trip.currency)
departure = booking.tickets[0].trip.from.name
destination = booking.tickets[0].trip.to.name
return_trip_name = booking.tickets[1].trip.name
return_date = booking.tickets[1].date.strftime("%A %d %B %Y")
return_time_departure = booking.tickets[1].trip.departure_time
return_time_arrival = booking.tickets[1].trip.arrival_time
return_operator = booking.tickets[1].trip.operator.name
pickup = "#{booking.tickets[0].pickup_name} - #{booking.tickets[0].pickup_address} - #{booking.tickets[0].pickup_phone}"
dropoff = "#{booking.tickets[1].pickup_name} - #{booking.tickets[1].pickup_address} - #{booking.tickets[1].pickup_phone}"
msg = "
*GILI TRIP ORDER*
#{departure_date} at #{departure_time_departure}
#{departure_trip_name}
quantity x#{quantity}
Pickup:
#{pickup}
---------
#{return_date} at #{return_time_departure}
#{return_trip_name}
quantity x#{quantity}
Dropoff:
#{dropoff}
---------
email : #{booking.booking_email}
      "

message = @client.messages.create(
                           body: msg,
                           from: 'whatsapp:+14155238886',
                           to: 'whatsapp:+33786842544'
                         )

puts message.sid
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

  def send_confirmation_email(booking)
    departure_trip_name = booking.tickets[0].trip.name
    quantity = booking.quantity
    departure_date = booking.tickets[0].date.strftime("%A %d %B %Y")
    departure_time_departure = booking.tickets[0].trip.departure_time
    departure_time_arrival = booking.tickets[0].trip.arrival_time
    total_price = booking.final_price.to_s.concat(booking.tickets[0].trip.currency)
    departure = booking.tickets[0].trip.from.name
    destination = booking.tickets[0].trip.to.name
    departure_operator = booking.tickets[0].trip.operator.name
    datas = {}
    template_id = "d-54cb46cd5f564a369c678cae75b9fd56"

    if booking.tickets.size == 1
      datas = {
        departure_trip_name: departure_trip_name,
        quantity: quantity,
        departure_date: departure_date,
        departure_time_departure: departure_time_departure,
        departure_time_arrival: departure_time_arrival,
        total_price: total_price,
        departure: departure,
        destination: destination,
        departure_operator: departure_operator
      }
    else
      return_trip_name = booking.tickets[1].trip.name
      return_date = booking.tickets[1].date.strftime("%A %d %B %Y")
      return_time_departure = booking.tickets[1].trip.departure_time
      return_time_arrival = booking.tickets[1].trip.arrival_time
      return_operator = booking.tickets[1].trip.operator.name

      datas = {
        departure_trip_name: departure_trip_name,
        quantity: quantity,
        departure_date: departure_date,
        departure_time_departure: departure_time_departure,
        departure_time_arrival: departure_time_arrival,
        total_price: total_price,
        departure: departure,
        destination: destination,
        departure_operator: departure_operator,
        return_trip_name: return_trip_name,
        return_date: return_date,
        return_time_departure: return_time_departure,
        return_time_arrival: return_time_arrival,
        return_operator: return_operator
      }
      template_id = "d-72b4b0798a97433797fbbfa7f100f345"
    end

    data = { personalizations: [ {
      to: [ { email: booking.booking_email   } ],
      dynamic_template_data: datas,
      subject: "Order confirmation" } ],
      from: { email: "test@gilitrip.com" },
      template_id: template_id }
      MailingJob.perform_async(data)
    end

    def send_slack_bot(booking)
      SlackJob.perform_async(booking.id)
    end
  end
