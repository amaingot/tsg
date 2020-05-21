const config = {
  STRIPE_KEY:
    process.env.NODE_ENV === "production"
      ? window.App.STRIPE_KEY
      : process.env.REACT_APP_STRIPE_KEY || "",
  COOKIE_KEY:
    process.env.NODE_ENV === "production"
      ? window.App.STRIPE_KEY
      : process.env.REACT_APP_COOKIE_KEY || "",
};

export default config;
