import React from "react";

import Header from "../components/Header";
import Popular from "../components/Popular";
import SearchForm from "../components/SearchForm";
import Tagline from "../components/Tagline";
import TopMenu from "../components/TopMenu";
import { Pane } from "evergreen-ui";

import { navigateWithData } from "../helpers";

const IndexPage = () => {
  const [formData, setFormData] = React.useState({});

  const onSubmit = data =>
    navigateWithData("/trips", {
      data,
      withParams: true,
    });

  const handlePopularItemClick = data => {
    setFormData(data);
  };

  return (
    <div className="Page Page--index">
      <TopMenu/>
      <Header>
        <SearchForm formData={formData} onSubmit={onSubmit} />
      </Header>
      <Tagline />
      <Popular onClick={handlePopularItemClick} />
    </div>
  );
};

export default IndexPage;
