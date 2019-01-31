class CreateCoupons < ActiveRecord::Migration[5.2]
  def change
    create_table :coupons, id: :uuid do |t|
      t.float :amount, default: 0.0
      t.integer :limit, default: 0
      t.date :expiration
      t.string :code
      t.boolean :percentage, default: false
      t.integer :used, default: 0
    end
  end
end
