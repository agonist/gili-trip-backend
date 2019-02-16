import { majorScale } from "evergreen-ui";

export const BASE_API_URL = "http://localhost:3001/api/v1/";

export const DATE_FORMAT = "YYYY-MM-DD";

export const ITEM_HEIGHT = majorScale(5);
export const ITEM_SPACE = majorScale(2);

export const LOCATIONS = [
  { id: "1", name: "Bali (Padangbai)" },
  { id: "2", name: "Lombok" },
  { id: "3", name: "Gili Trawangan" },
  { id: "4", name: "Gili Air" },
  { id: "5", name: "Gili Meno" },
];

export const TODAY_DATE = new Date();

export const TRAVEL_TYPES = {
  ROUND: "round",
  ONE_WAY: "one-way",
};

export const TRIPS = [
  {
    id: "trip-1",
    name: "Bali to Gili A",
    status: "available",
    price: "34.0",
    currency: "€",
    departure_time: "10:30",
    arrival_time: "12:45",
    duration: 135,
    to: {
      id: "loc-4",
      name: "Gili Air",
    },
    from: {
      id: "loc-1",
      name: "Bali",
    },
    operator: {
      id: "ope-1",
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
    id: "trip-2",
    name: "Bali to Gili A",
    status: "available",
    price: "34.0",
    currency: "€",
    departure_time: "11:30",
    arrival_time: "13:45",
    duration: 135,
    to: {
      id: "loc-2",
      name: "Lombok",
    },
    from: {
      id: "loc-5",
      name: "Gili Meno",
    },
    operator: {
      id: "ope-1",
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
