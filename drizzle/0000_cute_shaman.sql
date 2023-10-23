CREATE TABLE IF NOT EXISTS "image" (
	"hash" uuid PRIMARY KEY NOT NULL,
	"name" varchar,
	"srcset" jsonb,
	"meta" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "page" (
	"slug" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"content" jsonb,
	"meta" jsonb DEFAULT '{"title":"","description":""}'::jsonb NOT NULL
);
