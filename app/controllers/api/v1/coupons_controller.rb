class Api::V1::CouponsController < ApiController

  def validate
    @coupon = Coupon.where(:code => params[:code]).first
    @booking =  Booking.find(params[:booking_id])

    if @coupon.present? && !@booking.coupon.present?
      if is_valid?(@coupon)
        discounted_price = discounted_price(@booking.full_price, @coupon)
        @booking.final_price = discounted_price
        @booking.coupon = @coupon
        @coupon.used += 1
        @coupon.save
        if @booking.save
            render json: @booking
        else
            render json: @booking.errors, status: :unprocessable_entity
        end
      end

      else
        response = { valid: false, discounted_price: @booking.full_price }
        render json: response
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
