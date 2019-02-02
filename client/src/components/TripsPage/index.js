import React from "react";
import PropTypes from "prop-types";
import qs from "query-string";
import { Spinner } from "evergreen-ui";

import Container from "../Container";
import Header from "../Header";
import Item from "../Item";
import SearchForm from "../SearchForm";
import Trips from "../Trips";

import { formatDataForBrowser, navigateWithData } from "../../helpers";
import { fetchTrips } from "../../api";

class TripsPage extends React.Component {
  state = {
    trips: [],
    isLoading: true,
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
    } = this.getFormDataFromURL();

    const {
      arrival_date: nextArrival,
      departure_date: nextDeparture,
      from: nextFrom,
      from: nextTo,
    } = this.getFormDataFromURL(nextProps.location);

    const hasArrivalChanged = currentArrival !== nextArrival;
    const hasDepartureChanged = currentDeparture !== nextDeparture;
    const hasFromChanged = currentFrom || nextFrom;
    const hasToChanged = currentTo || nextTo;

    if (
      hasArrivalChanged ||
      hasDepartureChanged ||
      hasFromChanged ||
      hasToChanged
    ) {
      this.setState(
        {
          isLoading: true,
        },
        this.fetchTrips,
      );
    }
  }

  fetchTrips = () => {
    const params = this.getFormDataFromURL();

    const onFetchTripsSuccess = trips => {
      this.setState({
        trips,
        isLoading: false,
      });
    };

    return fetchTrips(params).then(onFetchTripsSuccess);
  };

  getFormDataFromURL = location => {
    const { location: currentLocation } = this.props;
    const search = location ? location.search : currentLocation.search;
    const urlParams = qs.parse(search);

    return formatDataForBrowser(urlParams);
  };

  render() {
    const { trips, isLoading } = this.state;
    const formData = this.getFormDataFromURL();

    const onSubmit = data =>
      navigateWithData("/trips", {
        data,
        withParams: true,
      });

    return (
      <div className="Page Page--trips">
        <Header>
          <SearchForm
            formData={formData}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
        </Header>

        <Container paddingY="2rem" backgroundColor="#fafafa">
          {isLoading ? (
            <Item>
              <Spinner />
            </Item>
          ) : (
            <Trips trips={trips} />
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
