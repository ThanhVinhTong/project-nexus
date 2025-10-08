# Project Nexus Backend API

A .NET 9 Web API backend for the Project Nexus application, built with Entity Framework Core and PostgreSQL.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Database Configuration](#database-configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

Before setting up the backend, ensure you have the following installed:

### Required Software

1. **.NET 9 SDK**
   - Download from: https://dotnet.microsoft.com/download/dotnet/9.0
   - Verify installation: `dotnet --version` (should show 9.x.x)

2. **Database (Choose One)**
   
   **Option A: Local PostgreSQL**
   - Download from: https://www.postgresql.org/download/
   - **Windows**: Use the installer from the official website
   - **macOS**: `brew install postgresql`
   - **Linux**: `sudo apt-get install postgresql postgresql-contrib` (Ubuntu/Debian)
   
   **Option B: Supabase (Cloud PostgreSQL)**
   - Sign up at: https://supabase.com/
   - Create a new project
   - Get your project URL and API keys from Settings > API

3. **Visual Studio Code or Visual Studio** (recommended)
   - VS Code: https://code.visualstudio.com/
   - Visual Studio: https://visualstudio.microsoft.com/

### Optional Tools

- **pgAdmin**: PostgreSQL administration tool
- **Postman**: For API testing
- **Git**: For version control

## 📁 Project Structure

```
backend/
└── ProjectNexus.API/
    ├── Controllers/           # API Controllers
    │   ├── ActivitiesController.cs
    │   ├── NotesController.cs
    │   ├── ProjectsController.cs
    │   ├── ProjectUserController.cs
    │   ├── ReferencesController.cs
    │   ├── TaskController.cs
    │   ├── UserController.cs
    │   └── UserTaskController.cs
    ├── Data/                  # Database Context
    │   └── AppDbContext.cs
    ├── Models/                # Entity Models
    │   ├── Activity.cs
    │   ├── Note.cs
    │   ├── Project.cs
    │   ├── ProjectUser.cs
    │   ├── Reference.cs
    │   ├── Task.cs
    │   ├── User.cs
    │   └── UserTask.cs
    ├── Migrations/            # Database Migrations
    │   ├── 20250922100600_InitialCreate.cs
    │   ├── 20251008181535_UpdateContextToMatchModels.cs
    │   └── AppDbContextModelSnapshot.cs
    ├── PlaceholderData/       # Database setup files
    │   ├── create_tables.postgresql.sql
    │   ├── seed_data.postgres.sql
    │   └── seed_data.sql
    ├── Properties/
    │   └── launchSettings.json
    ├── appsettings.json       # Production configuration
    ├── appsettings.Development.json
    ├── Program.cs             # Application entry point
    └── ProjectNexus.API.csproj
```

## 🚀 Setup Instructions

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd project-nexus/backend
```

### Step 2: Install Dependencies

Navigate to the API project directory:

```bash
cd ProjectNexus.API
```

Restore NuGet packages:

```bash
dotnet restore
```

### Step 3: Database Setup

#### 3.1 Install PostgreSQL

1. Download and install PostgreSQL from the official website
2. During installation, remember the password you set for the `postgres` user
3. Make sure PostgreSQL service is running

#### 3.2 Create Database

**For Local PostgreSQL:**

Connect to PostgreSQL using one of these methods:

**Option A: Using psql command line**
```bash
psql -U postgres
```

**Option B: Using pgAdmin (GUI)**
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click on "Databases" → "Create" → "Database"
4. Name it: `ProjectNexusDB`

**Option C: Using SQL command**
```sql
CREATE DATABASE "ProjectNexusDB";
```

**For Supabase:**

1. Go to your Supabase project dashboard
2. Navigate to Settings > Database
3. The database is already created for you
4. Note down your database password from the connection string

#### 3.3 Update Connection String

Edit `appsettings.json` and update the connection string based on your database choice:

**Option A: Local PostgreSQL**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=ProjectNexusDB;Username=postgres;Password=YOUR_PASSWORD_HERE"
  }
}
```

**Option B: Supabase**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=YOUR_PROJECT_REF.supabase.co;Port=5432;Database=postgres;Username=postgres;Password=YOUR_DB_PASSWORD;SSL Mode=Require;Trust Server Certificate=true"
  },
  "Supabase": {
    "Url": "https://YOUR_PROJECT_REF.supabase.co",
    "AnonKey": "YOUR_ANON_KEY",
    "ServiceRoleKey": "YOUR_SERVICE_ROLE_KEY"
  }
}
```

**Important**: 
- For local PostgreSQL: Replace `YOUR_PASSWORD_HERE` with your actual PostgreSQL password
- For Supabase: Replace the placeholders with your actual Supabase project credentials

### Step 4: Run Database Migrations

Apply the existing migrations to create the database schema:

```bash
dotnet ef database update
```

If you encounter issues with Entity Framework tools, install them globally:

```bash
dotnet tool install --global dotnet-ef
```

### Step 5: Database Setup Options

You have two options for setting up the database:

#### Option A: Complete Database Setup (Recommended for New Setup)
Use the complete SQL files that include both table creation and sample data:

```bash
# Full database with complete sample data
psql -U postgres -d ProjectNexusDB -f PlaceholderData/create_tables.postgresql.sql
psql -U postgres -d ProjectNexusDB -f PlaceholderData/seed_data.postgres.sql

