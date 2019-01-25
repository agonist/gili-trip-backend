import React from "react";
import { Pane, Spinner } from "evergreen-ui";

import { defaultHeight, navigateWithFormData } from "../constants";
import Header from "../components/Header";
import Popular from "../components/Popular";
import SearchForm from "../components/SearchForm";

import { fetchLocations } from "../api";

class HomePage extends React.Component {
  state = {
    locations: [],
    searchFormData: {},
    isLoading: true,
  };

  componentDidMount() {
    const onSuccess = locations => {
      this.setState({
        locations,
        isLoading: false,
      });
    };

    fetchLocations().then(onSuccess);
  }

  handlePopularItemClick = formData => {
    this.setState({ searchFormData: formData });
  };

  render() {
    const { locations, searchFormData, isLoading } = this.state;

    return (
      <div className="App">
        <Header locations={locations}>
          {isLoading ? (
            <Pane display="flex">
              <Spinner size={defaultHeight} />
            </Pane>
          ) : (
            <SearchForm
              formData={searchFormData}
              locations={locations}
              onSubmit={navigateWithFormData}
            />
          )}
        </Header>

        <Popular onClick={this.handlePopularItemClick} />
      </div>
    );
  }
}

export default HomePage;
