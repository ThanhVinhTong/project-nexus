-- Postgres seed data for ProjectNexus
-- Mirrors PlaceholderData/seed_data.sql but for PostgreSQL
-- Enums stored as integers (per EF Core). Dates use now() and intervals.

BEGIN;

-- Clear tables in FK-safe order
DELETE FROM "UserTasks";
DELETE FROM "ProjectUsers";
DELETE FROM "Activities";
DELETE FROM "References";
DELETE FROM "Notes";
DELETE FROM "Tasks";
DELETE FROM "Projects";
DELETE FROM "Users";

-- =========================
-- Users (15)
-- =========================
INSERT INTO "Users" ("Id","LegalName","UserName","Email","Role","CreatedAt","UpdatedAt") OVERRIDING SYSTEM VALUE VALUES
    (1,'Alice Johnson','alice','alice@example.com',0,now(),now()),
    (2,'Bob Martinez','bob','bob@example.com',1,now(),now()),
    (3,'Carol Singh','carol','carol@example.com',2,now(),now()),
    (4,'David Kim','david','david@example.com',3,now(),now()),
    (5,'Eva Chen','eva','eva@example.com',4,now(),now()),
    (6,'Frank Wright','frank','frank@example.com',5,now(),now()),
    (7,'Grace Lee','grace','grace@example.com',3,now(),now()),
    (8,'Henry Adams','henry','henry@example.com',2,now(),now()),
    (9,'Isabella Torres','isa','isa@example.com',3,now(),now()),
    (10,'Jack Nguyen','jack','jack@example.com',1,now(),now()),
    (11,'Karen Patel','karen','karen@example.com',2,now(),now()),
    (12,'Leo Brown','leo','leo@example.com',4,now(),now()),
    (13,'Mia Davis','mia','mia@example.com',3,now(),now()),
    (14,'Noah Wilson','noah','noah@example.com',5,now(),now()),
    (15,'Olivia Garcia','olivia','olivia@example.com',3,now(),now());

-- =========================
-- Projects (5)
-- =========================
INSERT INTO "Projects" ("Id","Title","Description","Deadline","Status","CreatedAt","UpdatedAt") OVERRIDING SYSTEM VALUE VALUES
    (101,'Nexus Core Platform','Foundational services and APIs for Project Nexus',now() + interval '60 days',1,now(),now()),
    (102,'AI Research Initiative','Exploratory research on ML models for Nexus',now() + interval '120 days',0,now(),now()),
    (103,'Website Revamp','Marketing site redesign for public launch',now() + interval '30 days',1,now(),now()),
    (104,'Mobile App MVP','Initial cross-platform app for Nexus',now() + interval '75 days',0,now(),now()),
    (105,'Data Pipeline','ETL and analytics pipeline for telemetry',now() + interval '90 days',1,now(),now());

-- =========================
-- ProjectUsers (membership/permissions)
-- =========================
INSERT INTO "ProjectUsers" ("ProjectId","UserId","UserPermission","CreatedAt","UpdatedAt") VALUES
    -- Project 101
    (101,1,0,now(),now()), (101,2,1,now(),now()), (101,3,2,now(),now()),
    (101,4,3,now(),now()), (101,7,3,now(),now()), (101,8,2,now(),now()),
    -- Project 102
    (102,2,1,now(),now()), (102,3,2,now(),now()), (102,5,4,now(),now()),
    (102,11,2,now(),now()), (102,15,3,now(),now()),
    -- Project 103
    (103,2,1,now(),now()), (103,4,3,now(),now()), (103,6,5,now(),now()),
    (103,9,3,now(),now()), (103,13,3,now(),now()),
    -- Project 104
    (104,10,1,now(),now()), (104,7,3,now(),now()), (104,12,4,now(),now()),
    (104,14,5,now(),now()), (104,1,0,now(),now()),
    -- Project 105
    (105,2,1,now(),now()), (105,8,2,now(),now()), (105,9,3,now(),now()),
    (105,11,2,now(),now()), (105,15,3,now(),now());

