class Ticket < ApplicationRecord
  belongs_to :booking, class_name: "Booking", foreign_key: "booking_id", optional: true
  belongs_to :trip, class_name: "Trip", foreign_key: "trip_id"


  # belongs_to :passenger, class_name: "Passenger", foreign_key: "passenger_id"
  # accepts_nested_attributes_for :passenger

  def self.get_price(date, trip)
    ranges = DateRange.where(:operator_id => trip.operator.id)
    ranges.each do |range|
       if date.between?(range.from, range.to)
         increase = trip.price * (trip.high_season_percentage_multiplier.to_f/100.0)
         trip.price= trip.price + increase
         return trip.price
       end
    end
    return trip.price
  end
end
