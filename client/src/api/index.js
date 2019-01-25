import { LOCATIONS, TRIPS } from "../constants";

export const fetchLocations = () =>
  new Promise(resolve => setTimeout(() => resolve(LOCATIONS), 700));

export const fetchTrips = () =>
  new Promise(resolve => setTimeout(() => resolve(TRIPS), 1200));
