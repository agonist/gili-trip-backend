import axios from "axios";
import qs from "query-string";

import { formatDataForApi } from "../helpers";
import { BASE_API_URL } from "../constants";

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
  api.post("/coupons/validate", {
    code,
    booking_id,
  });

export const fetchPaymentToken = () => api.get("/payments/token").then(getData);

export const postPaymentCheckout = ({ id, nonce }) =>
  api.post("payments/checkout", {
    booking_id: id,
    payment_method_nonce: nonce,
  });
