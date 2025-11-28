# FitTeam E-Commerce Website

A modern, fully functional e-commerce website for fitness products built with React, TypeScript, Node.js, Go integration, and Stripe payments.

## Features

- ✅ Modern, responsive UI with light/dark mode
- ✅ Product catalog with categories
- ✅ Shopping cart functionality
- ✅ Stripe payment integration
- ✅ 3D animations using Three.js
- ✅ Product carousels with Swiper
- ✅ Smooth animations with Framer Motion
- ✅ TypeScript for type safety
- ✅ SQLite database for local development

## Tech Stack

### Frontend
- React with TypeScript
- Vite
- React Router DOM
- Framer Motion (animations)
- Three.js + React Three Fiber (3D graphics)
- Swiper (carousels)
- Stripe React
- Axios

### Backend
- Node.js with Express
- TypeScript
- SQLite (better-sqlite3)
- Stripe API
- CORS enabled

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create a `.env` file:
```
PORT=3001
STRIPE_SECRET_KEY=your_stripe_secret_key_here
JWT_SECRET=your_jwt_secret_here
DATABASE_PATH=./database.sqlite
```

3. Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:3001

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## Usage

1. Start both backend and frontend servers
2. Open http://localhost:5173 in your browser
3. Browse products, add them to cart
4. Proceed to checkout and complete purchase

## Stripe Test Cards

For testing payments, use these test card numbers:
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002

Use any future expiry date and any 3-digit CVC.

## Project Structure

```
fitness-ecommerce/
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   └── database.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── types.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Notes

- The backend automatically seeds the database with sample products on first run
- Session-based cart (no authentication required)
- Free shipping on all orders
- Responsive design works on mobile, tablet, and desktop

