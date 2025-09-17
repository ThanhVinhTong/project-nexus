-- Project Nexus Database Seed Data
-- This file contains placeholder data for all tables in the ProjectNexus database
-- Run this script after creating the database and applying migrations

-- Clear existing data (optional - uncomment if you want to reset data)
-- DELETE FROM "Files";
-- DELETE FROM "Notes";
-- DELETE FROM "Tasks";
-- DELETE FROM "Projects";
-- DELETE FROM "Users";

-- Insert Users
INSERT INTO "Users" ("Name", "Email", "Role") VALUES
('John Smith', 'john.smith@example.com', 'Project Manager'),
('Sarah Johnson', 'sarah.johnson@example.com', 'Researcher'),
('Mike Davis', 'mike.davis@example.com', 'Developer'),
('Emily Wilson', 'emily.wilson@example.com', 'Designer'),
('David Brown', 'david.brown@example.com', 'Researcher'),
('Lisa Anderson', 'lisa.anderson@example.com', 'Project Manager'),
('Tom Miller', 'tom.miller@example.com', 'Developer'),
('Anna Garcia', 'anna.garcia@example.com', 'Designer');

-- Insert Projects
INSERT INTO "Projects" ("Title", "Description", "Deadline") VALUES
('AI Research Initiative', 'Comprehensive study on artificial intelligence applications in healthcare', '2024-12-31 23:59:59'),
('Mobile App Development', 'Cross-platform mobile application for project management', '2024-11-15 18:00:00'),
('Data Analytics Platform', 'Real-time data processing and visualization system', '2024-10-30 17:30:00'),
('User Experience Study', 'Research on user behavior patterns and interface design', '2024-09-20 16:00:00'),
('Cloud Migration Project', 'Migrating legacy systems to cloud infrastructure', '2024-12-15 20:00:00'),
('Machine Learning Model', 'Developing predictive models for business intelligence', '2024-11-30 19:00:00'),
('Security Audit', 'Comprehensive security assessment and vulnerability testing', '2024-10-10 15:30:00'),
('API Integration', 'Third-party service integration and API development', '2024-09-25 14:00:00');

-- Insert Tasks
INSERT INTO "Tasks" ("ProjectId", "Title", "Status") VALUES
-- AI Research Initiative tasks
(1, 'Literature Review', 'Completed'),
(1, 'Data Collection', 'In Progress'),
(1, 'Algorithm Development', 'Pending'),
(1, 'Testing and Validation', 'Pending'),
(1, 'Documentation', 'Pending'),

-- Mobile App Development tasks
(2, 'UI/UX Design', 'Completed'),
(2, 'Frontend Development', 'In Progress'),
(2, 'Backend API Integration', 'Pending'),
(2, 'Testing', 'Pending'),
(2, 'App Store Submission', 'Pending'),

-- Data Analytics Platform tasks
(3, 'Database Design', 'Completed'),
(3, 'ETL Pipeline Development', 'In Progress'),
(3, 'Visualization Components', 'Pending'),
(3, 'Performance Optimization', 'Pending'),
(3, 'User Training', 'Pending'),

-- User Experience Study tasks
(4, 'User Research Planning', 'Completed'),
(4, 'User Interviews', 'In Progress'),
(4, 'Data Analysis', 'Pending'),
(4, 'Report Generation', 'Pending'),
(4, 'Recommendations', 'Pending'),

-- Cloud Migration Project tasks
(5, 'Infrastructure Assessment', 'Completed'),
(5, 'Migration Planning', 'In Progress'),
(5, 'Data Migration', 'Pending'),
(5, 'Application Deployment', 'Pending'),
(5, 'Performance Testing', 'Pending'),

-- Machine Learning Model tasks
(6, 'Data Preprocessing', 'Completed'),
(6, 'Model Training', 'In Progress'),
(6, 'Model Evaluation', 'Pending'),
(6, 'Model Deployment', 'Pending'),
(6, 'Monitoring Setup', 'Pending'),

-- Security Audit tasks
(7, 'Vulnerability Assessment', 'Completed'),
(7, 'Penetration Testing', 'In Progress'),
(7, 'Security Report', 'Pending'),
(7, 'Remediation Planning', 'Pending'),
(7, 'Follow-up Testing', 'Pending'),

-- API Integration tasks
(8, 'API Documentation Review', 'Completed'),
(8, 'Authentication Setup', 'In Progress'),
(8, 'Endpoint Integration', 'Pending'),
(8, 'Error Handling', 'Pending'),
(8, 'Performance Testing', 'Pending');

-- Insert Notes
INSERT INTO "Notes" ("ProjectId", "Content", "Version") VALUES
-- AI Research Initiative notes
(1, 'Initial project kickoff meeting completed. Key stakeholders identified and project scope defined.', 1),
(1, 'Literature review phase started. Found 50+ relevant papers on AI in healthcare applications.', 2),
(1, 'Data collection methodology approved by ethics committee. Ready to begin data gathering.', 3),

