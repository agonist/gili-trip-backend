class Api::V1::TripsController < ApiController

  before_action :set_article, only: [:show, :update, :destroy]

  def index
    @trips = Trip.where(:from_id => params[:from], :to_id => params[:to])
     render json: @trips
  end

  def show
    render json: @trip
  end

  def create
    @trip = Trip.new(trip_params)

    if @trip.save
        render json: @trip, status: :created
    else
      render json: @trip.errors, status: :unprocessable_entity
    end

  end

  def update
    if @trip.update(trip_params)
        render json: @trip
    else
      render json: @trip.errors, status: :unprocessable_entity
    end

  end

  def destroy
    @trip.destroy
  end

private

  def set_article
    @trip = Trip.find(params[:id])
  end

  def trip_params
    params.require(:trip).permit(:name, :from, :to, :operator_id, :status, :price, :currency, :departure_date, :arrival_date, :duration, :vehicle_id)
 end

end
