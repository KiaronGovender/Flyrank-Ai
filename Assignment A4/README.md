# FastAPI Authentication Service with Supabase

A modern REST API built with **FastAPI** that provides user authentication and authorization using **Supabase**. This project implements secure login, signup, and protected routes with JWT token-based authentication.

## 🚀 Features

- ✅ User registration (sign up) with email confirmation
- ✅ User authentication (login) with access/refresh tokens
- ✅ Protected routes requiring authentication
- ✅ Public routes for unauthenticated access
- ✅ Secure token-based authorization using HTTP Bearer scheme
- ✅ Supabase backend integration for user management

## 📁 Project Structure

```
Assignment A4/
├── main.py              # FastAPI application with endpoints
├── database.py          # Supabase client configuration
├── README.md            # This file
└── .env                 # Environment variables (create this)
```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
pip install fastapi uvicorn supabase python-dotenv
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

Get these values from your [Supabase Dashboard](https://supabase.com/dashboard).

### 3. Run the Application

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## 📚 API Endpoints

### Public Endpoints (No Authentication Required)

| Method | Endpoint       | Description                         |
| ------ | -------------- | ----------------------------------- |
| GET    | `/`            | Home page - returns welcome message |
| GET    | `/public/info` | Public information endpoint         |

### Authentication Endpoints

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| POST   | `/auth/signup` | Register a new user  |
| POST   | `/auth/login`  | Login and get tokens |

### Protected Endpoints (Requires Authentication)

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| GET    | `/protected/profile` | Get authenticated user's profile |

## 🔐 Authentication Flow

### Sign Up

```bash
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "message": "Sign up successful! Please check your email for a confirmation link.",
  "user": { ... }
}
```

### Login

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "access token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Access Protected Resources

Include the access token in the Authorization header:

```bash
GET /protected/profile
Authorization: Bearer <access_token>
```

**Response:**

```json
{
  "message": "success",
  "user-data": {
    "id": "...",
    "email": "user@example.com",
    "created at": "2026-09-17T..."
  }
}
```

## 🛠️ Technologies Used

- **FastAPI** - Modern, fast web framework for building APIs
- **Supabase** - Backend-as-a-service with authentication
- **UVicorn** - ASGI server for running FastAPI
- **Python-dotenv** - Environment variable management

## 🔒 Security Considerations

- Passwords are hashed by Supabase automatically
- JWT tokens are used for stateless authentication
- HTTP Bearer scheme for token transmission
- Email confirmation required for new registrations

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using FastAPI and Supabase
