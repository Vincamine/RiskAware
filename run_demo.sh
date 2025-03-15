#!/bin/bash

# Start the backend server
echo "Starting backend server..."
cd "$(dirname "$0")/backend"
python -m uvicorn main:app --reload &
BACKEND_PID=$!

# Wait for the backend server to start
sleep 2

# Start the frontend server
echo "Starting frontend server..."
cd "$(dirname "$0")/frontend"
npm start &
FRONTEND_PID=$!

# Function to clean up processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Set up trap to catch Ctrl+C
trap cleanup INT

# Keep the script running
echo "RiskAware Demo is running..."
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "Press Ctrl+C to stop all servers"

# Wait for user to press Ctrl+C
wait