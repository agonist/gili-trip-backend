import React from "react";

import Header from "../components/Header";
import Popular from "../components/Popular";
import SearchForm from "../components/SearchForm";

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
      <Header>
        <SearchForm formData={formData} onSubmit={onSubmit} />
      </Header>

      <Popular onClick={handlePopularItemClick} />
    </div>
  );
};

export default IndexPage;
