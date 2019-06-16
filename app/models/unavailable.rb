
# Used to make a trip unavailable at a certain date
class Unavailable < ApplicationRecord
  belongs_to :trips_group, class_name: "TripsGroup"
end
