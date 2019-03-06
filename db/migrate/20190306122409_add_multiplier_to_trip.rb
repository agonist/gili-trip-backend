class AddMultiplierToTrip < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :high_season_percentage_multiplier, :integer
  end
end
