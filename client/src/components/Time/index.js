import React from "react";
import PropTypes from "prop-types";
import dateFns from "date-fns";
import { Heading, Text, minorScale } from "evergreen-ui";

const Time = ({ date, title }) => (
  <React.Fragment>
    {title && (
      <Text fontSize={12} textTransform="uppercase">
        {title}
      </Text>
    )}

    <Heading marginTop={minorScale(1)} size={700} fontWeight={400}>
      {dateFns.format(date, "hh:mm")}
    </Heading>
  </React.Fragment>
);

Time.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string,
};

Time.defaultProps = {
  title: null,
};

export default Time;
