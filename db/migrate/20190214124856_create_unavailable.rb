class CreateUnavailable < ActiveRecord::Migration[5.2]
  def change
    create_table :unavailables, id: :uuid do |t|
      t.references :trip
      t.date :date
    end
  end
end
