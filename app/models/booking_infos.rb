class BookingInfos
  attr_accessor :booking_email
  attr_accessor :tickets_size
  attr_accessor :id
  attr_accessor :final_price
  attr_accessor :departure_trip_name
  attr_accessor :quantity
  attr_accessor :departure_date
  attr_accessor :departure_time_departure
  attr_accessor :departure_time_arrival
  attr_accessor :departure
  attr_accessor :destination
  attr_accessor :departure_operator
  attr_accessor :pickup_name
  attr_accessor :pickup_address
  attr_accessor :pickup_phone
  attr_accessor :whatsapp_for_notif_departure


  attr_accessor :whatsapp_for_notif_return
  attr_accessor :return_trip_name
  attr_accessor :return_date
  attr_accessor :return_time_departure
  attr_accessor :return_time_arrival
  attr_accessor :return_operator
  attr_accessor :dropoff_name
  attr_accessor :dropoff_address
  attr_accessor :dropoff_phone

  attr_accessor :passengers

  def initialize()
  self.final_price = 0
end
end
