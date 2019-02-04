class DateRange < ApplicationRecord
  belongs_to :operator, class_name: "Operator"
end
