class Api::V1::BookingsController < ApiController
skip_before_action :verify_authenticity_token

  def create
    @booking = Booking.new(booking_params)
    @booking.booking_status = "pending"
    @booking.payment_status = "pending"
    @booking.booking_date = Time.now

    final_price = 0
    @booking.tickets.each do |ticketparams|
        @trips_price = Trip.find(ticketparams.trip_id).price * ticketparams.quantity
        final_price += @trips_price
    end

    @booking.final_price = final_price
    if @booking.save
        render json: @booking
    else
        render json: @booking.errors, status: :unprocessable_entity
    end

  end

  def update


  end



  def booking_params
     booking = params.require(:booking)
     booking[:tickets_attributes] = booking.delete(:tickets) if booking.key?(:tickets)
     booking.permit(:booking_email, :booking_whatsapp, tickets_attributes: [[:trip_id, :quantity, :date, :pickup_name, :pickup_room_number, :pickup_address, :pickup_city, passengers:[]]])
   end


end
