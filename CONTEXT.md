# Chicago Food Club - Project Context

This document provides an overview of the codebase for AI agents and developers to quickly understand the project structure, tech stack, and key features.

## Project Overview

**The Chicago Food Club** is a membership-based community platform for food enthusiasts in Chicago. The application allows users to apply for membership, and admins to review/approve applications. Approved members gain access to a member directory and events calendar.

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.1 | UI framework |
| Vite | 6.3.5 | Build tool & dev server |
| Tailwind CSS | 4.1.11 | Utility-first styling |
| Redux Toolkit | 2.8.2 | State management |
| redux-persist | 6.0.0 | Persist Redux state to localStorage |
| React Router DOM | 7.8.0 | Client-side routing |
| Axios | 1.1.0 | HTTP client |
| Supabase JS | - | Storage (profile pictures) |
| react-hot-toast | - | Toast notifications |
| Lucide React | - | Icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | - | Runtime |
| Express | 5.1.0 | Web framework |
| Drizzle ORM | 0.44.4 | Database ORM |
| PostgreSQL | - | Database (hosted on Supabase) |
| bcrypt | 6.0.0 | Password hashing |
| jsonwebtoken | 9.0.2 | JWT authentication |
| Nodemailer | 7.0.5 | Email service |
| Zod | 4.0.17 | Request validation |
| Supabase JS | - | Storage service |

### External Services
- **Supabase**: PostgreSQL database hosting + file storage (profile pictures)
- **Google Calendar**: Embedded iframe for events display
- **SMTP**: Email delivery via Nodemailer

---

## Project Structure

```
thechicagofoodclub-main/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── main.jsx            # App entry point
│   │   ├── App.jsx             # Root component with routing
│   │   ├── axios/
│   │   │   └── axiosInstance.js # Configured Axios instance
│   │   ├── componenets/        # (typo in folder name) UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── JoinForm.jsx    # Membership application form
│   │   │   ├── MemberDirectory.jsx
│   │   │   ├── EventsCalender.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── MembersTable.jsx
│   │   │   ├── membershipRequests.jsx
│   │   │   └── ...
│   │   ├── config/
│   │   │   └── supabaseClient.js # Supabase client config
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── admin/
│   │   │   │   └── dashboard.jsx # Admin dashboard
│   │   │   └── user/
│   │   │       └── dashboard.jsx # Member dashboard
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── user/
│   │   │       └── userSlice.js  # Auth state management
│   │   └── utils/
│   │       └── validation.js     # Form validation helpers
│   ├── vite.config.js
│   ├── package.json
│   └── .env.sample
│
└── backend/                     # Express API server
    ├── app.js                   # Express app entry point
    ├── db/
    │   ├── database.js          # Drizzle + PostgreSQL connection
    │   └── schema/
    │       ├── index.js
    │       ├── user.js          # User table schema
    │       ├── membershipRequest.js # Membership requests schema
    │       └── blacklisttoken.js
    ├── migrations/              # Drizzle migration files
    ├── src/
    │   ├── config/
    │   │   └── supabaseClient.js
    │   ├── controllers/
    │   │   ├── auth.js          # Shared auth (login, password reset)
    │   │   ├── admin/
    │   │   │   ├── auth.js
    │   │   │   └── membershipRequest.js # Admin: approve/reject members
    │   │   └── user/
    │   │       ├── auth.js      # User registration/login
    │   │       └── membershipRequest.js # Submit membership application
    │   ├── middlewares/
    │   ├── routes/
    │   │   ├── index.js         # Route aggregator
    │   │   ├── auth.js          # /api/auth routes
    │   │   ├── admin/
    │   │   │   ├── index.js     # /api/admin routes
    │   │   │   ├── auth.js
    │   │   │   └── membershipRequest.js
    │   │   └── user/
    │   │       ├── index.js     # /api/user routes
    │   │       ├── auth.js
    │   │       └── membershipRequest.js
    │   ├── utils/
    │   │   ├── constants.js     # Environment variable exports
    │   │   ├── customResponses.js # Standardized API responses
    │   │   ├── emailTemplates.js # HTML email templates
    │   │   ├── helper.js        # JWT helpers, password generator
    │   │   └── sendEmail.js     # Nodemailer configuration
    │   └── validation_schemas/
    │       └── user.validation.schemas.js # Zod schemas
    ├── drizzle.config.js
    ├── package.json
    └── .env.sample
```

---

## Key Features

### 1. Public Membership Application
- **Component**: `frontend/src/componenets/JoinForm.jsx`
- **API**: `POST /api/user/membership/create`
- **Controller**: `backend/src/controllers/user/membershipRequest.js`
- Collects detailed applicant info: profession, culinary interests, dining frequency, availability, etc.
- Stores in `membership_requests` table with status `pending`

### 2. User Authentication
- **Login**: `POST /api/user/auth/login` and `POST /api/admin/auth/login`
- **Password Reset**: `POST /api/auth/forgot-password`, `PATCH /api/auth/reset-password`
- JWT-based authentication stored in Redux (persisted to localStorage)
- Role-based access: `isAdmin` flag on user determines admin vs member

### 3. Admin Dashboard
- **Page**: `frontend/src/pages/admin/dashboard.jsx`
- **Features**:
  - View pending membership requests
  - Approve/reject applications (`PUT /api/admin/membership/:requestId`)
  - On approval: creates user account, generates random password, sends welcome email
  - View all approved members
  - Activate/deactivate member accounts

