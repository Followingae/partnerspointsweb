import { pgTable, text, timestamp, integer, decimal, boolean, jsonb, uuid, varchar, index } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Merchants table
export const merchants = pgTable('merchants', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessName: varchar('business_name', { length: 255 }).notNull(),
  industry: varchar('industry', { length: 100 }).notNull(),
  monthlySales: varchar('monthly_sales', { length: 50 }).notNull(),
  earnBackRate: integer('earn_back_rate').notNull().default(10), // percentage
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 50 }).notNull(),
  contactName: varchar('contact_name', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, active, suspended
  rfmTerminalId: varchar('rfm_terminal_id', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('merchants_email_idx').on(table.email),
  statusIdx: index('merchants_status_idx').on(table.status),
}))

// Customers table
export const customers = pgTable('customers', {
  id: uuid('id').primaryKey().defaultRandom(),
  phone: varchar('phone', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  totalPoints: integer('total_points').notNull().default(0),
  totalEarned: integer('total_earned').notNull().default(0),
  totalRedeemed: integer('total_redeemed').notNull().default(0),
  memberSince: timestamp('member_since').defaultNow().notNull(),
  lastVisit: timestamp('last_visit'),
  visitCount: integer('visit_count').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  phoneIdx: index('customers_phone_idx').on(table.phone),
  emailIdx: index('customers_email_idx').on(table.email),
}))

// Transactions table
export const transactions = pgTable('transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  merchantId: uuid('merchant_id').notNull().references(() => merchants.id),
  customerId: uuid('customer_id').notNull().references(() => customers.id),
  rfmTerminalId: varchar('rfm_terminal_id', { length: 100 }).notNull(),
  transactionId: varchar('transaction_id', { length: 255 }).notNull(), // RFM transaction ID
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  pointsEarned: integer('points_earned').notNull().default(0),
  pointsRedeemed: integer('points_redeemed').notNull().default(0),
  redemptionValue: decimal('redemption_value', { precision: 10, scale: 2 }).notNull().default('0.00'),
  serviceFee: decimal('service_fee', { precision: 10, scale: 2 }).notNull().default('0.00'),
  transactionType: varchar('transaction_type', { length: 50 }).notNull(), // 'purchase', 'redemption', 'adjustment'
  status: varchar('status', { length: 50 }).notNull().default('completed'), // completed, failed, pending
  metadata: jsonb('metadata'), // Additional transaction data
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  merchantIdx: index('transactions_merchant_idx').on(table.merchantId),
  customerIdx: index('transactions_customer_idx').on(table.customerId),
  terminalIdx: index('transactions_terminal_idx').on(table.rfmTerminalId),
  createdAtIdx: index('transactions_created_at_idx').on(table.createdAt),
}))

// Customer-Merchant relationships
export const customerMerchantRelations = pgTable('customer_merchant_relations', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').notNull().references(() => customers.id),
  merchantId: uuid('merchant_id').notNull().references(() => merchants.id),
  pointsBalance: integer('points_balance').notNull().default(0),
  totalEarned: integer('total_earned').notNull().default(0),
  totalRedeemed: integer('total_redeemed').notNull().default(0),
  totalSpent: decimal('total_spent', { precision: 10, scale: 2 }).notNull().default('0.00'),
  visitCount: integer('visit_count').notNull().default(0),
  firstVisit: timestamp('first_visit').defaultNow().notNull(),
  lastVisit: timestamp('last_visit'),
  vipStatus: boolean('vip_status').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  customerMerchantIdx: index('customer_merchant_idx').on(table.customerId, table.merchantId),
  merchantCustomerIdx: index('merchant_customer_idx').on(table.merchantId, table.customerId),
}))

// Loyalty campaigns/promotions
export const campaigns = pgTable('campaigns', {
  id: uuid('id').primaryKey().defaultRandom(),
  merchantId: uuid('merchant_id').notNull().references(() => merchants.id),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 100 }).notNull(), // 'multiplier', 'bonus', 'discount'
  description: text('description'),
  multiplier: decimal('multiplier', { precision: 5, scale: 2 }).default('1.00'),
  bonusPoints: integer('bonus_points').default(0),
  minSpend: decimal('min_spend', { precision: 10, scale: 2 }).default('0.00'),
  categories: jsonb('categories'), // Product categories affected
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  usageCount: integer('usage_count').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  merchantIdx: index('campaigns_merchant_idx').on(table.merchantId),
  activeIdx: index('campaigns_active_idx').on(table.isActive),
  datesIdx: index('campaigns_dates_idx').on(table.startDate, table.endDate),
}))

// Analytics/reporting data
export const dailyStats = pgTable('daily_stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  merchantId: uuid('merchant_id').notNull().references(() => merchants.id),
  date: timestamp('date').notNull(),
  totalTransactions: integer('total_transactions').notNull().default(0),
  totalRevenue: decimal('total_revenue', { precision: 12, scale: 2 }).notNull().default('0.00'),
  totalPointsEarned: integer('total_points_earned').notNull().default(0),
  totalPointsRedeemed: integer('total_points_redeemed').notNull().default(0),
  totalServiceFees: decimal('total_service_fees', { precision: 10, scale: 2 }).notNull().default('0.00'),
  uniqueCustomers: integer('unique_customers').notNull().default(0),
  newCustomers: integer('new_customers').notNull().default(0),
  returningCustomers: integer('returning_customers').notNull().default(0),
  avgTransactionValue: decimal('avg_transaction_value', { precision: 10, scale: 2 }).notNull().default('0.00'),
  redemptionRate: decimal('redemption_rate', { precision: 5, scale: 2 }).notNull().default('0.00'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  merchantDateIdx: index('daily_stats_merchant_date_idx').on(table.merchantId, table.date),
}))

