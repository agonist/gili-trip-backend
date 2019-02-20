
# Used to make a trip unavailable at a certain date
class Unavailable < ApplicationRecord
  belongs_to :trip, class_name: "Trip"
end
