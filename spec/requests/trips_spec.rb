require 'rails_helper'

RSpec.describe 'Trips API', type: :request do

  describe 'GET bali to lombok' do
      params = {from: '1', to: '2', date: '2019-12-21'}

      before { get '/api/v1/trips', params: params, as: :json}

      it 'returns trips bali to lombok' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(2)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
  end

  describe 'GET bali to Gili T' do
      params = {from: '1', to: '3', date: '2019-12-21'}

      before { get '/api/v1/trips', params: params, as: :json}

      it 'returns trips bali to gili t' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(2)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
  end

  describe 'GET Gili T to Bali high seasons' do
      params = {from: '3', to: '1', date: '2019-02-21'}

      before { get '/api/v1/trips', params: params, as: :json}

      it 'returns trips bali to gili t' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(2)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
  end

  describe 'GET Gili T to Bali regular seasons' do
      params = {from: '3', to: '1', date: '2019-05-21'}

      before { get '/api/v1/trips', params: params, as: :json}

      it 'returns trips bali to gili t' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(1)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
  end


    describe 'GET Bali to Gili T with one unavailable' do
        params = {from: '1', to: '3', date: '2019-05-02'}

        before { get '/api/v1/trips', params: params, as: :json}

        it 'returns trips bali to gili t' do
        # Note `json` is a custom helper to parse JSON responses
        expect(json).not_to be_empty
        expect(json.size).to eq(1)
        end

        it 'returns status code 200' do
          expect(response).to have_http_status(200)
        end
    end

end
