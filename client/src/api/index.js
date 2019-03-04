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

export const postBooking = payload =>
  api
    .post(`/bookings`, {
      booking: payload,
    })
    .then(getData);

export const createBrainTreeDropin = () =>
  new Promise(resolve => {
    brainTreeDropin.create(
      {
        authorization: BRAINTREE_AUTHORIZATION,
        container: "#payment-test",
      },
      resolve,
    );
  });

export const initPayment = async () => {
  await createBrainTreeDropin();
};
