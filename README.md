
# School Locator Application

A full-stack application that allows users to add schools and find nearby schools based on coordinates.

## Stack

- Frontend: React, TypeScript, Tailwind CSS, shadcn/ui
- Backend: Express.js, Node.js

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. Clone the repository
```
git clone <repository-url>
cd school-locator
```

2. Install dependencies for both frontend and backend
```
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

3. Start both servers in development mode
```
npm run dev
```

This will concurrently run:
- Frontend on http://localhost:5173
- Backend on http://localhost:5000

### Production Deployment

To build and run for production:

```
npm run build
npm start
```

This will build the React frontend and serve it via the Express backend.

## API Endpoints

- `GET /api/schools?latitude=<lat>&longitude=<lon>` - Get schools sorted by distance from coordinates
- `POST /api/schools` - Add a new school
