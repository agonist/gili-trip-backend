class Coupon < ApplicationRecord
    validates_numericality_of :amount, on: :create, message: "is not a number"
    validates_uniqueness_of :code, on: :create, message: "must be unique", case_sensitive: false

    has_many :bookings


end
