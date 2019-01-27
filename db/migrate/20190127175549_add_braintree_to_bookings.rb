class AddBraintreeToBookings < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :braintree_token, :string
  end
end
