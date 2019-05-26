class Intern::BookingsController < ApiController

  def booking_validated
    @booking = Booking.find(params[:id])
    @booking.booking_status = "success"

    if @booking.save
        render json: @booking
    else
        render json: @booking.errors, status: :unprocessable_entity
    end
  end

end
