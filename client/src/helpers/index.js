import { navigate } from "@reach/router";
import dateFns from "date-fns";
import qs from "query-string";

export const dateToString = date => date.toISOString();
export const stringToDate = date => dateFns.parse(date);

export const formatFormDataForApi = ({
  departure_date,
  arrival_date,
  ...data
}) => ({
  departure_date: dateToString(departure_date),
  arrival_date: arrival_date && dateToString(arrival_date),
  ...data,
});

export const formatFormDataForBrowser = data => {
  const { departure_date, arrival_date, ...formData } = data;
  const formattedFormData = {
    ...formData,
    departure_date: stringToDate(departure_date),
  };

  if (arrival_date) {
    Object.assign(formattedFormData, {
      arrival_date: stringToDate(arrival_date),
    });
  }

  return formattedFormData;
};

export const navigateWithFormData = formData => {
  const data = formatFormDataForApi(formData);
  const params = qs.stringify(data);
  return navigate(`/trips/?${params}`, { replace: true });
};

export const convertMinsToHrsMins = (mins, separator = ":") => {
  // https://stackoverflow.com/questions/4687723/how-to-convert-minutes-to-hours-minutes-and-add-various-time-values-together-usi

  let h = Math.floor(mins / 60);
  let m = mins % 60;

  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;

  return `${h}${separator}${m}`;
};
