import {
  boolean,
  int,
  mysqlTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core';

export const User = mysqlTable('user', {
  id: int('id').autoincrement().primaryKey(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  name: varchar('name', { length: 256 }).notNull(),
  code: varchar('code', { length: 256 }).notNull().unique('uniq_code'),
});

export const Tag = mysqlTable(
  'tag',
  {
    id: int('id').autoincrement().primaryKey(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
    createdBy: int('created_by')
      .notNull()
      .references(() => User.id, { onDelete: 'cascade' }),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
    updatedBy: int('updated_by')
      .notNull()
      .references(() => User.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 256 }).notNull().unique('uniq_name'),
    isOfficial: boolean('is_official').notNull().default(false),
    displayOrder: int('display_order').notNull(),
  },
  (table) => ({
    uniqIsOfficialAndDisplayOrder: uniqueIndex(
      'is_official_and_display_order',
    ).on(table.isOfficial, table.displayOrder),
  }),
);

export const UserTagRelation = mysqlTable(
  'user_tag_relation',
  {
    id: int('id').autoincrement().primaryKey(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .notNull()
      .defaultNow(),
    userId: int('user_id')
      .notNull()
      .references(() => User.id, { onDelete: 'cascade' }),
    tagId: int('tag_id')
      .notNull()
      .references(() => Tag.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    uniqUserAndTag: uniqueIndex('user_and_tag_uniq').on(
      table.userId,
      table.tagId,
    ),
  }),
);
