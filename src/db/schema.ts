import {
  int,
  mysqlTable,
  text,
  varchar,
  timestamp,
} from 'drizzle-orm/mysql-core';

export const User = mysqlTable('user', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  code: varchar('code', { length: 256 }).notNull().unique('uniq_code'),
});

export type UserInterface = typeof User.$inferSelect;

export const Memo = mysqlTable('memo', {
  id: int('id').autoincrement().primaryKey(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
  userId: int('user_id')
    .notNull()
    .references(() => User.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 256 }).notNull(),
  content: text('content').notNull(),
});

export type MemoInterface = typeof Memo.$inferSelect;
