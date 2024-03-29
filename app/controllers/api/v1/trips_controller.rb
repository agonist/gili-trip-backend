class Api::V1::TripsController < ApiController

  def get_trips
    @trips = Trip.where(:from_id => params[:from], :to_id => params[:to])
    type = params[:booking_type]
    p type
    date = Date.parse(params[:date])
    res = @trips.select {|trip| is_high_season?(trip, date, type)}
                .select{|trip| is_available?(trip, date)}
                .sort_by{ |trip| trip.departure_time }

    render json: res
  end


private
  def is_high_season?(trip, date, type)
    if !trip.high_season?
      trip.price = Ticket.get_price(date, trip, type)
      return true
    else
      trip.price = Ticket.get_price(date, trip, type)
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
    res = Unavailable.where(:trips_group_id => trip.trips_group_id, :date => date)
    return !res.present?
  end

end
