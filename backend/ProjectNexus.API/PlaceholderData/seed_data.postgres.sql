-- Postgres seed data for ProjectNexus
-- Mirrors PlaceholderData/seed_data.sql but for PostgreSQL
-- Enums stored as text (per current models). Dates use now() and intervals.

BEGIN;

-- Clear all data in the correct order (respecting foreign keys)
DELETE FROM "RefreshTokens";
DELETE FROM "UserTasks";
DELETE FROM "ProjectUsers";
DELETE FROM "Activities";
DELETE FROM "References";
DELETE FROM "Notes";
DELETE FROM "Tasks";
DELETE FROM "Projects";
DELETE FROM "Users";

-- Reset the ID sequences to start from 1
ALTER SEQUENCE "Users_UserId_seq" RESTART WITH 1;
ALTER SEQUENCE "Projects_ProjectId_seq" RESTART WITH 1;
ALTER SEQUENCE "Tasks_TaskId_seq" RESTART WITH 1;
ALTER SEQUENCE "Notes_NoteId_seq" RESTART WITH 1;
ALTER SEQUENCE "References_ReferenceId_seq" RESTART WITH 1;
ALTER SEQUENCE "Activities_ActivityId_seq" RESTART WITH 1;
ALTER SEQUENCE "RefreshTokens_RefreshTokenId_seq" RESTART WITH 1;
ALTER SEQUENCE "ProjectUsers_ProjectUserId_seq" RESTART WITH 1;

-- =========================
-- Users (15)
-- =========================
INSERT INTO "Users" ("UserId","LegalName","UserName","Email","HashedPassword","Role","CreatedAt","UpdatedAt","LastLoginAt","IsEmailVerified","EmailVerificationToken","EmailVerificationTokenExpires","IsActive") OVERRIDING SYSTEM VALUE VALUES
    (1,'Alice Johnson','alice','alice@example.com','hashed_pass','Admin',now(),now(),now() - interval '2 hours',true,NULL,NULL,true),
    (2,'Bob Martinez','bob','bob@example.com','hashed_pass','Manager',now(),now(),now() - interval '1 day',true,NULL,NULL,true),
    (3,'Carol Singh','carol','carol@example.com','hashed_pass','Developer',now(),now(),now() - interval '3 hours',true,NULL,NULL,true),
    (4,'David Kim','david','david@example.com','hashed_pass','Designer',now(),now(),now() - interval '6 hours',true,NULL,NULL,true),
    (5,'Eva Chen','eva','eva@example.com','hashed_pass','Analyst',now(),now(),now() - interval '1 day',true,NULL,NULL,true),
    (6,'Frank Wright','frank','frank@example.com','hashed_pass','Tester',now(),now(),now() - interval '4 hours',true,NULL,NULL,true),
    (7,'Grace Lee','grace','grace@example.com','hashed_pass','Designer',now(),now(),now() - interval '2 days',true,NULL,NULL,true),
    (8,'Henry Adams','henry','henry@example.com','hashed_pass','Developer',now(),now(),now() - interval '5 hours',true,NULL,NULL,true),
    (9,'Isabella Torres','isa','isa@example.com','hashed_pass','Designer',now(),now(),now() - interval '1 day',true,NULL,NULL,true),
    (10,'Jack Nguyen','jack','jack@example.com','hashed_pass','Manager',now(),now(),now() - interval '3 days',true,NULL,NULL,true),
    (11,'Karen Patel','karen','karen@example.com','hashed_pass','Developer',now(),now(),now() - interval '2 hours',true,NULL,NULL,true),
    (12,'Leo Brown','leo','leo@example.com','hashed_pass','Analyst',now(),now(),now() - interval '1 day',true,NULL,NULL,true),
    (13,'Mia Davis','mia','mia@example.com','hashed_pass','Designer',now(),now(),now() - interval '4 hours',true,NULL,NULL,true),
    (14,'Noah Wilson','noah','noah@example.com','hashed_pass','Tester',now(),now(),now() - interval '6 hours',true,NULL,NULL,true),
    (15,'Olivia Garcia','olivia','olivia@example.com','hashed_pass','Designer',now(),now(),now() - interval '2 days',true,NULL,NULL,true);

