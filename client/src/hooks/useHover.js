import React from "react";

const useHover = () => {
  const [isHovering, setIsHovering] = React.useState(false);

  const onMouseEnter = () => setIsHovering(true);
  const onMouseLeave = () => setIsHovering(false);

  return [isHovering, { onMouseEnter, onMouseLeave }];
};

export default useHover;
