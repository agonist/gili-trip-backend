class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.string :name
      t.references :from
      t.references :to
      t.references :operator
      t.decimal :price
      t.string :currency
      t.string :departure_time
      t.string :arrival_time
      t.integer :duration
      t.references :vehicle
      t.boolean :high_season
      t.integer :high_season_percentage_multiplier
      t.boolean :has_pickup, default: false
      t.boolean :has_dropoff, default: false
      t.timestamps
    end
  end
end
