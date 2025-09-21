# KrishiMitra

KrishiMitra is a full-stack platform designed to empower farmers with AI-powered advisory, live weather updates, government schemes, and more. The project is divided into a **Frontend** (React + Vite + Tailwind CSS) and a **Backend** (Node.js + Express + MongoDB).

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

---

## Features

- **User Authentication:** Signup, login, and protected routes using JWT and cookies.
- **AI-Powered Advisory:** Get instant answers to farming questions in Hindi and English.
- **Live Weather Updates:** Real-time weather data and forecasts.
- **Government Schemes:** Stay updated with the latest schemes and subsidies.
- **Mobile Friendly:** Responsive design for all devices.
- **Profile Management:** Secure user profile with district and state info.
- **Admin Controls:** (Planned) Admin-only features for managing users and content.

---

## Tech Stack

### Frontend

- **React** (with TypeScript)
- **Vite** (for fast development)
- **Tailwind CSS** (utility-first styling)
- **Radix UI** (accessible UI primitives)
- **Lucide Icons** (icon library)
- **Axios** (HTTP client)
- **React Hook Form** (form management)
- **React Router** (routing)
- **Supabase** (optional, for future integrations)
- **Shadcn/ui** (component library)

### Backend

- **Node.js** (runtime)
- **Express.js** (web framework)
- **MongoDB** (database)
- **Mongoose** (ODM for MongoDB)
- **bcrypt** (password hashing)
- **jsonwebtoken** (JWT authentication)
- **cookie-parser** (cookie handling)
- **dotenv** (environment variables)
- **CORS** (cross-origin resource sharing)

### Database

- **MongoDB** (local or cloud)
  - Stores user profiles and authentication data.
- **Supabase** (optional/future)
  - Types and integration prepared for scalable cloud data.

---

## Folder Structure

```
KrishiMitra/
├── Backend/
│   ├── .env
│   ├── api.js
│   ├── package.json
│   ├── controller/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── model/
│   │   └── userModel.js
│   └── router/
│       ├── authRouter.js
│       └── userRouter.js
├── Frontend/
│   ├── .env
│   ├── .gitignore
│   ├── bun.lockb
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── placeholder.svg
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── chart.tsx
│   │   │       ├── carousel.tsx
│   │   │       ├── form.tsx
│   │   │       └── ...
│   │   ├── hooks/
│   │   │   └── useAuth.tsx
│   │   ├── integrations/
│   │   │   └── supabase/
│   │   │       └── types.ts
│   │   ├── pages/
│   │   │   ├── Landing.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── ...
│   │   └── App.tsx
│   └── supabase/
```

---

## Setup Instructions

### Backend

1. **Install dependencies:**
   ```sh
   cd Backend
   npm install
   ```
2. **Configure environment variables:**  
   Create a `.env` file with your MongoDB URI, JWT secret, etc.
3. **Start the server:**
   ```sh
   node api.js
   ```
   The backend runs on `http://localhost:3000`.

### Frontend

1. **Install dependencies:**
   ```sh
   cd Frontend
   npm install
   ```
2. **Configure environment variables:**  
   Edit `.env` for Supabase or other integrations.
3. **Start the frontend:**
   ```sh
   npm run dev
   ```
   The frontend runs on `http://localhost:8080` (Vite default).

---

## Environment Variables

### Backend (`Backend/.env`)

```
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Frontend (`Frontend/.env`)

```
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_public_key
VITE_SUPABASE_URL=your_supabase_url
```


## Contact

For questions or support, open an issue or contact the maintainers.
