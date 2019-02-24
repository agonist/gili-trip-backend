class BookingSerializer < ActiveModel::Serializer

  attributes :id, :booking_status, :payment_status, :final_price, :full_price, :booking_date, :booking_email, :booking_whatsapp,:passengers
  has_many :tickets, each_serializer: TicketSerializer

end
