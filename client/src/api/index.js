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
