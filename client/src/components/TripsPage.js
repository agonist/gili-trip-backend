import React from "react";
import PropTypes from "prop-types";
import qs from "query-string";
import { Button, Pane } from "evergreen-ui";

import Container from "./Container";
import ErrorState from "./ErrorState";
import Header from "./Header";
import SearchForm from "./SearchForm";
import TripsContainer from "./TripsContainer";

import { ITEM_HEIGHT, ITEM_SPACE, TRAVEL_TYPES } from "../constants";
import { fetchTrips } from "../api";

import {
  formatDataForBrowser,
  getLocationName,
  navigateWithData,
} from "../helpers";

const formatDate = (date, time) => {
  const [hours, minutes] = time.split(":");

  date.setHours(hours);
  date.setMinutes(minutes);

  return date;
};

const formatTicket = ({ id, ...ticket }) => ({
  ...ticket,
  trip_id: id,
});

const getParams = location => {
  const urlParams = qs.parse(location.search);
  return formatDataForBrowser(urlParams);
};

const handleSearchSubmit = data =>
  navigateWithData("/trips", {
    data,
    withParams: true,
  });

const TripsPage = ({ location }) => {
  const queryParams = getParams(location);
  const {
    arrival_date,
    departure_date,
    from,
    to,
    quantity,
    travel_type,
  } = queryParams;

  const [hasFailed, setHasFailed] = React.useState(false);

  const [depTicket, setDepTicket] = React.useState(null);
  const [depTrips, setDepTrips] = React.useState([]);
  const [isFetchingDepTrips, setIsFetchingDepTrips] = React.useState(true);

  const [retTicket, setRetTicket] = React.useState(null);
  const [retTrips, setRetTrips] = React.useState([]);
  const [isFetchingRetTrips, setIsFetchingRetTrips] = React.useState(false);

  const isRoundTrip = travel_type === TRAVEL_TYPES.ROUND;

  const handleBookTickets = () => {
    const data = {
      quantity: +quantity,
      tickets: [
        {
          ...formatTicket(depTicket),
          date: formatDate(departure_date, depTicket.departure_time),
        },
        isRoundTrip && {
          ...formatTicket(retTicket),
          date: formatDate(arrival_date, retTicket.departure_time),
        },
      ],
    };

    return navigateWithData("/booking", { data });
  };

  const handleFetchError = () => setHasFailed(true);

  const fetchDepTrips = () => {
    const onSuccess = trips => {
      setDepTrips(trips);
      setIsFetchingDepTrips(false);
    };

    return fetchTrips(queryParams)
      .then(onSuccess)
      .catch(handleFetchError);
  };

  const fetchRetTrips = () => {
    const onSuccess = trips => {
      setRetTrips(trips);
      setIsFetchingRetTrips(false);
    };

    return fetchTrips({
      ...queryParams,
      from: to,
      to: from,
    })
      .then(onSuccess)
      .catch(handleFetchError);
  };

  React.useEffect(() => {
    setHasFailed(false);
    fetchDepTrips();
  }, [
    arrival_date && arrival_date.toDateString(),
    departure_date && departure_date.toDateString(),
    from,
    to,
    quantity,
    travel_type,
  ]);

  React.useEffect(() => {
    setIsFetchingRetTrips(true);
    fetchRetTrips();
  }, [depTicket && depTicket.id]);

  const hasSelectedAllTickets = isRoundTrip
    ? depTicket && retTicket
    : depTicket;

  const isSearchFormLoading =
    !hasFailed && (isFetchingDepTrips || isFetchingRetTrips);

  const displayRetTrips = isRoundTrip && depTicket;

  const fromName = getLocationName(from);
  const toName = getLocationName(to);

  return (
    <div className="Page Page--trips">
      <Header>
        <SearchForm
          formData={queryParams}
          isLoading={isSearchFormLoading}
          onSubmit={handleSearchSubmit}
        />
      </Header>

      {hasFailed && (
        <Container>
          <ErrorState>
            <Button onClick={fetchTrips}>Try again</Button>
          </ErrorState>
        </Container>
      )}

      {!hasFailed && (
        <Container>
          <TripsContainer
            from={fromName}
            to={toName}
            isFetching={isFetchingDepTrips}
            trips={depTrips}
            ticket={depTicket}
            handleSelect={setDepTicket}
          />

          {displayRetTrips && (
            <Pane paddingTop={ITEM_SPACE}>
              <TripsContainer
                from={toName}
                to={fromName}
                isFetching={isFetchingRetTrips}
                trips={retTrips}
                ticket={retTicket}
                handleSelect={setRetTicket}
              />
            </Pane>
          )}
        </Container>
      )}

      {depTicket && retTicket && (
        <Container paddingTop={0}>
          <Pane textAlign="right">
            <Button
              appearance="primary"
              height={ITEM_HEIGHT}
              iconAfter="arrow-right"
              onClick={handleBookTickets}
              disabled={!hasSelectedAllTickets}
            >
              Confirm and continue
            </Button>
          </Pane>
        </Container>
      )}
    </div>
  );
};

TripsPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }),
};

TripsPage.defaultProps = {
  location: {
    search: "",
  },
};

export default TripsPage;