-- =========================
-- Projects (5)
-- =========================
INSERT INTO "Projects" ("ProjectId","Title","Description","Deadline","Status","CreatedAt","UpdatedAt") OVERRIDING SYSTEM VALUE VALUES
    (1,'Nexus Core Platform','Foundational services and APIs for Project Nexus',now() + interval '60 days','In Progress',now(),now()),
    (2,'AI Research Initiative','Exploratory research on ML models for Nexus',now() + interval '120 days','Planning',now(),now()),
    (3,'Website Revamp','Marketing site redesign for public launch',now() + interval '30 days','In Progress',now(),now()),
    (4,'Mobile App MVP','Initial cross-platform app for Nexus',now() + interval '75 days','Planning',now(),now()),
    (5,'Data Pipeline','ETL and analytics pipeline for telemetry',now() + interval '90 days','In Progress',now(),now());

-- =========================
-- ProjectUsers (membership/permissions)
-- =========================
INSERT INTO "ProjectUsers" ("ProjectUserId","ProjectId","UserId","UserPermission","CreatedAt","UpdatedAt") VALUES
    -- Project 1
    (1,1,1,'Owner',now(),now()), (2,1,2,'Editor',now(),now()), (3,1,3,'Viewer',now(),now()),
    (4,1,4,'Contributor',now(),now()), (5,1,7,'Contributor',now(),now()), (6,1,8,'Viewer',now(),now()),
    -- Project 2
    (7,2,2,'Editor',now(),now()), (8,2,3,'Viewer',now(),now()), (9,2,5,'Analyst',now(),now()),
    (10,2,11,'Viewer',now(),now()), (11,2,15,'Contributor',now(),now()),
    -- Project 3
    (12,3,2,'Editor',now(),now()), (13,3,4,'Contributor',now(),now()), (14,3,6,'Tester',now(),now()),
    (15,3,9,'Contributor',now(),now()), (16,3,13,'Contributor',now(),now()),
    -- Project 4
    (17,4,10,'Editor',now(),now()), (18,4,7,'Contributor',now(),now()), (19,4,12,'Analyst',now(),now()),
    (20,4,14,'Tester',now(),now()), (21,4,1,'Owner',now(),now()),
    -- Project 5
    (22,5,2,'Editor',now(),now()), (23,5,8,'Viewer',now(),now()), (24,5,9,'Contributor',now(),now()),
    (25,5,11,'Viewer',now(),now()), (26,5,15,'Contributor',now(),now());

