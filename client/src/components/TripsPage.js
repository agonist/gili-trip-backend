import React from "react";
import PropTypes from "prop-types";
import qs from "query-string";
import { Button, Pane } from "evergreen-ui";

import ButtonPrimary from "./ButtonPrimary";
import Container from "./Container";
import ErrorState from "./ErrorState";
import Header from "./Header";
import Item from "./Item";
import PageFooter from "./PageFooter";
import SearchForm from "./SearchForm";
import Small from "./Small";
import TicketOpen from "./TicketOpen";
import TripsContainer from "./TripsContainer";
import TripsEmptyState from "./TripsEmptyState";
import TripsTitle from "./TripsTitle";

import { ITEM_HEIGHT, ITEM_SPACE } from "../constants";
import { fetchTrips } from "../api";

import {
  hasReturn as _hasReturn,
  hasOpenReturn as _hasOpenReturn,
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
    booking_type,
  } = queryParams;

  const [hasFailed, setHasFailed] = React.useState(false);

  const [depTicket, setDepTicket] = React.useState(null);
  const [depTrips, setDepTrips] = React.useState([]);
  const [isFetchingDepTrips, setIsFetchingDepTrips] = React.useState(true);

  const [retTicket, setRetTicket] = React.useState(null);
  const [retTrips, setRetTrips] = React.useState([]);
  const [isFetchingRetTrips, setIsFetchingRetTrips] = React.useState(false);

  const hasReturn = _hasReturn(booking_type);
  const hasOpenReturn = _hasOpenReturn(booking_type);

  const canFetch =
    !!departure_date &&
    (!hasReturn ? true : !!arrival_date) &&
    !!from &&
    !!to &&
    !!quantity &&
    !!booking_type;

  const canBookTickets =
    (!hasReturn && !hasOpenReturn && !!depTicket) ||
    (hasOpenReturn && !!depTicket) ||
    (hasReturn && !!depTicket && !!retTicket);

  const handleBookTickets = () => {
    const data = {
      quantity: +quantity,
      tickets: [
        {
          ...formatTicket(depTicket),
          date: formatDate(departure_date, depTicket.departure_time),
        },
      ],
    };

    if (hasReturn) {
      data.tickets.push({
        ...formatTicket(retTicket),
        date:
          !hasOpenReturn && formatDate(arrival_date, retTicket.departure_time),
      });
    }

    return navigateWithData("/booking", { data });
  };

  const handleFetchError = () => setHasFailed(true);

  const fetchDepTrips = () => {
    const onSuccess = trips => {
      setDepTrips(trips);
      setIsFetchingDepTrips(false);
    };

    if (!isFetchingDepTrips) {
      setIsFetchingDepTrips(true);
    }

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
      booking_type,
      from: to,
      to: from,
    })
      .then(onSuccess)
      .catch(handleFetchError);
  };

  React.useEffect(() => {
    if (canFetch) {
      setHasFailed(false);
      fetchDepTrips();

      if (hasReturn) {
        fetchRetTrips();
      }
    }
  }, [
    arrival_date && arrival_date.toDateString(),
    departure_date && departure_date.toDateString(),
    from,
    to,
    quantity,
    booking_type,
  ]);

  const isSearchFormLoading =
    canFetch && !hasFailed && (isFetchingDepTrips || isFetchingRetTrips);

  const fromName = from && getLocationName(from);
  const toName = to && getLocationName(to);

  const submitButtonProps = {
    height: ITEM_HEIGHT,
    onClick: handleBookTickets,
    disabled: hasReturn ? !depTicket || !retTicket : !depTicket,
  };

  return (
    <div className="Page Page--trips">
      <Header>
        <SearchForm
          formData={queryParams}
          isLoading={isSearchFormLoading}
          onSubmit={handleSearchSubmit}
        />
      </Header>

      {!canFetch && (
        <Container>
          <TripsEmptyState />
        </Container>
      )}

      {hasFailed && (
        <Container>
          <ErrorState>
            <Button onClick={() => window.location.reload()}>Try again</Button>
          </ErrorState>
        </Container>
      )}

      {!hasFailed && canFetch && (
        <Container>
          <Small>Departure trip</Small>
          <TripsTitle from={fromName} to={toName} />

          <TripsContainer
            isFetching={isFetchingDepTrips}
            trips={depTrips}
            ticket={depTicket}
            handleSelect={setDepTicket}
          />

          {!isFetchingDepTrips && (hasReturn || hasOpenReturn) && (
            <Pane paddingTop={ITEM_SPACE}>
              <Small>Arrival trip</Small>
              <TripsTitle from={toName} to={fromName} />

              {hasOpenReturn ? (
                <Item flexDirection="column" padding={0}>
                  <TicketOpen
                    isSelected
                    price={depTrips[0] ? depTrips[0].price : 0}
                  />
                </Item>
              ) : (
                <TripsContainer
                  isFetching={isFetchingRetTrips}
                  trips={retTrips}
                  ticket={retTicket}
                  handleSelect={setRetTicket}
                />
              )}
            </Pane>
          )}
        </Container>
      )}

      {canFetch && (
        <PageFooter
          paddingTop={0}
          rightButton={
            <>
              {!depTicket && (
                <ButtonPrimary {...submitButtonProps}>
                  Select a departure ticket
                </ButtonPrimary>
              )}

              {depTicket && hasReturn && !retTicket && (
                <ButtonPrimary {...submitButtonProps}>
                  Select a return ticket
                </ButtonPrimary>
              )}

              {canBookTickets && (
                <ButtonPrimary {...submitButtonProps} iconAfter="arrow-right">
                  Confirm and continue
                </ButtonPrimary>
              )}
            </>
          }
        />
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
