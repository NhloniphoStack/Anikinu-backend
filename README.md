# AniKinu API

> The robust backend REST API powering the AniKinu anime catalogue and discovery platform.

AniKinu API is built with **Node.js** and **Express**, serving as the communication bridge between the PostgreSQL database and the AniKinu frontend. It handles user authentication, personal watchlist management, and serves high-performance queries for anime discovery, filtering, and curated home-page feeds.

---

## 🚀 Built With

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (Hosted on Neon)
- **Data Source:** AniList GraphQL API (via automated ingestion pipeline)

---

## 🛠️ Core Features

- **RESTful Endpoints:** Clean, structured endpoints for anime catalogue search, filtering, pagination, and details.
- **Data Ingestion Pipeline:** Automated system to fetch, validate, normalize, deduplicate, and upsert anime data from the AniList GraphQL API into PostgreSQL.
- **Authentication & Authorization:** Secure JWT/session-based user registration and login.
- **User Watchlists:** Endpoints to track, update, and manage personal anime progress (Watching, Completed, Plan to Watch, etc.).
- **Curated Feeds:** Optimized database queries for trending, top-rated, recently finished, and upcoming anime.

---

## 🗄️ Database & Data Ingestion

AniKinu decouples the application from the upstream AniList API by using **PostgreSQL** as the single source of truth. 

### Ingestion Pipeline

AniList GraphQL API ──► Fetch ──► Validate ──► Normalize ──► Deduplicate ──► Upsert ──► PostgreSQL

*Anime records use the official `anilist_id` as a unique constraint, ensuring seamless updates without duplicate entries during recurring ingestion cycles.*

---

## 📂 Project Structure

```text
anikinu-api/
├── src/
│   ├── config/        # Database and environment configurations
│   ├── controllers/   # Route logic and handlers
│   ├── middleware/    # Auth and error-handling middleware
│   ├── models/        # Database queries and schemas
│   ├── routes/        # API route definitions
│   ├── services/      # Ingestion pipeline and external API integration
│   └── server.js      # Application entry point
├── .env.example
├── package.json
└── README.md

```

## Getting Started

Prerequisites

- Node.js (v18 recommended)

- PostgreSQL database instance

## Installation & Setup

### Clone the repository:

```bash

git clone [https://github.com/nhloniphoStack/anikinu-api.git](https://github.com/nhloniphoStack/anikinu-api.git)
cd anikinu-api

```

### Install dependencies:

```bash

npm install

```

### Configure environment variables:
Create a .env file in the root directory based on .env.example:
Code snippet

```javascript

PORT=5000
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your_jwt_secret_key

```

### Run the development server:

```bash

    npm run dev
```

## 🚀 Deployment

The API is production-ready and deployed on Render, connected to a cloud PostgreSQL instance hosted on Neon.

## ⚠️ Disclaimer

AniKinu API uses AniList data for discovery, educational, and non-profit purposes. We do not own or claim ownership of any anime data, images, or metadata provided by the AniList GraphQL API. Please check out the official AniList Documentation.

## 👤 Author

    GitHub: [@nhloniphoStack]

## 🚧 Status

AniKinu API is currently a work in progress. Contributions, feature requests, and feedback are welcome!
