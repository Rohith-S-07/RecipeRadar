# 🍽️ RecipeRadar

**RecipeRadar** is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to explore, share, and manage recipes. It features authentication, category-based filtering, tag search, YouTube video integration, and a real-time group chat for culinary collaboration.

## 📁 Project Structure

```
RecipeRadar/
├── client/     # React frontend using Vite
├── server/     # Express backend with MongoDB
└── README.md   # Project documentation
```

## 🚀 Features

- User authentication with JWT
- Add, view, and search recipes
- Filter by category and tags
- Upload recipe images and optional video links
- Group chat with real-time updates
- Admin dashboard for platform management

## 🛠️ Installation Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (v18 or later)
- npm (v9 or later)
- MongoDB Atlas or a local MongoDB instance

## 📦 Backend Setup (Server)

1. Navigate to the server directory:

```bash
cd RecipeRadar/server
```

2. Install backend dependencies:

```bash
npm install
```

3. Create a `.env` file in the `server` folder and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server:

```bash
npm run server
```

The server should be running at: http://localhost:5000

## 🌐 Frontend Setup (Client)

1. Navigate to the client directory:

```bash
cd RecipeRadar/client
```

2. Install frontend dependencies:

```bash
npm install
```

3. Create a `config.js` file inside `client/src` folder:

```js
// src/config.js
const BASE_URL = "http://localhost:5000";
export default BASE_URL;
```

4. Start the frontend development server:

```bash
npm run dev
```

Frontend should be running at: http://localhost:5173


## 📄 License

This project is licensed under the MIT License.

## 🙌 Acknowledgements

- MongoDB Atlas
- React
- Bootstrap
- LottieFiles