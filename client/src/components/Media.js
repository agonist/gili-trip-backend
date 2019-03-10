import React from "react";
import Media from "react-media";

const Mobile = props => <Media query={{ maxWidth: 599 }} {...props} />;
const Tablet = props => (
  <Media query={{ minWidth: 599, maxWidth: 1024 }} {...props} />
);
const Desktop = props => <Media query={{ minWidth: 1024 }} {...props} />;

export { Mobile, Tablet, Desktop };
