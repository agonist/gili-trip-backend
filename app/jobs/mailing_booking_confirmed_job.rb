class MailingBookingConfirmedJob
  include SuckerPunch::Job

  def perform(infos)
    datas = {}
    template_id = "d-50863baa283c4fee9b5a7e1743c0eb94"
    passengers = infos.passengers.join(", ")
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
        departure_operator: infos.departure_operator,
        passengers: passengers
      }
      if infos.booking_type == "open-return"
        template_id = "d-5db34f74c70246e7bebba594bda29a4d"
      end
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
        return_operator: infos.return_operator,
        passengers: passengers
      }
      template_id = "d-3fc9e80449864059838f5a55993b9a9d"
    end

    data = { personalizations: [ {
      to: [ { email: infos.booking_email   } ],
      dynamic_template_data: datas,
      subject: "Your order is ready" } ],
      from: { email: "hello@gilitrip.com", name: "Gili Trip" },
      template_id: template_id }

    @sg ||= SendGrid::API.new(api_key: ENV['SENDGRID'])
    response = @sg.client.mail._('send').post(request_body: data)

  end
end
