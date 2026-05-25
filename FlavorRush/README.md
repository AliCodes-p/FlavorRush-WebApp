# FlavorRush

FlavorRush is a food delivery web app built with a React frontend and a Flask backend.

## What it does

- Browse products and search the menu
- View product details
- Add items to a cart
- Sign up and log in with JWT auth
- Track orders and manage a protected dashboard
- Use a responsive UI with dark mode and animations

## Current stack

### Frontend
- React 18
- Vite 5
- React Router DOM
- Tailwind CSS
- Framer Motion
- Zustand
- Axios
- React Hot Toast
- Lucide React

### Backend
- Flask 3
- Flask-CORS
- Flask-JWT-Extended
- PyMongo
- bcrypt
- python-dotenv

## Setup

### Backend

    cd FlavorRush/backend
    python -m venv venv
    venv\\Scripts\\activate
    pip install -r requirements.txt
    cp .env.example .env
    python app.py

### Frontend

    cd FlavorRush/frontend
    npm install
    npm run dev

## Environment

Set these in backend/.env:

- MONGO_URI
- JWT_SECRET
- FLASK_DEBUG
- CORS_ORIGINS

Optional frontend env:

- VITE_API_URL=http://localhost:5000/api

## Main API routes

- POST /api/auth/signup
- POST /api/auth/login
- GET /api/auth/profile
- GET /api/products
- GET /api/products/search?q=
- GET /api/products/:id
- GET /api/cart
- POST /api/cart/add
- POST /api/orders
- GET /api/orders
- GET /api/orders/:id
- GET /api/orders/:id/track

## Notes

- The backend is Flask, not Node.js/Express.
- Payment, address, and favorites endpoints are currently stubbed for frontend compatibility.
- The frontend stores auth data in localStorage and syncs cart data when logged in.
