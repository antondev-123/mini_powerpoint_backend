# 🧠 Mini PowerPoint Backend

This is the backend API for **Mini PowerPoint**, a Markdown-based slide presentation app. It uses Express and SQLite (via Sequelize) to manage slide data.

## 🔗 Deployed API

- 🌐 API Base: [https://mini-powerpoint-backend.onrender.com](https://mini-powerpoint-backend.onrender.com)

## 🛠 Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | `/slides`           | Fetch all slides         |
| POST   | `/slides`           | Create a new slide       |
| PUT    | `/slides/:id`       | Update a slide           |
| DELETE | `/slides/:id`       | Delete a slide           |
| POST   | `/reset-db?secret=` | Clear all slides (dev only) |

> Make sure to set `RESET_SECRET` as an environment variable for the `/reset-db` route.

## ⚙️ Tech Stack

- Node.js
- Express
- Sequelize (SQLite)
- Render (for deployment)
- CORS

## 📦 Setup

```bash
npm install
node server.js
```

