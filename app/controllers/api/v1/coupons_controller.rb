class Api::V1::CouponsController < ApiController

  def validate
    @coupon = Coupon.where(:code => params[:code]).first

    if @coupon.present?
      response = { valid: is_valid?(@coupon),
        discounted_price: discounted_price(params[:full_price], @coupon) }
      else
        response = { valid: false, discounted_price: params[:full_price] }
      end
      render json: response
    end

    private
    def is_valid?(coupon)
      (coupon.expiration.nil? || coupon.expiration >= Date.current) &&
      (coupon.limit == 0 || coupon.limit > coupon.used)
    end

    def discounted_price(full_price, coupon)

      price = if is_valid?(coupon)
        if coupon.percentage
          full_price - (full_price * (coupon.amount / 100))
        else
          (full_price - coupon.amount)
        end
      else
        full_price
      end
      return price.floor
    end

  end
