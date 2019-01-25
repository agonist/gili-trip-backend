class CreatePassengers < ActiveRecord::Migration[5.2]
  def change
    create_table :passengers do |t|
      t.string :firstname
      t.string :lastname
      t.string :email
      t.string :contact_number
      t.string :whatsapp
      t.timestamps
    end
  end
end
