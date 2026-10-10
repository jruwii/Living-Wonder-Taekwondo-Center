/*
 * Sends a trial booking to the Google Sheet.
 *
 * The receiving end is a Google Apps Script web app (see google-apps-script/).
 * Its URL lives in the VITE_BOOKING_ENDPOINT environment variable rather than
 * in the code, so it can be changed without editing any components.
 */

export interface Booking {
  /** Which of the two forms this came from, so the sheet shows the difference */
  source: string;
  name: string;
  phone: string;
  email: string;
  studentAge: string;
  program: string;
  preferredDay: string;
  notes: string;
}

const ENDPOINT = import.meta.env.VITE_BOOKING_ENDPOINT;

/** True when the site has somewhere to send bookings to. */
export const isBookingEndpointConfigured = Boolean(ENDPOINT);

/**
 * Posts one booking. Resolves when the sheet has the row, throws otherwise,
 * so the form can tell the visitor to phone instead of pretending it worked.
 */
export async function sendBooking(booking: Booking): Promise<void> {
  if (!ENDPOINT) {
    throw new Error('No booking endpoint is configured (VITE_BOOKING_ENDPOINT).');
  }

  /*
   * Deliberately no Content-Type header. fetch then labels the body as plain
   * text, which browsers treat as a "simple" cross-origin request and send
   * straight away. Setting application/json would trigger a preflight check
   * that Apps Script does not answer, and the booking would be blocked.
   */
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(booking),
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`The booking service replied with ${response.status}.`);
  }

  // Apps Script returns JSON, but an error page would not, so read it carefully
  const raw = await response.text();
  let result: { ok?: boolean; error?: string };

  try {
    result = JSON.parse(raw);
  } catch {
    throw new Error('The booking service sent back an unexpected reply.');
  }

  if (!result.ok) {
    throw new Error(result.error || 'The booking service could not save this request.');
  }
}
