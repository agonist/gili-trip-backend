require 'rails_helper'

# Test suite for the Todo model
RSpec.describe Location, type: :model do
  it { should validate_presence_of(:id) }
  it { should validate_presence_of(:name) }
end
