# Database Sample Data

This directory contains SQL files with placeholder data for the Project Nexus database.

## Files

- **`seed_data.sql`** - Complete dataset with realistic sample data
- **`sample_data.sql`** - Minimal dataset for quick testing

## Quick Start

1. **Set up the database** (if not already done):
   ```bash
   dotnet ef database update
   ```

2. **Load sample data**:
   ```bash
   # Full dataset (recommended)
   psql -U postgres -d ProjectNexusDB -f Data/seed_data.sql
   
   # Or minimal dataset
   psql -U postgres -d ProjectNexusDB -f Data/sample_data.sql
   ```

## Data Overview

### Full Dataset (`seed_data.sql`)
- **8 Users**: Mix of Project Managers, Researchers, Developers, Designers
- **8 Projects**: AI Research, Mobile App, Data Analytics, UX Study, Cloud Migration, ML Model, Security Audit, API Integration
- **40 Tasks**: Various project tasks with different statuses
- **24 Notes**: Project notes with versioning
- **32 Files**: Project-related files with realistic names and paths

### Minimal Dataset (`sample_data.sql`)
- **3 Users**: Basic user roles
- **3 Projects**: Core project types
- **6 Tasks**: Essential task examples
- **3 Notes**: Basic project notes
- **3 Files**: Sample project files

## Data Relationships

- **Projects** → **Tasks**: One-to-many (each project has multiple tasks)
- **Projects** → **Notes**: One-to-many (each project has multiple notes)
- **Projects** → **Files**: One-to-many (each project has multiple files)
- **Users** are independent (no foreign key relationships in current schema)

## Verification

After loading the data, you can verify it was inserted correctly:

```sql
SELECT 'Users' as table_name, COUNT(*) as record_count FROM "Users"
UNION ALL
SELECT 'Projects', COUNT(*) FROM "Projects"
UNION ALL
SELECT 'Tasks', COUNT(*) FROM "Tasks"
UNION ALL
SELECT 'Notes', COUNT(*) FROM "Notes"
UNION ALL
SELECT 'Files', COUNT(*) FROM "Files";
```

## Troubleshooting

- **Tables don't exist**: Run `dotnet ef database update` first
- **Permission denied**: Ensure you're connected as a superuser
- **Duplicate key errors**: Data already exists, clear tables first or use minimal dataset
- **File not found**: Check the file path and ensure you're in the correct directory
