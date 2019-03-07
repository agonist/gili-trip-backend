class Api::V1::TripsController < ApiController

  def get_trips
    print("from #{params[:from]} to #{params[:to]} date #{params[:date]}")
    @trips = Trip.where(:from_id => params[:from], :to_id => params[:to])

    date = Date.parse(params[:date])
    res = @trips.select {|trip| is_high_season?(trip, date)}.select{|trip| is_available?(trip, date)}

     render json: res
  end


private
  def is_high_season?(trip, date)
    if !trip.high_season?
      trip.price = Ticket.get_price(date, trip)
      return true
    else
      trip.price = Ticket.get_price(date, trip)
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

  def is_available?(trip, date)
    res = Unavailable.where(:trip_id => trip.id, :date => date)
    return !res.present?
  end

end
