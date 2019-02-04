class Api::V1::TripsController < ApiController

  def get_trips
    @trips = Trip.where(:from_id => params[:from], :to_id => params[:to])

    date = Date.parse(params[:date])
    res = @trips.select {|trip| is_high_season?(trip, date)}

     render json: res
  end


private
  def is_high_season?(trip, date)
    if !trip.high_season?
      return true
    else
      ranges = DateRange.where(:operator_id => trip.operator.id)
      ranges.each do |range|
         if date.between?(range.from, range.to)
           return true
         end
      end
      return false
    end
    return false
  end

end