-- =========================
-- Tasks (~50)
-- =========================
INSERT INTO "Tasks" ("Id","ProjectId","UserName","Title","Type","Priority","DueDate","CreatedAt","UpdatedAt") OVERRIDING SYSTEM VALUE VALUES
    -- Project 101 tasks 1001-1015
    (1001,101,'alice','Design authentication flow',1,0,now() + interval '14 days',now(),now()),
    (1002,101,'david','Implement JWT middleware',2,1,now() + interval '21 days',now(),now()),
    (1003,101,'carol','Define domain models',3,1,now() + interval '7 days',now(),now()),
    (1004,101,'grace','Create API versioning strategy',1,2,now() + interval '18 days',now(),now()),
    (1005,101,'henry','Set up observability stack',2,0,now() + interval '25 days',now(),now()),
    (1006,101,'alice','Role-based authorization policy',1,1,now() + interval '16 days',now(),now()),
    (1007,101,'david','Health checks and liveness probes',2,2,now() + interval '20 days',now(),now()),
    (1008,101,'carol','Document core domain events',4,3,now() + interval '22 days',now(),now()),
    (1009,101,'grace','Cache invalidation strategy',1,1,now() + interval '19 days',now(),now()),
    (1010,101,'henry','Database migration guidelines',0,2,now() + interval '26 days',now(),now()),
    (1011,101,'bob','Security review meeting',2,1,now() + interval '12 days',now(),now()),
    (1012,101,'alice','API gateway POC',1,0,now() + interval '24 days',now(),now()),
    (1013,101,'david','Exception handling middleware',2,1,now() + interval '23 days',now(),now()),
    (1014,101,'carol','CQRS documentation',4,3,now() + interval '28 days',now(),now()),
    (1015,101,'grace','Rate limiting policy',1,1,now() + interval '17 days',now(),now()),
    -- Project 102 tasks 1016-1030
    (1016,102,'carol','Literature review on RAG',1,2,now() + interval '28 days',now(),now()),
    (1017,102,'eva','Prepare experiment dataset',0,2,now() + interval '35 days',now(),now()),
    (1018,102,'isa','Baseline model training',2,1,now() + interval '30 days',now(),now()),
    (1019,102,'karen','Prompt evaluation framework',1,1,now() + interval '33 days',now(),now()),
    (1020,102,'olivia','Data labeling guidelines',1,2,now() + interval '31 days',now(),now()),
    (1021,102,'carol','Hyperparameter search plan',0,2,now() + interval '40 days',now(),now()),
    (1022,102,'eva','Dataset versioning with DVC',2,1,now() + interval '36 days',now(),now()),
    (1023,102,'isa','Build evaluation dashboard',1,0,now() + interval '45 days',now(),now()),
    (1024,102,'karen','Benchmark competitor models',4,3,now() + interval '44 days',now(),now()),
    (1025,102,'olivia','Ethics and bias review',1,1,now() + interval '50 days',now(),now()),
    (1026,102,'carol','Prepare research report template',0,2,now() + interval '38 days',now(),now()),
    (1027,102,'eva','Create experiment tracking SOP',1,2,now() + interval '39 days',now(),now()),
    (1028,102,'isa','Optimize inference latency',2,1,now() + interval '41 days',now(),now()),
    (1029,102,'karen','Reproduce key papers',4,3,now() + interval '47 days',now(),now()),
    (1030,102,'olivia','Prepare demo for stakeholders',1,0,now() + interval '49 days',now(),now()),
    -- Project 103 tasks 1031-1040
    (1031,103,'bob','Finalize site IA',2,1,now() + interval '10 days',now(),now()),
    (1032,103,'david','Build landing page',1,0,now() + interval '15 days',now(),now()),
    (1033,103,'frank','Content proofread',4,3,now() + interval '18 days',now(),now()),
    (1034,103,'mia','Implement blog layout',1,1,now() + interval '22 days',now(),now()),
    (1035,103,'isa','Set up analytics',2,2,now() + interval '20 days',now(),now()),
    (1036,103,'grace','Accessibility audit',1,0,now() + interval '19 days',now(),now()),
    (1037,103,'noah','Cross-browser testing',2,1,now() + interval '21 days',now(),now()),
    (1038,103,'bob','SEO checklist',1,1,now() + interval '16 days',now(),now()),
    (1039,103,'david','CMS integration',2,1,now() + interval '24 days',now(),now()),
    (1040,103,'mia','Finalize component library',1,0,now() + interval '25 days',now(),now()),
    -- Project 104 tasks 1041-1045
    (1041,104,'jack','Define mobile architecture',1,0,now() + interval '30 days',now(),now()),
    (1042,104,'grace','Auth flow for mobile',1,1,now() + interval '28 days',now(),now()),
    (1043,104,'leo','Set up CI for mobile',2,2,now() + interval '32 days',now(),now()),
    (1044,104,'noah','Push notifications POC',0,2,now() + interval '35 days',now(),now()),
    (1045,104,'olivia','Offline storage strategy',1,1,now() + interval '34 days',now(),now()),
    -- Project 105 tasks 1046-1050
    (1046,105,'bob','Define data contracts',1,0,now() + interval '27 days',now(),now()),
    (1047,105,'henry','Streaming ingestion POC',2,1,now() + interval '29 days',now(),now()),
    (1048,105,'isa','Backfill strategy',0,2,now() + interval '33 days',now(),now()),
    (1049,105,'karen','Data quality checks',1,1,now() + interval '31 days',now(),now()),
    (1050,105,'mia','dbt model structure',1,0,now() + interval '36 days',now(),now());

