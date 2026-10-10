# Living Wonder Taekwondo Center

Website for Living Wonder Taekwondo Center in Angeles City, Pampanga, Philippines.
It is a single-page site covering the dojang's programs, instructors, class
timetable, belt system, notices, photo gallery and a free trial booking form.

## Built with

- **React 19** + **TypeScript**
- **Vite 6** for the dev server and production build
- **Tailwind CSS 4** for styling
- **lucide-react** for icons

## Running it locally

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install     # install dependencies (first time only)
npm run dev     # start the dev server on http://localhost:3000
```

Other scripts:

```bash
npm run build     # build for production into dist/
npm run preview   # preview the production build
npm run lint      # type-check with TypeScript
```

## Project structure

```
index.html                   page shell, fonts, meta tags, anti-flash theme script
src/
  main.tsx                   mounts React into #root
  App.tsx                    puts the page sections in order
  index.css                  Tailwind import, fonts, animations, patterns
  context/
    ThemeContext.tsx         dark / light mode, saved in localStorage
  hooks/
    useModal.ts              Escape key, arrow keys and background scroll lock
  services/
    bookings.ts              sends a booking to the Google Sheet
  data/
    taekwondoData.ts         all site content (programs, schedule, staff, FAQs)
  components/
    Navbar.tsx               sticky header and mobile menu
    Hero.tsx                 opening banner
    AboutMaster.tsx          letter from the founder
    InstructorProfiles.tsx   founder spotlight and coaching staff
    Programs.tsx             program cards
    BeltProgression.tsx      white belt to black belt stages
    Schedule.tsx             weekly timetable with filters
    Values.tsx               the six character tenets
    NoticeBoard.tsx          announcements with a detail popup
    GalleryLightbox.tsx      photo grid and fullscreen viewer
    Testimonials.tsx         parent and student reviews
    FAQSection.tsx           question accordion
    ContactAndLocation.tsx   address, map and the main booking form
    Footer.tsx               footer links and contact details
    TrialModal.tsx           popup version of the booking form
    Logo.tsx                 the "LW" logo as an SVG
    formStyles.ts            shared input styling for both forms
google-apps-script/
  Code.gs                    runs on Google, writes bookings into the Sheet
  README.md                  step-by-step setup for the Sheet
```

## A note on the theme

The dark/light choice is stored under the `lw_tkd_theme` key. Two places read it:
`ThemeContext.tsx`, and a small inline script in `index.html` that applies the
theme class before the first paint so the page does not flash white on load.
If you change the storage key or the default theme, update both.

## Editing the content

Nearly all of the text lives in `src/data/taekwondoData.ts` — class times,
instructor bios, notices, testimonials, belt descriptions and FAQs. Updating
the site usually means editing that one file, with no changes to the components.

## Where trial bookings go

Both booking forms (the one in the contact section and the popup) send the
booking to a **Google Sheet**, so the front desk has one running list of
everyone who asked for a free trial.

This needs a one-time setup, described in
[google-apps-script/README.md](google-apps-script/README.md). In short:

1. Create a Google Sheet and paste `google-apps-script/Code.gs` into
   **Extensions -> Apps Script**.
2. Deploy it as a **Web app**, with access set to **Anyone**.
3. Copy `.env.example` to `.env` and put the deployment URL in
   `VITE_BOOKING_ENDPOINT`.

Until that URL is set, the forms will not pretend to work: they show a message
asking the visitor to phone the dojang instead. The same message appears if
Google is unreachable, so a booking is never silently lost.

`VITE_BOOKING_ENDPOINT` is read at **build** time, so set it in your host's
environment variables and rebuild when you deploy.
