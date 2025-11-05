# Nexus Nosh

**Smart Dining for Business and Beyond**

Nexus Nosh is a personalized lunch-pairing and restaurant-recommendation experience designed for professionals who want to make every meal productive and enjoyable. It blends personal taste data, social recommendations, and contextual intelligence to help users discover the perfect restaurant for any business meeting or social lunch.

## Features

- 🎯 **Dynamic Dashboard** - Personalized restaurant recommendations based on your taste profile
- 🗺️ **Interactive Map** - Color-coded restaurant pins with live updates
- 🧠 **AI Taste Profile** - Adaptive learning engine that visualizes your preferences
- 👥 **Social Connection** - Connect with friends to see shared favorites and overlap scores
- 📅 **Meeting Mode** - Calendar integration for contextual lunch recommendations

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Maps**: React Map GL (Mapbox)
- **Visualizations**: Recharts
- **Deployment**: Google Cloud App Engine
- **Hosting**: Google Cloud Platform

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Firebase account
- Google Cloud account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bsa717a/nexus-nosh.git
cd nexus-nosh
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Firebase credentials.

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nexus-nosh/
├── components/          # React components
│   ├── Dashboard.tsx   # Main dashboard view
│   ├── MapView.tsx     # Interactive map
│   ├── RestaurantCard.tsx
│   ├── TasteProfileRadar.tsx
│   └── ui/            # Reusable UI components
├── lib/
│   ├── firebase/       # Firebase configuration
│   ├── services/       # Business logic services
│   │   ├── recommendations/
│   │   ├── taste-profile/
│   │   └── calendar/
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── pages/              # Next.js pages
├── styles/             # Global styles
└── public/             # Static assets
```

## Firebase Collections

- `users` - User profiles
- `tasteProfiles` - User preference profiles
- `restaurants` - Restaurant data
- `ratings` - User ratings
- `friendConnections` - Social connections
- `friendRecommendations` - Friend recommendations
- `meetings` - Calendar-linked meetings

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Google Cloud deployment instructions.

Quick deploy:
```bash
npm run build
gcloud app deploy
```

## Development

### Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Lint
```bash
npm run lint
```

## License

MIT

## Contributing

This is a personal project. Contributions and suggestions welcome!
