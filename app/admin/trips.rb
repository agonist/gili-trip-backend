ActiveAdmin.register Trip do

 permit_params :name, :from_id, :to_id, :operator_id, :price, :currency, :departure_time, :arrival_time, :duration, :vehicle_id, :high_season_percentage_multiplier, :has_pickup, :has_dropoff, :return_price, :idr_price, :idr_return_price


end
