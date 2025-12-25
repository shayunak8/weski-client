# WeSki Hotels App

A hotel search web application built with React, TypeScript, and Vite. The app allows users to search for hotels in ski resorts with real-time streaming results.

## Features

- **Search Form**: Search hotels by destination (ski resort), group size (1-10), and trip dates
- **Real-time Results**: Results are displayed incrementally as they arrive from different suppliers
- **Streaming API**: Uses Server-Sent Events (SSE) to show results as soon as they're available
- **Form Validation**: All fields are mandatory with proper validation
- **Responsive Design**: Optimized for desktop (1920x1080 resolution)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API server running on `http://localhost:3001` (or configure via environment variable)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. (Optional) Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001
```

If not set, the app defaults to `http://localhost:3001`

## Running the Application

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in the terminal)

### Production Build

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── hotel-results/  # Hotel results display component
│   ├── navbar/         # Navigation bar with search form
│   ├── search-form/    # Search form with validation
│   └── ...
├── api/                # API service layer
│   └── api.ts          # Functional API client (supports multiple providers via backend)
├── types/              # TypeScript type definitions
│   └── hotel.types.ts  # Hotel, Resort, SearchParams types
└── App.tsx             # Main application component
```

## API Integration

The app integrates with a backend API that provides:

- `GET /hotels/ski-resorts` - Fetch available ski resorts
- `POST /hotels/search` - Search hotels (streaming SSE endpoint)
- `POST /hotels/search/sync` - Search hotels (synchronous endpoint)

### Search Parameters

- `ski_site`: Resort ID (number)
- `from_date`: Start date in format "DD/MM/YYYY"
- `to_date`: End date in format "DD/MM/YYYY"
- `group_size`: Number of people (1-10)

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **SCSS** - Styling
- **Day.js** - Date manipulation
- **React DatePicker** - Date selection component
- **Radix UI** - Accessible UI primitives

## Code Quality

- TypeScript for type safety
- ESLint for code linting
- Component-based architecture
- Separation of concerns (services, components, types)
- Error handling and loading states
- Form validation

## Architecture

The application is designed with a clean architecture that supports easy integration of additional API providers:

- **Frontend**: React app communicates with a single backend API endpoint
- **Backend**: Aggregates results from multiple hotel suppliers (handles multiple requests for larger rooms)
- **Extensibility**: To add new providers, update the backend - no frontend changes needed
- **Streaming**: Results are streamed in real-time as they arrive from different suppliers
- **Separation of Concerns**: API layer is abstracted, making it easy to swap or extend providers

## Notes

- The app uses streaming SSE to display results as they arrive from different suppliers
- Results are automatically sorted by price (ascending)
- The app handles duplicate hotels and displays them only once
- All form fields are mandatory and validated before submission
- The backend handles multiple API requests (for larger rooms) and aggregates results
- The page starts blank - results only appear after a search is submitted
