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
  plugins: [
    [
      "react-static-plugin-google-tag-manager",
      {
        id: "UA-142049353-1",
      },
    ],
    ["react-static-plugin-reach-router"],
  ],
  productionSourceMaps: true,
  Document: ({ Html, Head, Body, children }) => (
    <Html lang="en-US">
      <Head>
        <meta key="meta-charset" charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Gilitrip</title>
        {zendeskScript}
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
};
