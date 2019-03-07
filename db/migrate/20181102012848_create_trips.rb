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

      t.timestamps
    end
  end
end
