import axios from "axios";

import { formatDataForApi } from "../helpers";
import { BASE_API_URL } from "../constants";

const api = axios.create({
  baseURL: BASE_API_URL,
});

export const fetchTrips = params => {
  const { from, to } = formatDataForApi(params);
  return api.get(`/trips/${from}/${to}`);
};
