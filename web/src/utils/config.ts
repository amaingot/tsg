const config = {
  IS_PROD: process.env.NODE_ENV === "production",
  NODE_ENV: process.env.NODE_ENV,
  TENANT_ID:
    process.env.NODE_ENV === "production"
      ? window.App.TENANT_ID
      : process.env.REACT_APP_TENANT_ID || "",
  FIREBASE_CONFIG:
    process.env.NODE_ENV === "production"
      ? window.App.FIREBASE_CONFIG
      : process.env.REACT_APP_FIREBASE_CONFIG || "",
  STRIPE_KEY:
    process.env.NODE_ENV === "production"
      ? window.App.STRIPE_KEY
      : process.env.REACT_APP_STRIPE_KEY || "",
};

export default config;