# Or minimal database with basic sample data
psql -U postgres -d ProjectNexusDB -f PlaceholderData/seed_data.sql
```

#### Option B: Use Entity Framework Migrations + Sample Data
If you prefer to use Entity Framework migrations:

1. **Run migrations first:**
   ```bash
   dotnet ef database update
   ```

2. **Then add sample data:**
   ```bash
   # Full sample data
   psql -U postgres -d ProjectNexusDB -f PlaceholderData/seed_data.postgres.sql
   
   # Or minimal sample data
   psql -U postgres -d ProjectNexusDB -f PlaceholderData/seed_data.sql
   ```

**What the sample data includes:**
- **Complete Setup** (`create_tables.postgresql.sql` + `seed_data.postgres.sql`): Creates tables + users, projects, tasks, notes, activities, references, project-user relationships, user-task relationships
- **Minimal Setup** (`seed_data.sql`): Basic sample data for testing
- **Data Only** (`seed_data.postgres.sql` / `seed_data.sql`): Sample data only (requires existing tables)

**Sample Data Overview:**
- **Users**: Project Managers, Researchers, Developers, Designers with proper authentication fields
- **Projects**: AI Research, Mobile App Development, Data Analytics, UX Study, etc. with status tracking
- **Tasks**: Various project tasks with different types, priorities, and due dates
- **Notes**: Project notes with content and timestamps
- **Activities**: Project activity logs with messages and timestamps
- **References**: Project references with URLs, descriptions, and authors
- **ProjectUsers**: User-project relationships with permission levels
- **UserTasks**: User-task assignments with comments

## 🏃‍♂️ Running the Application

### Development Mode

Run the application in development mode:

```bash
dotnet run
```

The API will be available at:
- **HTTP**: http://localhost:5160
- **HTTPS**: https://localhost:7274

### Swagger Documentation

Once the application is running, you can access the Swagger UI at:
- http://localhost:5160/swagger (HTTP)
- https://localhost:7274/swagger (HTTPS)

## 📚 API Documentation

### Base URL
- Development: `http://localhost:5160/api`
- Production: `https://your-domain.com/api`

### Available Endpoints

#### Projects Controller (`/api/projects`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/projects` | Get all projects | None | Array of Project objects |
| POST | `/api/projects` | Create a new project | Project object | Created Project object |

#### Users Controller (`/api/users`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/users` | Get all users | None | Array of User objects |
| POST | `/api/users` | Create a new user | User object | Created User object |

#### Tasks Controller (`/api/tasks`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/tasks` | Get all tasks | None | Array of Task objects |
| POST | `/api/tasks` | Create a new task | Task object | Created Task object |

#### Notes Controller (`/api/notes`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/notes` | Get all notes | None | Array of Note objects |
| POST | `/api/notes` | Create a new note | Note object | Created Note object |

#### Activities Controller (`/api/activities`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/activities` | Get all activities | None | Array of Activity objects |
| POST | `/api/activities` | Create a new activity | Activity object | Created Activity object |

#### References Controller (`/api/references`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/references` | Get all references | None | Array of Reference objects |
| POST | `/api/references` | Create a new reference | Reference object | Created Reference object |

#### Project Users Controller (`/api/projectusers`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/projectusers` | Get all project-user relationships | None | Array of ProjectUser objects |
| POST | `/api/projectusers` | Create a new project-user relationship | ProjectUser object | Created ProjectUser object |

#### User Tasks Controller (`/api/usertasks`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/usertasks` | Get all user-task relationships | None | Array of UserTask objects |
| POST | `/api/usertasks` | Create a new user-task relationship | UserTask object | Created UserTask object |

### Data Models

