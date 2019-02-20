
# Date range represent a high season where price has to change
class DateRange < ApplicationRecord
  belongs_to :operator, class_name: "Operator"
end
