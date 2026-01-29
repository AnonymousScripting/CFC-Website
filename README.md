# Chicago Food Club

A membership-based community platform for food enthusiasts in Chicago, featuring curated culinary experiences, member networking, and exclusive dining events.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=flat&logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/License-Private-red?style=flat)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The Chicago Food Club is an exclusive, invitation-only community platform that connects food lovers, professionals, and culinary enthusiasts. The platform enables:

- **Membership Applications** - Curated onboarding with detailed applicant screening
- **Member Directory** - Connect with fellow food enthusiasts
- **Events Calendar** - Access exclusive dining events and culinary experiences
- **Admin Dashboard** - Manage membership requests and member accounts

---

## Features

### Public Features
- Landing page with club information and benefits
- Membership application form with comprehensive profiling
- Password reset functionality

### Member Features
- Secure authentication (JWT-based)
- Member directory with search functionality
- Events calendar (Google Calendar integration)
- Profile management with photo uploads

### Admin Features
- Dashboard with membership statistics
- Review and approve/reject membership applications
- Activate/deactivate member accounts
- Automated email notifications

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| Vite 6 | Build Tool |
| Tailwind CSS 4 | Styling |
| Redux Toolkit | State Management |
| React Router 7 | Routing |
| Axios | HTTP Client |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express 5 | Web Framework |
| Drizzle ORM | Database ORM |
| PostgreSQL | Database |
| JWT | Authentication |
| Nodemailer | Email Service |
| Zod | Validation |

### External Services
| Service | Purpose |
|---------|---------|
| Supabase | Database Hosting & File Storage |
| Google Calendar | Events Display |

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **PostgreSQL** (v15 or higher) or a Supabase account
- **Git**

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/AnonymousScripting/CFC-Website.git
cd CFC-Website
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd thechicagofoodclub-main/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Set Up Environment Variables

Copy the sample environment files and configure them:

```bash
# Backend
cd thechicagofoodclub-main/backend
cp .env.sample .env

# Frontend
cd ../frontend
cp .env.sample .env
```

See [Environment Variables](#environment-variables) for configuration details.

### 4. Set Up Database

Run database migrations:

```bash
cd thechicagofoodclub-main/backend
npm run migrate
```

---

## Environment Variables

### Backend (`backend/.env`)

```env
# Server
SERVER_HOST=localhost
SERVER_PORT=3000

# Database
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=postgres
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_STORAGE_URL=https://your-project.supabase.co/storage/v1

# JWT
JWT_PRIVATE_KEY=your_secret_key
JWT_EXPIRATION_TIME=1d
JWT_ACCESS_EXPIRATION_TIME=7d
JWT_REFRESH_EXPIRATION_TIME=30d

# Email (Nodemailer)
EMAIL_NAME=Chicago Food Club
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@example.com
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SUPABASE_STORAGE_URL=https://your-project.supabase.co/storage/v1
VITE_CALENDAR_IFRAME=https://calendar.google.com/calendar/embed?src=your_calendar
```

> **Security Note:** Never commit `.env` files to version control. They are excluded via `.gitignore`.

---

## Running the Application

### Development Mode

Start both servers in separate terminals:

```bash
# Terminal 1 - Backend
cd thechicagofoodclub-main/backend
npm run dev
```

```bash
# Terminal 2 - Frontend
cd thechicagofoodclub-main/frontend
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api

### Production Build

```bash
# Build frontend
cd thechicagofoodclub-main/frontend
npm run build

# Start backend in production
cd ../backend
npm start
```

---

## Project Structure

```
thechicagofoodclub-main/
├── backend/
│   ├── db/
│   │   ├── schema/          # Drizzle ORM schemas
│   │   └── database.js      # Database connection
│   ├── migrations/          # Database migrations
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   │   ├── admin/       # Admin-specific controllers
│   │   │   └── user/        # User-specific controllers
│   │   ├── middlewares/     # Express middlewares
│   │   ├── routes/          # API route definitions
│   │   ├── utils/           # Helper functions
│   │   └── validation_schemas/
│   ├── app.js               # Express app entry point
│   └── package.json
│
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── axios/           # Axios configuration
│   │   ├── componenets/     # React components
│   │   ├── config/          # App configuration
│   │   ├── pages/           # Page components
│   │   │   ├── admin/       # Admin pages
│   │   │   └── user/        # User pages
│   │   ├── redux/           # Redux store & slices
│   │   └── utils/           # Utility functions
│   ├── App.jsx              # Root component
│   └── package.json
│
├── .claude/
│   └── project_dna.md       # Brand identity guidelines
├── CONTEXT.md               # Project documentation
├── MOLTBOT_INSTRUCTIONS.md  # AI agent instructions
└── README.md
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/auth/register` | Register new user |
| POST | `/api/user/auth/login` | User login |
| POST | `/api/admin/auth/login` | Admin login |
| POST | `/api/auth/forgot-password` | Request password reset |
| PATCH | `/api/auth/reset-password` | Reset password |

### Membership
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/membership/create` | Submit application |
| GET | `/api/admin/membership/pending` | Get pending requests |
| GET | `/api/admin/membership/approved` | Get approved members |
| GET | `/api/admin/membership/stats` | Get statistics |
| PUT | `/api/admin/membership/:id` | Approve/reject request |
| PATCH | `/api/admin/membership/status` | Toggle member status |

---

## Scripts

### Backend
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run migrate      # Run database migrations
npm run generate-migration  # Generate new migration
```

### Frontend
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow existing code patterns
- Use meaningful commit messages
- Ensure all tests pass before submitting PR
- Update documentation as needed

---

## Documentation

For detailed project documentation, see:
- [CONTEXT.md](CONTEXT.md) - Full technical documentation
- [.claude/project_dna.md](.claude/project_dna.md) - Brand identity guidelines
- [MOLTBOT_INSTRUCTIONS.md](MOLTBOT_INSTRUCTIONS.md) - AI agent setup

---

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

---

## Support

For questions or support, please contact the Chicago Food Club team.

---

<p align="center">
  <strong>Chicago Food Club</strong><br>
  <em>Exceptional Dining & Distinguished Company</em>
</p>
