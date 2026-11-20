CREATE TABLE IF NOT EXISTS faqs (
 content_id varchar(64) NOT NULL PRIMARY KEY,
 question varchar(500) NOT NULL,
 answer text NOT NULL,
 sort_order int unsigned NOT NULL DEFAULT 0,
 published tinyint(1) NOT NULL DEFAULT 0,
 featured tinyint(1) NOT NULL DEFAULT 0,
 CONSTRAINT chk_faqs_publication CHECK (published IN (0,1) AND featured IN (0,1) AND featured <= published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS testimonials (
 content_id varchar(64) NOT NULL PRIMARY KEY,
 name varchar(200) NOT NULL,
 role varchar(200) NOT NULL,
 quote text NOT NULL,
 stars tinyint unsigned NOT NULL DEFAULT 5,
 sort_order int unsigned NOT NULL DEFAULT 0,
 published tinyint(1) NOT NULL DEFAULT 0,
 featured tinyint(1) NOT NULL DEFAULT 0,
 CONSTRAINT chk_testimonials_publication CHECK (published IN (0,1) AND featured IN (0,1) AND featured <= published),
 CONSTRAINT chk_testimonials_stars CHECK (stars BETWEEN 1 AND 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS content_migrations (
 migration_id varchar(100) NOT NULL PRIMARY KEY,
 applied_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
