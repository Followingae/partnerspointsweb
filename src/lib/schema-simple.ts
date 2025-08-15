import { pgTable, text, timestamp, uuid, varchar, jsonb, index } from 'drizzle-orm/pg-core'

// Single table for all form submissions
export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  message: text('message').notNull(),
  formType: varchar('form_type', { length: 50 }).notNull().default('contact'), // 'contact', 'onboarding', 'calculator'
  formData: jsonb('form_data'), // All additional form fields
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('idx_contact_submissions_email').on(table.email),
  typeIdx: index('idx_contact_submissions_type').on(table.formType),
  createdAtIdx: index('idx_contact_submissions_created_at').on(table.createdAt),
}))