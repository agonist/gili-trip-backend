require 'rails_helper'

RSpec.describe 'Trips API', type: :request do

  describe 'GET bali to lombok low seasons' do
      params = {from: '1', to: '2', date: '2019-12-21'}

      before { get '/api/v1/trips', params: params, as: :json}

      it 'returns trips bali to lombok with low season price' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(4)
      end

      it 'match the corresponding trips' do
        expected =
        expect(json).to include(
          a_hash_including("id" => 3, "price" => '35.0'),
          a_hash_including("id" => 4, "price" => '35.0'),
          a_hash_including("id" => 8, "price" => '40.0'),
          a_hash_including("id" => 9, "price" => '40.0'),
        )
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
  end

  describe 'GET bali to Lombok high season two operator' do
      params = {from: '1', to: '2', date: '2019-01-05'}

      before { get '/api/v1/trips', params: params, as: :json}

      it 'returns trips bali to Lombok during high season for wahana and ekajaya' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(6)
      end

      it 'match the corresponding trips' do
        expected =
        expect(json).to include(
          a_hash_including("id" => 3, "price" => '36.75'),
          a_hash_including("id" => 4, "price" => '36.75'),
          a_hash_including("id" => 5, "price" => '44.0'),
          a_hash_including("id" => 8, "price" => '42.0'),
          a_hash_including("id" => 9, "price" => '42.0'),
          a_hash_including("id" => 10, "price" => '49.5')
        )
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
  end

  describe 'GET bali to Lombok high season only wahana' do
      params = {from: '1', to: '2', date: '2019-02-04'}

      before { get '/api/v1/trips', params: params, as: :json}

      it 'returns trips bali to Lombok during high season for wahana' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(5)
      end

      it 'match the corresponding trips' do
        expected =
        expect(json).to include(
          a_hash_including("id" => 3, "price" => '36.75'),
          a_hash_including("id" => 4, "price" => '36.75'),
          a_hash_including("id" => 5, "price" => '44.0'),
          a_hash_including("id" => 8, "price" => '40.0'),
          a_hash_including("id" => 9, "price" => '40.0')
        )
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
  end

  describe 'GET bali to lombok low seasons with one trip unavailable' do
      params = {from: '1', to: '2', date: '2019-10-02'}

      before { get '/api/v1/trips', params: params, as: :json}

      it 'returns trips bali to lombok with low season price with one unavailable trip' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(3)
      end

      it 'match the corresponding trips' do
        expected =
        expect(json).to include(
          a_hash_including("id" => 4, "price" => '35.0'),
          a_hash_including("id" => 8, "price" => '40.0'),
          a_hash_including("id" => 9, "price" => '40.0')
        )
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
  end

  describe 'GET bali to lombok high seasons with one trip unavailable' do
      params = {from: '1', to: '2', date: '2019-01-24'}

      before { get '/api/v1/trips', params: params, as: :json}

      it 'returns trips bali to lombok with high season price with one unavailable trip' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(5)
      end


      it 'match the corresponding trips' do
        expected =
        expect(json).to include(
          a_hash_including("id" => 4, "price" => '36.75'),
          a_hash_including("id" => 5, "price" => '44.0'),
          a_hash_including("id" => 8, "price" => '42.0'),
          a_hash_including("id" => 9, "price" => '42.0'),
          a_hash_including("id" => 10, "price" => '49.5')
        )
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
  end

end
