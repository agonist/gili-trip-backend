class Api::V1::LocationsController < ApiController

  def index
    @locations = Location.all
     render json: @locations
  end

end
