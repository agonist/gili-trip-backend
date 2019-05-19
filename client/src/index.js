import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";

import "react-day-picker/lib/style.css";
import "./index.css";

import App from "./components/App";

const { SENTRY_DSN } = process.env;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
  });

  Sentry.configureScope(scope => {
    scope.setTag("front", true);
  });
}

export default App;

if (typeof document !== "undefined") {
  const renderMethod = module.hot
    ? ReactDOM.render
    : ReactDOM.hydrate || ReactDOM.render;

  const render = Comp => {
    renderMethod(<Comp />, document.getElementById("root"));
  };

  render(App);

  if (module.hot) {
    module.hot.accept("./components/App.js", () =>
      // eslint-disable-next-line global-require
      render(require("./components/App.js").default),
    );
  }
}
