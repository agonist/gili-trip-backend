class CreateVehicles < ActiveRecord::Migration[5.2]
  def change
    create_table :vehicles do |t|
      t.string :kind
      t.string :subtype
      t.string :description

      t.timestamps
    end
  end
end
