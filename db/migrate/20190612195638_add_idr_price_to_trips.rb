class AddIdrPriceToTrips < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :idr_price, :decimal
    add_column :trips, :idr_return_price, :decimal
  end
end