// Relations
export const merchantsRelations = relations(merchants, ({ many }) => ({
  transactions: many(transactions),
  customerRelations: many(customerMerchantRelations),
  campaigns: many(campaigns),
  dailyStats: many(dailyStats),
}))

export const customersRelations = relations(customers, ({ many }) => ({
  transactions: many(transactions),
  merchantRelations: many(customerMerchantRelations),
}))

export const transactionsRelations = relations(transactions, ({ one }) => ({
  merchant: one(merchants, {
    fields: [transactions.merchantId],
    references: [merchants.id],
  }),
  customer: one(customers, {
    fields: [transactions.customerId],
    references: [customers.id],
  }),
}))

export const customerMerchantRelationsRelations = relations(customerMerchantRelations, ({ one }) => ({
  customer: one(customers, {
    fields: [customerMerchantRelations.customerId],
    references: [customers.id],
  }),
  merchant: one(merchants, {
    fields: [customerMerchantRelations.merchantId],
    references: [merchants.id],
  }),
}))

export const campaignsRelations = relations(campaigns, ({ one }) => ({
  merchant: one(merchants, {
    fields: [campaigns.merchantId],
    references: [merchants.id],
  }),
}))

export const dailyStatsRelations = relations(dailyStats, ({ one }) => ({
  merchant: one(merchants, {
    fields: [dailyStats.merchantId],
    references: [merchants.id],
  }),
}))

// Blog posts table
export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  featuredImage: varchar('featured_image', { length: 500 }),
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, published, archived
  category: varchar('category', { length: 100 }),
  tags: jsonb('tags'), // Array of tag strings
  seoTitle: varchar('seo_title', { length: 255 }),
  seoDescription: text('seo_description'),
  viewCount: integer('view_count').notNull().default(0),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  slugIdx: index('blog_posts_slug_idx').on(table.slug),
  statusIdx: index('blog_posts_status_idx').on(table.status),
  publishedAtIdx: index('blog_posts_published_at_idx').on(table.publishedAt),
  categoryIdx: index('blog_posts_category_idx').on(table.category),
}))

// Contact form submissions table
export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  message: text('message').notNull(),
  formType: varchar('form_type', { length: 50 }).notNull(), // 'contact', 'onboarding', 'calculator'
  status: varchar('status', { length: 50 }).notNull().default('new'), // new, contacted, resolved
  metadata: jsonb('metadata'), // Additional form data
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('contact_submissions_email_idx').on(table.email),
  typeIdx: index('contact_submissions_type_idx').on(table.formType),
  statusIdx: index('contact_submissions_status_idx').on(table.status),
  createdAtIdx: index('contact_submissions_created_at_idx').on(table.createdAt),
}))

// File uploads table
export const fileUploads = pgTable('file_uploads', {
  id: uuid('id').primaryKey().defaultRandom(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  originalName: varchar('original_name', { length: 255 }).notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  size: integer('size').notNull(), // in bytes
  url: varchar('url', { length: 500 }).notNull(),
  uploadType: varchar('upload_type', { length: 50 }).notNull(), // 'blog_image', 'featured_image', 'general'
  relatedId: uuid('related_id'), // Can reference blog post, etc.
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  typeIdx: index('file_uploads_type_idx').on(table.uploadType),
  relatedIdx: index('file_uploads_related_idx').on(table.relatedId),
}))

// Blog relations
export const blogPostsRelations = relations(blogPosts, ({ many }) => ({
  images: many(fileUploads),
}))

export const fileUploadsRelations = relations(fileUploads, ({ one }) => ({
  blogPost: one(blogPosts, {
    fields: [fileUploads.relatedId],
    references: [blogPosts.id],
  }),
}))

// Super admin users table
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

// Site content/images management table
export const siteContent = pgTable('site_content', {
  id: uuid('id').primaryKey().defaultRandom(),
  section: varchar('section', { length: 100 }).notNull(), // 'hero', 'about', 'testimonials', etc.
  contentType: varchar('content_type', { length: 50 }).notNull(), // 'image', 'text', 'html'
  identifier: varchar('identifier', { length: 100 }).notNull(), // 'hero_background', 'logo', etc.
  content: text('content'), // URL for images, text content, HTML
  altText: varchar('alt_text', { length: 255 }),
  metadata: jsonb('metadata'), // Additional data like dimensions, original filename, etc.
  isActive: boolean('is_active').notNull().default(true),
  updatedBy: uuid('updated_by').references(() => adminUsers.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  sectionIdx: index('site_content_section_idx').on(table.section),
  identifierIdx: index('site_content_identifier_idx').on(table.identifier),
  uniqueContent: index('site_content_unique_idx').on(table.section, table.identifier),
}))

// Admin session tracking
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

// Relations for admin tables
export const adminUsersRelations = relations(adminUsers, ({ many }) => ({
  sessions: many(adminSessions),
  contentUpdates: many(siteContent),
}))

export const adminSessionsRelations = relations(adminSessions, ({ one }) => ({
  user: one(adminUsers, {
    fields: [adminSessions.userId],
    references: [adminUsers.id],
  }),
}))

export const siteContentRelations = relations(siteContent, ({ one }) => ({
  updatedBy: one(adminUsers, {
    fields: [siteContent.updatedBy],
    references: [adminUsers.id],
  }),
}))