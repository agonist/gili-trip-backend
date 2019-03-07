ActiveAdmin.register Trip do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
 permit_params :name, :from_id, :to_id, :operator_id, :status, :price, :currency, :departure_time, :arrival_time, :duration, :vehicle_id, :high_season_percentage_multiplier
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

end
