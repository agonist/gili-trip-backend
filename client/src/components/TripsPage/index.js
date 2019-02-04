import React from "react";
import PropTypes from "prop-types";
import qs from "query-string";
import { Button, Pane, Spinner, majorScale } from "evergreen-ui";
import { Link } from "@reach/router";

import Container from "../Container";
import Header from "../Header";
import Item from "../Item";
import SearchForm from "../SearchForm";
import Trips from "../Trips";
import TripsTitle from "../TripsTitle";

import { formatDataForBrowser, navigateWithData } from "../../helpers";
import { fetchTrips } from "../../api";

class TripsPage extends React.Component {
  state = {
    departureTrips: [],
    departureTicket: undefined,
    returnTrips: [],
    returnTicket: undefined,
    isFetchingDepartureTrips: true,
    isFetchingReturnTrips: true,
  };

  componentDidMount() {
    this.fetchDepartureTrips();
    this.fetchReturnTrips();
  }

  componentWillReceiveProps(nextProps) {
    const {
      arrival_date: currentArrival,
      departure_date: currentDeparture,
      from: currentFrom,
      from: currentTo,
    } = this.getParams();

    const {
      arrival_date: nextArrival,
      departure_date: nextDeparture,
      from: nextFrom,
      from: nextTo,
    } = this.getParams(nextProps.location);

    const hasArrivalChanged =
      currentArrival.toISOString() !== nextArrival.toISOString();
    const hasDepartureChanged =
      currentDeparture.toISOString() !== nextDeparture.toISOString();

    const hasFromChanged = currentFrom !== nextFrom;
    const hasToChanged = currentTo !== nextTo;

    if (
      hasArrivalChanged ||
      hasDepartureChanged ||
      hasFromChanged ||
      hasToChanged
    ) {
      this.setState(
        {
          isFetchingDepartureTrips: true,
        },
        this.fetchTrips,
      );
    }
  }

  getParams = location => {
    const { location: currentLocation } = this.props;
    const search = location ? location.search : currentLocation.search;
    const urlParams = qs.parse(search);

    return formatDataForBrowser(urlParams);
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
    const { from, to } = formData;

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
            isLoading={isFetchingDepartureTrips || isFetchingReturnTrips}
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

          {departureTicket && returnTicket && (
            <Pane textAlign="right">
              <Link
                to="/booking"
                state={{
                  tickets: [departureTicket, returnTicket],
                }}
              >
                <Button
                  appearance="primary"
                  height={majorScale(5)}
                  iconAfter="arrow-right"
                >
                  Confirm and book tickets
                </Button>
              </Link>
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
