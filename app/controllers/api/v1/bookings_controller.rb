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
      price = Ticket.get_price(date, trip, @booking.booking_type)
      ticketparams.trip.price = price
      @trips_price = price * @booking.quantity
      full_price += @trips_price
    end

    if @booking.booking_type == "open-return"
      full_price *= 2
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
    @booking.update(booking_update_params)
    if @booking.save

      @booking.tickets.each do |ticketparams|
        date = ticketparams.date
        trip = Trip.find(ticketparams.trip_id)
        price = Ticket.get_price(date, trip, @booking.booking_type)
        ticketparams.trip.price = price
      end

        render json: @booking
    else
        render json: @booking.errors, status: :unprocessable_entity
    end
  end

  def get
    @booking = Booking.find(params[:id])

    @booking.tickets.each do |ticketparams|
      date = ticketparams.date
      trip = Trip.find(ticketparams.trip_id)
      price = Ticket.get_price(date, trip, @booking.booking_type)
      ticketparams.trip.price = price
    end

    render json: @booking
  end

  def booking_update_params
     booking = params.require(:booking)
     booking[:tickets_attributes] = booking.delete(:tickets) if booking.key?(:tickets)
     booking.permit(:booking_email, :quantity, :booking_type, passengers:[] ,tickets_attributes: [[:id, :trip_id, :date, :pickup_name, :pickup_phone, :pickup_address]])
   end

  def booking_params
     booking = params.require(:booking)
     booking[:tickets_attributes] = booking.delete(:tickets) if booking.key?(:tickets)
     booking.permit(:booking_email, :quantity, :booking_type, passengers:[] , tickets_attributes: [[:trip_id, :date, :pickup_name, :pickup_phone, :pickup_address]])
   end
end