-- =========================
-- UserTasks (assignment + comments)
-- =========================
INSERT INTO "UserTasks" ("UserId","TaskId","Comment","CreatedAt","UpdatedAt") VALUES
    -- 101
    (1,1001,'Designing auth flow and sequence charts',now(),now()),
    (4,1002,'JWT middleware and validation',now(),now()),
    (3,1003,'Finalized domain models',now(),now()),
    (7,1004,'Drafting API versioning doc',now(),now()),
    (8,1005,'Setting up Prometheus/Grafana',now(),now()),
    (1,1006,'Policies for roles',now(),now()),
    (4,1007,'Health checks added',now(),now()),
    (3,1008,'Reviewed domain events',now(),now()),
    (7,1009,'Cache invalidation plan',now(),now()),
    (8,1010,'Migration runbook drafted',now(),now()),
    (2,1011,'Security review scheduled',now(),now()),
    (1,1012,'API gateway spike',now(),now()),
    (4,1013,'Exception middleware complete',now(),now()),
    (3,1014,'CQRS docs ready',now(),now()),
    (7,1015,'Rate limits defined',now(),now()),
    -- 102
    (3,1016,'RAG references collected',now(),now()),
    (5,1017,'Dataset prepared',now(),now()),
    (9,1018,'Baseline trained',now(),now()),
    (11,1019,'Eval framework design',now(),now()),
    (15,1020,'Labeling guideline draft',now(),now()),
    (3,1021,'Hparam search plan',now(),now()),
    (5,1022,'DVC setup complete',now(),now()),
    (9,1023,'Dashboards started',now(),now()),
    (11,1024,'Benchmarks summarized',now(),now()),
    (15,1025,'Ethics review scheduled',now(),now()),
    (3,1026,'Report template created',now(),now()),
    (5,1027,'SOP drafted',now(),now()),
    (9,1028,'Latency optimizations tested',now(),now()),
    (11,1029,'Reproduction notes added',now(),now()),
    (15,1030,'Stakeholder demo outline',now(),now()),
    -- 103
    (2,1031,'IA finalized',now(),now()),
    (4,1032,'Landing page components',now(),now()),
    (6,1033,'Proofreading complete',now(),now()),
    (13,1034,'Blog layout implemented',now(),now()),
    (9,1035,'Analytics configured',now(),now()),
    (7,1036,'A11y audit underway',now(),now()),
    (14,1037,'Cross-browser tests',now(),now()),
    (2,1038,'SEO checklist prepared',now(),now()),
    (4,1039,'CMS integrated',now(),now()),
    (13,1040,'Component library done',now(),now()),
    -- 104
    (10,1041,'Mobile architecture',now(),now()),
    (7,1042,'Mobile auth flow',now(),now()),
    (12,1043,'CI configured',now(),now()),
    (14,1044,'Push notifications POC',now(),now()),
    (15,1045,'Offline storage design',now(),now()),
    -- 105
    (2,1046,'Data contracts defined',now(),now()),
    (8,1047,'Streaming pipeline POC',now(),now()),
    (9,1048,'Backfill plan outlined',now(),now()),
    (11,1049,'Quality checks documented',now(),now()),
    (13,1050,'dbt models drafted',now(),now());

