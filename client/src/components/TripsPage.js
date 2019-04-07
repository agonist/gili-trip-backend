import React from "react";
import PropTypes from "prop-types";
import qs from "query-string";
import { Button, Pane, Spinner, majorScale } from "evergreen-ui";

import Container from "./Container";
import ErrorState from "./ErrorState";
import Header from "./Header";
import Item from "./Item";
import SearchForm from "./SearchForm";
import Trips from "./Trips";
import TripsTitle from "./TripsTitle";

import { ITEM_HEIGHT, TRAVEL_TYPES } from "../constants";
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
  const [isFetchingTrips, setIsFetchingTrips] = React.useState(true);

  const [departureTicket, setDepartureTicket] = React.useState(null);
  const [returnTicket, setReturnTicket] = React.useState(null);

  const [departureTrips, setDepartureTrips] = React.useState([]);
  const [returnTrips, setReturnTrips] = React.useState([]);

  const isRoundTrip = travel_type === TRAVEL_TYPES.ROUND;
  const isSearchFormLoading = !hasFailed && isFetchingTrips;

  const handleSearchSubmit = data =>
    navigateWithData("/trips", {
      data,
      withParams: true,
    });

  const handleUnselectDepartureTicket = () => setDepartureTicket(null);
  const handleUnselectReturnTicket = () => setReturnTicket(null);

  const handleBookTickets = () => {
    const data = {
      quantity: +quantity,
      tickets: [
        {
          ...formatTicket(departureTicket),
          date: formatDate(departure_date, departureTicket.departure_time),
        },
      ],
    };

    if (isRoundTrip) {
      data.tickets.push({
        ...formatTicket(returnTicket),
        date: formatDate(arrival_date, returnTicket.departure_time),
      });
    }

    return navigateWithData("/booking", {
      data,
    });
  };

  const fetchDepartureTrips = () => {
    const onSuccess = trips => setDepartureTrips(trips);
    const onError = () => setHasFailed(true);

    return fetchTrips(queryParams)
      .then(onSuccess)
      .catch(onError);
  };

  const fetchReturnTrips = () => {
    const onSuccess = trips => setReturnTrips(trips);
    const onError = () => setHasFailed(true);

    return fetchTrips({
      ...queryParams,
      from: to,
      to: from,
    })
      .then(onSuccess)
      .catch(onError);
  };

  const handleFetchTrips = async () => {
    setHasFailed(false);
    setIsFetchingTrips(true);

    await fetchDepartureTrips();

    if (isRoundTrip) {
      await fetchReturnTrips();
    }

    setIsFetchingTrips(false);
  };

  React.useEffect(() => {
    handleFetchTrips();
  }, [
    arrival_date && arrival_date.toDateString(),
    departure_date && departure_date.toDateString(),
    from,
    from,
    quantity,
    travel_type,
  ]);

  const renderTrips = () => {
    const fromName = getLocationName(from);
    const toName = getLocationName(to);

    return (
      <>
        <TripsTitle from={fromName} to={toName} />

        {isFetchingTrips ? (
          <Item>
            <Spinner />
          </Item>
        ) : (
          <Trips
            trips={departureTrips}
            selected={departureTicket && departureTicket.id}
            handleSelect={setDepartureTicket}
            handleUnselect={handleUnselectDepartureTicket}
          />
        )}

        {isRoundTrip && (
          <Pane marginTop={majorScale(4)}>
            <TripsTitle from={toName} to={fromName} />

            {isFetchingTrips ? (
              <Item>
                <Spinner />
              </Item>
            ) : (
              <Trips
                trips={returnTrips}
                selected={returnTicket && returnTicket.id}
                handleSelect={setReturnTicket}
                handleUnselect={handleUnselectReturnTicket}
              />
            )}
          </Pane>
        )}
      </>
    );
  };

  const hasSelectedAllTickets = isRoundTrip
    ? departureTicket && returnTicket
    : departureTicket;

  return (
    <div className="Page Page--trips">
      <Header>
        <SearchForm
          formData={queryParams}
          isLoading={isSearchFormLoading}
          onSubmit={handleSearchSubmit}
        />
      </Header>

      <Container>
        {hasFailed ? (
          <ErrorState>
            <Button onClick={fetchTrips}>Try again</Button>
          </ErrorState>
        ) : (
          renderTrips()
        )}

        <Pane textAlign="right" paddingTop={majorScale(4)}>
          <Button
            appearance="primary"
            height={ITEM_HEIGHT}
            iconAfter="arrow-right"
            onClick={handleBookTickets}
            disabled={!hasSelectedAllTickets}
          >
            Confirm and book tickets
          </Button>
        </Pane>
      </Container>
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
