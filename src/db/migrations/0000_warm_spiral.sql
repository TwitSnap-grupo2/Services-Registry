CREATE TABLE IF NOT EXISTS "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"description" text,
	"state" boolean DEFAULT true NOT NULL,
	"apiKey" text
);
