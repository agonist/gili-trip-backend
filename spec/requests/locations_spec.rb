require 'rails_helper'

RSpec.describe 'Locations API', type: :request do


  describe 'GET /api/v1/locations' do
      before { get '/api/v1/locations' }

      it 'returns locations' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(5)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
  end

end
