# Task Management REST API (Containerized)

A containerized Node.js & Express REST API for managing tasks, powered by a **PostgreSQL** database and orchestrated with **Docker Compose**.

---

## Quick Start (One Command)

Run the following command in the project root to build and start both the Express API container and the PostgreSQL database container:

```bash
docker compose up
```

*(Or `docker compose up --build` to force a clean rebuild).*

Once started:
- **API Server**: `http://localhost:3000`
- **Swagger Documentation**: `http://localhost:3000/docs`

---

## Environment Variables

Copy `.env.example` to `.env` to configure your environment variables:

```bash
cp .env.example .env
```

| Variable | Description | Default / Example |
| --- | --- | --- |
| `DATABASE_URL` | PostgreSQL connection string | `postgres://postgres:dev@localhost:5432/tasks` |

*Note: Inside Docker Compose, the database host is automatically routed to `db` (`postgres://postgres:dev@db:5432/tasks`).*

---

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Retrieve API metadata and endpoints list |
| `GET` | `/health` | Check API health and PostgreSQL connection status |
| `GET` | `/tasks` | Retrieve all tasks (Optional filter: `?done=true` or `?done=false`) |
| `GET` | `/tasks/:id` | Retrieve a specific task by ID |
| `POST` | `/tasks` | Create a new task (`{"title": "..."}`) |
| `PUT` | `/tasks/:id` | Update an existing task (`{"title": "...", "done": true}`) |
| `PATCH` | `/tasks/:id` | Partially update an existing task |
| `DELETE` | `/tasks/:id` | Delete a task by ID |
| `GET` | `/stats` | Retrieve total, done, and open task count |
| `GET` | `/docs` | Interactive Swagger UI API documentation |

---

## Example Response (`curl -i`)

Here is an example request and response when retrieving tasks from the API:

```bash
curl -i http://localhost:3000/tasks
```

```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 211
Date: Fri, 07 Aug 2026 11:30:00 GMT
Connection: keep-alive

[
  {
    "id": 1,
    "title": "Learn Express.js",
    "done": false
  },
  {
    "id": 2,
    "title": "Build a REST API",
    "done": true
  },
  {
    "id": 3,
    "title": "Practice SQL queries",
    "done": false
  }
]
```

---

## Database Inspection & Screenshot

You can connect directly to the running PostgreSQL container to inspect your schema and data using `psql`:

```bash
docker exec -it assigmenta2-db-1 psql -U postgres -d tasks
```

### PostgreSQL CLI (`\dt` & `SELECT`)

```sql
tasks=# \dt
                           List of relations
 Schema |  Name   | Type  |  Owner   
--------+---------+-------+----------
 public | tasks   | table | postgres
(1 row)

tasks=# SELECT * FROM tasks;
 id |        title         | done 
----+----------------------+------
  1 | Learn Express.js     | f
  2 | Build a REST API     | t
  3 | Practice SQL queries | f
(3 rows)
```

### Database Data Screenshot

![Database Screenshot](image-1.png)
