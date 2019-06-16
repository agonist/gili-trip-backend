class Trip < ApplicationRecord
  belongs_to :from, class_name: "Location", foreign_key: "from_id"
  belongs_to :to, class_name: "Location", foreign_key: "to_id"
  belongs_to :operator, class_name: "Operator", foreign_key: "operator_id"
  belongs_to :vehicle, class_name: "Vehicle", foreign_key: "vehicle_id"
  belongs_to :trips_group, class_name: "TripsGroup", foreign_key: "trips_group_id"
  has_many :unavailable, class_name: "Unavailable"

  validates :name, presence: true
  validates :from_id, presence: true
  validates :to_id, presence: true
  validates :operator_id, presence: true
  validates :price, presence: true
  validates :currency, presence: true
  validates :departure_time, presence: true
  validates :arrival_time, presence: true
  validates :duration, presence: true
  validates :high_season_percentage_multiplier, presence: true

end
