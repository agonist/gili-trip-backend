# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
if  Rails.env.test?
  AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

  Location.create(id: 1,name: 'Bali (Padangbai)')
  Location.create(id: 2,name: 'Lombok')
  Location.create(id: 3,name: 'Gili Trawangan')
  Location.create(id: 4,name: 'Gili Air')
  Location.create(id: 5,name: 'Gili Meno')

  Vehicle.create(kind: 'Boat', subtype: 'Wahana Gili Ocean III', description: 'Because humans have feeling')
  Vehicle.create(kind: 'Boat', subtype: 'Wahana Gili Ocean V', description: 'Because humans have feeling')
  Vehicle.create(kind: 'Boat', subtype: 'EkaJaya 4', description: 'Because humans have feeling')

  Operator.create(name: 'Wahana Gili Ocean', logo: '', website: 'https://wahanagiliocean.com/', contact_email: '', contact_phone: '', whatsapp_for_notif: 'whatsapp:+14155238886')
  Operator.create(name: 'Eka jaya', logo: '', website: '', contact_email: '', contact_phone: '', whatsapp_for_notif: 'whatsapp:+14155238886')

  # Will set high season at the selected date for the selected operator
  DateRange.create(from: '2019-01-01', to: '2019-01-30', operator_id: 1)
  DateRange.create(from: '2019-02-01', to: '2019-02-05', operator_id: 1)

  #Wahana trips
  Trip.create(name: 'Bali (Padangbai) to Gili Trawangan', from_id: 1, to_id: 3, operator_id: 1, price: '35', currency: "$", departure_time:  "09:00", arrival_time:  "10:30", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Gili Trawangan', from_id: 1, to_id: 3, operator_id: 1, price: '35', currency: "$", departure_time:  "14:00", arrival_time:  "15:30", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Lombok', from_id: 1, to_id: 2, operator_id: 1, price: '35', currency: "$", departure_time:  "09:00", arrival_time:  "11:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Lombok', from_id: 1, to_id: 2, operator_id: 1, price: '35', currency: "$", departure_time:  "14:00", arrival_time:  "16:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Lombok', from_id: 1, to_id: 2, operator_id: 1, price: '40', currency: "$", departure_time:  "14:30", arrival_time:  "16:00", duration: '90', vehicle_id: 1, high_season: true,high_season_percentage_multiplier: 10, has_pickup: true)

  Unavailable.create(date: '2019-02-02', trip_id: 1)
  Unavailable.create(date: '2019-05-02', trip_id: 1)
  Unavailable.create(date: '2019-01-24', trip_id: 3)
  Unavailable.create(date: '2019-10-02', trip_id: 3 )

  #Eka Jaya Trips
  Trip.create(name: 'Bali (Padangbai) to Gili Trawangan', from_id: 1, to_id: 3, operator_id: 2, price: '40', currency: "$", departure_time:  "09:00", arrival_time:  "10:30", duration: '90', vehicle_id: 3, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Gili Trawangan', from_id: 1, to_id: 3, operator_id: 2, price: '40', currency: "$", departure_time:  "14:00", arrival_time:  "15:30", duration: '90', vehicle_id: 3, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Lombok', from_id: 1, to_id: 2, operator_id: 2, price: '40', currency: "$", departure_time:  "09:00", arrival_time:  "11:00", duration: '90', vehicle_id: 3, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Lombok', from_id: 1, to_id: 2, operator_id: 2, price: '40', currency: "$", departure_time:  "14:00", arrival_time:  "16:00", duration: '90', vehicle_id: 3, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Lombok', from_id: 1, to_id: 2, operator_id: 2, price: '45', currency: "$", departure_time:  "14:30", arrival_time:  "16:00", duration: '90', vehicle_id: 3, high_season: true,high_season_percentage_multiplier: 10, has_pickup: true)

  DateRange.create(from: '2019-01-01', to: '2019-01-30', operator_id: 2)

end
if Rails.env.development?
  AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

  Location.create(id: 1,name: 'Bali (Padangbai)')
  Location.create(id: 2,name: 'Lombok')
  Location.create(id: 3,name: 'Gili Trawangan')
  Location.create(id: 4,name: 'Gili Air')
  Location.create(id: 5,name: 'Gili Meno')

  Vehicle.create(kind: 'Boat', subtype: 'Wahana Gili Ocean III', description: 'Because humans have feeling')
  Vehicle.create(kind: 'Boat', subtype: 'Wahana Gili Ocean V', description: 'Because humans have feeling')

  Operator.create(name: 'Wahana Gili Ocean', logo: '', website: 'https://wahanagiliocean.com/', contact_email: '', contact_phone: '', whatsapp_for_notif: 'whatsapp:+14155238886')
  Operator.create(name: 'Eka jaya', logo: '', website: '', contact_email: '', contact_phone: '', whatsapp_for_notif: 'whatsapp:+14155238886')

  DateRange.create(from: '2019-01-01', to: '2019-04-01', operator_id: 1)

  Trip.create(name: 'Bali (Padangbai) to Gili Trawangan', from_id: 1, to_id: 3, operator_id: 1, price: '35', currency: "$", departure_time:  "09:00", arrival_time:  "10:30", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Gili Trawangan', from_id: 1, to_id: 3, operator_id: 1, price: '35', currency: "$", departure_time:  "14:00", arrival_time:  "15:30", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Gili Air', from_id: 1, to_id: 4, operator_id: 1, price: '35', currency: "$", departure_time:  "09:00", arrival_time:  "11:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Gili Air', from_id: 1, to_id: 4, operator_id: 1, price: '35', currency: "$", departure_time:  "14:00", arrival_time:  "16:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Lombok', from_id: 1, to_id: 2, operator_id: 1, price: '35', currency: "$", departure_time:  "09:00", arrival_time:  "11:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Lombok', from_id: 1, to_id: 2, operator_id: 1, price: '35', currency: "$", departure_time:  "14:00", arrival_time:  "16:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)

  Trip.create(name: 'Gili Trawangan to Bali (Padangbai)', from_id: 3, to_id: 1, operator_id: 1, price: '35', currency: "$", departure_time:  "10:30", arrival_time:  "11:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_dropoff: true)
  Trip.create(name: 'Gili Trawangan to Bali (Padangbai)', from_id: 3, to_id: 1, operator_id: 1, price: '35', currency: "$", departure_time:  "14:45", arrival_time:  "16:00", duration: '90', vehicle_id: 1, high_season: true, high_season_percentage_multiplier: 5, has_dropoff: true)

  Trip.create(name: 'Gili Air to Bali (Padangbai)', from_id: 4, to_id: 1, operator_id: 1, price: '35', currency: "$", departure_time:  "11:00", arrival_time:  "11:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_dropoff: true)
  Trip.create(name: 'Gili Air to Bali (Padangbai)', from_id: 4, to_id: 1, operator_id: 1, price: '35', currency: "$", departure_time:  "16:15", arrival_time:  "18:00", duration: '90', vehicle_id: 1, high_season: true, high_season_percentage_multiplier: 5, has_dropoff: true)

  Trip.create(name: 'Lombok to Bali (Padangbai)', from_id: 2, to_id: 1, operator_id: 1, price: '35', currency: "$", departure_time:  "11:30", arrival_time:  "13:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_dropoff: true)
  Trip.create(name: 'Lombok to Bali (Padangbai)', from_id: 2, to_id: 1, operator_id: 1, price: '35', currency: "$", departure_time:  "16:30", arrival_time:  "18:00", duration: '90', vehicle_id: 1, high_season: true, high_season_percentage_multiplier: 5, has_dropoff: true)

  Unavailable.create(date: '2019-02-02', trip_id: 1)
  Unavailable.create(date: '2019-05-02', trip_id: 1)
end


########
# PROD #
########
if Rails.env.staging? || Rails.env.production?
  AdminUser.create!(email: 'admin@gilitrip.com', password: 'ImTheBoatMaster42!', password_confirmation: 'ImTheBoatMaster42!')

  Location.create(id: 1,name: 'Bali (Padangbai)')
  Location.create(id: 2,name: 'Lombok')
  Location.create(id: 3,name: 'Gili Trawangan')
  Location.create(id: 4,name: 'Gili Air')
  Location.create(id: 5,name: 'Gili Meno')

  Vehicle.create(kind: 'Boat', subtype: 'Wahana Gili Ocean III', description: '')
  Vehicle.create(kind: 'Boat', subtype: 'Wahana Gili Ocean V', description: '')

  Operator.create(name: 'Wahana Gili Ocean', logo: '', website: 'https://wahanagiliocean.com/', contact_email: '', contact_phone: '', whatsapp_for_notif: 'whatsapp:+14155238886')

  Trip.create(name: 'Bali (Padangbai) to Gili Trawangan', from_id: 1, to_id: 3, operator_id: 1, price: '32', currency: "$", departure_time:  "09:00", arrival_time:  "10:30", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Gili Trawangan', from_id: 1, to_id: 3, operator_id: 1, price: '32', currency: "$", departure_time:  "14:00", arrival_time:  "15:30", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)

  Trip.create(name: 'Bali (Padangbai) to Gili Air', from_id: 1, to_id: 4, operator_id: 1, price: '32', currency: "$", departure_time:  "09:00", arrival_time:  "11:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Gili Air', from_id: 1, to_id: 4, operator_id: 1, price: '32', currency: "$", departure_time:  "14:00", arrival_time:  "16:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)

  Trip.create(name: 'Bali (Padangbai) to Lombok', from_id: 1, to_id: 2, operator_id: 1, price: '32', currency: "$", departure_time:  "09:00", arrival_time:  "11:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)
  Trip.create(name: 'Bali (Padangbai) to Lombok', from_id: 1, to_id: 2, operator_id: 1, price: '32', currency: "$", departure_time:  "14:00", arrival_time:  "16:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_pickup: true)

  Trip.create(name: 'Gili Trawangan to Bali (Padangbai)', from_id: 3, to_id: 1, operator_id: 1, price: '32', currency: "$", departure_time:  "10:30", arrival_time:  "11:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_dropoff: true)
  Trip.create(name: 'Gili Trawangan to Bali (Padangbai)', from_id: 3, to_id: 1, operator_id: 1, price: '32', currency: "$", departure_time:  "14:45", arrival_time:  "16:00", duration: '90', vehicle_id: 1, high_season: true, high_season_percentage_multiplier: 5, has_dropoff: true)

  Trip.create(name: 'Gili Air to Bali (Padangbai)', from_id: 4, to_id: 1, operator_id: 1, price: '32', currency: "$", departure_time:  "11:00", arrival_time:  "11:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_dropoff: true)
  Trip.create(name: 'Gili Air to Bali (Padangbai)', from_id: 4, to_id: 1, operator_id: 1, price: '32', currency: "$", departure_time:  "16:15", arrival_time:  "18:00", duration: '90', vehicle_id: 1, high_season: true, high_season_percentage_multiplier: 5, has_dropoff: true)

  Trip.create(name: 'Lombok to Bali (Padangbai)', from_id: 2, to_id: 1, operator_id: 1, price: '32', currency: "$", departure_time:  "11:30", arrival_time:  "13:00", duration: '90', vehicle_id: 1, high_season_percentage_multiplier: 5, has_dropoff: true)
  Trip.create(name: 'Lombok to Bali (Padangbai)', from_id: 2, to_id: 1, operator_id: 1, price: '32', currency: "$", departure_time:  "16:30", arrival_time:  "18:00", duration: '90', vehicle_id: 1, high_season: true, high_season_percentage_multiplier: 5, has_dropoff: true)


end
