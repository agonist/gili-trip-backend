import { navigate } from "@reach/router";
import dateFns from "date-fns";
import qs from "query-string";
import { majorScale } from "evergreen-ui";

export const defaultHeight = majorScale(5);

export const DATE_FORMAT = "MM/DD/YYYY";

export const LOCATIONS = [
  { id: 1, name: "Bali" },
  { id: 2, name: "Lombok" },
  { id: 3, name: "Gili Trawangan" },
  { id: 4, name: "Gili Air" },
  { id: 5, name: "Gili Meno" },
];

export const TODAY_DATE = new Date();

export const TRAVEL_TYPES = {
  ROUND: "round",
  ONE_WAY: "one-way",
};

export const TRIPS = [
  {
    id: 4,
    name: "Bali to Gili M",
    status: "available",
    price: "34.0",
    currency: "€",
    departure_date: "2018-11-03T04:15:00.000Z",
    arrival_date: "2018-11-03T11:28:24.779Z",
    duration: 100,
    to: {
      id: 6,
      name: "Gili Meno",
    },
    from: {
      id: 1,
      name: "Bali (Padangbai)",
    },
    operator: {
      id: 1,
      name: "Eka Jaya",
      logo: "",
      website: "",
      contact_email: "",
      contact_phone: "",
    },
    vehicle: {
      id: 1,
      kind: "Boat",
      subtype: "Eka Jaya 23",
      description: "It's going to be fast",
    },
  },
  {
    id: 5,
    name: "Bali to Gili M",
    status: "available",
    price: "34.0",
    currency: "€",
    departure_date: "2018-11-03T05:45:00.000Z",
    arrival_date: "2018-11-03T14:29:24.784Z",
    duration: 100,
    to: {
      id: 6,
      name: "Gili Meno",
    },
    from: {
      id: 1,
      name: "Bali (Padangbai)",
    },
    operator: {
      id: 1,
      name: "Eka Jaya",
      logo: "",
      website: "",
      contact_email: "",
      contact_phone: "",
    },
    vehicle: {
      id: 1,
      kind: "Boat",
      subtype: "Eka Jaya 23",
      description: "It's going to be fast",
    },
  },
];

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
