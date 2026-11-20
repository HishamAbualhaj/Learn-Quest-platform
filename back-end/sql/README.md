# LearnQuest database setup and SQL review

These files use the supplied latest `learnquest.sql` dump (MySQL server 8.4.8) as the schema reference. The attachment is treated as database content, not as instructions. No separate `learnquest.sql` file was found in the repository.

## Import into MySQL

Use **MySQL 8.0 or newer**. The schema retains `utf8mb4_0900_ai_ci`, which is not portable to MySQL 5.7 or many MariaDB versions.

For a new local database, connect in MySQL Workbench and execute:

```sql
CREATE DATABASE IF NOT EXISTS `learnquest`
  CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `learnquest`;
```

Then open and execute `schema.sql`, followed by `seed.sql`, with `learnquest` selected as the default schema. For a managed service, select the database provided by the host instead; no CREATE DATABASE permission is needed to run these two files. Both files deliberately omit USE so the selected database is respected.

Alternatively, use the MySQL command-line client (run these commands **inside the mysql prompt**, not PowerShell):

```sql
USE `learnquest`;
SOURCE C:/Users/hisha/Desktop/Learn-Quest-platform/back-end/sql/schema.sql;
SOURCE C:/Users/hisha/Desktop/Learn-Quest-platform/back-end/sql/seed.sql;
```

`schema.sql` creates missing tables without dropping tables or deleting rows. It does **not** migrate existing table definitions: CREATE TABLE IF NOT EXISTS does not repair an outdated table.

`seed.sql` is for an **empty database**, once only. It uses normal INSERT statements and a transaction, with foreign keys enabled. Do not import it over your existing data or use a client option that continues on errors. If an import fails in an editor that keeps the connection open, execute `ROLLBACK;` before retrying. Use a separate empty database to try the demo alongside your current data.

The seed contains 3 demo users, the original 10 courses, 80 unique materials (8 per course), 2 enrollments, 2 completion records, 2 reviews, 2 blogs, a comment, 2 chat messages, sample logs, and a running maintenance status. Sessions and password-reset tokens are not seeded. Lesson totals, ratings, and progress match the sample records. Material URLs retained from the dump are `learnquest.example.com` placeholders; replace them with your real lesson URLs. Demo mail addresses cannot receive password-reset emails.

| Role    | Email                      | Password        |
| ------- | -------------------------- | --------------- |
| Admin   | admin@learnquest.example   | DemoAdmin123!   |
| Student | student@learnquest.example | DemoStudent123! |
| Student | learner@learnquest.example | DemoLearner123! |

The current backend compares passwords as plaintext. The seed follows that existing behavior for local demos; password hashing requires coordinated signup, login, reset-password, and schema changes before a public deployment.

## Backend connection

Create a `.env` in the project root with your own connection values:

```dotenv
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=learnquest
DB_SSL=false
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3002
```

For a host requiring TLS, set `DB_SSL=true`. If the host supplies its own CA certificate, also set `DB_SSL_CA=C:/path/to/ca.pem`. Certificate verification remains enabled. Hosted connection details and the database name may differ from the local example.

From the project root:

```powershell
node back-end/config/createTables.js
node back-end/server.js
```

The initializer is optional if you already ran `schema.sql`. It uses that same file, closes its connection on completion, and reports failures with a nonzero exit code. `server.js` does not initialize tables automatically; initialize/import before starting the API. The database must already exist. The current API listens on port 3002.

## SQL findings and changes

| Finding                                                                                                        | Result                                                                                                 |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Both blog UPDATE branches omitted WHERE and could overwrite every blog                                         | Fixed: both statements filter by blog_id and bind that ID                                              |
| Existing completion updates referenced an undefined student_id                                                 | Fixed: the model binds the request's user_id                                                           |
| Adding course materials returned undefined instead of lessons, subsequently passed to a SQL UPDATE             | Fixed: return the inserted lesson count                                                                |
| Several listings fetched 10 rows but advanced only 5; course listing ignored maxData when computing the offset | Fixed: offsets match page size                                                                         |
| Raw dump begins with CREATE DATABASE "learnquest"                                                              | New setup uses backticks; double quotes fail unless ANSI_QUOTES is enabled                             |
| Dump sets SQL_LOG_BIN and GLOBAL.GTID_PURGED and uses LOCK TABLES                                              | New schema/seed omit these replication/privileged operations                                           |
| Dump uses DROP TABLE, disables FK checks, contains old sessions and personal demo accounts                     | New schema is non-dropping; new seed uses synthetic accounts, no sessions, and keeps FK checks enabled |
| Dump has 240 lesson rows: the same 80 lessons repeated three times, with inconsistent lesson counts/ratings    | New seed retains the first 80 rows and recomputes course totals; existing data is untouched            |
| db.js could not request verified TLS                                                                           | Added optional DB_SSL and DB_SSL_CA configuration                                                      |
| JavaScript initializer duplicated the schema                                                                   | It now reads schema.sql, retaining the dump's named foreign keys, engine and collation                 |

