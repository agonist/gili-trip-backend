class AddHighSeasonToTrip < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :high_season, :boolean
  end
end
