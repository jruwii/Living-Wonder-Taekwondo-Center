/*
 * Living Wonder Taekwondo Center — trial booking receiver.
 *
 * This runs on Google's servers, not in the website. It takes the booking that
 * the website sends and adds it as a row in the spreadsheet, so the front desk
 * has one running list of everyone who asked for a free trial.
 *
 * Setup instructions are in google-apps-script/README.md.
 */

// Tab inside the spreadsheet that the bookings are written to.
// It is created automatically the first time a booking arrives.
const SHEET_NAME = 'Bookings';

// Put an address here to also get an email for every booking.
// Leave it as '' to only write to the sheet.
const NOTIFY_EMAIL = '';

const COLUMNS = [
  'Received',
  'Form',
  'Name',
  'Mobile / WhatsApp',
  'Email',
  'Student age',
  'Program or slot',
  'Preferred day',
  'Notes',
];

/** Called by the website when somebody submits a booking form. */
function doPost(e) {
  // One booking at a time, so two people submitting together cannot
  // overwrite each other's row.
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return respond_({ ok: false, error: 'No booking data was received' });
    }

    const booking = JSON.parse(e.postData.contents);

    // Name and a way to contact them back are the only things we insist on
    if (!booking.name || (!booking.phone && !booking.email)) {
      return respond_({ ok: false, error: 'Missing a name or contact details' });
    }

    getSheet_().appendRow([
      new Date(),
      booking.source || '',
      booking.name || '',
      booking.phone || '',
      booking.email || '',
      booking.studentAge || '',
      booking.program || '',
      booking.preferredDay || '',
      booking.notes || '',
    ]);

    notify_(booking);

    return respond_({ ok: true });
  } catch (error) {
    // Logged under Executions in the Apps Script editor
    console.error(error);
    return respond_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

/** Opening the web app URL in a browser shows this, handy for checking it is live. */
function doGet() {
  return respond_({ ok: true, message: 'Living Wonder booking endpoint is running' });
}

/** Finds the bookings tab, creating it with a header row the first time. */
function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/** Optional email alert so a booking is not missed if nobody checks the sheet. */
function notify_(booking) {
  if (!NOTIFY_EMAIL) {
    return;
  }

  const lines = [
    'New free trial request from the website.',
    '',
    'Name:          ' + (booking.name || '-'),
    'Mobile:        ' + (booking.phone || '-'),
    'Email:         ' + (booking.email || '-'),
    'Student age:   ' + (booking.studentAge || '-'),
    'Program:       ' + (booking.program || '-'),
    'Preferred day: ' + (booking.preferredDay || '-'),
    'Notes:         ' + (booking.notes || '-'),
  ];

  try {
    MailApp.sendEmail(NOTIFY_EMAIL, 'New trial booking: ' + (booking.name || 'Website'), lines.join('\n'));
  } catch (error) {
    // The row is already saved, so a failed email must not fail the booking
    console.error('Could not send the notification email: ' + error);
  }
}

/** Replies with JSON the website can read. */
function respond_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
