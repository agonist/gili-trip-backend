import React from "react";

import Header from "../components/Header";
import Popular from "../components/Popular";
import SearchForm from "../components/SearchForm";

import { navigateWithData } from "../helpers";

class IndexPage extends React.Component {
  state = {
    searchFormData: {},
  };

  handlePopularItemClick = formData => {
    this.setState({ searchFormData: formData });
  };

  render() {
    const { searchFormData } = this.state;

    const onSubmit = data =>
      navigateWithData("/trips", {
        data,
        withParams: true,
      });

    return (
      <div className="Page Page--index">
        <Header>
          <SearchForm formData={searchFormData} onSubmit={onSubmit} />
        </Header>

        <Popular onClick={this.handlePopularItemClick} />
      </div>
    );
  }
}

export default IndexPage;
