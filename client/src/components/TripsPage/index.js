import React from "react";
import PropTypes from "prop-types";
import qs from "query-string";
import { Button, Pane, Spinner, majorScale } from "evergreen-ui";

import Container from "../Container";
import Header from "../Header";
import Item from "../Item";
import SearchForm from "../SearchForm";
import Trips from "../Trips";
import TripsTitle from "../TripsTitle";

import { TRAVEL_TYPES } from "../../constants";
import { formatDataForBrowser, navigateWithData } from "../../helpers";
import { fetchTrips } from "../../api";

const initialState = {
  departureTrips: [],
  departureTicket: undefined,
  returnTrips: [],
  returnTicket: undefined,
  isFetchingDepartureTrips: true,
  isFetchingReturnTrips: true,
};

class TripsPage extends React.Component {
  state = {
    ...initialState,
  };

  componentDidMount() {
    this.fetchTrips();
  }

  componentWillReceiveProps(nextProps) {
    const {
      arrival_date: currentArrival,
      departure_date: currentDeparture,
      from: currentFrom,
      from: currentTo,
      travel_type: currentTravelType,
    } = this.getParams();

    const {
      arrival_date: nextArrival,
      departure_date: nextDeparture,
      from: nextFrom,
      from: nextTo,
      travel_type: nextTravelType,
    } = this.getParams(nextProps.location);

    const hasArrivalChanged =
      currentArrival.toISOString() !== nextArrival.toISOString();

    const hasDepartureChanged =
      currentDeparture.toISOString() !== nextDeparture.toISOString();

    const hasFromChanged = currentFrom !== nextFrom;
    const hasToChanged = currentTo !== nextTo;
    const hasTravelTypeChanged = currentTravelType !== nextTravelType;

    if (
      hasArrivalChanged ||
      hasDepartureChanged ||
      hasFromChanged ||
      hasToChanged ||
      hasTravelTypeChanged
    ) {
      this.fetchTrips();
    }
  }

  getParams = location => {
    const { location: currentLocation } = this.props;
    const search = location ? location.search : currentLocation.search;
    const urlParams = qs.parse(search);

    return formatDataForBrowser(urlParams);
  };

  fetchTrips = () => {
    this.setState(
      {
        ...initialState,
      },
      () => {
        const { travel_type } = this.getParams();

        const isRoundTrip = travel_type === TRAVEL_TYPES.ROUND;
        this.fetchDepartureTrips();

        if (isRoundTrip) {
          this.fetchReturnTrips();
        }
      },
    );
  };

  fetchDepartureTrips = () => {
    const params = this.getParams();

    const onSuccess = trips => {
      this.setState({
        departureTrips: trips,
        isFetchingDepartureTrips: false,
      });
    };

    return fetchTrips(params).then(onSuccess);
  };

  fetchReturnTrips = () => {
    const { from, to, ...params } = this.getParams();

    const onSuccess = trips => {
      this.setState({
        returnTrips: trips,
        isFetchingReturnTrips: false,
      });
    };

    return fetchTrips({
      from: to,
      to: from,
      ...params,
    }).then(onSuccess);
  };

  handleSelectDepartureTicket = ticket => {
    this.setState({
      departureTicket: ticket,
    });
  };

  handleSelectReturnTicket = ticket => {
    this.setState({
      returnTicket: ticket,
    });
  };

  handleBookTickets = () => {
    const { departureTicket, returnTicket } = this.state;
    const { travel_type } = this.getParams();
    const isRoundTrip = travel_type === TRAVEL_TYPES.ROUND;

    const data = {
      tickets: [departureTicket],
    };

    if (isRoundTrip) {
      data.tickets.push(returnTicket);
    }

    return navigateWithData("/booking", {
      data,
    });
  };

  render() {
    const {
      departureTrips,
      departureTicket,
      returnTrips,
      returnTicket,
      isFetchingDepartureTrips,
      isFetchingReturnTrips,
    } = this.state;

    const formData = this.getParams();
    const { travel_type, from, to } = formData;
    const isRoundTrip = travel_type === TRAVEL_TYPES.ROUND;

    const isSearchFormLoading = isRoundTrip
      ? isFetchingDepartureTrips || isFetchingReturnTrips
      : isFetchingDepartureTrips;

    const hasSelectedAllTickets = isRoundTrip
      ? departureTicket && returnTicket
      : departureTicket;

    const handleSearchSubmit = data =>
      navigateWithData("/trips", {
        data,
        withParams: true,
      });

    return (
      <div className="Page Page--trips">
        <Header>
          <SearchForm
            formData={formData}
            isLoading={isSearchFormLoading}
            onSubmit={handleSearchSubmit}
          />
        </Header>

        <Container>
          <TripsTitle from={from} to={to} />

          {isFetchingDepartureTrips ? (
            <Item>
              <Spinner />
            </Item>
          ) : (
            <Trips
              trips={departureTrips}
              selected={departureTicket && departureTicket.id}
              handleSelect={this.handleSelectDepartureTicket}
            />
          )}

          {isRoundTrip && (
            <Pane marginTop={majorScale(4)}>
              <TripsTitle from={to} to={from} />

              {isFetchingReturnTrips ? (
                <Item>
                  <Spinner />
                </Item>
              ) : (
                <Trips
                  trips={returnTrips}
                  selected={returnTicket && returnTicket.id}
                  handleSelect={this.handleSelectReturnTicket}
                />
              )}
            </Pane>
          )}

          {hasSelectedAllTickets && (
            <Pane textAlign="right">
              <Button
                appearance="primary"
                height={majorScale(5)}
                iconAfter="arrow-right"
                onClick={this.handleBookTickets}
              >
                Confirm and book tickets
              </Button>
            </Pane>
          )}
        </Container>
      </div>
    );
  }
}

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
