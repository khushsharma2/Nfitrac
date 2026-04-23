# How to Run the Project


## Backend Setup & Run
1. Navigate to backend directory:  cd cse-4th-year-project/backend  
2. Install dependencies: npm install
3. Start development server: npm run dev

   - Runs on http://localhost:4000
   - Uses ts-node-dev for auto-restart on changes
   - Note: No MongoDB connection (uses JSON file for users: users.json)

## Frontend Setup & Run
1. Open new terminal, navigate to frontend directory: cd cse-4th-year-project/frontend
2. Install dependencies: npm install
3. Start development server: npm run dev
   
   - Runs on http://localhost:3000
   - Vite dev server with React

## Access the App
- Open browser to http://localhost:3000
- Backend API available at http://localhost:4000 (test: http://localhost:4000/welcome)

## Notes
- Backend uses JSON file storage (users.json), no database setup needed
- CORS enabled for frontend communication
- Project uses TypeScript, Express (BE), React + Vite (FE)
- Dev servers auto-reload on file changes
