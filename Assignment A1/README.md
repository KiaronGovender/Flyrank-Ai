# Task API

A simple RESTful Task API built with **Node.js** and **Express.js**. This project demonstrates the fundamentals of building a backend API, including CRUD operations, request validation, and interactive API documentation using **Swagger UI** and the **OpenAPI Specification**.

## Features

- Create, Read, Update, and Delete (CRUD) tasks
- RESTful API design
- JSON request and response handling
- Interactive API documentation with Swagger UI
- OpenAPI 3.0 specification
- Health check endpoint

## Tech Stack

- Node.js
- Express.js
- Swagger UI Express
- OpenAPI 3.0

## Project Structure

```text
.
├── index.js
├── openapi.json
├── package.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/KiaronGovender/Flyrank-Ai.git
```

Navigate into the project directory:

```bash
cd Assignment A1
```

Install dependencies:

```bash
pnpm install
```

## Running the API

Start the server:

```bash
pnpm start
```

The server will be available at:

```text
http://localhost:3000
```

## API Documentation

Swagger UI is available at:

```text
http://localhost:3000/docs
```

The interactive documentation allows you to:

- View every endpoint
- Inspect request and response schemas
- Test endpoints directly from your browser
- Explore the OpenAPI specification

## Endpoints

| Method | Endpoint      | Description             |
| ------ | ------------- | ----------------------- |
| GET    | `/`           | API information         |
| GET    | `/health`     | Health check            |
| GET    | `/tasks`      | Retrieve all tasks      |
| GET    | `/tasks/{id}` | Retrieve a task by ID   |
| POST   | `/tasks`      | Create a new task       |
| PUT    | `/tasks/{id}` | Update an existing task |
| DELETE | `/tasks/{id}` | Delete a task           |

## Example Task

```json
{
  "id": 1,
  "title": "Learn Express",
  "done": false
}
```

## Example Request

**POST** `/tasks`

```json
{
  "title": "Learn Swagger"
}
```

## Example Response

```json
{
  "id": 4,
  "title": "Learn Swagger",
  "done": false
}
```

## HTTP Status Codes

| Code | Meaning     |
| ---- | ----------- |
| 200  | OK          |
| 201  | Created     |
| 204  | No Content  |
| 400  | Bad Request |
| 404  | Not Found   |

## Learning Objectives

This project was created to practice:

- Building RESTful APIs with Express.js
- Working with route parameters
- Processing JSON request bodies
- Implementing CRUD operations
- Writing API documentation with OpenAPI
- Using Swagger UI for interactive API testing
- Structuring backend applications
