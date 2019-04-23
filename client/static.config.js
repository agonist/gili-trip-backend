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
      path: "/contact",
      template: "src/pages/contact.js",
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
      template: "src/pages/operators.js"
    },
    {
      path: "/operator/wahana",
      template: "src/pages/wahana.js"
    }
  ],

  plugins: ["react-static-plugin-reach-router"],
};
