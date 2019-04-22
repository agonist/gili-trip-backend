export default {
  getRoutes: () => [
    {
      path: "/",
      template: "src/pages/index.js",
    },
    {
      path: "404",
      template: "src/pages/404.js",
    },
  ],

  plugins: ["react-static-plugin-reach-router"],
};
