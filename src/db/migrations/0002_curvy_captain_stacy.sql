ALTER TABLE "services" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "services" ALTER COLUMN "validUntil" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "services" ALTER COLUMN "validUntil" SET NOT NULL;