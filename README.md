
<p align="center">
  <img src="public/Logo.webp" alt="FinDash Logo" width="120" />
</p>

# FinDash

FinDash is a React + Vite finance dashboard with a custom landing page, local auth flow, animated dashboard experience, transaction management, goal tracking, billing and investment views, and light/dark theme support.

## Features

- Landing page with branded hero section and GSAP-based entrance animation
- Simple local login using `name` and `email` stored in `localStorage`
- Protected app routes for dashboard, transactions, goals, billing, investment, and help
- Dashboard with balance overview, monthly summary, monthly overview, recent transactions, and goals
- Transactions page with:
  - add transaction modal
  - sorting and filtering
  - CSV export
- Goals page with create and fund goal flows
- Investment page with Finnhub-powered stock search and quote tracking
- Help page with developer information
- Theme toggle with persisted light/dark mode
- GSAP motion system with reduced-motion safety


## Authentication Flow

This project uses a lightweight local auth flow:

- users enter `name` and `email` on the login page
- those values are stored in `localStorage`
- protected routes check for the stored user before rendering
- logout clears the stored user and redirects back to login

This is a frontend-only demo flow and is not a production authentication system.

## Data Storage

The app uses `localStorage` for:

- user profile data
- transactions
- goals
- theme preference

Default seed data is loaded for transactions and goals when nothing is present in storage.

## Main Routes

- `/` - landing page
- `/login` - login page
- `/dashboard` - main dashboard
- `/transaction` - transactions page
- `/goals` - goals page
- `/billing` - billing page
- `/investment` - investment page
- `/help` - help/about developer page

## Notes

- The dashboard includes GSAP-based entry animations.
- The balance card intro animation is custom-sequenced on dashboard load.
- Light mode is supported, though some visual areas may still be refined over time.
- Production builds currently show a Vite chunk-size warning because the client bundle is fairly large.
## Tech Stack

- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- GSAP
- Recharts
- Lucide React

## Project Structure

```text
src/
  components/         Shared UI components
  components/investment/
                      Investment page UI sections
  hooks/              Shared React hooks
  pages/              Route-level pages
  utils/              Local storage and formatting helpers
public/
  Logo.webp
  bg_img.webp
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_FINNHUB_KEY=your_finnhub_api_key
```

The investment page uses the Finnhub API for stock search and quote data. If this key is missing, stock search and live quote fetching will be disabled.

### 3. Start the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint

## Developer

Developed by Himanshu Sheetlani, For Zorvyn Task.
