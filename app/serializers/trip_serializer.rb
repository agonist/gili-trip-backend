class TripSerializer < ActiveModel::Serializer

  attributes :id, :name, :price, :currency, :departure_time, :arrival_time, :duration, :to, :has_pickup, :has_dropoff
  belongs_to :to , serializer: LocationSerializer
  belongs_to :from
  belongs_to :operator
  belongs_to :vehicle


end
