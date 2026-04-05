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
- keep recent category
- show loading states while data is being fetched


## Main stack

- Next.js
- TypeScript
- CSS Modules
- SWAPI

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

## Notes

- used simple comments only where the code needed a quick reason.
- kept the styling in CSS modules.
- The app uses SWAPI data and turns relation URLs into normal UI sections.

## Author

Pradeep Tamang  
https://pradeeptamang.com.np
