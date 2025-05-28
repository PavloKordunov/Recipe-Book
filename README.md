Backend Setup:

Install dependencies and configure environment:
cd backend
npm install

Create a .env file in /backend with:
PORT=8080

Start the backend server:
npm run start

Frontend Setup:

cd frontend
npm install

Set up environment variables

Create a .env.local file in /frontend with:
NEXT_PUBLIC_BASE_URL=http://localhost:8080/recipes

Start the frontend server:
npm run dev

Access the Application
Frontend: Open http://localhost:3000

Backend API: Accessible at http://localhost:8080
