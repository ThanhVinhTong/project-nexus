# 🚀 Project Nexus
*A lightweight collaboration platform for research & project teams.*

## 📌 Overview
Project Nexus is a **full-stack collaboration platform** designed to help teams manage projects, tasks, files, and research notes in one place.  
Think of it as a **lightweight Notion/Trello for researchers** — with project management, document storage, and versioned notes.

This project is built as a **1-day sprint by 2 developers**, with each person owning **end-to-end features** (frontend + backend).  

---

## 🏗️ Tech Stack
- **Frontend**: Next.js + TailwindCSS
- **Backend**: ASP.NET Core Web API
- **Database**: PostgreSQL + EF Core
- **Storage**: Local uploads (can be extended to AWS S3/Azure Blob)
- **Auth**: Mock login (JWT stub / Google OAuth placeholder)
- **Deployment**: Docker (optional)

---

## 📂 Project Structure
```
project-nexus/
├── frontend/ # Next.js app (UI, pages, components)
├── backend/ # ASP.NET Core Web API (controllers, models, migrations)
└── README.md # You are here
```

---

## 👥 Task Split (Vertical Features)

### Person A → Projects + Tasks
- **Backend**
  - `Project` model + CRUD APIs
  - `Task` model + APIs (`add/update status`)
- **Frontend**
  - Dashboard (list projects)
  - Project detail page (tasks tab)

### Person B → Files + Notes
- **Backend**
  - `File` model + upload API (metadata + local storage)
  - `Note` model + APIs (versioned notes)
- **Frontend**
  - File upload UI (list files per project)
  - Notes editor (Markdown input + version history)

---

## 🗄️ Database Schema
**Tables**
- **User** → id, name, email, role
- **Project** → id, title, description, deadline
- **Task** → id, projectId, title, status
- **File** → id, projectId, filename, url
- **Note** → id, projectId, content, version

---

## ⚡ Setup Instructions

### Backend (ASP.NET Core API)
```bash
cd backend
dotnet new webapi -n ProjectNexus.API
# install EF Core + PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore.Design
```

### Frontend (Next.js + Tailwind)
```
cd frontend
npx create-next-app@latest .
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- Add Tailwind setup in globals.css
- Start dev server: npm run dev

## API Endpoints (Draft)
```
Auth
    POST /login → mock login, return fake JWT
Projects
    GET /projects
    POST /projects
    GET /projects/{id}
Tasks
    POST /projects/{id}/tasks
    PATCH /tasks/{id}
Files
    GET /projects/{id}/files
    POST /projects/{id}/files
Notes
    GET /projects/{id}/notes
    POST /projects/{id}/notes
```

✅ Sprint Goal (1 Day)
By the end of the day, we should be able to:
- Login (mock)
- Create projects
- Add tasks to projects
- Upload a file to a project
- Write and version notes

🚀 Future Extensions
- Real OAuth login (Google/Microsoft)
- Rich notifications (email + in-app)
- PubMed/ORCID API integration
- Deploy with Docker + AWS/GCP