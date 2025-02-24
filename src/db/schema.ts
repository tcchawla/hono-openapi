import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const tasks = sqliteTable('tasks', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  done: integer({ mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()).default(sql`(CURRENT_TIMESTAMP)`),
})

export const selectTasksSchema = createSelectSchema(tasks)

export const insertTasksSchema = createInsertSchema(tasks, {
  name: schema => schema.min(1).max(500),
}).required({
  done: true,
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const patchTasksSchema = insertTasksSchema.partial()
