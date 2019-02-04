class Operator < ApplicationRecord
  has_many :date_range, class_name: "DateRange"

end
