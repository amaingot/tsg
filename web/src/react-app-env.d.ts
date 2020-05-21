/// <reference types="react-scripts" />

interface Window extends Window {
  App: {
    STRIPE_KEY: string;
    COOKIE_KEY: string;
  };
}
