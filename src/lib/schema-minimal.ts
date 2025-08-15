import { pgTable, text, timestamp, uuid, varchar, boolean, jsonb, index } from 'drizzle-orm/pg-core'

// Contact form submissions table - ESSENTIAL
export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  message: text('message').notNull(),
  formType: varchar('form_type', { length: 50 }).notNull().default('contact'), // 'contact', 'onboarding', 'calculator'
  status: varchar('status', { length: 50 }).notNull().default('new'), // 'new', 'contacted', 'resolved'
  metadata: jsonb('metadata'), // Additional form data
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('contact_submissions_email_idx').on(table.email),
  typeIdx: index('contact_submissions_type_idx').on(table.formType),
  statusIdx: index('contact_submissions_status_idx').on(table.status),
  createdAtIdx: index('contact_submissions_created_at_idx').on(table.createdAt),
}))

// Admin users table - ESSENTIAL
export const adminUsers = pgTable('admin_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('admin'), // admin, superadmin
  isActive: boolean('is_active').notNull().default(true),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  usernameIdx: index('admin_users_username_idx').on(table.username),
  emailIdx: index('admin_users_email_idx').on(table.email),
  activeIdx: index('admin_users_active_idx').on(table.isActive),
}))

// Admin session tracking - ESSENTIAL  
export const adminSessions = pgTable('admin_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => adminUsers.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 500 }).notNull().unique(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userIdx: index('admin_sessions_user_idx').on(table.userId),
  tokenIdx: index('admin_sessions_token_idx').on(table.token),
  expiresIdx: index('admin_sessions_expires_idx').on(table.expiresAt),
}))