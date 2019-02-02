export const DATE_FORMAT = "MM/DD/YYYY";

export const LOCATIONS = [
  { id: "loc-1", name: "Bali" },
  { id: "loc-2", name: "Lombok" },
  { id: "loc-3", name: "Gili Trawangan" },
  { id: "loc-4", name: "Gili Air" },
  { id: "loc-5", name: "Gili Meno" },
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
    departure_date: "2018-11-03T10:30:00.000Z",
    arrival_date: "2019-01-28T14:35:56.964Z",
    duration: 100,
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
    departure_date: "2018-11-03T12:00:00.000Z",
    arrival_date: "2019-01-28T14:35:56.970Z",
    duration: 100,
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
