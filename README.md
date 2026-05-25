# FlavorRush 🍔🔥

FlavorRush is a modern food delivery web application built with a **React + Vite frontend** and a **Flask backend**. The project provides a responsive and interactive food ordering experience with authentication, cart management, product browsing, and order status tracking.

---

# ✨ Overview

FlavorRush is designed to simulate a complete food ordering platform for customers. The application currently focuses on:

- Browsing featured dishes and the full menu
- Searching and filtering products
- Viewing detailed product pages
- Adding and managing cart items
- User signup and login
- JWT-protected authentication flow
- Order status tracking and dashboard access
- Responsive UI with dark mode and animations

---

# 🛠️ Tech Stack

## Frontend
- React 18
- Vite 5
- React Router DOM
- Tailwind CSS
- Framer Motion
- Zustand
- Axios
- React Hot Toast
- Lucide React

## Backend
- Flask 3
- Flask-CORS
- Flask-JWT-Extended
- PyMongo
- bcrypt
- python-dotenv

## Database
- MongoDB Atlas

---

# 🚀 Features

## Customer Features
- Home page with featured dishes
- Menu page with category filtering and search
- Product detail pages
- Cart management
- User authentication (signup/login)
- Protected dashboard and order tracking routes
- Responsive dark-mode UI
- Animated user interface

## Backend Features
- Flask REST API
- JWT-based authentication
- MongoDB integration
- Product and order handling
- Cart persistence for authenticated users
- Guest cart support
- Optional startup product seeding

---

# 🧱 Project Structure

```text
FlavorRush/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── services/
│   └── utils/
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── components/
│       ├── data/
│       ├── pages/
│       ├── store/
│       └── utils/
│
└── README.md
```

---

# ⚙️ Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/AliCodes-p/FlavorRush-WebApp.git
cd FlavorRush-WebApp
```

---

# 🔹 Backend Setup

```bash
cd backend
python -m venv venv
```

### Activate Virtual Environment (Windows)

```bash
.\venv\Scripts\Activate.ps1
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Create Environment File

Create:

```bash
backend/.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run Backend

```bash
python app.py
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🌍 Frontend Environment Variables (Optional)

Create:

```bash
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 🔗 Main API Endpoints

## Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`
- `POST /api/auth/logout`

## Products
- `GET /api/products`
- `GET /api/products/search?q=`
- `GET /api/products/:id`
- `GET /api/products/:id/reviews`
- `POST /api/products/:id/reviews`

## Cart
- `GET /api/cart`
- `POST /api/cart/add`
- `PUT /api/cart/items/:itemId`
- `DELETE /api/cart/items/:itemId`
- `DELETE /api/cart`

## Orders
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `GET /api/orders/:id/track`
- `POST /api/orders/:id/cancel`

---

# 📱 Frontend Behavior

The frontend uses:
- Axios for API communication
- localStorage for auth token persistence
- Zustand stores for cart and authentication state
- automatic cart synchronization after login/signup

Guests can browse products and use cart functionality locally, while authenticated users sync cart data with the backend.

---

# 📌 Current Status

FlavorRush is currently a working portfolio-level full-stack application with:

- A React frontend
- A Flask backend
- MongoDB integration
- JWT authentication
- Product and order APIs
- Cart persistence
- Responsive modern UI

Some extension endpoints such as payment, address, and favorites currently exist as safe stubs for frontend compatibility.

---

# 🧪 Notes

# 🛠️ Troubleshooting

## Backend Connection Issues
- Verify MongoDB is running
- Confirm `MONGO_URI` is correct
- Check that backend CORS settings allow the frontend origin

## Frontend API Issues
- Ensure backend is running on `http://localhost:5000`
- Verify `VITE_API_URL` is correct
- Ensure frontend origin is allowed by CORS

---

# 📚 Recommended Next Steps

- Connect real payment processing
- Implement complete address and favorites functionality
- Improve admin functionality
- Add testing coverage
- Expand backend validation and error handling

---

# 👨‍💻 Author

Muhammad Ali

GitHub:
https://github.com/AliCodes-p
