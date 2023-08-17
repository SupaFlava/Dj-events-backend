module.exports = {
  routes: [
    {
      method: "GET",
      path: "/account/me",
      handler: "event.me",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
