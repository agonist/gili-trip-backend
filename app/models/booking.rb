class Booking < ApplicationRecord
  has_many :tickets
  accepts_nested_attributes_for :tickets
  belongs_to :coupon, class_name: "Coupon", foreign_key: "coupon_id", optional: true
end
