require 'rails_helper'

RSpec.describe 'Booking API', type: :request do


  describe 'POST /api/v1/booking' do

      params = {
    "booking": {
        "booking_email": "bastien.billey@gmail.com",
        "quantity": 3,
        "passengers": [
            "Toby Bryan",
            "Franck Muller",
            "Pascale Blaise"
        ],
        "tickets": [
            {
                "date": "22/2/2019",
                "pickup_address": "Jl. Pantai Berawa Br Pelambingan no 37, Canggu",
                "pickup_phone": "+62 819-9909-5888",
                "pickup_name": "Matra guesthouse",
                "trip_id": 2
            },
            {
                "date": "25/2/2019",
                "pickup_address": "Jl. Pantai Berawa Br Pelambingan no 37, Canggu",
                "pickup_phone": "+62 819-9909-5888",
                "pickup_name": "Matra guesthouse",
                "trip_id": 8
            }
        ]
    }
}

      before { post '/api/v1/bookings' , params: params, as: :json}

      it 'returns booking' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty

      expected = {
        "booking_email" => "bastien.billey@gmail.com",
        "quantity" => 3,
        "passengers" => a_collection_including("Toby Bryan","Franck Muller","Pascale Blaise"),
        "tickets" =>  a_collection_including(
          a_hash_including("date" => "2019-02-22T00:00:00.000Z"),
          a_hash_including("pickup_address" => "Jl. Pantai Berawa Br Pelambingan no 37, Canggu"),
          a_hash_including("pickup_phone" => "+62 819-9909-5888"),
          a_hash_including("pickup_name" => "Matra guesthouse")
        )
      }
      expect(json).to include(expected)

      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
  end

end