-- =========================
-- Tasks (~50)
-- =========================
INSERT INTO "Tasks" ("TaskId","ProjectId","Title","Type","Priority","DueDate","CreatedAt","UpdatedAt") OVERRIDING SYSTEM VALUE VALUES
    -- Project 1 tasks 1-15
    (1,1,'Design authentication flow','Design','High',now() + interval '14 days',now(),now()),
    (2,1,'Implement JWT middleware','Implementation','Medium',now() + interval '21 days',now(),now()),
    (3,1,'Define domain models','Planning','Medium',now() + interval '7 days',now(),now()),
    (4,1,'Create API versioning strategy','Design','Low',now() + interval '18 days',now(),now()),
    (5,1,'Set up observability stack','Implementation','High',now() + interval '25 days',now(),now()),
    (6,1,'Role-based authorization policy','Design','Medium',now() + interval '16 days',now(),now()),
    (7,1,'Health checks and liveness probes','Implementation','Low',now() + interval '20 days',now(),now()),
    (8,1,'Document core domain events','Documentation','Critical',now() + interval '22 days',now(),now()),
    (9,1,'Cache invalidation strategy','Design','Medium',now() + interval '19 days',now(),now()),
    (10,1,'Database migration guidelines','Planning','Low',now() + interval '26 days',now(),now()),
    (11,1,'Security review meeting','Implementation','Medium',now() + interval '12 days',now(),now()),
    (12,1,'API gateway POC','Design','High',now() + interval '24 days',now(),now()),
    (13,1,'Exception handling middleware','Implementation','Medium',now() + interval '23 days',now(),now()),
    (14,1,'CQRS documentation','Documentation','Critical',now() + interval '28 days',now(),now()),
    (15,1,'Rate limiting policy','Design','Medium',now() + interval '17 days',now(),now()),
    -- Project 2 tasks 16-30
    (16,2,'Literature review on RAG','Design','Low',now() + interval '28 days',now(),now()),
    (17,2,'Prepare experiment dataset','Planning','Low',now() + interval '35 days',now(),now()),
    (18,2,'Baseline model training','Implementation','Medium',now() + interval '30 days',now(),now()),
    (19,2,'Prompt evaluation framework','Design','Medium',now() + interval '33 days',now(),now()),
    (20,2,'Data labeling guidelines','Design','Low',now() + interval '31 days',now(),now()),
    (21,2,'Hyperparameter search plan','Planning','Low',now() + interval '40 days',now(),now()),
    (22,2,'Dataset versioning with DVC','Implementation','Medium',now() + interval '36 days',now(),now()),
    (23,2,'Build evaluation dashboard','Design','High',now() + interval '45 days',now(),now()),
    (24,2,'Benchmark competitor models','Documentation','Critical',now() + interval '44 days',now(),now()),
    (25,2,'Ethics and bias review','Design','Medium',now() + interval '50 days',now(),now()),
    (26,2,'Prepare research report template','Planning','Low',now() + interval '38 days',now(),now()),
    (27,2,'Create experiment tracking SOP','Design','Low',now() + interval '39 days',now(),now()),
    (28,2,'Optimize inference latency','Implementation','Medium',now() + interval '41 days',now(),now()),
    (29,2,'Reproduce key papers','Documentation','Critical',now() + interval '47 days',now(),now()),
    (30,2,'Prepare demo for stakeholders','Design','High',now() + interval '49 days',now(),now()),
    -- Project 3 tasks 31-40
    (31,3,'Finalize site IA','Implementation','Medium',now() + interval '10 days',now(),now()),
    (32,3,'Build landing page','Design','High',now() + interval '15 days',now(),now()),
    (33,3,'Content proofread','Documentation','Critical',now() + interval '18 days',now(),now()),
    (34,3,'Implement blog layout','Design','Medium',now() + interval '22 days',now(),now()),
    (35,3,'Set up analytics','Implementation','Low',now() + interval '20 days',now(),now()),
    (36,3,'Accessibility audit','Design','High',now() + interval '19 days',now(),now()),
    (37,3,'Cross-browser testing','Implementation','Medium',now() + interval '21 days',now(),now()),
    (38,3,'SEO checklist','Design','Medium',now() + interval '16 days',now(),now()),
    (39,3,'CMS integration','Implementation','Medium',now() + interval '24 days',now(),now()),
    (40,3,'Finalize component library','Design','High',now() + interval '25 days',now(),now()),
    -- Project 4 tasks 41-45
    (41,4,'Define mobile architecture','Design','High',now() + interval '30 days',now(),now()),
    (42,4,'Auth flow for mobile','Design','Medium',now() + interval '28 days',now(),now()),
    (43,4,'Set up CI for mobile','Implementation','Low',now() + interval '32 days',now(),now()),
    (44,4,'Push notifications POC','Planning','Low',now() + interval '35 days',now(),now()),
    (45,4,'Offline storage strategy','Design','Medium',now() + interval '34 days',now(),now()),
    -- Project 5 tasks 46-50
    (46,5,'Define data contracts','Design','High',now() + interval '27 days',now(),now()),
    (47,5,'Streaming ingestion POC','Implementation','Medium',now() + interval '29 days',now(),now()),
    (48,5,'Backfill strategy','Planning','Low',now() + interval '33 days',now(),now()),
    (49,5,'Data quality checks','Design','Medium',now() + interval '31 days',now(),now()),
    (50,5,'dbt model structure','Design','High',now() + interval '36 days',now(),now());

