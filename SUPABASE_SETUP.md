# Supabase Database Setup

## 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a region closest to your users
3. Set a strong database password
4. Wait for the project to be created

## 2. Run Database Migration
1. In your Supabase dashboard, go to the SQL Editor
2. Copy and paste the contents of `supabase-minimal-setup.sql`
3. Click "Run" to execute the SQL commands

This will create:
- `contact_submissions` table for form data
- `admin_users` table for admin authentication  
- `admin_sessions` table for session management
- Initial admin user (username: `admin`, password: `admin123`)

## 3. Get Database URL
1. In Supabase dashboard, go to Settings > Database
2. Copy the connection string under "Connection string" > "URI"
3. Replace `[YOUR-PASSWORD]` with your actual database password

## 4. Configure Environment Variables
1. Copy `.env.example` to `.env.local`
2. Update the `DATABASE_URL` with your Supabase connection string:
```
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

## 5. Test Connection
1. Start your development server: `npm run dev`
2. Go to `/admin/login` and login with:
   - Username: `admin`
   - Password: `admin123`
3. Check `/admin/submissions` to see form submissions

## Email Configuration (Optional)
Configure SMTP settings in `.env.local` to receive email notifications for form submissions:
```
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
ADMIN_EMAIL="admin@partnerspoints.com"
```

For Gmail, you'll need to use an App Password instead of your regular password.

## Database Schema
The minimal setup includes only essential tables:
- **contact_submissions**: Stores all form submissions (contact, onboarding, calculator)
- **admin_users**: Admin login credentials
- **admin_sessions**: Session tokens for admin authentication

This is a minimal setup focused on marketing website needs, not a full business platform.