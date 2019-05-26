ActiveAdmin.register Booking do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
 permit_params :booking_status, :quantity, :payment_status, :final_price, :booking_date, :passengers,  :booking_email, :coupon, :full_price
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end
action_item :confirm,  only: [ :show ] do

  link_to 'Sned comfirmation', intern_bookings_validate_path(:id => resource.id), :method=> :post

end

end