-- =========================
-- UserTasks (assignment + comments)
-- =========================
INSERT INTO "UserTasks" ("UserId","TaskId","Comment","CreatedAt","UpdatedAt") VALUES
    -- Project 1 tasks
    (1,1,'Designing auth flow and sequence charts',now(),now()),
    (4,2,'JWT middleware and validation',now(),now()),
    (3,3,'Finalized domain models',now(),now()),
    (7,4,'Drafting API versioning doc',now(),now()),
    (8,5,'Setting up Prometheus/Grafana',now(),now()),
    (1,6,'Policies for roles',now(),now()),
    (4,7,'Health checks added',now(),now()),
    (3,8,'Reviewed domain events',now(),now()),
    (7,9,'Cache invalidation plan',now(),now()),
    (8,10,'Migration runbook drafted',now(),now()),
    (2,11,'Security review scheduled',now(),now()),
    (1,12,'API gateway spike',now(),now()),
    (4,13,'Exception middleware complete',now(),now()),
    (3,14,'CQRS docs ready',now(),now()),
    (7,15,'Rate limits defined',now(),now()),
    -- Project 2 tasks
    (3,16,'RAG references collected',now(),now()),
    (5,17,'Dataset prepared',now(),now()),
    (9,18,'Baseline trained',now(),now()),
    (11,19,'Eval framework design',now(),now()),
    (15,20,'Labeling guideline draft',now(),now()),
    (3,21,'Hparam search plan',now(),now()),
    (5,22,'DVC setup complete',now(),now()),
    (9,23,'Dashboards started',now(),now()),
    (11,24,'Benchmarks summarized',now(),now()),
    (15,25,'Ethics review scheduled',now(),now()),
    (3,26,'Report template created',now(),now()),
    (5,27,'SOP drafted',now(),now()),
    (9,28,'Latency optimizations tested',now(),now()),
    (11,29,'Reproduction notes added',now(),now()),
    (15,30,'Stakeholder demo outline',now(),now()),
    -- Project 3 tasks
    (2,31,'IA finalized',now(),now()),
    (4,32,'Landing page components',now(),now()),
    (6,33,'Proofreading complete',now(),now()),
    (13,34,'Blog layout implemented',now(),now()),
    (9,35,'Analytics configured',now(),now()),
    (7,36,'A11y audit underway',now(),now()),
    (14,37,'Cross-browser tests',now(),now()),
    (2,38,'SEO checklist prepared',now(),now()),
    (4,39,'CMS integrated',now(),now()),
    (13,40,'Component library done',now(),now()),
    -- Project 4 tasks
    (10,41,'Mobile architecture',now(),now()),
    (7,42,'Mobile auth flow',now(),now()),
    (12,43,'CI configured',now(),now()),
    (14,44,'Push notifications POC',now(),now()),
    (15,45,'Offline storage design',now(),now()),
    -- Project 5 tasks
    (2,46,'Data contracts defined',now(),now()),
    (8,47,'Streaming pipeline POC',now(),now()),
    (9,48,'Backfill plan outlined',now(),now()),
    (11,49,'Quality checks documented',now(),now()),
    (13,50,'dbt models drafted',now(),now());

