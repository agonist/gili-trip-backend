import { navigate } from "@reach/router";
import dateFns from "date-fns";
import qs from "query-string";

import { DATE_FORMAT, LOCATIONS } from "../constants";

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const formatDate = date => dateFns.format(date, DATE_FORMAT);
export const stringToDate = date => dateFns.parse(date);

export const getLocationId = name =>
  LOCATIONS.find(({ name: _name }) => name === _name).id;

export const getLocationName = id =>
  LOCATIONS.find(({ id: _id }) => id === _id).name;

export const formatDataForApi = ({
  departure_date,
  arrival_date,
  from,
  to,
  ...data
}) => {
  const formattedData = {
    ...data,
  };

  if (departure_date) {
    Object.assign(formattedData, {
      departure_date: formatDate(departure_date),
    });
  }

  if (arrival_date) {
    Object.assign(formattedData, {
      arrival_date: formatDate(arrival_date),
    });
  }

  if (from) {
    Object.assign(formattedData, {
      from: getLocationId(from),
    });
  }

  if (to) {
    Object.assign(formattedData, {
      to: getLocationId(to),
    });
  }

  return formattedData;
};

export const formatDataForBrowser = ({
  departure_date,
  arrival_date,
  from,
  to,
  ...data
}) => {
  const formattedData = {
    ...data,
  };

  if (departure_date) {
    Object.assign(formattedData, {
      departure_date: stringToDate(departure_date),
    });
  }

  if (arrival_date) {
    Object.assign(formattedData, {
      arrival_date: stringToDate(arrival_date),
    });
  }

  if (from) {
    Object.assign(formattedData, {
      from: getLocationName(from),
    });
  }

  if (to) {
    Object.assign(formattedData, {
      to: getLocationName(to),
    });
  }

  return formattedData;
};

export const navigateWithData = (dest, { data, withParams }) => {
  const formattedData = formatDataForApi(data);
  const params = qs.stringify(formattedData);
  const url = withParams ? `${dest}?${params}` : dest;

  return navigate(url, { state: formattedData });
};

export const convertMinsToHrsMins = (mins, separator = ":") => {
  // https://stackoverflow.com/questions/4687723/how-to-convert-minutes-to-hours-minutes-and-add-various-time-values-together-usi

  let h = Math.floor(mins / 60);
  let m = mins % 60;

  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;

  return `${h}${separator}${m}`;
};
