# Project Nexus
*A lightweight collaboration platform for research & project teams.*

## Overview
Project Nexus is a **full-stack collaboration platform** designed to help teams manage projects, tasks, activities, references, and research notes in one place.  
Think of it as a **lightweight Notion/Trello for researchers** — with project management, user collaboration, activity tracking, and versioned notes.

This project features a **comprehensive backend API** with 8 controllers and 8 data models, supporting complex project workflows with user permissions, task assignments, and activity logging.  

---

## Tech Stack
- **Frontend**: Next.js + TailwindCSS + TypeScript
- **Backend**: ASP.NET Core Web API (.NET 9)
- **Database**: PostgreSQL + Entity Framework Core
- **Authentication**: User management with roles and permissions
- **API Documentation**: Swagger/OpenAPI
- **CORS**: Configured for frontend-backend communication
- **Deployment**: Docker (optional) + Supabase support

---

## Project Structure
```
project-nexus/
├── frontend/ # Next.js app (UI, pages, components)
├── backend/ # ASP.NET Core Web API (controllers, models, migrations)
└── README.md # You are here
```

---

## Architecture Overview

### Backend Implementation
- **8 Controllers**: Users, Projects, Tasks, Notes, Activities, References, ProjectUsers, UserTasks
- **8 Data Models**: Complete entity relationships with timestamps
- **Database**: PostgreSQL with Entity Framework Core migrations
- **API**: RESTful endpoints with Swagger documentation
- **Authentication**: User management with roles and permissions

### Frontend Implementation
- **Next.js**: React-based frontend with TypeScript
- **UI Components**: TailwindCSS for styling
- **Pages**: Dashboard, projects, tasks, notes, and user management
- **State Management**: Component-based state with API integration

---

## Database Schema
**Core Tables**
- **User** → id, legalName, userName, email, hashedPassword, role, createdAt, updatedAt
- **Project** → id, title, description, deadline, status, createdAt, updatedAt
- **Task** → id, projectId, title, type, priority, dueDate, createdAt, updatedAt
- **Note** → id, projectId, content, createdAt, updatedAt
- **Activity** → id, projectId, message, createdAt, updatedAt
- **Reference** → id, projectId, referenceName, url, description, authors, createdAt, updatedAt

**Relationship Tables**
- **ProjectUser** → id, projectId, userId, userPermission, createdAt, updatedAt
- **UserTask** → taskId, userId, comment, createdAt, updatedAt

---

## Setup Instructions

### Backend (ASP.NET Core API)
```bash
cd backend/ProjectNexus.API
dotnet restore
dotnet ef database update
dotnet run
```
- API runs on: http://localhost:5160
- Swagger UI: http://localhost:5160/swagger
- See [backend/README.md](backend/README.md) for detailed setup

### Frontend (Next.js + Tailwind)
```bash
cd frontend
npm install
npm run dev
```
- Frontend runs on: http://localhost:3000
- Configured to connect to backend API

## API Endpoints
```
Users
    GET /api/users
    POST /api/users
Projects
    GET /api/projects
    POST /api/projects
    GET /api/projects/{id}
Tasks
    GET /api/tasks
    POST /api/tasks
    GET /api/tasks/{id}
    PUT /api/tasks/{id}
Notes
    GET /api/notes
    POST /api/notes
    GET /api/notes/{id}
Activities
    GET /api/activities
    POST /api/activities
References
    GET /api/references
    POST /api/references
Project Users
    GET /api/projectusers
    POST /api/projectusers
User Tasks
    GET /api/usertasks
    POST /api/usertasks
```

## Current Features
**Implemented & Working:**
- User management with roles and permissions
- Project creation and management
- Task management with assignments
- Notes system with versioning
- Activity logging and tracking
- Reference management
- User-project relationships
- User-task assignments
- Full REST API with Swagger documentation
- Database migrations and seeding

## Future Extensions
- **Authentication**: Real OAuth login (Google/Microsoft)
- **File Management**: File upload and storage system
- **Notifications**: Rich notifications (email + in-app)
- **Research Integration**: PubMed/ORCID API integration
- **Advanced Features**: Real-time collaboration, advanced permissions
- **Deployment**: Docker + AWS/GCP deployment
- **Mobile**: React Native mobile app