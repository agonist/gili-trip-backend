import React from "react";
import { extractStyles } from "evergreen-ui";

export default () => ({
  headElements: () => {
    const { css, hydrationScript } = extractStyles();
    const formattedCss = `@charset "utf-8";${css}`;

    Object.assign(hydrationScript, {
      key: "evergreen-hydratation-script",
    });

    return [
      <meta key="meta-charset" charSet="UTF-8" />,
      hydrationScript,
      <style
        key="evergreen-css"
        id="evergreen-css"
        dangerouslySetInnerHTML={{ __html: formattedCss }}
      />,
    ];
  },
});
