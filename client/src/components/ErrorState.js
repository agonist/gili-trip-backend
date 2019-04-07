import React from "react";
import PropTypes from "prop-types";
import { Icon, Pane, Text, majorScale } from "evergreen-ui";

import Item from "./Item";

const ErrorState = ({ children }) => (
  <Item display="block">
    <Pane display="flex" justifyContent="center" alignItems="center">
      <Icon icon="error" color="danger" marginRight={majorScale(1)} />
      <Text>Something went wrong</Text>
    </Pane>
    {children && (
      <Pane
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingTop={majorScale(1)}
      >
        <div>{children}</div>
      </Pane>
    )}
  </Item>
);

ErrorState.propTypes = {
  children: PropTypes.node,
};

ErrorState.defaultProps = {
  children: undefined,
};

export default ErrorState;
