require 'rails_helper'

# Test suite for the Todo model
RSpec.describe Trip, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:from_id) }
  it { should validate_presence_of(:to_id) }
  it { should validate_presence_of(:operator_id) }
  it { should validate_presence_of(:price) }
  it { should validate_presence_of(:currency) }
  it { should validate_presence_of(:departure_time) }
  it { should validate_presence_of(:arrival_time) }
  it { should validate_presence_of(:duration) }
  it { should validate_presence_of(:high_season_percentage_multiplier) }
  it { should belong_to(:from) }
  it { should belong_to(:to) }
  it { should belong_to(:operator) }
  it { should have_many(:unavailable) }


end
