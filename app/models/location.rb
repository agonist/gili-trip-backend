class Location < ApplicationRecord
  validates :name, presence: true
  validates :id, presence: true
end
