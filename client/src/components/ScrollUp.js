import React from "react";
import PropTypes from "prop-types";

const ScrollUp = ({ children, location }) => {
  React.useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [location.pathname]);

  return children;
};

ScrollUp.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

ScrollUp.defaultProps = {
  location: {
    pathname: "/",
  },
};

export default ScrollUp;
