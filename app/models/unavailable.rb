class Unavailable < ApplicationRecord
  belongs_to :trip, class_name: "Trip"
end
