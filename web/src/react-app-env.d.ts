/// <reference types="react-scripts" />

interface Window extends Window {
  App: {
    STRIPE_KEY: string;
    FIREBASE_CONFIG: string;
    TENANT_ID: string;
  };
}