-- =========================
-- Notes
-- =========================
INSERT INTO "Notes" ("NoteId","ProjectId","Content","CreatedAt","UpdatedAt") OVERRIDING SYSTEM VALUE VALUES
    (1,1,'Enforce password policies and MFA integration.',now(),now()),
    (2,1,'Document deployment checklist for backend.',now(),now()),
    (3,2,'Track experiments with clear versioning.',now(),now()),
    (4,2,'Maintain research diary entries weekly.',now(),now()),
    (5,3,'Coordinate with marketing for launch copy.',now(),now()),
    (6,3,'Confirm CMS roles and permissions.',now(),now()),
    (7,4,'Validate offline-first user flows.',now(),now()),
    (8,4,'Decide on deep-linking strategy.',now(),now()),
    (9,5,'Define SLOs for data freshness.',now(),now()),
    (10,5,'Add lineage tracking to pipeline.',now(),now());

-- =========================
-- References
-- =========================
INSERT INTO "References" ("ReferenceId","ProjectId","ReferenceName","Url","Description","Authors","CreatedAt","UpdatedAt") OVERRIDING SYSTEM VALUE VALUES
    (1,1,'OWASP ASVS','https://owasp.org/www-project-application-security-verification-standard/','Security verification standard',NULL,now(),now()),
    (2,2,'Attention Is All You Need','https://arxiv.org/abs/1706.03762','Transformer architecture paper','Vaswani et al.',now(),now()),
    (3,3,'Web Content Accessibility Guidelines','https://www.w3.org/WAI/standards-guidelines/wcag/','WCAG guidance for accessibility',NULL,now(),now()),
    (4,4,'Mobile App Security Checklist','https://owasp.org/www-project-mobile-security-testing-guide/','OWASP MSTG highlights',NULL,now(),now()),
    (5,5,'Data Engineering Patterns','https://martinfowler.com/articles/202205-refactoring-data-pipelines.html','Refactoring data pipelines','Martin Fowler',now(),now());

-- =========================
-- Activities (project timeline log)
-- =========================
INSERT INTO "Activities" ("ActivityId","ProjectId","Message","CreatedAt","UpdatedAt") OVERRIDING SYSTEM VALUE VALUES
    (1,1,'Initialized repository and CI pipeline.',now(),now()),
    (2,1,'Completed domain model review.',now(),now()),
    (3,2,'Defined initial research scope.',now(),now()),
    (4,2,'Set up experiment tracking workflow.',now(),now()),
    (5,3,'Approved homepage wireframes.',now(),now()),
    (6,3,'Deployed preview to staging.',now(),now()),
    (7,4,'Kickoff for mobile MVP.',now(),now()),
    (8,4,'Completed auth flow diagrams.',now(),now()),
    (9,5,'Ingestion pipeline prototype complete.',now(),now()),
    (10,5,'Set up data quality gates.',now(),now());

-- =========================
-- RefreshTokens (sample tokens for active users)
-- =========================
INSERT INTO "RefreshTokens" ("RefreshTokenId","Token","UserId","ExpiresAt","CreatedAt","IsRevoked","RevokedAt","RevokedByIp") OVERRIDING SYSTEM VALUE VALUES
    (1,'sample_refresh_token_1',1,now() + interval '7 days',now() - interval '1 hour',false,NULL,NULL),
    (2,'sample_refresh_token_2',2,now() + interval '7 days',now() - interval '2 hours',false,NULL,NULL),
    (3,'sample_refresh_token_3',3,now() + interval '7 days',now() - interval '30 minutes',false,NULL,NULL),
    (4,'sample_refresh_token_4',4,now() + interval '7 days',now() - interval '45 minutes',false,NULL,NULL),
    (5,'sample_refresh_token_5',5,now() + interval '7 days',now() - interval '1 hour',false,NULL,NULL),
    (6,'expired_refresh_token',6,now() - interval '1 day',now() - interval '8 days',true,now() - interval '1 day','192.168.1.100'),
    (7,'revoked_refresh_token',7,now() + interval '7 days',now() - interval '2 days',true,now() - interval '1 hour','192.168.1.101');

COMMIT;
