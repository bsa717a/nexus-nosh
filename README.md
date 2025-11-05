# Nexus Nosh Demo

A minimal Next.js + Tailwind demo showing:
- Personalized top picks
- Map (Mapbox via `react-map-gl`)
- AI Taste Profile radar chart with **You / Friends / Compare** toggle

## Quick Start

```bash
# 1) Install deps
npm i

# 2) Add Mapbox token
cp .env.local.example .env.local
# edit .env.local and paste your Mapbox Public token

# 3) Run
npm run dev
```

Open http://localhost:3000

## Notes

- The map uses **Mapbox** (easy to switch to MapLibre/OSM if you prefer no token).
- The restaurants & taste data are static demo data; wire them to your backend later.
- Tailwind is configured in `styles/globals.css` and `tailwind.config.js`.
- The radar chart uses **Recharts**.
