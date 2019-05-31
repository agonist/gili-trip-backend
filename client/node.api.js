import React from "react";
import { extractStyles } from "evergreen-ui";

export default () => ({
  headElements: elements => {
    const { css, hydrationScript } = extractStyles();
    const formattedCss = `@charset "utf-8";${css}`;

    return [
      <meta key="meta-charset" charSet="UTF-8" />,
      ...elements,
      hydrationScript,
      <style
        key="evergreen-css"
        id="evergreen-css"
        dangerouslySetInnerHTML={{ __html: formattedCss }}
      />,
    ];
  },
});