-- Mobile App Development notes
(2, 'Design mockups approved by client. Moving to development phase.', 1),
(2, 'Frontend framework selected: React Native for cross-platform compatibility.', 2),
(2, 'Backend API endpoints defined. Authentication system implemented.', 3),

-- Data Analytics Platform notes
(3, 'Database schema designed and implemented. Performance benchmarks established.', 1),
(3, 'ETL pipeline processing 1M+ records daily. No performance issues detected.', 2),
(3, 'Visualization library selected: D3.js for interactive charts and graphs.', 3),

-- User Experience Study notes
(4, 'Research methodology approved. Target user group: 25-45 year old professionals.', 1),
(4, 'User interviews completed with 20 participants. Rich qualitative data collected.', 2),
(4, 'Preliminary analysis shows strong preference for intuitive navigation patterns.', 3),

-- Cloud Migration Project notes
(5, 'Current infrastructure assessment completed. 15 legacy systems identified for migration.', 1),
(5, 'Migration strategy approved. Phased approach over 6 months to minimize disruption.', 2),
(5, 'First phase migration completed successfully. 3 systems moved to cloud.', 3),

-- Machine Learning Model notes
(6, 'Dataset prepared with 100K+ training samples. Data quality validation completed.', 1),
(6, 'Model training in progress. Using XGBoost algorithm for classification tasks.', 2),
(6, 'Initial model accuracy: 87%. Fine-tuning parameters to improve performance.', 3),

-- Security Audit notes
(7, 'Security assessment scope defined. All systems and applications included.', 1),
(7, 'Vulnerability scan completed. 12 medium-risk issues identified.', 2),
(7, 'Penetration testing in progress. No critical vulnerabilities found so far.', 3),

-- API Integration notes
(8, 'Third-party API documentation reviewed. Rate limits and authentication requirements noted.', 1),
(8, 'Authentication system implemented using OAuth 2.0. Test credentials obtained.', 2),
(8, 'First API endpoint integrated successfully. Response time within acceptable limits.', 3);

-- Insert Files
INSERT INTO "Files" ("ProjectId", "FileName", "Url") VALUES
-- AI Research Initiative files
(1, 'research_proposal.pdf', '/files/ai_research/proposal.pdf'),
(1, 'literature_review.docx', '/files/ai_research/literature_review.docx'),
(1, 'data_collection_template.xlsx', '/files/ai_research/data_template.xlsx'),
(1, 'algorithm_specification.md', '/files/ai_research/algorithm_spec.md'),

-- Mobile App Development files
(2, 'ui_mockups.fig', '/files/mobile_app/mockups.fig'),
(2, 'design_system.pdf', '/files/mobile_app/design_system.pdf'),
(2, 'api_specification.json', '/files/mobile_app/api_spec.json'),
(2, 'test_plan.docx', '/files/mobile_app/test_plan.docx'),

-- Data Analytics Platform files
(3, 'database_schema.sql', '/files/analytics_platform/schema.sql'),
(3, 'etl_scripts.py', '/files/analytics_platform/etl_scripts.py'),
(3, 'dashboard_config.json', '/files/analytics_platform/dashboard_config.json'),
(3, 'performance_report.pdf', '/files/analytics_platform/performance.pdf'),

-- User Experience Study files
(4, 'research_methodology.pdf', '/files/ux_study/methodology.pdf'),
(4, 'interview_questions.docx', '/files/ux_study/interview_questions.docx'),
(4, 'user_personas.pdf', '/files/ux_study/personas.pdf'),
(4, 'findings_report.pptx', '/files/ux_study/findings.pptx'),

-- Cloud Migration Project files
(5, 'infrastructure_assessment.pdf', '/files/cloud_migration/assessment.pdf'),
(5, 'migration_plan.docx', '/files/cloud_migration/plan.docx'),
(5, 'cost_analysis.xlsx', '/files/cloud_migration/cost_analysis.xlsx'),
(5, 'migration_checklist.pdf', '/files/cloud_migration/checklist.pdf'),

-- Machine Learning Model files
(6, 'dataset.csv', '/files/ml_model/dataset.csv'),
(6, 'model_training.py', '/files/ml_model/training_script.py'),
(6, 'model_evaluation.ipynb', '/files/ml_model/evaluation.ipynb'),
(6, 'model_metrics.json', '/files/ml_model/metrics.json'),

-- Security Audit files
(7, 'security_assessment.pdf', '/files/security_audit/assessment.pdf'),
(7, 'vulnerability_report.xlsx', '/files/security_audit/vulnerabilities.xlsx'),
(7, 'penetration_test_results.pdf', '/files/security_audit/pen_test.pdf'),
(7, 'remediation_plan.docx', '/files/security_audit/remediation.docx'),

-- API Integration files
(8, 'api_documentation.pdf', '/files/api_integration/api_docs.pdf'),
(8, 'integration_specification.json', '/files/api_integration/spec.json'),
(8, 'test_scripts.py', '/files/api_integration/test_scripts.py'),
(8, 'error_handling_guide.md', '/files/api_integration/error_handling.md');

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
