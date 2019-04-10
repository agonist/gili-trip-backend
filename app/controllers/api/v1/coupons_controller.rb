class Api::V1::CouponsController < ApiController

  def validate
    @coupon = Coupon.where(:code => params[:code]).first
    @booking =  Booking.find(params[:booking_id])

    if (!@coupon.present? || !is_valid?(@coupon))
      render json: { valid: false, discounted_price: @booking.full_price, message: "Invalid promo code" }
      return
    end

    if (@booking.coupon.present?)
      render json: { valid: false, discounted_price: @booking.final_price, message: "Promo code already used" }
      return
    end

    discounted_price = discounted_price(@booking.full_price, @coupon)
    @booking.final_price = discounted_price
    @booking.coupon = @coupon
    if @booking.save
        render json: @booking
    else
        render json: @booking.errors, status: :unprocessable_entity
    end

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
