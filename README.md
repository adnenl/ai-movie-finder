# AI Movie Finder

AI Movie Finder is an interactive web application that helps you discover movies based on your preferences. The app uses AI to recommend similar movies based on your selections.

## Features

- **Movie Search**: Search for movies by title
- **Popular Movies**: Browse a curated list of popular films
- **AI-Powered Recommendations**: Select movies you enjoy to get personalized recommendations
- **Watchlist**: Save movies to your watchlist for future viewing
- **Responsive Design**: Enjoy a seamless experience across desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **AI**: Cloudflare Workers AI with Llama 3.1 for generating recommendations
- **APIs**: TMDB (The Movie Database) API for movie data
- **State Management**: React Context API with localStorage persistence

## How It Works

1. Search for movies or browse from the popular selection
2. Click on movies you like to select them
3. Click "Find Similar Movies" to get AI-generated recommendations
4. Add movies to your watchlist by clicking the eye icon

## Getting Started

```bash
# Clone the repository
git clone https://github.com/adnenl/ai-movie-finder.git

# Install dependencies
cd ai-movie-finder
npm install
# Or if using pnpm
pnpm install

# Set up environment variables
# Create a .env.local file with your TMDB API key:
# NEXT_PUBLIC_API_KEY=your_tmdb_api_key_here

# Run the development server
npm run dev
# Or with pnpm
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app in action.

## Deployment

The frontend is deployed on Vercel, while the recommendation engine runs on Cloudflare Workers. See the `cloudflare` directory for worker code.

### Cloudflare Worker Setup

The project uses Cloudflare Workers for AI-powered recommendations:

1. Navigate to the cloudflare directory
2. Deploy the worker with `npx wrangler deploy`
3. Update the worker URL in your frontend API

## Project Structure

```
ai-movie-finder/
├── src/
│   ├── actions/       # Server actions
│   ├── app/           # Next.js App Router
│   │   ├── api/       # API routes
│   │   └── watchlist/ # Watchlist page
│   ├── components/    # UI components
│   ├── context/       # React context providers
│   ├── hooks/         # Custom React hooks
│   └── types/         # TypeScript type definitions
└── cloudflare/        # Cloudflare Worker code
```

## Note

This project uses client-side localStorage to persist your selected movies and watchlist between sessions.

## License

MIT
