# 💬 DS-ChatApp

A real-time chat application built with **React**, **TailwindCSS**, **Socket.io**, and **Express**.  
Users can join chat rooms and exchange messages in real-time with multiple participants.

---

## 🚀 Features

- Real-time chat with **Socket.io**
- Join and chat in **private rooms**
- User-friendly **React** frontend with **TailwindCSS** styling
- Auto-scroll chat window using **react-scroll-to-bottom**
- Simple backend with **Express** and **Socket.io**
- Health check route on `/`
- Automatically reconnects on socket disconnection
- Responsive and clean UI

---

## 🛠️ Tech Stack

- **Frontend**: React, TailwindCSS, Socket.io-client
- **Backend**: Node.js, Express, Socket.io
- **Dependencies**:
  - `react-scroll-to-bottom`
  - `socket.io-client`
  - `express`
  - `socket.io`
  - `cors`

---

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/shkumb1/Simple-DS-ChatApp.git
cd DS-ChatApp 
```

## Backend Setup (Express + Socket.io)

### Install Backend Dependencies

npm install

### Start the Backend Server (Choose your port - Edit it in App.jsx based on your preference port. 8001 is by default)

node server.js 8001

---

## Frontend Setup 

### Navigate to client Folder

cd client

### Install Frontend Dependencies

npm install

### Start the React Frontend

npm run dev

## 🧪 How to Test the Chat App

To fully experience the **real-time chat functionality**, you can simulate multiple users by opening the app in **two separate browsers**.
