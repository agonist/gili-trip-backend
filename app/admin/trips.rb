ActiveAdmin.register Trip do

 permit_params :name, :from_id, :to_id, :operator_id, :price, :currency, :departure_time, :arrival_time, :duration, :vehicle_id, :high_season_percentage_multiplier


end
