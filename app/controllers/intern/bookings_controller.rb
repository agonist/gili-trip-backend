class Intern::BookingsController < ApiController

  def booking_validated
    @booking = Booking.find(params[:id])
    @booking.booking_status = "success"

    if @booking.save
        MailingBookingConfirmedJob.perform_async(get_booking_infos(@booking))
        render json: @booking
    else
        render json: @booking.errors, status: :unprocessable_entity
    end
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

end
