class WhatsappJob
  include SuckerPunch::Job

  def perform(infos)
    final_message = get_message_header
    final_message += get_departure_message(infos)

    if (infos.tickets_size == 2)
      if infos.departure_operator != infos.return_operator
          ## 2 ticket different operator
          final_message_op_2 = get_message_header
          final_message_op_2 += get_return_message_different_operator(infos)
          final_message_op_2 += get_passengers(infos)
          final_message_op_2 += get_message_bottom(infos)
          final_message += get_passengers(infos)
          final_message += get_message_bottom(infos)
          send_message(infos.whatsapp_for_notif_departure, final_message)
          send_message(infos.whatsapp_for_notif_return, final_message_op_2)
      else
        ## 2 ticket same operator
        final_message += "---------\n"
        final_message += get_return_message_same_operator(infos)
        final_message += get_passengers(infos)
        final_message += get_message_bottom(infos)
        send_message(infos.whatsapp_for_notif_departure, final_message)
      end
    else
      ## 1 ticket
      final_message += get_passengers(infos)
      final_message += get_message_bottom(infos)
      send_message(infos.whatsapp_for_notif_departure, final_message)
    end
  end

  def get_message_header()
    return "*GILI TRIP ORDER*\n"
  end

  def get_departure_message(infos)
      pickup = "#{infos.pickup_name} - #{infos.pickup_address} - #{infos.pickup_phone}"
      return "🗓️ #{infos.departure_date} at #{infos.departure_time_departure}\n➡️ #{infos.departure_trip_name}\nQuantity x#{infos.quantity}\n🏨 *Pickup:* #{pickup}\n"
  end

  def get_return_message_same_operator(infos)
    dropoff = "#{infos.dropoff_name} - #{infos.dropoff_address} - #{infos.dropoff_phone}"
    return "🗓️ #{infos.return_date} at #{infos.return_time_departure}\n⬅️ #{infos.return_trip_name}\nQuantity x#{infos.quantity}\n🏨 *Dropoff:* #{dropoff}\n"
  end

  def get_message_bottom(infos)
      return "✉️ #{infos.booking_email}"
  end

  def get_passengers(infos)
    passengers_list = "---------\nPassengers:\n"
    infos.passengers.each do |passenger|
      passengers_list+= "• #{passenger}\n"
    end
    return passengers_list
  end

  def get_return_message_different_operator(infos)
    dropoff = "#{infos.dropoff_name} - #{infos.dropoff_address} - #{infos.dropoff_phone}"
    return "🗓️ #{infos.return_date} at #{infos.return_time_departure}\n➡️ #{infos.return_trip_name}\nQuantity x#{infos.quantity}\n🏨 *Dropoff:* #{dropoff}\n"
  end

  def send_message(number_to, msg)
    account_sid = 'AC2e472102b662f78b9ca11d5a4dbc48a5'
    auth_token = '19f536092fa60a12a88b33f9ddd64074'
    @client = Twilio::REST::Client.new(account_sid, auth_token)
    message = @client.messages.create(
                               body: msg,
                               from: number_to,
                               to: 'whatsapp:+33786842544'
                             )
  end
end
