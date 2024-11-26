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
  createdAt: timestamp("created_at").defaultNow().notNull(),
  description: text(),
  state: boolean().default(true).notNull(),
  apiKey: text(),
});

export type SelectRegister = typeof serviceTable.$inferSelect;
export type InsertRegister = typeof serviceTable.$inferInsert;
