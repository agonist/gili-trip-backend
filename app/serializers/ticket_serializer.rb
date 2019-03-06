class TicketSerializer < ActiveModel::Serializer

  attributes :id, :date, :pickup_name, :pickup_address, :pickup_phone, :booking_id, :trip
  belongs_to :trip, serializer: TripSerializer
end
