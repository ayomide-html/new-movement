import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/mysql-core";

// OAuth users (Kimi login)
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

// Local auth users (username/password)
export const localUsers = mysqlTable("local_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  displayName: varchar("displayName", { length: 255 }),
  email: varchar("email", { length: 320 }),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Contact form submissions
export const contacts = mysqlTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Community board messages
export const messages = mysqlTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  content: text("content").notNull(),
  isPinned: boolean("isPinned").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type LocalUser = typeof localUsers.$inferSelect;
export type InsertLocalUser = typeof localUsers.$inferInsert;
export type Contact = typeof contacts.$inferSelect;
export type Message = typeof messages.$inferSelect;
