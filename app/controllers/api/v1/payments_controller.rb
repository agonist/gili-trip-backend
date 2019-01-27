class Api::V1::PaymentsController < ApiController

  def generate_braintree_token
    @booking = Booking.find(params[:booking_id])
    @booking.braintree_token =  Braintree::ClientToken.generate

    if @booking.save
        render json: {:token => @booking.braintree_token}
    else
        render json: @booking.errors, status: :unprocessable_entity
    end
  end

  def checkout
    result = Braintree::Transaction.sale!(
  :amount => "100.00",
  :payment_method_nonce => params[:nonce],
  :options => {
    :submit_for_settlement => true
  }
)

    if result.success?
      puts "success!: #{result.transaction.id}"
    elsif result.transaction
      puts "Error processing transaction:"
      puts "  code: #{result.transaction.processor_response_code}"
      puts "  text: #{result.transaction.processor_response_text}"
    else
      p result.errors
    end
  end

end
