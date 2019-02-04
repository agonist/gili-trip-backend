class Api::V1::BookingsController < ApiController

  def create
    @booking = Booking.new(booking_params)
    @booking.booking_status = "pending"
    @booking.payment_status = "pending"
    @booking.booking_date = Time.now

    full_price = 0
    @booking.tickets.each do |ticketparams|
        @trips_price = Trip.find(ticketparams.trip_id).price * ticketparams.quantity
        full_price += @trips_price
    end

    @booking.full_price = full_price
    @booking.final_price = full_price
    if @booking.save
        render json: @booking
    else
        render json: @booking.errors, status: :unprocessable_entity
    end
  end

  def booking_params
     booking = params.require(:booking)
     booking[:tickets_attributes] = booking.delete(:tickets) if booking.key?(:tickets)
     booking.permit(:booking_email, :booking_whatsapp, passengers:[], tickets_attributes: [[:trip_id, :quantity, :date, :pickup_name, :pickup_room_number, :pickup_address, :pickup_city]])
   end

end
