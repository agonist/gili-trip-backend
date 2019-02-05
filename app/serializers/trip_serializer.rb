class TripSerializer < ActiveModel::Serializer

  attributes :id, :name, :status, :price, :currency, :departure_time, :arrival_time, :duration
  belongs_to :to
  belongs_to :from
  belongs_to :operator
  belongs_to :vehicle

end
