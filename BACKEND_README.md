# Partners Points Backend Documentation

## Overview
Complete backend architecture for the RFM Payment Terminal loyalty program platform.

## Database Schema
- **Merchants**: Business accounts with RFM terminal integration
- **Customers**: Loyalty program members identified by phone
- **Transactions**: Payment records with points earned/redeemed
- **Customer-Merchant Relations**: Per-merchant loyalty balances
- **Campaigns**: Promotional multipliers and bonuses
- **Daily Stats**: Analytics and reporting data

## API Endpoints

### Onboarding API (`/api/onboarding`)
- **POST**: Submit merchant application
- Validates business information
- Creates merchant record with 'pending' status
- Handles duplicate email prevention

### Calculator API (`/api/calculator`)
- **POST**: Calculate ROI for loyalty vs traditional discounts
- Input: Monthly sales, earn-back rate, redemption patterns
- Output: Cost comparison, savings projections, ROI metrics
- Includes breakeven analysis and yearly projections

### Authentication API (`/api/auth/[...nextauth]`)
- NextAuth.js integration
- Credential-based login for merchants
- JWT session management
- Merchant-specific data in session

## Database Configuration
- **ORM**: Drizzle with PostgreSQL
- **Migrations**: `npm run db:generate` and `npm run db:push`
- **Studio**: `npm run db:studio` for database management

## Environment Setup
```bash
# Copy example environment file
cp .env.example .env.local

# Install dependencies (already done)
npm install

# Generate database migrations
npm run db:generate

# Push schema to database
npm run db:push
```

## Key Features
- **Native RFM Terminal Integration**: No separate POS system required
- **Real-time Points Processing**: Award/redeem during checkout flow
- **Cost-effective Model**: Only pay fees on redemptions (2% service fee)
- **Comprehensive Analytics**: Transaction tracking and business insights
- **Secure Authentication**: NextAuth.js with JWT sessions
- **Scalable Architecture**: Built for UAE-wide RFM network (15,000+ terminals)

## Production Readiness
- Proper input validation with Zod
- Error handling and logging
- Database indexing for performance
- Secure environment variable management
- PCI-compliant infrastructure foundation

## Next Steps
1. Set up production database (PostgreSQL)
2. Configure environment variables
3. Deploy to production platform
4. Set up RFM webhook integration
5. Implement email notifications
6. Add merchant dashboard frontend