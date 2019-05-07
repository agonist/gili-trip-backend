import { majorScale } from "evergreen-ui";
import operator1 from "../assets/wahana-logo.png";

const { BASE_URL } = process.env;

export const BASE_API_URL = BASE_URL;

export const CONTACT_EMAIL = "gili-sos@gmail.com";

export const CURRENCY = "USD";
export const CURRENCY_SYMBOL = "$";

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

export const OPERATORS = [
  {
    id: 1,
    logo: operator1,
  },
];

export const MOBILE_BREAKPOINT = 599;
