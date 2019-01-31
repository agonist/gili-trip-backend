class Api::V1::TripsController < ApiController


  def index
    @trips = Trip.where(:from_id => params[:from], :to_id => params[:to])
     render json: @trips
  end

  def get_trips
    @trips = Trip.where(:from_id => params[:from], :to_id => params[:to])
     render json: @trips
  end

  def show
    render json: @trip
  end


private

  def trip_params
    params.require(:trip).permit(:name, :from, :to, :operator_id, :status, :price, :currency, :departure_date, :arrival_date, :duration, :vehicle_id)
 end

end
