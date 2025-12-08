# TickSync Frontend

## 1. Project Overview

TickSync is a frontend web application built with **Next.js (Pages Router)** for browsing movies, viewing showtimes, selecting seats in real time, and booking tickets.  
The application integrates with a backend API for movies, bookings, authentication, administration, and payments.

This repository contains **only the frontend codebase**. Backend behavior and API contracts are consumed but not implemented here.

---

## 2. Features

Implemented features based strictly on the codebase:

- Movie browsing with pagination
- Movie filtering by language and genre
- Movie details page with show listings
- Real-time seat availability updates using WebSockets
- Seat selection with lock, release, and booking flows
- Razorpay payment integration
- Booking history for logged-in users
- Detailed booking confirmation page with QR code
- Admin dashboard for viewing entity counts and tabular data
- Authentication-aware navigation (login/logout, admin access)
- Responsive UI with mobile navigation
- Custom error and success alerts using SweetAlert2

**Not specified / not implemented**
- Backend implementation
- Authentication mechanism details
- Role management logic on the backend
- Deployment configuration
- Tests

---

## 3. Tech Stack

### Core
- **Next.js 15 (Pages Router)**
- **React 19**
- **TypeScript**

### Styling
- Tailwind CSS
- SCSS (minimal usage)

### State & Forms
- React Hooks
- react-hook-form
- Zod (schema validation)

### Networking
- Axios
- Native WebSocket API

### UI & Utilities
- SweetAlert2
- AG Grid (Admin dashboard)
- React Paginate
- Lucide Icons
- React Icons
- next-qrcode

### Payments
- Razorpay Checkout SDK (loaded dynamically)

---

## 4. Installation

### Prerequisites
- Node.js `18.x`
- npm (or compatible package manager)

### Steps

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

---

## 5. Configuration

### API Base URL
Defined in:

```typescript
src/HelperData/datavariables.ts
```

```typescript
export const baseURL = "https://localhost:7028";
```

### Environment Variables
The following variable is required for payments:

```env
NEXT_PUBLIC_RAZORPAY_KEY=<your_razorpay_key>
```

No other environment variables are explicitly defined in the repository.

---

## 6. Usage

### Development Server
```bash
npm run dev
```

Runs the app at:

```
http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

### CI
A GitHub Actions workflow is configured to:

- Install dependencies
- Run lint checks
- Build the application on pull requests to main

---

## 7. Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/             # Next.js routes (Pages Router)
├── services/          # API interaction layer
├── hooks/             # Custom React hooks
├── models/            # TypeScript data models
├── schemas/           # Zod validation schemas
├── HelperFunctions/   # Shared utility functions
├── HelperData/        # Static constants
├── styles/            # Global and SCSS styles
```

### Notable Pages
- `/` – Landing page
- `/Movies` – Movie listing with filters
- `/MovieDetails/[movieId]` – Movie details and shows
- `/SeatBooking/[showId]` – Seat selection and booking
- `/UserBooking/[bookingId]` – Ticket confirmation
- `/BookingHistory/[userId]` – User booking history
- `/AdminDashboard` – Admin view (counts and tables)

---

## 8. Development Notes

- Uses Next.js Pages Router, not the App Router
- WebSocket connection auto-reconnects on disconnect
- Seat status updates are applied granularly to avoid full re-renders
- Razorpay SDK is loaded dynamically at runtime
- Authentication context (AuthProvider) wraps the app
- Admin access is role-based (admin role expected)
- Error handling is centralized via SweetAlert2 dialogs

### Known assumptions from code
- Backend supports all referenced REST and WebSocket endpoints
- WebSocket server runs at `wss://localhost:7028/ws`
- Authentication data is stored in cookies

---

## 9. License

Not specified.
