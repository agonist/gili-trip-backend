import * as Sentry from "@sentry/browser";
import { navigate } from "@reach/router";
import dateFns from "date-fns";
import qs from "query-string";

import { DATE_FORMAT, LOCATIONS, BOOKING_TYPES, OPERATORS } from "../constants";

export const formatDate = (date, format = DATE_FORMAT) =>
  dateFns.format(date, format);

export const stringToDate = date => dateFns.parse(date);

export const getOperatorLogo = id =>
  OPERATORS.find(({ id: _id }) => id === _id).logo;

export const getLocationId = name =>
  LOCATIONS.find(({ name: _name }) => name === _name).id;

export const getLocationName = id =>
  LOCATIONS.find(({ id: _id }) => id === _id).name;

export const flattenTicket = ({ trip, ...ticket }) => ({
  ...trip,
  ...ticket,
});

export const flattenTickets = tickets => tickets.map(flattenTicket);

export const hasReturn = type => type === BOOKING_TYPES.ROUND;

export const hasOpenReturn = type => type === BOOKING_TYPES.OPEN_RETURN;

export const hasPickup = ({ pickup_name, pickup_address, pickup_phone } = {}) =>
  !!pickup_name || !!pickup_address || !!pickup_phone;

export const formatDataForApi = ({
  departure_date,
  arrival_date,
  booking_type,
  ...data
}) => {
  const formattedData = {
    booking_type,
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

  return formattedData;
};

export const formatDataForBrowser = ({
  departure_date,
  arrival_date,
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

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const formValidations = {
  required: value => (value ? undefined : "Required"),
};

export const captureException = err => Sentry.captureException(err);