### 4. Member Dashboard
- **Page**: `frontend/src/pages/user/dashboard.jsx`
- **Features**:
  - View member directory (other approved members)
  - Events calendar (embedded Google Calendar iframe)
  - Edit profile (including profile picture upload to Supabase Storage)

### 5. Email Notifications
- **Service**: `backend/src/utils/sendEmail.js` (Nodemailer)
- **Templates**: `backend/src/utils/emailTemplates.js`
- Sends emails for:
  - Membership approval (with auto-generated password)
  - Membership rejection (with reason)
  - Password reset link
  - Account activation/deactivation

---

## Database Schema

### `users` Table
```sql
id              UUID PRIMARY KEY
email           VARCHAR UNIQUE NOT NULL
phone           VARCHAR(255)
password        VARCHAR (nullable for OAuth)
full_name       VARCHAR NOT NULL
otp             VARCHAR(6)
profile_picture VARCHAR(255) -- Supabase storage URL
profile_picture_path VARCHAR(255)
is_verified     BOOLEAN DEFAULT false
is_admin        BOOLEAN DEFAULT false
is_active       BOOLEAN DEFAULT true
last_login_at   TIMESTAMP
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

### `membership_requests` Table
```sql
id                        UUID PRIMARY KEY
user_id                   UUID REFERENCES users(id)
email                     VARCHAR(255) NOT NULL
full_name                 VARCHAR(255) NOT NULL
phone_number              VARCHAR(20) NOT NULL
profession                VARCHAR(100)
professional_contribution TEXT
interest_reason           TEXT
culinary_skills           TEXT
cuisine_interests         TEXT
restaurant_recommendations TEXT
dining_frequency          VARCHAR(50)
available_days            JSONB
membership_goals          JSONB
cohosting_interest        VARCHAR(50)
referral_source           VARCHAR(50)
instagram_url             VARCHAR(255)
linkedin_url              VARCHAR(255)
dietary_restrictions      TEXT
status                    ENUM('pending', 'approved', 'rejected')
reviewed_by               UUID REFERENCES users(id)
reviewed_at               TIMESTAMP
rejection_reason          TEXT
created_at                TIMESTAMP
```

---

## Architecture & Connections

### Database Connection
- **File**: `backend/db/database.js`
- **ORM**: Drizzle ORM with `postgres` driver
- **Host**: Supabase PostgreSQL (connection string in `DATABASE_URL` env var)
- Connection URL format: `postgres://user:password@aws-0-us-east-2.pooler.supabase.com:5432/postgres`

### File Storage (Supabase)
- **Frontend Client**: `frontend/src/config/supabaseClient.js`
- **Backend Client**: `backend/src/config/supabaseClient.js`
- Used for profile picture uploads
- Storage URL pattern: `https://{project}.supabase.co/storage/v1`

### CORS Configuration
- **File**: `backend/app.js`
- Allowed origins:
  - `http://localhost:5173` (dev)
  - `https://thechicagofoodclub.com` (production)
  - Various IP addresses for staging

### API Base URL
- Frontend configured via `VITE_API_URL` environment variable
- Default: `http://localhost:3000/api`

---

## API Routes Summary

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/user/membership/create` | Submit membership application |
| POST | `/api/user/auth/register` | User registration |
| POST | `/api/user/auth/login` | User login |
| POST | `/api/admin/auth/login` | Admin login |
| GET | `/api/admin/membership/pending` | Get pending requests |
| GET | `/api/admin/membership/approved` | Get approved members |
| GET | `/api/admin/membership/verified` | Get active verified members |
| GET | `/api/admin/membership/stats` | Get membership stats |
| PUT | `/api/admin/membership/:requestId` | Approve/reject request |
| PATCH | `/api/admin/membership/status` | Activate/deactivate user |
| POST | `/api/auth/forgot-password` | Request password reset |
| PATCH | `/api/auth/reset-password` | Reset password with token |

---

## Environment Variables

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
VITE_SUPABASE_STORAGE_URL=https://xxx.supabase.co/storage/v1
VITE_CALENDAR_IFRAME=https://calendar.google.com/...
```

### Backend (`.env`)
```
SERVER_HOST=localhost
SERVER_PORT=3000
DB_USER=xxx
DB_PASSWORD=xxx
DB_HOST=xxx
DB_PORT=5432
DB_NAME=postgres
DATABASE_URL=postgresql://...
SUPABASE_URL=xxx
SUPABASE_ANON_KEY=xxx
JWT_PRIVATE_KEY=xxx
JWT_EXPIRATION_TIME=1d
EMAIL_NAME=xxx
EMAIL_USER=xxx
EMAIL_PASS=xxx
ADMIN_EMAIL=xxx
```

---

## Development Commands

### Frontend
```bash
cd frontend
npm install
npm run dev      # Start dev server (port 5173)
npm run build    # Production build to dist/
npm run lint     # Run ESLint
```

### Backend
```bash
cd backend
npm install
npm run dev      # Start with nodemon (auto-reload)
npm start        # Production start
npm run generate-migration  # Create new Drizzle migration
npm run migrate  # Apply pending migrations
```

---

## Known Issues / Notes

1. **Typo in folder name**: `frontend/src/componenets/` should be `components/`
2. **No test suite**: No automated tests present
3. **Hardcoded allowed origins**: CORS origins are hardcoded in `app.js`
4. **Profile pictures**: Stored in Supabase Storage, URLs saved in `profile_picture` column
