class Booking < ApplicationRecord
  has_many :tickets
  accepts_nested_attributes_for :tickets
end
