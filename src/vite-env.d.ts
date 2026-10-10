/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL of the Google Apps Script web app that records trial bookings */
  readonly VITE_BOOKING_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
