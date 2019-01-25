class TripSerializer < ActiveModel::Serializer

  attributes :id, :name, :status, :price, :currency, :departure_date, :arrival_date, :duration
  belongs_to :to
  belongs_to :from
  belongs_to :operator
  belongs_to :vehicle

end
