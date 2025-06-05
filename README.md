# 🌪️ Disaster Management System

A full-stack web application for real-time disaster monitoring and management. This system helps both the public and administrators take immediate action during natural disasters. Built using MongoDB, Express.js, Node.js, and a custom frontend with 3.js, all services are containerized using Docker.

---

## 🧰 Tech Stack

### 🚀 Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- RESTful APIs

### 🎮 Frontend
- HTML, CSS, JavaScript
- Three.js (for interactive visualizations and mapping)
- Axios for API communication

### 🐳 DevOps
- Docker
- Docker Compose (for orchestrating services)

---

## ✨ Key Features

- 👥 **User Authentication System** (custom implementation using JWT & bcrypt)
- 📍 **Real-Time Disaster Location Mapping** with 3.js
- 📢 **Live Alerts and Updates**
- 🔮 **Disaster Forecasting Module** (optional: via external API or ML microservice)
- 📄 **Admin Panel** to manage users and disaster entries
- 🛠️ **Fully Dockerized** deployment setup

---

## 📁 Project Structure

```bash
disaster-management-system/
├── client/                 # Frontend using 3.js
│   ├── index.html
│   ├── main.js
│   └── ...
├── server/                 # Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── ...
├── docker/
│   ├── Dockerfile.client
│   ├── Dockerfile.server
│   └── nginx.conf
├── docker-compose.yml
└── README.md
