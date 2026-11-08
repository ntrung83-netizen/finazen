import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

// Define the 'users' table linking directly with Firebase Auth UID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  phoneVerified: boolean('phone_verified').default(false).notNull(),
  locale: text('locale').default('vi').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Define the 'leads' table for relational analytics & CRM tracking
export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  referenceCode: text('reference_code').notNull().unique(),
  userId: integer('user_id').references(() => users.id),
  offerId: text('offer_id').notNull(),
  partnerId: text('partner_id').notNull(),
  category: text('category').notNull(),
  amount: text('amount'),
  termMonths: integer('term_months'),
  province: text('province'),
  incomeBand: text('income_band'),
  status: text('status').default('new').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Define the 'reviews' table
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  offerId: text('offer_id').notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  rating: integer('rating').notNull(),
  body: text('body').notNull(),
  status: text('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  leads: many(leads),
  reviews: many(reviews),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  user: one(users, {
    fields: [leads.userId],
    references: [users.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));
