import {
  pgTable,
  serial,
  text,
  date,
  integer,
  varchar,
  timestamp,
  pgEnum,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const accountsTable = pgTable("accounts_table", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  accountName: varchar("account_name", { length: 100 }).notNull(),
  accountType: text("account_type").notNull(),
});

export const typeEnum = pgEnum("type", ["expense", "income"]);
export const statusEnum = pgEnum("status", ["pending", "posted"]);

export const transactionsTable = pgTable("transactions_table", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  accountId: integer("account_id")
    .notNull()
    .references(() => accountsTable.id),
  date: date("transaction_date", { mode: "date" }),
  description: varchar("description", { length: 256 }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  type: typeEnum().notNull(),
  status: statusEnum().notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp("updated_at", {
    precision: 6,
    withTimezone: true,
  }).notNull(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  transactions: many(transactionsTable),
  accounts: many(accountsTable),
}));

export const accountRelations = relations(accountsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [accountsTable.userId],
    references: [usersTable.id],
  }),
}));

export const transactionsRelations = relations(
  transactionsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [transactionsTable.userId],
      references: [usersTable.id],
    }),
    account: one(accountsTable, {
      fields: [transactionsTable.accountId],
      references: [accountsTable.id],
    }),
  })
);

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
