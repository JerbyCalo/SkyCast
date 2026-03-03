# SkyCast 🌤️

A clean, aesthetic weather app built with React + Vite. Get real-time weather conditions, a 7-day forecast, and hourly breakdowns for any city in the world — all wrapped in smooth animations and dynamic gradient backgrounds.

## Live Demo

https://skycast-byjc.vercel.app/

## Features

- **Live weather** — current temperature, condition, and wind speed
- **7-day forecast** — high/low temps with condition icons
- **Hourly breakdown** — click any forecast day to see hour-by-hour weather in a modal
- **City search** — debounced input with instant Enter-key support
- **Geolocation** — "Use My Location" button with graceful permission handling
- **Unit toggle** — switch between °C and °F with a smooth animated pill
- **Dynamic backgrounds** — gradient changes based on current weather condition
- **Framer Motion animations** — fade, slide, stagger, and spring transitions throughout
- **Fully responsive** — optimized for mobile (375px), tablet, and desktop

## Tech Stack

| Layer       | Technology                                                |
| ----------- | --------------------------------------------------------- |
| Framework   | React 18 + Vite                                           |
| Styling     | Tailwind CSS v3                                           |
| Animations  | Framer Motion                                             |
| Icons       | Lucide React                                              |
| HTTP        | Axios                                                     |
| Toasts      | React Hot Toast                                           |
| Weather API | [Open-Meteo](https://open-meteo.com/) (free, no key)      |
| Geocoding   | [OpenCage](https://opencagedata.com/) (free key required) |

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/skycast.git
cd skycast
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
VITE_OPENCAGE_API_KEY=your_opencage_api_key_here
```

Get a free key at [opencagedata.com](https://opencagedata.com/).

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
```

The output will be in the `/dist` folder, ready to deploy to Vercel or Netlify.

## Project Structure

```
src/
├── api/
│   ├── weatherApi.js       # Open-Meteo fetch
│   └── geocodeApi.js       # OpenCage city → coords
├── components/
│   ├── SearchBar.jsx        # Debounced search + geolocation button
│   ├── WeatherCard.jsx      # Current conditions card
│   ├── ForecastRow.jsx      # Single forecast day row
│   ├── ForecastPanel.jsx    # 7-day forecast list
│   ├── HourlyModal.jsx      # Hourly weather modal
│   ├── WeatherBackground.jsx# Dynamic gradient backdrop
│   ├── UnitToggle.jsx       # °C / °F toggle
│   └── LoadingSpinner.jsx   # Loading state
├── hooks/
│   └── useWeather.js        # All weather state & logic
└── utils/
    ├── weatherCodes.js      # WMO code → label + icon
    └── formatters.js        # Date formatting, unit helpers
```

## Developer

Built by **Jerby B. Calo**
