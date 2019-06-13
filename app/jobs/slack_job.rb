class SlackJob
  include SuckerPunch::Job

  def perform(infos)


    pickup = "#{infos.pickup_name} - #{infos.pickup_address} - #{infos.pickup_phone}"
    dropoff = "#{infos.dropoff_name} - #{infos.dropoff_address} - #{infos.dropoff_phone}"
    msg = "
  ️*GILI TRIP ORDER*
  🗓️ #{infos.departure_date} at #{infos.departure_time_departure}
  ➡️ #{infos.departure_trip_name}
  quantity x#{infos.quantity}
  Pickup:
  🏨 #{pickup}
  ---------
  🗓️ #{infos.return_date} at #{infos.return_time_departure}
  ⬅️ #{infos.return_trip_name}
  quantity x#{infos.quantity}
  Dropoff:
  🏨 #{dropoff}
  ---------
  🤑*#{infos.final_price}*🤑
  ✉️ #{infos.booking_email}
        "

    @slack ||= Slack::Web::Client.new
    @slack.chat_postMessage(channel: ENV['ORDER_SLACK_CHANNEL'], text: "\n#{msg}", as_user: true)

  end
end
