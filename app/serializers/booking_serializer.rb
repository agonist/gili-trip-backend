class BookingSerializer < ActiveModel::Serializer

  attributes :id, :booking_status, :payment_status, :final_price, :booking_date, :booking_email, :booking_whatsapp,:passengers
  has_many :tickets

end
