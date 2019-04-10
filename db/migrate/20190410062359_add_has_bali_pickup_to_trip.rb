class AddHasBaliPickupToTrip < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :has_pickup, :boolean, default: false
    add_column :trips, :has_dropoff, :boolean, default: false
  end
end
