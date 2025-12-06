#  Vehicle Rental Management System (Backend)

A complete backend API for managing vehicles, bookings, users, and role-based access control.  
Built with **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, and **JWT Authentication**.

---

##  Live API URL
**Live URL:** https://vehicle-rental-system-server.vercel.app/

---

##  Features

###  User Management
- User registration & login
- JWT-based authentication
- Role-based access (admin, customer)

###  Vehicle Management
- Add, update & delete vehicles (Admin only)
- Vehicle name, type, daily rent price, status, registration number
- Endpoints:
  - `/api/v1/vehicle/` **add** <br>
  - `/api/v1/vehicle/:id/` **update** <br>
  - `/api/v1/vehicle/:id/` **delete** <br>

###  Booking System
- Customers can book vehicles
- Validates availability
- Calculates total price automatically
- Updates vehicle status after booking
- Customers can cancel before start date
- Admin can mark booking as returned
- System prevents invalid actions

###  Security
- Encrypted passwords
- JWT authentication
- Role-based middleware

---

##  Technology Stack

| Layer | Technology |
|-------|-------------|
| Language | TypeScript |
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM / Query | pg (node-postgres) |
| Auth | JWT |
| Deployment | Vercel |

---

##  Setup & Usage Instructions

### 1. Clone the Repository
```sh
git clone https://github.com/osmangonirabbi13/vehicle-rental-system-server.git
cd your-repo-name
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Environment Variables
Create a `.env` file:

```
CONNECTION_STR=postgresql://neondb_owner:<password>@<host>.pooler.<region>.neon.tech/<db>?sslmode=require
PORT=5000
JWT_SECRET="YOUR_JWT_SECRET_KEY"
```

### 4. Run the Server
```sh
npm run dev
```

### 5. API Base URL
```
http://localhost:5000/api/v1
```

---

## 📦 GitHub Repository
https://github.com/osmangonirabbi13/vehicle-rental-system-server.git

## 🌍 Live Deployment
https://vehicle-rental-system-server.vercel.app/
