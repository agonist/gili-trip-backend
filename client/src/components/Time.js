import React from "react";
import PropTypes from "prop-types";
import { Heading, Text, minorScale } from "evergreen-ui";

const Time = ({ title, value }) => (
  <React.Fragment>
    {title && (
      <Text fontSize={10} textTransform="uppercase">
        {title}
      </Text>
    )}

    <Heading marginTop={minorScale(1)} size={600} fontWeight={400}>
      {value}
    </Heading>
  </React.Fragment>
);

Time.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Time.defaultProps = {
  title: null,
};

export default Time;
