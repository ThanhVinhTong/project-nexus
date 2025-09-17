-- Project Nexus Sample Data (Minimal Set)
-- This file contains a minimal set of placeholder data for quick testing
-- Run this script after creating the database and applying migrations

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
