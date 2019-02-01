Rails.application.routes.draw do


  namespace :api do
     namespace :v1 do
      get '/trips/:from/:to', to: 'trips#get_trips'
      resources :bookings
      resources :locations
      get '/payments/token', to: 'payments#generate_braintree_token'
      post '/payments/checkout', to: 'payments#checkout'
      post '/coupons/validate', to: 'coupons#validate'
     end
    end

    devise_for :admin_users, ActiveAdmin::Devise.config
    ActiveAdmin.routes(self)

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