#### Project Model
```json
{
  "id": 0,
  "title": "string",
  "description": "string",
  "deadline": "2024-01-01T00:00:00Z",
  "status": "string",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### User Model
```json
{
  "id": 0,
  "legalName": "string",
  "userName": "string",
  "email": "string",
  "hashedPassword": "string",
  "role": "string",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Task Model
```json
{
  "id": 0,
  "projectId": 0,
  "title": "string",
  "type": "string",
  "priority": "string",
  "dueDate": "2024-01-01T00:00:00Z",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Note Model
```json
{
  "id": 0,
  "projectId": 0,
  "content": "string",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Activity Model
```json
{
  "id": 0,
  "projectId": 0,
  "message": "string",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Reference Model
```json
{
  "id": 0,
  "projectId": 0,
  "referenceName": "string",
  "url": "string",
  "description": "string",
  "authors": "string",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### ProjectUser Model
```json
{
  "id": 0,
  "projectId": 0,
  "userId": 0,
  "userPermission": "string",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### UserTask Model
```json
{
  "taskId": 0,
  "userId": 0,
  "comment": "string",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Example API Calls

#### Get All Projects
```bash
curl -X GET "http://localhost:5160/api/projects"
```

#### Create a New Project
```bash
curl -X POST "http://localhost:5160/api/projects" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Project",
    "description": "This is a sample project",
    "deadline": "2024-12-31T23:59:59Z"
  }'
```

## 🔄 Development Workflow

### Adding New Models

1. Create a new model in the `Models/` directory
2. Add the DbSet to `AppDbContext.cs`
3. Create and apply a migration:
   ```bash
   dotnet ef migrations add AddNewModel
   dotnet ef database update
   ```

### Adding New Controllers

1. Create a new controller in the `Controllers/` directory
2. Follow the existing pattern with dependency injection
3. Use the `[ApiController]` and `[Route("api/[controller]")]` attributes

### Database Migrations

**Create a new migration:**
```bash
dotnet ef migrations add MigrationName
```

**Apply migrations:**
```bash
dotnet ef database update
```

**Remove last migration (if not applied):**
```bash
dotnet ef migrations remove
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Issues

**Error**: `Connection refused` or `Authentication failed`

**Solutions for Local PostgreSQL**:
- Verify PostgreSQL is running: `pg_ctl status` (Windows) or `brew services list | grep postgresql` (macOS)
- Check connection string in `appsettings.json`
- Verify database exists: `psql -U postgres -l`
- Check if password is correct

**Solutions for Supabase**:
- Verify your project is active in Supabase dashboard
- Check that your connection string includes SSL parameters
- Ensure you're using the correct database password from Supabase settings
- Verify your project URL and credentials are correct

#### 2. Entity Framework Tools Not Found

**Error**: `dotnet ef` command not found

**Solution**:
```bash
dotnet tool install --global dotnet-ef
```

#### 3. Port Already in Use

**Error**: `Address already in use`

**Solutions**:
- Change the port in `launchSettings.json`
- Kill the process using the port: `netstat -ano | findstr :5160` (Windows)

#### 4. Migration Issues

**Error**: `No migrations found`

**Solution**:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

#### 5. Sample Data Loading Issues

**Error**: `relation "Users" does not exist` or similar table errors

**Solutions**:
- Ensure migrations have been applied first: `dotnet ef database update`
- Check that you're connected to the correct database
- Verify the SQL file path is correct

**Error**: `permission denied` when running SQL files

**Solutions**:
- Ensure your PostgreSQL user has the necessary permissions
- Try running: `psql -U postgres -d ProjectNexusDB -f PlaceholderData/seed_data.sql`
- If using pgAdmin, make sure you're connected as a superuser

**Error**: `duplicate key value violates unique constraint`

**Solutions**:
- The data might already exist. Clear existing data first:
  ```sql
  DELETE FROM "UserTasks";
  DELETE FROM "ProjectUsers";
  DELETE FROM "References";
  DELETE FROM "Activities";
  DELETE FROM "Notes";
  DELETE FROM "Tasks";
  DELETE FROM "Projects";
  DELETE FROM "Users";
  ```
- Or use the minimal sample data instead: `seed_data.sql`

### Environment-Specific Issues

#### Windows
- Ensure PostgreSQL service is running in Services
- Check Windows Firewall settings
- Run PowerShell as Administrator if needed

#### macOS
- Use Homebrew for PostgreSQL: `brew install postgresql`
- Start PostgreSQL: `brew services start postgresql`

#### Linux
- Install PostgreSQL: `sudo apt-get install postgresql postgresql-contrib`
- Start service: `sudo systemctl start postgresql`
- Enable auto-start: `sudo systemctl enable postgresql`

## 🔧 Configuration

### Environment Variables

You can override configuration using environment variables:

**For Local PostgreSQL:**
```bash
# Windows
set ConnectionStrings__DefaultConnection="Host=localhost;Port=5432;Database=ProjectNexusDB;Username=postgres;Password=mypassword"

# macOS/Linux
export ConnectionStrings__DefaultConnection="Host=localhost;Port=5432;Database=ProjectNexusDB;Username=postgres;Password=mypassword"
```

**For Supabase:**
```bash
# Windows
set ConnectionStrings__DefaultConnection="Host=YOUR_PROJECT_REF.supabase.co;Port=5432;Database=postgres;Username=postgres;Password=YOUR_DB_PASSWORD;SSL Mode=Require;Trust Server Certificate=true"

# macOS/Linux
export ConnectionStrings__DefaultConnection="Host=YOUR_PROJECT_REF.supabase.co;Port=5432;Database=postgres;Username=postgres;Password=YOUR_DB_PASSWORD;SSL Mode=Require;Trust Server Certificate=true"
```

### CORS Configuration

The API is configured to allow requests from `http://localhost:3000` (Next.js frontend). To change this, modify the CORS policy in `Program.cs`.

## 📝 Additional Notes

- The API uses Entity Framework Core with PostgreSQL
- Swagger/OpenAPI documentation is enabled in development mode
- CORS is configured to allow frontend communication
- The application uses .NET 9 with nullable reference types enabled

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

## 📞 Support

If you encounter any issues not covered in this README, please:
1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with detailed error information

---

**Happy Coding! 🚀**
