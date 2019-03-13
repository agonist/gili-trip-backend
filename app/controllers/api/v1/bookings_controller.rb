class Api::V1::BookingsController < ApiController

  def create
    @booking = Booking.new(booking_params)
    @booking.booking_status = "pending"
    @booking.payment_status = "pending"
    @booking.booking_date = Time.now

    full_price = 0
    @booking.tickets.each do |ticketparams|
      date = ticketparams.date
      trip = Trip.find(ticketparams.trip_id)
      price = Ticket.get_price(date, trip)
      ticketparams.trip.price = price
      @trips_price = price * @booking.quantity
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

  def update
    @booking = Booking.find(params[:id])
    @booking.update(booking_params)
    if @booking.save

      @booking.tickets.each do |ticketparams|
        date = ticketparams.date
        trip = Trip.find(ticketparams.trip_id)
        price = Ticket.get_price(date, trip)
        ticketparams.trip.price = price
      end

        render json: @booking
    else
        render json: @booking.errors, status: :unprocessable_entity
    end
  end

  def booking_params
     booking = params.require(:booking)
     booking[:tickets_attributes] = booking.delete(:tickets) if booking.key?(:tickets)
     booking.permit(:booking_email, :quantity, passengers:[], tickets_attributes: [[:trip_id, :date, :pickup_name, :pickup_phone, :pickup_address]])
   end

end
