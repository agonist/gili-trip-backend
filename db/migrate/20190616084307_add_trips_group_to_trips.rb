class AddTripsGroupToTrips < ActiveRecord::Migration[5.2]
  def change
    add_reference :trips, :trips_group, foreign_key: true, type: :uuid
    add_reference :unavailables, :trips_group, foreign_key: true, type: :uuid
    remove_reference :unavailables, :trip
  end
end
