import React from "react";

import Header from "../components/Header";
import Popular from "../components/Popular";
import SearchForm from "../components/SearchForm";
import Tagline from "../components/Tagline";

import { navigateWithData } from "../helpers";

const IndexPage = () => {
  const [formData, setFormData] = React.useState({});

  const onSubmit = data =>
    navigateWithData("/trips", {
      data,
      withParams: true,
    });

  const handlePopularItemClick = to => {
    setFormData({ to });
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="Page Page--index">
      <Header>
        <SearchForm formData={formData} onSubmit={onSubmit} />
      </Header>
      <Tagline />
      <Popular onClick={handlePopularItemClick} />
    </div>
  );
};

export default IndexPage;
