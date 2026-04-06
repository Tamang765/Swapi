# SWAPI Explorer

This project is a small SWAPI Explorer app built with Next.js and TypeScript.
I made it to browse SWAPI data by category, search records, sort results, and
open a detail page for each item.

## What this app does

- browse all main SWAPI categories
- search inside a category
- sort by name or title
- open detail pages
- view related items
- load extra related items only when needed
- keep recent category
- show loading states while data is being fetched

## Rendering

- uses SSR for category and detail routes
- uses App Router (`src/app`)
- detail related items use a small lazy API route for modal expansion
- that API was added to keep the detail UI fast by loading only a preview first, then loading the rest when needed

## State behavior

- active category state uses URL query params (`search`, `sort`, `page`)
- full per-category state is stored in `sessionStorage` (`swapi-category-state`)
- when switching categories, previous search/sort/page is restored from `sessionStorage`
- URL stays clean and does not include other category params
- recent category is stored in cookie (`recentCategory`)

## Main stack

- Next.js
- TypeScript
- CSS Modules
- SWAPI

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Build

```bash
npm run build
npm run start
```

## Project structure

- `src/app`  
  app routes

- `src/components`  
  reusable UI and page parts

- `src/modules`  
  feature logic for category and detail pages

- `src/services`  
  SWAPI fetch functions

- `src/utils`  
  small helper functions

- `src/app/api/resources/[category]`  
  API route used by the app

- `src/app/api/related-items`  
  API route used to load more related detail items on demand and keep the detail UI lighter on first load

## Notes

- used simple comments only where the code needed a quick reason.
- kept the styling in CSS modules.
- The app uses SWAPI data and turns relation URLs into normal UI sections.
- detail pages load a small preview first and fetch the rest only when the user opens `See All`.
- used this API-based lazy loading approach to avoid fetching every related record on first render.

## Accessibility

- keyboard focus styles are enabled
- skip link is included for main content
- loading states are announced and visible
- mobile menu and detail modal support keyboard navigation

## AI usage

- Used AI to explore multiple UI directions and quick layout ideas before implementation.
- Used Google Stitch to create early wireframe concepts.
- Used AI to draft loading skeleton structure and placeholder layout patterns.
- Used AI to generate and refine SVG illustration assets (category and transport visuals).
- Used AI to suggest copy simplification for headings, labels, and helper text.
- Used AI to speed up CSS iteration (spacing, responsive behavior, and visual consistency checks).

## Design reference

This is the design direction I used while building the UI:

![Design concept](./public/design-concept.png)

## Author

Pradeep Tamang  
https://pradeeptamang.com.np
