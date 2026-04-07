# Appointment Booking Web App

A full-stack appointment booking system built using **React (Vite)** and **Node.js/Express** with PostgreSQL and Prisma ORM.  
The system supports role-based access for Admin, Provider, and Users to manage and book appointments efficiently.

---

## Live Demo
Frontend: https://appointment-booking-psi-teal.vercel.app/
Backend: https://appointment-booking-scgr.onrender.com  

---

##  Features

### Authentication
- User Registration & Login
- JWT-based authentication
- Password hashing using Bcrypt

### Role-Based Access
- **Admin**
  - Manage providers
- **Provider**
  - Create time slots for availability
- **User**
  - View and book available slots

### Appointment System
- Slot creation by providers
- Appointment booking by users
- Role-based access control for APIs

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- Prisma ORM

### Database
- PostgreSQL

### Authentication
- JWT (JSON Web Token)
- Bcrypt

---

## Setup Instructions

### 1. Clone the repository

git clone https://github.com/AdityarajsinhChauhan/appointment_booking.git
```bash
cd appointment-booking
```
### 2.Backend Setup
```bash
cd backend
npm install
```
-create env file:

PORT=5000
DATABASE_URL= ""
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
BCRYPT_SALT_ROUNDS=
FRONTEND_URL="
```bash
npx prisma generate
npx prisma migrate deploy
npm run dev
```
### 3. . Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
-Create .env file::

VITE_API_BASE_URL= "

### Notes
Some UI data is static
Error handling is partially implemented
Some edge-case errors may appear only in console
Loading states and UX improvements are in progress

### Upcoming Improvements
Reschedule and Cancel appointment APIs integration
DTO-based validation improvements
Enhanced error handling system
UI/UX improvements with better loading states
Optimized API response handling

### Project Highlights
Full role-based authentication system
Real-world booking workflow
Clean separation of frontend and backend
Scalable REST API structure
PostgreSQL with Prisma ORM integration
