class AddTypeToBooking < ActiveRecord::Migration[5.2]
  def change
    add_column :bookings, :type, :string
    add_column :trips, :return_price, :decimal
  end
end
