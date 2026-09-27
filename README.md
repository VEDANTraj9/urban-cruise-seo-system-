# SEO Dashboard & Dynamic Homepage Management System

A full-stack web application built to dynamically manage website SEO configurations, JSON-LD structured schemas, and complete homepage content without modifying source code.

## Tech Stack
- **Frontend**: Next.js (App Router), Vanilla CSS (Modular Stylesheets)
- **Backend**: Node.js, Express.js (Strict MVC Architecture)
- **Database**: MySQL

---

## Architecture Overview (MVC Pattern)
The backend enforces strict separation of concerns across dedicated architectural layers:
```
backend/
├── src/
│   ├── config/             # Database connection pool & environment configs
│   ├── models/             # Direct database operations & parameterized queries
│   ├── services/           # Business logic & JSON-LD schema compilers
│   ├── controllers/        # HTTP req/res handling & status codes
│   ├── validations/        # Request payload schemas (Zod)
│   ├── middlewares/        # JWT Authentication, Role, Multer, Error handlers
│   └── routes/             # Route endpoint definitions
```

---

## Core Features
1. **Dynamic SEO Management**:
   - Meta Title (with character length recommendation)
   - Meta Description
   - Focus Keywords
   - Canonical URL
   - Robots Directives (Index/Noindex, Follow/Nofollow)
   - Open Graph (OG) Tags & Image
   - Twitter Card Tags & Image
2. **Schema Management (5 Types)**:
   - Organization Schema
   - FAQ Schema
   - Breadcrumb Schema
   - Website Schema
   - Local Business Schema
   - Automatically serialized into compliant JSON-LD and injected into the website `<head>`.
3. **Dynamic Homepage Content**:
   - Hero Section (Heading, Subheading, Banner, CTA text & link)
   - About Us Section (Title, Story, Featured Image)
4. **Vehicles Fleet Management**:
   - Add, edit, delete vehicles (9, 12, 16, 20-seater, Force Urbania, Luxury Bus)
   - **Reorder** capability: Adjust display sequence directly from dashboard.
5. **Occasions Management**:
   - Categorized services: Wedding, Corporate, Family Tours, Airport, Outstation.
6. **Testimonials Management**:
   - Customer feedback with 1–5 star ratings and avatars.
7. **Media Gallery with SEO Alt Tags**:
   - Image upload pipeline with mandatory SEO-friendly Alt Tags.
8. **Contact Information & Map**:
   - Phone numbers, email, physical office address, and interactive Google Map iframe.

---

## Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend runs on: `http://localhost:5000`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:3000`

### 3. Admin Credentials
- **Login URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@example.com`
- **Password**: `admin123`
