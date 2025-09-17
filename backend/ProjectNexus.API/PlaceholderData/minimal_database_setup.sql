-- Project Nexus Minimal Database Setup
-- This file creates the database schema and populates it with minimal sample data
-- Perfect for quick testing and development

-- ==============================================
-- DATABASE CREATION
-- ==============================================

-- Create database (uncomment if needed)
-- CREATE DATABASE "ProjectNexusDB";

-- Connect to the database
-- \c ProjectNexusDB;

-- ==============================================
-- TABLE CREATION
-- ==============================================

-- Drop tables if they exist (in correct order due to foreign key constraints)
DROP TABLE IF EXISTS "Files";
DROP TABLE IF EXISTS "Notes";
DROP TABLE IF EXISTS "Tasks";
DROP TABLE IF EXISTS "Projects";
DROP TABLE IF EXISTS "Users";

-- Create Users table
CREATE TABLE "Users" (
    "Id" SERIAL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Role" TEXT NOT NULL
);

-- Create Projects table
CREATE TABLE "Projects" (
    "Id" SERIAL PRIMARY KEY,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Deadline" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create Tasks table
CREATE TABLE "Tasks" (
    "Id" SERIAL PRIMARY KEY,
    "ProjectId" INTEGER NOT NULL,
    "Title" TEXT NOT NULL,
    "Status" TEXT NOT NULL
);

-- Create Notes table
CREATE TABLE "Notes" (
    "Id" SERIAL PRIMARY KEY,
    "ProjectId" INTEGER NOT NULL,
    "Content" TEXT NOT NULL,
    "Version" INTEGER NOT NULL
);

-- Create Files table
CREATE TABLE "Files" (
    "Id" SERIAL PRIMARY KEY,
    "ProjectId" INTEGER NOT NULL,
    "FileName" TEXT NOT NULL,
    "Url" TEXT NOT NULL
);

-- ==============================================
-- MINIMAL SAMPLE DATA
-- ==============================================

-- Insert Sample Users
INSERT INTO "Users" ("Name", "Email", "Role") VALUES
('John Smith', 'john.smith@example.com', 'Project Manager'),
('Sarah Johnson', 'sarah.johnson@example.com', 'Researcher'),
('Mike Davis', 'mike.davis@example.com', 'Developer');

-- Insert Sample Projects
INSERT INTO "Projects" ("Title", "Description", "Deadline") VALUES
('AI Research Initiative', 'Comprehensive study on artificial intelligence applications', '2024-12-31 23:59:59'),
('Mobile App Development', 'Cross-platform mobile application for project management', '2024-11-15 18:00:00'),
('Data Analytics Platform', 'Real-time data processing and visualization system', '2024-10-30 17:30:00');

-- Insert Sample Tasks
INSERT INTO "Tasks" ("ProjectId", "Title", "Status") VALUES
(1, 'Literature Review', 'Completed'),
(1, 'Data Collection', 'In Progress'),
(2, 'UI/UX Design', 'Completed'),
(2, 'Frontend Development', 'In Progress'),
(3, 'Database Design', 'Completed'),
(3, 'ETL Pipeline Development', 'In Progress');

-- Insert Sample Notes
INSERT INTO "Notes" ("ProjectId", "Content", "Version") VALUES
(1, 'Initial project kickoff meeting completed. Key stakeholders identified.', 1),
(2, 'Design mockups approved by client. Moving to development phase.', 1),
(3, 'Database schema designed and implemented. Performance benchmarks established.', 1);

-- Insert Sample Files
INSERT INTO "Files" ("ProjectId", "FileName", "Url") VALUES
(1, 'research_proposal.pdf', '/files/ai_research/proposal.pdf'),
(2, 'ui_mockups.fig', '/files/mobile_app/mockups.fig'),
(3, 'database_schema.sql', '/files/analytics_platform/schema.sql');

-- ==============================================
-- VERIFICATION
-- ==============================================

-- Verify data insertion
SELECT 'Users' as table_name, COUNT(*) as record_count FROM "Users"
UNION ALL
SELECT 'Projects', COUNT(*) FROM "Projects"
UNION ALL
SELECT 'Tasks', COUNT(*) FROM "Tasks"
UNION ALL
SELECT 'Notes', COUNT(*) FROM "Notes"
UNION ALL
SELECT 'Files', COUNT(*) FROM "Files";

-- Display sample data
SELECT 'Sample Users:' as info;
SELECT * FROM "Users";

SELECT 'Sample Projects:' as info;
SELECT * FROM "Projects";

SELECT 'Sample Tasks:' as info;
SELECT * FROM "Tasks";

-- ==============================================
-- COMPLETION MESSAGE
-- ==============================================

SELECT 'Minimal database setup completed successfully!' as status;
SELECT 'You can now run the .NET API application.' as next_step;
