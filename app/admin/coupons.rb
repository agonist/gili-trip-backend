ActiveAdmin.register Coupon do

permit_params :amount, :limit, :expiration, :code, :percentage, :used

end
