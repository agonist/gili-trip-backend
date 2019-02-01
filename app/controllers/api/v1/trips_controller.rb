class Api::V1::TripsController < ApiController

  def get_trips
    @trips = Trip.where(:from_id => params[:from], :to_id => params[:to])
     render json: @trips
  end
  
end
