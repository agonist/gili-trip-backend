ActiveAdmin.register Trip do

 permit_params :name, :from_id, :to_id, :operator_id, :price, :currency, :departure_time, :arrival_time, :duration, :vehicle_id, :high_season_percentage_multiplier

index do
    (Trip.column_names).each do |c|
      column c
    end
    column :high_season_price do |trip|
      increase = trip.price * (trip.high_season_percentage_multiplier.to_f/100.0)
      price= trip.price + increase
      raw price
    end
   end



end
