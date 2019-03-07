class MailingJob
  include SuckerPunch::Job

  def perform(infos)
    datas = {}
    template_id = "d-54cb46cd5f564a369c678cae75b9fd56"

    if infos.tickets_size == 1
      datas = {
        departure_trip_name: infos.departure_trip_name,
        quantity: infos.quantity,
        departure_date: infos.departure_date,
        departure_time_departure: infos.departure_time_departure,
        departure_time_arrival: infos.departure_time_arrival,
        total_price: infos.final_price,
        departure: infos.departure,
        destination: infos.destination,
        departure_operator: infos.departure_operator
      }
    else
      datas = {
        departure_trip_name: infos.departure_trip_name,
        quantity: infos.quantity,
        departure_date: infos.departure_date,
        departure_time_departure: infos.departure_time_departure,
        departure_time_arrival: infos.departure_time_arrival,
        total_price: infos.final_price,
        departure: infos.departure,
        destination: infos.destination,
        departure_operator: infos.departure_operator,
        return_trip_name: infos.return_trip_name,
        return_date: infos.return_date,
        return_time_departure: infos.return_time_departure,
        return_time_arrival: infos.return_time_arrival,
        return_operator: infos.return_operator
      }
      template_id = "d-72b4b0798a97433797fbbfa7f100f345"
    end

    data = { personalizations: [ {
      to: [ { email: infos.booking_email   } ],
      dynamic_template_data: datas,
      subject: "Order confirmation" } ],
      from: { email: "test@gilitrip.com" },
      template_id: template_id }

    @sg ||= SendGrid::API.new(api_key: ENV['SENDGRID'])
    response = @sg.client.mail._('send').post(request_body: data)

  end
end
