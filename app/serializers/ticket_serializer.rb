class TicketSerializer < ActiveModel::Serializer

  attributes :id, :quantity, :date, :pickup_name, :pickup_address, :pickup_room_number, :pickup_city, :booking_id, :trip
  belongs_to :trip
end