-- =========================
-- Notes
-- =========================
INSERT INTO "Notes" ("Id","ProjectId","Content","CreatedAt","UpdatedAt") OVERRIDING SYSTEM VALUE VALUES
    (2001,101,'Enforce password policies and MFA integration.',now(),now()),
    (2002,101,'Document deployment checklist for backend.',now(),now()),
    (2003,102,'Track experiments with clear versioning.',now(),now()),
    (2004,102,'Maintain research diary entries weekly.',now(),now()),
    (2005,103,'Coordinate with marketing for launch copy.',now(),now()),
    (2006,103,'Confirm CMS roles and permissions.',now(),now()),
    (2007,104,'Validate offline-first user flows.',now(),now()),
    (2008,104,'Decide on deep-linking strategy.',now(),now()),
    (2009,105,'Define SLOs for data freshness.',now(),now()),
    (2010,105,'Add lineage tracking to pipeline.',now(),now());

-- =========================
-- References
-- =========================
INSERT INTO "References" ("Id","ProjectId","ReferenceName","Url","Description","CreatedAt","UpdatedAt") OVERRIDING SYSTEM VALUE VALUES
    (3001,101,'OWASP ASVS','https://owasp.org/www-project-application-security-verification-standard/','Security verification standard',now(),now()),
    (3002,102,'Attention Is All You Need','https://arxiv.org/abs/1706.03762','Transformer architecture paper',now(),now()),
    (3003,103,'Web Content Accessibility Guidelines','https://www.w3.org/WAI/standards-guidelines/wcag/','WCAG guidance for accessibility',now(),now()),
    (3004,104,'Mobile App Security Checklist','https://owasp.org/www-project-mobile-security-testing-guide/','OWASP MSTG highlights',now(),now()),
    (3005,105,'Data Engineering Patterns','https://martinfowler.com/articles/202205-refactoring-data-pipelines.html','Refactoring data pipelines',now(),now());

-- =========================
-- Activities (project timeline log)
-- =========================
INSERT INTO "Activities" ("Id","ProjectId","Message","CreatedAt","UpdatedAt") OVERRIDING SYSTEM VALUE VALUES
    (4001,101,'Initialized repository and CI pipeline.',now(),now()),
    (4002,101,'Completed domain model review.',now(),now()),
    (4003,102,'Defined initial research scope.',now(),now()),
    (4004,102,'Set up experiment tracking workflow.',now(),now()),
    (4005,103,'Approved homepage wireframes.',now(),now()),
    (4006,103,'Deployed preview to staging.',now(),now()),
    (4007,104,'Kickoff for mobile MVP.',now(),now()),
    (4008,104,'Completed auth flow diagrams.',now(),now()),
    (4009,105,'Ingestion pipeline prototype complete.',now(),now()),
    (4010,105,'Set up data quality gates.',now(),now());

COMMIT;
