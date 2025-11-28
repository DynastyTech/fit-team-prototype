#!/bin/bash

# Start both frontend and backend servers

echo "🚀 Starting FitTeam E-Commerce..."
echo ""

# Store the root directory
ROOT_DIR=$(pwd)

# Start backend in background
echo "Starting backend server..."
(cd "$ROOT_DIR/backend" && npm run dev) &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 3

# Start frontend in background
echo "Starting frontend server..."
(cd "$ROOT_DIR/frontend" && npm run dev) &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting!"
echo ""
echo "📍 Frontend: http://localhost:5173"
echo "📍 Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID

