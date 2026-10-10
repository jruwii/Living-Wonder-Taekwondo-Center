# Sending trial bookings to a Google Sheet

When somebody books a free trial on the website, the booking is added as a row
in a Google Sheet. This folder holds the small script that receives it.

Nothing here is installed by npm — `Code.gs` is pasted into Google's own editor.

## One-time setup (about 10 minutes)

### 1. Make the spreadsheet

1. Go to [sheets.new](https://sheets.new) to create a blank spreadsheet.
2. Name it something like **Living Wonder — Trial Bookings**.

You do not need to add any column headings. The script creates a `Bookings` tab
with the headings the first time a booking arrives.

### 2. Add the script

1. In that spreadsheet, open **Extensions → Apps Script**.
2. Delete the sample `function myFunction() {}` that is already there.
3. Copy everything from [`Code.gs`](Code.gs) and paste it in.
4. Press the save icon.

To also get an email for every booking, change this line near the top:

```js
const NOTIFY_EMAIL = 'ruwiitkd@gmail.com';
```

Leaving it as `''` means bookings only go to the sheet.

### 3. Publish it

1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description:** anything, for example `Booking receiver`
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**
4. Click **Deploy**.
5. Google asks you to authorise it. Choose your account, then on the
   "Google hasn't verified this app" screen click **Advanced → Go to (your
   project name)** and **Allow**. This warning is normal for your own scripts.
6. Copy the **Web app URL**. It ends in `/exec`.

> **"Who has access" must be "Anyone".** The website calls this URL without
> anybody being signed in, so "Anyone with Google account" will reject bookings.
> The URL is unguessable, and the script only ever appends rows.

### 4. Point the website at it

In the project root, copy `.env.example` to `.env` and paste the URL in:

```
VITE_BOOKING_ENDPOINT="https://script.google.com/macros/s/AKfy..../exec"
```

Then restart the dev server (`npm run dev`). Vite only reads `.env` at startup.

`.env` is gitignored, so the URL is not committed.

### 5. Check it works

Open the website, book a trial, and watch the row appear in the sheet.

You can also paste the web app URL straight into a browser. It should reply:

```json
{"ok":true,"message":"Living Wonder booking endpoint is running"}
```

## When you deploy the website

`VITE_BOOKING_ENDPOINT` is read when the site is **built**, not when it is
visited. So set it as an environment variable in your host (Netlify, Vercel,
Cloudflare Pages and similar all have a settings page for this) and rebuild.
If it is missing at build time, the forms will show their "please call us"
message instead of saving anything.

## Changing the script later

After editing `Code.gs`, go to **Deploy → Manage deployments**, press the pencil
icon, set **Version** to **New version**, and click **Deploy**. The URL stays the
same. If you create a brand new deployment instead, you get a new URL and must
update `.env`.

## Notes

- The script only ever appends rows. It never reads or deletes anything.
- Bookings are queued with a lock, so two people submitting at the same moment
  cannot overwrite each other.
- Failed sends are logged in the Apps Script editor under **Executions**.
- Google's free quota is far above what a dojang website will use.
