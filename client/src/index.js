import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

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
    module.hot.accept("./components/App", () =>
      // eslint-disable-next-line global-require
      render(require("./components/App").default),
    );
  }
}
