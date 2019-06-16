class CreateTripsGroup < ActiveRecord::Migration[5.2]
  def change
    create_table :trips_groups, id: :uuid do |t|
      t.string :name
    end
  end
end
