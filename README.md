# 🛒 Online Shopping Website – MERN Stack

An e-commerce platform built using **React + Vite** on the frontend and **Node.js + Express + MongoDB** on the backend. The project supports multiple user roles: **Customer**, **Seller (Shaller)**, and **Transporter**, with real-time features like cart management, orders, delivery assignment, and role-based dashboards.

---

## ✨ Features

- 👥 **Multi-role Authentication** (Customer, Seller, Transporter)
- 🛍 **Product Listing** – Electronics, Clothes, Shoes
- 🔍 **Search & Filter** products by category
- 🛒 **Cart & Wishlist** system for customers
- 📦 **Order Management** and delivery tracking
- 🚚 **Transporter dashboard** to view and manage assigned deliveries
- 📸 **Product image uploads** via Cloudinary
- 🔒 JWT + Cookie-based authentication

---

## 🚀 Tech Stack

| Frontend       | Backend            | Database | Tools          |
|----------------|--------------------|----------|----------------|
| React + Vite   | Node.js + Express  | MongoDB  | Cloudinary, JWT, Multer, Nodemailer |

---

## 📁 Project Structure

root/
├── client/ # React + Vite frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api/ # Axios API calls
│ │ ├── routes/ # React Router
│ │ ├── context/ # Auth, Cart Context
│ │ └── App.jsx
│ └── vite.config.js
├── server/ # Node.js + Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── middleware/
│ ├── server.js
│ └── .env


---

## 📦 Installation Guide

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas/local
- Cloudinary account (for image uploads)

---

### 🔧 Backend Setup

```bash
cd server
npm install
npm run dev

---

Create .env with the following:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

---

## 💻 Frontend Setup

cd client
npm install
npm run dev

Frontend will run on http://localhost:5173 by default.

---

## 📘 Available Scripts
In the client (React app):

    npm run dev – Starts Vite dev server

    npm run build – Builds for production

    npm run preview – Preview production build

In the server (Express app):

    npm run dev – Starts Express server with nodemon


---

## 🔐 Authentication & Roles
Each user has a role:

    customer

    seller

    transporter

Access is restricted to certain pages and APIs based on these roles using middleware.

🧑‍💻 Author
    Harish Gurjar

    MERN Stack Developer

    GitHub | LinkedIn | Email

📄 License
This project is licensed under the MIT License.