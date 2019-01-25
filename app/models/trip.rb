class Trip < ApplicationRecord
  belongs_to :from, class_name: "Location", foreign_key: "from_id"
  belongs_to :to, class_name: "Location", foreign_key: "to_id"
  belongs_to :operator, class_name: "Operator", foreign_key: "operator_id"
  belongs_to :vehicle, class_name: "Vehicle", foreign_key: "vehicle_id"

end
