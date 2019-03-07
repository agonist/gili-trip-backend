class WhatsappJob
  include SuckerPunch::Job

  def perform(infos)

    pickup = "#{infos.pickup_name} - #{infos.pickup_address} - #{infos.pickup_phone}"
    dropoff = "#{infos.pickup_name} - #{infos.pickup_address} - #{infos.pickup_phone}"
    msg = "
  *GILI TRIP ORDER*
  #{infos.departure_date} at #{infos.departure_time_departure}
  #{infos.departure_trip_name}
  quantity x#{infos.quantity}
  Pickup:
  #{pickup}
  ---------
  #{infos.return_date} at #{infos.return_time_departure}
  #{infos.return_trip_name}
  quantity x#{infos.quantity}
  Dropoff:
  #{dropoff}
  ---------
  #{infos.final_price}
  email : #{infos.booking_email}
        "


    account_sid = 'AC2e472102b662f78b9ca11d5a4dbc48a5'
    auth_token = '19f536092fa60a12a88b33f9ddd64074'
    @client = Twilio::REST::Client.new(account_sid, auth_token)
    message = @client.messages.create(
                               body: msg,
                               from: 'whatsapp:+14155238886',
                               to: 'whatsapp:+33786842544'
                             )

    puts message.sid

  end
end
