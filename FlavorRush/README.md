# FlavorRush

FlavorRush is a modern food delivery web application with a React + Vite frontend and a Flask backend. It provides a responsive, interactive food ordering experience with authentication, cart management, product browsing, and order tracking.

## What it does

- Browse products and search the menu
- View product details
- Add items to a cart
- Sign up and log in with JWT auth
- Track orders and manage a protected dashboard
- Responsive UI with dark mode and animations

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

## Recommended versions

- Node: 18+ (for Vite/dev tooling)
- Python: 3.10+ (for Flask and dependencies)

## Setup

Run commands from the project root (the `FlavorRush` folder). Example after cloning:

```bash
git clone https://github.com/AliCodes-p/FlavorRush-WebApp.git
cd FlavorRush
```

### Backend (Linux / macOS)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
cp .env.example .env
pip install -r requirements.txt
python app.py
```

### Backend (Windows PowerShell)

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
copy .env.example .env
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
# optional: set API base
# echo "VITE_API_URL=http://localhost:5000/api" > .env
npm run dev
```

Default ports used by the project:
- Backend: `http://localhost:5000`
- Frontend (Vite): `http://localhost:5173`

If you prefer, copy the example env rather than creating files manually: see [backend/.env.example](backend/.env.example#L1-L8).

## Environment variables

Required backend variables (put in `backend/.env`):

- `MONGO_URI` (MongoDB connection string)
- `JWT_SECRET` (JWT signing secret)

Optional / helpful backend vars present in `.env.example`:

- `FLASK_DEBUG` (development/production toggle)
- `CORS_ORIGINS` (comma-separated allowed origins)
- `STRIPE_SECRET` (if using payments)

Optional frontend env (create `frontend/.env` to override the default API base):

- `VITE_API_URL=http://localhost:5000/api` (the frontend defaults to this if unset)

## Main API routes

Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`
- `POST /api/auth/logout`

Products
- `GET /api/products`
- `GET /api/products/search?q=`
- `GET /api/products/:id`
- `GET /api/products/:id/reviews`
- `POST /api/products/:id/reviews` (authenticated)

Cart
- `GET /api/cart`
- `POST /api/cart/add`
- `PUT /api/cart/items/:itemId`
- `DELETE /api/cart/items/:itemId`
- `DELETE /api/cart`

Orders
- `POST /api/orders` (authenticated)
- `GET /api/orders` (authenticated)
- `GET /api/orders/:id` (authenticated)
- `GET /api/orders/:id/track` (authenticated)
- `POST /api/orders/:id/cancel` (authenticated)

Extensions / extras (addresses, favorites, payments)
- `POST /api/payments/intent` (authenticated)
- `POST /api/payments/confirm` (authenticated)
- `GET/POST/PUT/DELETE /api/addresses` (authenticated)
- `GET/POST/DELETE /api/favorites` (authenticated)

Utility endpoints
- `GET /api/health` — health check (reports DB status)
- `GET/POST /api/database/test` — simple test insert/fetch for DB connectivity

## Frontend behavior

The frontend uses Axios for API calls, `localStorage` for token persistence, and Zustand stores for cart/auth state. The app will automatically synchronize a user's cart after login/signup. Guests can browse and use a local cart which will sync when they authenticate.

## Notes

- Seeding: the backend seeds starter products automatically if the products collection is empty (see `backend/database/seed.py`).
- The payment/address/favorites endpoints are implemented as extensions for frontend compatibility and may be simple stubs.

## Troubleshooting

Backend connection issues
- Verify MongoDB is reachable and `MONGO_URI` is correct
- Check that `backend/.env` values are set
- Confirm `CORS_ORIGINS` includes your frontend origin

Frontend API issues
- Ensure backend is running on `http://localhost:5000`
- Verify `VITE_API_URL` if you are running the backend on a different host/port

