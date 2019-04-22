import React from "react";
import { Heading } from "evergreen-ui";

const NotFoundPage = () => {
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setIsReady(true);
  }, []);

  return isReady ? (
    <div className="Page Page--notFound">
      <Heading>Oh no!</Heading>
    </div>
  ) : null;
};

export default NotFoundPage;
