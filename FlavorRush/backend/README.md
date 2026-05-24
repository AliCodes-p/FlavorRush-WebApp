# FlavorRush Backend (Flask)

Python/Flask REST API for the FlavorRush React frontend. Migrated from Node.js + Express with **compatible API routes** under `/api`.

## Stack

- **Flask** — web framework
- **Flask-CORS** — React frontend support
- **Flask-JWT-Extended** — JWT authentication
- **PyMongo** — MongoDB driver
- **bcrypt** — password hashing (compatible with existing bcryptjs hashes)
- **python-dotenv** — environment variables

## Project structure

```
backend/
├── app.py                 # Application entry point
├── config/
│   └── settings.py        # Environment configuration
├── database/
│   └── connection.py      # MongoDB connection
├── routes/                # Flask Blueprints (API routes)
├── controllers/           # Request handlers
├── services/              # Business logic
├── models/                # Collection constants
├── middleware/            # JWT auth & error handlers
├── utils/                 # Serializers, validators, responses
├── scripts/
│   └── seed_products.py   # Optional DB seed
├── requirements.txt
├── .env.example
└── README.md
```

## Installation

### 1. Prerequisites

- Python 3.10+
- MongoDB (local or MongoDB Atlas)

### 2. Create virtual environment

```bash
cd FlavorRush/backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment variables

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB URI and JWT secret.

### 5. (Optional) Seed products

```bash
python scripts/seed_products.py
```

### 6. Run the server

```bash
python app.py
```

API runs at **http://localhost:5000**

Health check: `GET http://localhost:5000/api/health`

## Frontend connection

No frontend code changes required if using defaults.

| Variable | Default |
|----------|---------|
| `VITE_API_URL` | `http://localhost:5000/api` |

Create `FlavorRush/frontend/.env` only if you change the port:

```
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
cd ../frontend
npm install --legacy-peer-deps
npm run dev
```

## API endpoints (Express-compatible)

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/health` | No |
| POST | `/api/auth/signup` | No |
| POST | `/api/auth/login` | No |
| GET | `/api/auth/profile` | JWT |
| PUT | `/api/auth/profile` | JWT |
| POST | `/api/auth/logout` | JWT |
| GET | `/api/products` | No |
| GET | `/api/products/search?q=` | No |
| GET | `/api/products/:id` | No |
| GET | `/api/cart` | Optional JWT |
| POST | `/api/cart/add` | Optional JWT |
| PUT | `/api/cart/items/:itemId` | Optional JWT |
| DELETE | `/api/cart/items/:itemId` | Optional JWT |
| DELETE | `/api/cart` | Optional JWT |
| POST | `/api/orders` | No |
| GET | `/api/orders` | Optional JWT |
| GET | `/api/orders/:id` | No |
| GET | `/api/orders/:id/track` | No |
| POST | `/api/orders/:id/cancel` | No |

Extended stubs (for `frontend/src/utils/api.js`):

- `/api/payments/*`
- `/api/addresses/*`
- `/api/favorites/*`
- `/api/products/:id/reviews`

## Auth response format

```json
{
  "token": "<jwt>",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

Send token as: `Authorization: Bearer <token>`

## MongoDB collections

Uses the same Mongoose-style names:

- `users`
- `products`
- `orders`
- `carts` (new — optional persisted cart when JWT present)

## Production

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 "app:app"
```

Set strong `JWT_SECRET` and Atlas `MONGODB_URI` in production `.env`.
