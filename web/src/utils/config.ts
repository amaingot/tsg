const config = {
  IS_PROD: process.env.NODE_ENV === "production",
  NODE_ENV: process.env.NODE_ENV,
  COOKIE_KEY:
    process.env.NODE_ENV === "production"
      ? window.App.COOKIE_KEY
      : process.env.REACT_APP_COOKIE_KEY || "",
  STRIPE_KEY:
    process.env.NODE_ENV === "production"
      ? window.App.STRIPE_KEY
      : process.env.REACT_APP_STRIPE_KEY || "",
};

export default config;
