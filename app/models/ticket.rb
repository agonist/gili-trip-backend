class Ticket < ApplicationRecord
  belongs_to :booking, class_name: "Booking", foreign_key: "booking_id", optional: true
  belongs_to :trip, class_name: "Trip", foreign_key: "trip_id"


  # belongs_to :passenger, class_name: "Passenger", foreign_key: "passenger_id"
  # accepts_nested_attributes_for :passenger
end
