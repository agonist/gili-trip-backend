# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

Location.create(id: 1, name: 'Bali (Padangbai)')
Location.create(id: 2,name: 'Lombok')
Location.create(id: 3,name: 'Gili Trawangan')
Location.create(id: 4,name: 'Gili Air')
Location.create(id: 5,name: 'Gili Meno')

Vehicle.create(kind: 'Boat', subtype: 'Eka Jaya 23', description: 'It\'s going to be fast')
Vehicle.create(kind: 'Boat', subtype: 'Eka Jaya 25', description: 'Feel your flow')
Vehicle.create(kind: 'Boat', subtype: 'Eka Jaya 26', description: 'Because humans have feeling')
Vehicle.create(kind: 'Boat', subtype: 'Eka Jaya Island Hopper', description: 'Because humans have feeling')
Vehicle.create(kind: 'Boat', subtype: 'Wahana Gili Ocean III', description: 'Because humans have feeling')
Vehicle.create(kind: 'Boat', subtype: 'Wahana Gili Ocean V', description: 'Because humans have feeling')

Operator.create(name: 'Eka Jaya', logo: '', website: '', contact_email: '', contact_phone: '')
Operator.create(name: 'Wahana Gili Ocean', logo: '', website: '', contact_email: '', contact_phone: '')

Trip.create(name: 'Bali to Gili T', from_id: 1, to_id: 3, operator_id: 1, status: 'available', price: '34', currency: "€", departure_date:  Time.parse("Nov 3 2018 11:00"), arrival_date:  Time.now, duration: '100', vehicle_id: '1')
Trip.create(name: 'Bali to Gili T', from_id: 1, to_id: 3, operator_id: 1, status: 'available', price: '34', currency: "€", departure_date:  Time.parse("Nov 3 2018 12:30"), arrival_date:  Time.now, duration: '100', vehicle_id: '1')
Trip.create(name: 'Bali to Gili T', from_id: 1, to_id: 3, operator_id: 1, status: 'available', price: '34', currency: "€", departure_date:  Time.parse("Nov 3 2018 15:30"), arrival_date:  Time.now, duration: '100', vehicle_id: '1')

Trip.create(name: 'Bali to Gili M', from_id: 1, to_id: 5, operator_id: 1, status: 'available', price: '34', currency: "€", departure_date:  Time.parse("Nov 3 2018 11:15"), arrival_date:  Time.now, duration: '100', vehicle_id: '1')
Trip.create(name: 'Bali to Gili M', from_id: 1, to_id: 5, operator_id: 1, status: 'available', price: '34', currency: "€", departure_date:  Time.parse("Nov 3 2018 12:45"), arrival_date:  Time.now, duration: '100', vehicle_id: '1')

Trip.create(name: 'Bali to Gili A', from_id: 1, to_id: 4, operator_id: 1, status: 'available', price: '34', currency: "€", departure_date:  Time.parse("Nov 3 2018 11:30"), arrival_date:  Time.now, duration: '100', vehicle_id: '1')
Trip.create(name: 'Bali to Gili A', from_id: 1, to_id: 4, operator_id: 1, status: 'available', price: '34', currency: "€", departure_date:  Time.parse("Nov 3 2018 13:00"), arrival_date:  Time.now, duration: '100', vehicle_id: '1')
Trip.create(name: 'Bali to Gili A', from_id: 1, to_id: 4, operator_id: 1, status: 'available', price: '34', currency: "€", departure_date:  Time.parse("Nov 3 2018 15:45"), arrival_date:  Time.now, duration: '100', vehicle_id: '1')

Trip.create(name: 'Bali to Gili T', from_id: 1, to_id: 3, operator_id: 2, status: 'available', price: '34', currency: "€", departure_date:  Time.parse("Nov 3 2018 09:00"), arrival_date:  Time.now, duration: '100', vehicle_id: '5')
