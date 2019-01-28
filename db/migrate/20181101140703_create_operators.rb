class CreateOperators < ActiveRecord::Migration[5.2]
  def change
    create_table :operators  do |t|
      t.string :name
      t.string :logo
      t.string :website
      t.string :contact_email
      t.string :contact_phone

      t.timestamps
    end
  end
end
