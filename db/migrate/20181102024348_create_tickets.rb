class CreateTickets < ActiveRecord::Migration[5.2]
  def change
    create_table :tickets, id: :uuid do |t|
      t.references :booking, foreign_key: true, type: :uuid
      t.references :trip
      t.datetime :date
      t.string :pickup_name
      t.string :pickup_address
      t.string :pickup_room_number
      t.string :pickup_city
      t.timestamps
    end
  end
end
