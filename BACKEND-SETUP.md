# DealMantra V2.1 — Backend Foundation

This version adds a small Node.js API using only built-in Node modules, so there are no npm dependencies to install.

## Requirements
- Node.js 18 or newer

## Run locally
Open a terminal in the project folder and run:

```bash
npm start
```

Then open:

http://localhost:3000/

## API endpoints
- GET `/api/health` — server check
- GET `/api/bootstrap` — deals, gift cards, categories, brands and local businesses
- GET `/api/deals`
- GET `/api/gift-cards`
- GET `/api/businesses`
- GET `/api/admin/stats`
- POST `/api/admin/deals` — development admin endpoint
- PUT `/api/admin/deals/:id` — development admin endpoint
- DELETE `/api/admin/deals/:id` — development admin endpoint

## Important
This is a **development foundation**, not a production-ready backend. There is no real authentication, payment processing, affiliate provider integration, gift-card provider integration, or database yet. Those will be added in later phases.
