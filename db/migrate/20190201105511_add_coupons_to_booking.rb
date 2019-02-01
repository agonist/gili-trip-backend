class AddCouponsToBooking < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :full_price, :decimal
    add_reference :bookings, :coupon, foreign_key: true, type: :uuid
  end
end
