import { formatDataForApi, getRandomNumber, sleep } from "../helpers";
import { LOCATIONS, TRIPS } from "../constants";

const getLocationById = id => LOCATIONS.find(({ id: _id }) => _id === id);

export const fetchTrips = async params =>
  new Promise(async resolve => {
    const { from, to } = formatDataForApi(params);
    const timeToWait = getRandomNumber(500, 1500);

    const trips = TRIPS.map((trip, i) => ({
      ...trip,
      id: `${from}-${to}-${i}`,
      from: getLocationById(from),
      to: getLocationById(to),
    }));

    await sleep(timeToWait);

    resolve(trips);
  });
