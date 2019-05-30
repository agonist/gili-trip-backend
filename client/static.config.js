/* eslint-disable react/prop-types */

import React from "react";
import dotenv from "dotenv";

dotenv.config();

const zendeskScript = (
  <script
    async
    defer
    id="ze-snippet"
    src="https://static.zdassets.com/ekr/snippet.js?key=a025b92c-60b3-464f-9188-11939840dd43"
  />
);

export default {
  extractCssChunks: true,
  inlineCss: true,
  getRoutes: () => [
    {
      path: "/",
      template: "src/pages/index.js",
    },
    {
      path: "/privacy",
      template: "src/pages/privacy.js",
    },
    {
      path: "/terms",
      template: "src/pages/terms.js",
    },
    {
      path: "/your-data",
      template: "src/pages/your-data.js",
    },
    {
      path: "404",
      template: "src/pages/404.js",
    },
    {
      path: "/operators",
      template: "src/pages/operators.js",
    },
    {
      path: "/operator/wahana",
      template: "src/pages/wahana.js",
    },
  ],
  siteRoot: 'https://gilitrip.com',
  plugins: ["react-static-plugin-reach-router"],
  Document: ({ Html, Head, Body, children }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Gilitrip</title>
        {zendeskScript}
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
};
