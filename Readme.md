# 🩺 Apollo clone

A Apollo clone showcasing docker with filter and sorting functionality.

---

## 🔧 Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Express + TypeScript + Mongoose
- **Database**: In-memory MongoDB (for demo)
- **Containers**: Docker + Docker Compose

---

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose

### Run the project

```bash
docker compose up --build
```

### Environment Config

To use a real MongoDB (e.g., Atlas), add a .env file in backend/:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
```

### Cleanup

To stop and remove containers

```bash
docker compose down
```