The dump's tables and columns otherwise match the backend's current SQL references. The misspelled `completeionmaterial` and `completeion_id` names are retained because the backend depends on them.

## Remaining backend/data risks

- Enrollments and reviews lack UNIQUE(student_id, course_id). Check-before-insert logic can create duplicates under concurrent requests. Clean duplicates before adding those constraints to an existing database.
- Course creation/update and enrollment write multiple tables without transactions. An intermediate failure can leave partial data or incorrect counters. Updating a course currently deletes and recreates its materials, cascading away existing completion records.
- Completion handling trusts client-supplied course_id and lesson count; the independent foreign keys do not ensure that the completed material belongs to that course. Validate ownership and calculate progress from database counts.
- Pagination orders by timestamps only. Tied timestamps can reorder rows across requests; use the primary key as a secondary sort key for stable pagination.
- db.js uses one long-lived connection and throws on initial connection failure. Connection pooling/reconnect handling is needed for reliable recovery after a hosted connection is closed.
- Authentication middleware checks login but does not enforce admin roles or consistently bind submitted user IDs to the session. Administrative and student-specific writes need server-side authorization checks. WebSocket chat also accepts a client-supplied sender ID.
- SQL parameters protect values in the reviewed models. getImageUrl interpolates identifiers; its current callers use hardcoded table/column names. Do not pass request-controlled identifiers into it.

## Validation performed

On an isolated local **MySQL 8.0.39** instance, separate from any configured/hosted database:

- Imported the schema and seed with foreign keys enabled: 13 tables, 10 courses, 80 unique materials, 3 users.
- Verified course counters/ratings and enrollment progress against actual rows.
- Executed actual model calls for both blog-edit branches, completion updates, course-material insertion, demo authentication, course listing/detail, enrollments, reviews, comments, chat, users, logs, analytics, and maintenance.
- Confirmed blog edits leave another blog unchanged and course pagination with a custom page size does not overlap in the test dataset.
- Ran the Node initializer on both an empty database and an already populated database; existing course data was preserved.

This is a SQL/model review and integration check, not an end-to-end test of email, Google authentication, uploads, HTTP authorization, or hosted TLS. No hosted database was modified.

## Free hosting checked November 19, 2026

- [Filess.io](https://filess.io/) provides actual MySQL with a free plan listing 2 databases and 10 MB per database. Its [connection documentation](https://support.filess.io/hc/wiki/articles/1691013492-sql-error-too-many-connections) lists 5 concurrent connections on the free tier. Its shared tier has no SLA; free service is not a guarantee of uninterrupted uptime. Suitable for a small demo, with little room for growing logs.
- [TiDB Cloud Starter](https://docs.pingcap.com/tidbcloud/serverless-faqs/) is MySQL-compatible rather than the MySQL server engine. Eligible instances include 5 GiB row storage, 5 GiB columnar storage, and 50 million request units monthly. New connections are denied if the free quota/spending limit is reached. Test compatibility and FK cascade behavior before adopting it; the local validation above used MySQL, not TiDB.
- [Aiven's retirement notice](https://aiven.io/docs/products/mysql/howto/mysql-free-tier-migration-options) says new free MySQL services stopped November 6, 2026, and remaining free MySQL services and backups will be deleted December 21, 2026. Your dump names an Aiven host; if that service is on the free plan, export/migrate before that date.

For a free MySQL demo, Filess.io is an option within its small quota. For a strict requirement of guaranteed continuous availability, these free offers do not provide that assurance.

## Published and featured content

Run `npm run db:migrate:content` before deploying the publication changes. This idempotent migration adds published/featured flags and CHECK constraints to existing courses/blogs, preserving their published status. New records default to unpublished and unfeatured. It also creates FAQ/testimonial tables and seeds the exact FAQ answers and learner quotes previously shown on the landing page. Existing seeded records are never overwritten on reruns. Courses/blogs must be explicitly featured by an admin to appear on the landing page.

For a new database, run schema.sql, seed.sql, then `npm run db:migrate:content` to seed the landing records. The existing migration uses the configured database and preserves its data. Deploy the backend and frontend together after migrating.
