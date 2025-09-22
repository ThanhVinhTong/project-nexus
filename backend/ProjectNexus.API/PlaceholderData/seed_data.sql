-- Seed data for ProjectNexus
-- Assumes SQL Server. Uses explicit IDs via IDENTITY_INSERT for deterministic relationships.
-- Enums (int values):
-- UserRole: Admin=0, ProjectManager=1, Researcher=2, Associate=3, Intern=4, Viewer=5
-- Project.Status: Planning=0, Ongoing=1, Completed=2, Reopend=3
-- TaskType: Pending=0, To_Do=1, Ongoing=2, Completed=3, Need_Review=4
-- Priority: High=0, Medium=1, Low=2, Optional=3

SET NOCOUNT ON;
BEGIN TRY
    BEGIN TRAN;

    -- Optional: Clear tables in FK-safe order
    DELETE FROM [UserTasks];
    DELETE FROM [ProjectUsers];
    DELETE FROM [Activities];
    DELETE FROM [References];
    DELETE FROM [Notes];
    DELETE FROM [Tasks];
    DELETE FROM [Projects];
    DELETE FROM [Users];

    -- =========================
    -- Users (15)
    -- =========================
    SET IDENTITY_INSERT [Users] ON;
    INSERT INTO [Users] ([Id],[LegalName],[UserName],[Email],[Role],[CreatedAt],[UpdatedAt]) VALUES
        (1,'Alice Johnson','alice','alice@example.com',0,GETUTCDATE(),GETUTCDATE()),   -- Admin
        (2,'Bob Martinez','bob','bob@example.com',1,GETUTCDATE(),GETUTCDATE()),       -- ProjectManager
        (3,'Carol Singh','carol','carol@example.com',2,GETUTCDATE(),GETUTCDATE()),    -- Researcher
        (4,'David Kim','david','david@example.com',3,GETUTCDATE(),GETUTCDATE()),      -- Associate
        (5,'Eva Chen','eva','eva@example.com',4,GETUTCDATE(),GETUTCDATE()),           -- Intern
        (6,'Frank Wright','frank','frank@example.com',5,GETUTCDATE(),GETUTCDATE()),   -- Viewer
        (7,'Grace Lee','grace','grace@example.com',3,GETUTCDATE(),GETUTCDATE()),
        (8,'Henry Adams','henry','henry@example.com',2,GETUTCDATE(),GETUTCDATE()),
        (9,'Isabella Torres','isa','isa@example.com',3,GETUTCDATE(),GETUTCDATE()),
        (10,'Jack Nguyen','jack','jack@example.com',1,GETUTCDATE(),GETUTCDATE()),
        (11,'Karen Patel','karen','karen@example.com',2,GETUTCDATE(),GETUTCDATE()),
        (12,'Leo Brown','leo','leo@example.com',4,GETUTCDATE(),GETUTCDATE()),
        (13,'Mia Davis','mia','mia@example.com',3,GETUTCDATE(),GETUTCDATE()),
        (14,'Noah Wilson','noah','noah@example.com',5,GETUTCDATE(),GETUTCDATE()),
        (15,'Olivia Garcia','olivia','olivia@example.com',3,GETUTCDATE(),GETUTCDATE());
    SET IDENTITY_INSERT [Users] OFF;

    -- =========================
    -- Projects (5)
    -- =========================
    SET IDENTITY_INSERT [Projects] ON;
    INSERT INTO [Projects] ([Id],[Title],[Description],[Deadline],[Status],[CreatedAt],[UpdatedAt]) VALUES
        (101,'Nexus Core Platform','Foundational services and APIs for Project Nexus',DATEADD(DAY,60,GETUTCDATE()),1,GETUTCDATE(),GETUTCDATE()), -- Ongoing
        (102,'AI Research Initiative','Exploratory research on ML models for Nexus',DATEADD(DAY,120,GETUTCDATE()),0,GETUTCDATE(),GETUTCDATE()),  -- Planning
        (103,'Website Revamp','Marketing site redesign for public launch',DATEADD(DAY,30,GETUTCDATE()),1,GETUTCDATE(),GETUTCDATE()),            -- Ongoing
        (104,'Mobile App MVP','Initial cross-platform app for Nexus',DATEADD(DAY,75,GETUTCDATE()),0,GETUTCDATE(),GETUTCDATE()),                 -- Planning
        (105,'Data Pipeline','ETL and analytics pipeline for telemetry',DATEADD(DAY,90,GETUTCDATE()),1,GETUTCDATE(),GETUTCDATE());              -- Ongoing
    SET IDENTITY_INSERT [Projects] OFF;

    -- =========================
    -- ProjectUsers (membership/permissions)
    -- =========================
    INSERT INTO [ProjectUsers] ([ProjectId],[UserId],[UserPermission],[CreatedAt],[UpdatedAt]) VALUES
        -- Project 101
        (101,1,0,GETUTCDATE(),GETUTCDATE()), (101,2,1,GETUTCDATE(),GETUTCDATE()), (101,3,2,GETUTCDATE(),GETUTCDATE()),
        (101,4,3,GETUTCDATE(),GETUTCDATE()), (101,7,3,GETUTCDATE(),GETUTCDATE()), (101,8,2,GETUTCDATE(),GETUTCDATE()),
        -- Project 102
        (102,2,1,GETUTCDATE(),GETUTCDATE()), (102,3,2,GETUTCDATE(),GETUTCDATE()), (102,5,4,GETUTCDATE(),GETUTCDATE()),
        (102,11,2,GETUTCDATE(),GETUTCDATE()), (102,15,3,GETUTCDATE(),GETUTCDATE()),
        -- Project 103
        (103,2,1,GETUTCDATE(),GETUTCDATE()), (103,4,3,GETUTCDATE(),GETUTCDATE()), (103,6,5,GETUTCDATE(),GETUTCDATE()),
        (103,9,3,GETUTCDATE(),GETUTCDATE()), (103,13,3,GETUTCDATE(),GETUTCDATE()),
        -- Project 104
        (104,10,1,GETUTCDATE(),GETUTCDATE()), (104,7,3,GETUTCDATE(),GETUTCDATE()), (104,12,4,GETUTCDATE(),GETUTCDATE()),
        (104,14,5,GETUTCDATE(),GETUTCDATE()), (104,1,0,GETUTCDATE(),GETUTCDATE()),
        -- Project 105
        (105,2,1,GETUTCDATE(),GETUTCDATE()), (105,8,2,GETUTCDATE(),GETUTCDATE()), (105,9,3,GETUTCDATE(),GETUTCDATE()),
        (105,11,2,GETUTCDATE(),GETUTCDATE()), (105,15,3,GETUTCDATE(),GETUTCDATE());

    -- =========================
    -- Tasks (~50)
    -- =========================
    SET IDENTITY_INSERT [Tasks] ON;
    INSERT INTO [Tasks] ([Id],[ProjectId],[UserName],[Title],[Type],[Priority],[DueDate],[CreatedAt],[UpdatedAt]) VALUES
        -- Project 101 tasks 1001-1015
        (1001,101,'alice','Design authentication flow',1,0,DATEADD(DAY,14,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1002,101,'david','Implement JWT middleware',2,1,DATEADD(DAY,21,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1003,101,'carol','Define domain models',3,1,DATEADD(DAY,7,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1004,101,'grace','Create API versioning strategy',1,2,DATEADD(DAY,18,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1005,101,'henry','Set up observability stack',2,0,DATEADD(DAY,25,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1006,101,'alice','Role-based authorization policy',1,1,DATEADD(DAY,16,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1007,101,'david','Health checks and liveness probes',2,2,DATEADD(DAY,20,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1008,101,'carol','Document core domain events',4,3,DATEADD(DAY,22,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1009,101,'grace','Cache invalidation strategy',1,1,DATEADD(DAY,19,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1010,101,'henry','Database migration guidelines',0,2,DATEADD(DAY,26,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1011,101,'bob','Security review meeting',2,1,DATEADD(DAY,12,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1012,101,'alice','API gateway POC',1,0,DATEADD(DAY,24,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1013,101,'david','Exception handling middleware',2,1,DATEADD(DAY,23,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1014,101,'carol','CQRS documentation',4,3,DATEADD(DAY,28,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1015,101,'grace','Rate limiting policy',1,1,DATEADD(DAY,17,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        -- Project 102 tasks 1016-1030
        (1016,102,'carol','Literature review on RAG',1,2,DATEADD(DAY,28,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1017,102,'eva','Prepare experiment dataset',0,2,DATEADD(DAY,35,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1018,102,'isa','Baseline model training',2,1,DATEADD(DAY,30,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1019,102,'karen','Prompt evaluation framework',1,1,DATEADD(DAY,33,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1020,102,'olivia','Data labeling guidelines',1,2,DATEADD(DAY,31,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1021,102,'carol','Hyperparameter search plan',0,2,DATEADD(DAY,40,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1022,102,'eva','Dataset versioning with DVC',2,1,DATEADD(DAY,36,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1023,102,'isa','Build evaluation dashboard',1,0,DATEADD(DAY,45,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1024,102,'karen','Benchmark competitor models',4,3,DATEADD(DAY,44,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1025,102,'olivia','Ethics and bias review',1,1,DATEADD(DAY,50,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1026,102,'carol','Prepare research report template',0,2,DATEADD(DAY,38,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1027,102,'eva','Create experiment tracking SOP',1,2,DATEADD(DAY,39,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1028,102,'isa','Optimize inference latency',2,1,DATEADD(DAY,41,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1029,102,'karen','Reproduce key papers',4,3,DATEADD(DAY,47,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1030,102,'olivia','Prepare demo for stakeholders',1,0,DATEADD(DAY,49,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        -- Project 103 tasks 1031-1040
        (1031,103,'bob','Finalize site IA',2,1,DATEADD(DAY,10,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1032,103,'david','Build landing page',1,0,DATEADD(DAY,15,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1033,103,'frank','Content proofread',4,3,DATEADD(DAY,18,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1034,103,'mia','Implement blog layout',1,1,DATEADD(DAY,22,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1035,103,'isa','Set up analytics',2,2,DATEADD(DAY,20,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1036,103,'grace','Accessibility audit',1,0,DATEADD(DAY,19,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1037,103,'noah','Cross-browser testing',2,1,DATEADD(DAY,21,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1038,103,'bob','SEO checklist',1,1,DATEADD(DAY,16,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1039,103,'david','CMS integration',2,1,DATEADD(DAY,24,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1040,103,'mia','Finalize component library',1,0,DATEADD(DAY,25,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        -- Project 104 tasks 1041-1045
        (1041,104,'jack','Define mobile architecture',1,0,DATEADD(DAY,30,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1042,104,'grace','Auth flow for mobile',1,1,DATEADD(DAY,28,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1043,104,'leo','Set up CI for mobile',2,2,DATEADD(DAY,32,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1044,104,'noah','Push notifications POC',0,2,DATEADD(DAY,35,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1045,104,'olivia','Offline storage strategy',1,1,DATEADD(DAY,34,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        -- Project 105 tasks 1046-1050 (add more to reach ~50)
        (1046,105,'bob','Define data contracts',1,0,DATEADD(DAY,27,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1047,105,'henry','Streaming ingestion POC',2,1,DATEADD(DAY,29,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1048,105,'isa','Backfill strategy',0,2,DATEADD(DAY,33,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1049,105,'karen','Data quality checks',1,1,DATEADD(DAY,31,GETUTCDATE()),GETUTCDATE(),GETUTCDATE()),
        (1050,105,'mia','dbt model structure',1,0,DATEADD(DAY,36,GETUTCDATE()),GETUTCDATE(),GETUTCDATE());
    SET IDENTITY_INSERT [Tasks] OFF;

    -- =========================
    -- UserTasks (assignment + comments)
    -- =========================
    INSERT INTO [UserTasks] ([UserId],[TaskId],[Comment],[CreatedAt],[UpdatedAt]) VALUES
        -- 101
        (1,1001,'Designing auth flow and sequence charts',GETUTCDATE(),GETUTCDATE()),
        (4,1002,'JWT middleware and validation',GETUTCDATE(),GETUTCDATE()),
        (3,1003,'Finalized domain models',GETUTCDATE(),GETUTCDATE()),
        (7,1004,'Drafting API versioning doc',GETUTCDATE(),GETUTCDATE()),
        (8,1005,'Setting up Prometheus/Grafana',GETUTCDATE(),GETUTCDATE()),
        (1,1006,'Policies for roles',GETUTCDATE(),GETUTCDATE()),
        (4,1007,'Health checks added',GETUTCDATE(),GETUTCDATE()),
        (3,1008,'Reviewed domain events',GETUTCDATE(),GETUTCDATE()),
        (7,1009,'Cache invalidation plan',GETUTCDATE(),GETUTCDATE()),
        (8,1010,'Migration runbook drafted',GETUTCDATE(),GETUTCDATE()),
        (2,1011,'Security review scheduled',GETUTCDATE(),GETUTCDATE()),
        (1,1012,'API gateway spike',GETUTCDATE(),GETUTCDATE()),
        (4,1013,'Exception middleware complete',GETUTCDATE(),GETUTCDATE()),
        (3,1014,'CQRS docs ready',GETUTCDATE(),GETUTCDATE()),
        (7,1015,'Rate limits defined',GETUTCDATE(),GETUTCDATE()),
        -- 102
        (3,1016,'RAG references collected',GETUTCDATE(),GETUTCDATE()),
        (5,1017,'Dataset prepared',GETUTCDATE(),GETUTCDATE()),
        (9,1018,'Baseline trained',GETUTCDATE(),GETUTCDATE()),
        (11,1019,'Eval framework design',GETUTCDATE(),GETUTCDATE()),
        (15,1020,'Labeling guideline draft',GETUTCDATE(),GETUTCDATE()),
        (3,1021,'Hparam search plan',GETUTCDATE(),GETUTCDATE()),
        (5,1022,'DVC setup complete',GETUTCDATE(),GETUTCDATE()),
        (9,1023,'Dashboards started',GETUTCDATE(),GETUTCDATE()),
        (11,1024,'Benchmarks summarized',GETUTCDATE(),GETUTCDATE()),
        (15,1025,'Ethics review scheduled',GETUTCDATE(),GETUTCDATE()),
        (3,1026,'Report template created',GETUTCDATE(),GETUTCDATE()),
        (5,1027,'SOP drafted',GETUTCDATE(),GETUTCDATE()),
        (9,1028,'Latency optimizations tested',GETUTCDATE(),GETUTCDATE()),
        (11,1029,'Reproduction notes added',GETUTCDATE(),GETUTCDATE()),
        (15,1030,'Stakeholder demo outline',GETUTCDATE(),GETUTCDATE()),
        -- 103
        (2,1031,'IA finalized',GETUTCDATE(),GETUTCDATE()),
        (4,1032,'Landing page components',GETUTCDATE(),GETUTCDATE()),
        (6,1033,'Proofreading complete',GETUTCDATE(),GETUTCDATE()),
        (13,1034,'Blog layout implemented',GETUTCDATE(),GETUTCDATE()),
        (9,1035,'Analytics configured',GETUTCDATE(),GETUTCDATE()),
        (7,1036,'A11y audit underway',GETUTCDATE(),GETUTCDATE()),
        (14,1037,'Cross-browser tests',GETUTCDATE(),GETUTCDATE()),
        (2,1038,'SEO checklist prepared',GETUTCDATE(),GETUTCDATE()),
        (4,1039,'CMS integrated',GETUTCDATE(),GETUTCDATE()),
        (13,1040,'Component library done',GETUTCDATE(),GETUTCDATE()),
        -- 104
        (10,1041,'Mobile architecture',GETUTCDATE(),GETUTCDATE()),
        (7,1042,'Mobile auth flow',GETUTCDATE(),GETUTCDATE()),
        (12,1043,'CI configured',GETUTCDATE(),GETUTCDATE()),
        (14,1044,'Push notifications POC',GETUTCDATE(),GETUTCDATE()),
        (15,1045,'Offline storage design',GETUTCDATE(),GETUTCDATE()),
        -- 105
        (2,1046,'Data contracts defined',GETUTCDATE(),GETUTCDATE()),
        (8,1047,'Streaming pipeline POC',GETUTCDATE(),GETUTCDATE()),
        (9,1048,'Backfill plan outlined',GETUTCDATE(),GETUTCDATE()),
        (11,1049,'Quality checks documented',GETUTCDATE(),GETUTCDATE()),
        (13,1050,'dbt models drafted',GETUTCDATE(),GETUTCDATE());

    -- =========================
    -- Notes
    -- =========================
    SET IDENTITY_INSERT [Notes] ON;
    INSERT INTO [Notes] ([Id],[ProjectId],[Content],[CreatedAt],[UpdatedAt]) VALUES
        (2001,101,'Enforce password policies and MFA integration.',GETUTCDATE(),GETUTCDATE()),
        (2002,101,'Document deployment checklist for backend.',GETUTCDATE(),GETUTCDATE()),
        (2003,102,'Track experiments with clear versioning.',GETUTCDATE(),GETUTCDATE()),
        (2004,102,'Maintain research diary entries weekly.',GETUTCDATE(),GETUTCDATE()),
        (2005,103,'Coordinate with marketing for launch copy.',GETUTCDATE(),GETUTCDATE()),
        (2006,103,'Confirm CMS roles and permissions.',GETUTCDATE(),GETUTCDATE()),
        (2007,104,'Validate offline-first user flows.',GETUTCDATE(),GETUTCDATE()),
        (2008,104,'Decide on deep-linking strategy.',GETUTCDATE(),GETUTCDATE()),
        (2009,105,'Define SLOs for data freshness.',GETUTCDATE(),GETUTCDATE()),
        (2010,105,'Add lineage tracking to pipeline.',GETUTCDATE(),GETUTCDATE());
    SET IDENTITY_INSERT [Notes] OFF;

    -- =========================
    -- References
    -- =========================
    SET IDENTITY_INSERT [References] ON;
    INSERT INTO [References] ([Id],[ProjectId],[ReferenceName],[Url],[Description],[CreatedAt],[UpdatedAt]) VALUES
        (3001,101,'OWASP ASVS','https://owasp.org/www-project-application-security-verification-standard/','Security verification standard',GETUTCDATE(),GETUTCDATE()),
        (3002,102,'Attention Is All You Need','https://arxiv.org/abs/1706.03762','Transformer architecture paper',GETUTCDATE(),GETUTCDATE()),
        (3003,103,'Web Content Accessibility Guidelines','https://www.w3.org/WAI/standards-guidelines/wcag/','WCAG guidance for accessibility',GETUTCDATE(),GETUTCDATE()),
        (3004,104,'Mobile App Security Checklist','https://owasp.org/www-project-mobile-security-testing-guide/','OWASP MSTG highlights',GETUTCDATE(),GETUTCDATE()),
        (3005,105,'Data Engineering Patterns','https://martinfowler.com/articles/202205-refactoring-data-pipelines.html','Refactoring data pipelines',GETUTCDATE(),GETUTCDATE());
    SET IDENTITY_INSERT [References] OFF;

    -- =========================
    -- Activities (project timeline log)
    -- =========================
    SET IDENTITY_INSERT [Activities] ON;
    INSERT INTO [Activities] ([Id],[ProjectId],[Message],[CreatedAt],[UpdatedAt]) VALUES
        (4001,101,'Initialized repository and CI pipeline.',GETUTCDATE(),GETUTCDATE()),
        (4002,101,'Completed domain model review.',GETUTCDATE(),GETUTCDATE()),
        (4003,102,'Defined initial research scope.',GETUTCDATE(),GETUTCDATE()),
        (4004,102,'Set up experiment tracking workflow.',GETUTCDATE(),GETUTCDATE()),
        (4005,103,'Approved homepage wireframes.',GETUTCDATE(),GETUTCDATE()),
        (4006,103,'Deployed preview to staging.',GETUTCDATE(),GETUTCDATE()),
        (4007,104,'Kickoff for mobile MVP.',GETUTCDATE(),GETUTCDATE()),
        (4008,104,'Completed auth flow diagrams.',GETUTCDATE(),GETUTCDATE()),
        (4009,105,'Ingestion pipeline prototype complete.',GETUTCDATE(),GETUTCDATE()),
        (4010,105,'Set up data quality gates.',GETUTCDATE(),GETUTCDATE());
    SET IDENTITY_INSERT [Activities] OFF;

    COMMIT TRAN;
END TRY
BEGIN CATCH
    IF XACT_STATE() <> 0 ROLLBACK TRAN;
    DECLARE @ErrMsg NVARCHAR(4000) = ERROR_MESSAGE();
    RAISERROR('Seeding failed: %s', 16, 1, @ErrMsg);
END CATCH;

SET NOCOUNT OFF;
