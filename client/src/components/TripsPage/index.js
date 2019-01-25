import React from "react";
import PropTypes from "prop-types";
import qs from "query-string";
import { Pane, Spinner } from "evergreen-ui";

import Container from "../Container";
import Header from "../Header";
import Item from "../Item";
import SearchForm from "../SearchForm";
import Trips from "../Trips";

import {
  defaultHeight,
  formatFormDataForBrowser,
  navigateWithFormData,
} from "../../constants";

import { fetchLocations, fetchTrips } from "../../api";

class TripsPage extends React.Component {
  state = {
    locations: [],
    trips: [],
    isLoadingLocations: true,
    isLoadingTrips: true,
  };

  componentDidMount() {
    const params = this.getFormDataFromURL();

    const onFetchTripsSuccess = trips => {
      this.setState({
        trips,
        isLoadingTrips: false,
      });
    };

    const onFetchLocationsSuccess = locations => {
      this.setState({
        locations,
        isLoadingLocations: false,
      });
    };

    fetchLocations().then(onFetchLocationsSuccess);
    fetchTrips(params).then(onFetchTripsSuccess);
  }

  getFormDataFromURL = () => {
    const { location } = this.props;
    const urlParams = qs.parse(location.search);
    return formatFormDataForBrowser(urlParams);
  };

  render() {
    const { locations, trips, isLoadingLocations, isLoadingTrips } = this.state;
    const formData = this.getFormDataFromURL();

    return (
      <div className="App">
        <Header locations={locations}>
          {isLoadingLocations ? (
            <Pane display="flex">
              <Spinner size={defaultHeight} />
            </Pane>
          ) : (
            <SearchForm
              formData={formData}
              isLoading={isLoadingTrips}
              locations={locations}
              onSubmit={navigateWithFormData}
            />
          )}
        </Header>

        <Container paddingY="2rem" backgroundColor="#fafafa">
          {isLoadingTrips ? (
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
  }).isRequired,
};

export default TripsPage;
