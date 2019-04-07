import axios from "axios";
import qs from "query-string";
import brainTreeDropin from "braintree-web-drop-in";

import { formatDataForApi } from "../helpers";
import { BASE_API_URL } from "../constants";

const { BRAINTREE_AUTHORIZATION } = process.env;

const api = axios.create({
  baseURL: BASE_API_URL,
});

const getData = ({ data }) => data;

export const fetchTrips = params => {
  const { from, to, departure_date } = formatDataForApi(params);

  const queryParams = qs.stringify({
    from,
    to,
    date: departure_date,
  });

  return api.get(`/trips/?${queryParams}`).then(getData);
};

export const fetchBooking = bookingId =>
  api.get(`/bookings/${bookingId}`).then(getData);

export const postBooking = payload =>
  api
    .post(`/bookings`, {
      booking: payload,
    })
    .then(getData);

export const putBooking = (bookingId, payload) =>
  api
    .put(`/bookings/${bookingId}`, {
      booking: payload,
    })
    .then(getData);

export const validateCoupon = ({ code, booking_id }) =>
  api.post("/api/v1/coupons/validate", {
    code,
    booking_id,
  });

export const getDropinInstance = amount =>
  brainTreeDropin.create({
    authorization: BRAINTREE_AUTHORIZATION,
    container: "#payment-test",
    paypal: {
      amount,
      flow: "checkout",
      currency: "USD",
    },
  });

export const paymentCheckout = ({ id, nonce }) =>
  api.post("payments/checkout", {
    booking_id: id,
    payment_method_nonce: nonce,
  });
