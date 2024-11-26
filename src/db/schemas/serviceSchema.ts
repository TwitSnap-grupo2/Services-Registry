import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const serviceTable = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text().notNull(),
  description: text(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  apiKey: text(),
});

export type SelectService = typeof serviceTable.$inferSelect;
export type InsertService = typeof serviceTable.$inferInsert;
