class Api::V1::PaymentsController < ApiController

  TRANSACTION_SUCCESS_STATUSES = [
    Braintree::Transaction::Status::Authorizing,
    Braintree::Transaction::Status::Authorized,
    Braintree::Transaction::Status::Settled,
    Braintree::Transaction::Status::SettlementConfirmed,
    Braintree::Transaction::Status::SettlementPending,
    Braintree::Transaction::Status::Settling,
    Braintree::Transaction::Status::SubmittedForSettlement,
  ]

  def generate_braintree_token
    @booking = Booking.find(params[:booking_id])
    @booking.braintree_token =  gateway.client_token.generate

    if @booking.save
      render json: {:token => @booking.braintree_token}
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  def checkout

    @booking = Booking.find(params[:booking_id])
    amount = @booking.final_price
    nonce = params["payment_method_nonce"]

    result = gateway.transaction.sale(
      amount: amount,
      payment_method_nonce: nonce,
      :options => {
        :submit_for_settlement => true
      }
    )

    if result.success? || result.transaction
      render json: {:message => "congrats checkout went well"}
    else
      error_messages = result.errors.map { |error| "Error: #{error.code}: #{error.message}" }
      render json: error_messages, status: :unprocessable_entity
    end

  end

  def gateway
    env =  :sandbox

    @gateway ||= Braintree::Gateway.new(
      :environment => env && env.to_sym,
      :merchant_id => 'ydb4ycd8z7dmn4pv',
      :public_key => 'ntj85b9x9mwcbp39',
      :private_key => 'b33536920ecf2e119b824525d601fb98',
    )
  end
end
