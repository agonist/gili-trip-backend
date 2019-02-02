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
    id: 6,
    name: "Bali to Gili A",
    status: "available",
    price: "34.0",
    currency: "€",
    departure_date: "2018-11-03T10:30:00.000Z",
    arrival_date: "2019-01-28T14:35:56.964Z",
    duration: 100,
    to: {
      id: 4,
      name: "Gili Air",
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
    id: 7,
    name: "Bali to Gili A",
    status: "available",
    price: "34.0",
    currency: "€",
    departure_date: "2018-11-03T12:00:00.000Z",
    arrival_date: "2019-01-28T14:35:56.970Z",
    duration: 100,
    to: {
      id: 4,
      name: "Gili Air",
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
