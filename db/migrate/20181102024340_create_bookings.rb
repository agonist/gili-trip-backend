class CreateBookings < ActiveRecord::Migration[5.2]
  def change
    create_table :bookings do |t|
      t.string :booking_status
      t.string :payment_status
      t.decimal :final_price
      t.datetime :booking_date
      t.string :booking_email
      t.string :booking_whatsapp
      t.string  :braintree_token
      t.timestamps
    end
  end
end
