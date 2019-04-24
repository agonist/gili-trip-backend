let PaypalCheckout = {};

if (typeof document !== "undefined") {
  PaypalCheckout = require("paypal-checkout").default;
}

export default PaypalCheckout;
