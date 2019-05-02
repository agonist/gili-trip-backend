class BookingSerializer < ActiveModel::Serializer

  attributes :id, :quantity, :booking_status, :payment_status, :final_price, :full_price, :booking_date, :booking_email,:passengers
  has_many :tickets, each_serializer: TicketSerializer
  belongs_to :coupon, serializer: CouponSerializer

end
