import { formatDataForApi, sleep } from "../helpers";
import { LOCATIONS, TRIPS } from "../constants";

const getLocationById = id => LOCATIONS.find(({ id: _id }) => _id === id);

export const fetchTrips = async params =>
  new Promise(async resolve => {
    const { from, to } = formatDataForApi(params);

    const trips = TRIPS.map(trip => ({
      ...trip,
      from: getLocationById(from),
      to: getLocationById(to),
    }));

    await sleep(1500);

    resolve(trips);
  });
