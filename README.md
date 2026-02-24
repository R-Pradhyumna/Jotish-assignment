# Jotish ReactJS Assignment

A ReactJS application built as part of the Jotish Frontend Developer Internship assignment.

This application demonstrates:

- Multi-page routing
- API integration with React Query
- Data visualization (Charts & Maps)
- Camera integration using Web APIs
- Clean architecture with feature-based structure
- Error boundaries and robust routing

---

## Tech Stack

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)
![React Router](https://img.shields.io/badge/React_Router-v6-red?logo=reactrouter)
![React Query](https://img.shields.io/badge/React_Query-v5-orange)
![Recharts](https://img.shields.io/badge/Recharts-Charts-green)
![Leaflet](https://img.shields.io/badge/Leaflet-Maps-brightgreen?logo=leaflet)
![pnpm](https://img.shields.io/badge/pnpm-package_manager-yellow?logo=pnpm)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## Features

### Login Page

- Username: `testuser`
- Password: `Test123`
- Client-side validation
- Redirects to main app on success

---

### Employee List

- Fetches data from REST API
- Uses React Query for caching and state management
- Search/filter support (if implemented)
- Clickable employee cards

---

### Employee Details

- Displays selected employee information
- Includes camera capture functionality

---

### Camera Integration

- Uses `navigator.mediaDevices.getUserMedia`
- Captures image via `<canvas>`
- Proper stream cleanup after capture
- Works on:
  - Localhost
  - HTTPS deployments

⚠ Note: Camera requires HTTPS in production.

---

### Photo Result Page

- Displays captured image
- Allows retake/navigation

---

### Analytics (Bar Chart)

- Displays salary of first 10 employees
- Built using Recharts
- Interactive tooltips

---

### Map View

- Displays employee locations on map
- Implemented using Leaflet
- Responsive and mobile-friendly

---

## API Details

**Endpoint:**

https://backend.jotish.in/backend_dev/gettabledata.php

**POST Body:**

{
"username": "test",
"password": "123456"
}

---

## Architecture Decisions

- Feature-based folder structure
- Shared layout shell
- Bottom navigation for primary views
- Lazy-loaded routes for performance
- Global error boundary
- Route-level error handling
- React Query caching with staleTime = 2 minutes

---

## Installation & Setup

### Clone the repository

git clone https://github.com/R-Pradhyumna/Jotish-assignment.git
cd Jotish-assignment

### Install dependencies

pnpm install

### Start development server

pnpm dev

App runs at: http://localhost:5173

---

## Production Build

pnpm build
pnpm preview

---

## Screenshots & Demo

(Include screenshots here)

(Include screen recording link here)

---

## Error Handling

- Global React Error Boundary
- Route-level error handling
- Graceful fallback UI
- Defensive API error messaging

---

## Project Policies

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Security Policy](./Security.md)
- [MIT License](./LICENSE.md)

---

## Author

R Pradhyumna

---
