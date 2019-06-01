import React from "react";
import { extractStyles } from "evergreen-ui";

export default () => ({
  headElements: () => {
    const { css, hydrationScript } = extractStyles();
    const formattedCss = `@charset "utf-8";${css}`;

    return [
      <meta key="meta-charset" charSet="UTF-8" />,
      {
        ...hydrationScript,
        key: "evergreen-hydratation-script",
      },
      <style
        key="evergreen-css"
        id="evergreen-css"
        dangerouslySetInnerHTML={{ __html: formattedCss }}
      />,
    ];
  },
});
