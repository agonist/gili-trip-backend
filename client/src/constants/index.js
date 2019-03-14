import { majorScale } from "evergreen-ui";
import vehicle1 from "../assets/wahana-logo.png";

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

export const VEHICLES = [
  {
    id: 1,
    logo: vehicle1,
  },
];
