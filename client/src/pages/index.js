import React from "react";

import Header from "../components/Header";
import Popular from "../components/Popular";
import SearchForm from "../components/SearchForm";
import Tagline from "../components/Tagline";

import { BOOKING_TYPES } from "../constants";
import { navigateWithData } from "../helpers";

const IndexPage = () => {
  const [formData, setFormData] = React.useState({});

  const formatData = ({ booking_type, open_return, ...data }) => ({
    ...data,
    booking_type: open_return ? BOOKING_TYPES.OPEN_RETURN : booking_type,
  });

  const onSubmit = data =>
    navigateWithData("/trips", {
      data: formatData(data),
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
