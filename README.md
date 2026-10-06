# Netflix Clone

A full-featured Netflix clone built with React and Vite, utilizing The Movie Database (TMDB) API for real-time movie and TV show data.

 <!--## Live Demo

[View Live Site](#) <!-- Add your deployment URL here -->

## Features

- Browse popular, trending, and top-rated content
- Search functionality for movies and TV shows
- Responsive design across all devices
- Netflix-inspired UI/UX
- Optimized performance with Vite

## Tech Stack

- React
- Vite
- Tailwind CSS
- TMDB API

## Prerequisites

- Node.js (v14+)
- npm or yarn
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))

## Installation

```bash
# Clone repository
git clone https://github.com/Kimaya07/Netflix-Clone.git
cd netflix-clone

# Install dependencies
npm install

# Configure environment variables
# Create .env file in root directory with:
VITE_API_KEY=your_tmdb_api_key_here

# Start development server
npm run dev
```

Access the app at `http://localhost:5173`

## Build

```bash
npm run build
```

Production build outputs to `dist/` directory.

## Deployment

Compatible with Vercel, Netlify, or GitHub Pages. Remember to configure the `VITE_API_KEY` environment variable in your deployment platform settings.

## Project Structure

```
netflix-clone/
├── src/
│   ├── Components/    # UI components
│   ├── Pages/         # Route components
│   ├── Context/       # State management
│   ├── api.js         # API configuration
│   └── requests.js    # API endpoints
├── public/            # Static assets
└── .env              # Environment variables (gitignored)
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_KEY` | TMDB API authentication key |

## License

MIT License - Educational purposes

## Author

**Kimaya Ambekar**  
GitHub: [@Kimaya07](https://github.com/Kimaya07)

---

Built with React • Vite • Tailwind CSS
