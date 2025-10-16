# Jarurat Care

Jarurat Care is a small React single-page application built with Vite for managing patient records in a simple clinic workflow. It demonstrates routing, modals, client-side state, and common UI patterns for CRUD (create, read, update, delete) operations.

This repository is a frontend prototype intended for demos and small internal tools. It uses React, TailwindCSS, SweetAlert2, and Vite.

## Key features

- Add, view, edit and delete patient records using a modal form
- Client-side routing with React Router
- Responsive layout and accessible form inputs
- Mock patient data for quick demos (see `src/data/mockPatients.js`)
- Alerts and confirmations via SweetAlert2
- Small, focused component structure (see `src/components`)

These extras are described in the "Extending the app" section below so you can implement them quickly.

## Screenshots

Below are four screenshots of the app. When running the app in development the images are served from the `public` folder.

<p float="left">
  <img src="/jarurat-care/public/screenshots/homepage.png" width="45%" />
  <img src="/jarurat-care/public/screenshots/patientssection.png" width="45%" />
</p>

<p float="left">
  <img src="/jarurat-care/public/screenshots/addnewpatients.png" width="45%" />
  <img src="/jarurat-care/public/screenshots/viewdetails.png" width="45%" />
</p>

## Setup (Windows / PowerShell)

1. Install dependencies

```powershell
npm install,
npm install react-router-dom
npm install lucide-react
npm install sweetalert2
npm install tailwindcss @tailwindcss/vite
```

2. Run the dev server (hot-reload)

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
```

These scripts are defined in `package.json`:

- `dev` — starts Vite dev server (HMR)
- `build` — builds production assets

## Project structure (important files)

- `index.html` — Vite entry HTML
- `src/main.jsx` — app bootstrap
- `src/App.jsx` — root app & routes
- `src/AppContext.jsx` — shared state/context
- `src/pages` — page components (Home, Patients, About)
- `src/components` — reusable UI components
- `public/screenshots` — static screenshots (used in README)

## Extending the app (quick recipes)

- Export patients JSON
  - Add a button that reads the patients array from context and creates a blob:

```js
const blob = new Blob([JSON.stringify(patients, null, 2)], {
  type: "application/json",
});
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "patients.json";
a.click();
URL.revokeObjectURL(url);
```

- Theme toggle

  - Save user preference to localStorage and update `document.documentElement.classList` for Tailwind-based theming.

- Keyboard shortcut (open modal)

  - Add a `useEffect` that listens for `keydown` and opens the add-patient modal on `event.key === 'n'`.

- CSV import (stub)
  - Accept a file input, parse CSV (use papaparse), and merge records into the patients state with validation.

## Development notes

- The app uses mock data in `src/data/mockPatients.js`. Replace with a real API by creating a fetch layer in `src/services/api.js` and swapping the data source in `AppContext`.
- ESLint is configured (see `eslint.config.js`) — run `npm run lint` before commits.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Run linting and tests (if added)
4. Open a PR with a clear description of changes

## License

This project is provided as-is for demo and learning purposes. No license file is included by default — add one if you plan to publish.

---

If you'd like, I can also implement one of the suggested extras (export JSON, theme toggle, keyboard shortcut or CSV import) and add a small test for it. Tell me which you'd prefer.
