# Partners Points Backend Architecture

## Overview
Complete backend system for Partners Points website with blog functionality, image uploads, and email notifications. No authentication required - this is a marketing/content website with business functionality.

## Core Backend Responsibilities

### 1. **Contact Form Management**
- Capture and store all form submissions (contact, onboarding, calculator)
- Send email notifications to your selected mailbox
- Track form submission status and follow-ups

### 2. **Blog/Content Management System**
- Full blog functionality with rich content support
- SEO-optimized posts with meta tags
- Category and tag organization
- Draft/Published/Archived status management
- View count tracking
- URL-friendly slugs

### 3. **Image Upload & Management**
- Secure image uploads with validation
- Automatic image optimization (resize, compress)
- Support for AWS S3 or local storage
- Multiple upload types (blog images, featured images, general)
- File metadata tracking

### 4. **Email Notification System**
- Automated email alerts for form submissions
- Beautiful HTML email templates
- SMTP integration with your email provider
- Form data formatting for easy review

### 5. **Business Calculator API**
- ROI calculations for loyalty programs
- Cost comparison analysis
- Results can be emailed to prospects

## Database Schema

### Blog Posts (`blog_posts`)
```sql
- id (UUID, Primary Key)
- title (VARCHAR 255, Required)
- slug (VARCHAR 255, Unique, SEO-friendly URL)
- excerpt (TEXT, Optional summary)
- content (TEXT, Full content)
- featured_image (VARCHAR 500, Image URL)
- status (VARCHAR 50: draft/published/archived)
- category (VARCHAR 100, Optional)
- tags (JSONB, Array of strings)
- seo_title (VARCHAR 255, Meta title)
- seo_description (TEXT, Meta description)
- view_count (INTEGER, Tracking popularity)
- published_at (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Contact Submissions (`contact_submissions`)
```sql
- id (UUID, Primary Key)
- name (VARCHAR 255, Required)
- email (VARCHAR 255, Required)
- company (VARCHAR 255, Optional)
- phone (VARCHAR 50, Optional)
- message (TEXT, Required)
- form_type (VARCHAR 50: contact/onboarding/calculator)
- status (VARCHAR 50: new/contacted/resolved)
- metadata (JSONB, Additional form data)
- created_at (TIMESTAMP)
```

### File Uploads (`file_uploads`)
```sql
- id (UUID, Primary Key)
- file_name (VARCHAR 255, Unique filename)
- original_name (VARCHAR 255, User's filename)
- mime_type (VARCHAR 100, File type)
- size (INTEGER, File size in bytes)
- url (VARCHAR 500, Full URL to file)
- upload_type (VARCHAR 50: blog_image/featured_image/general)
- related_id (UUID, Links to blog posts, etc.)
- created_at (TIMESTAMP)
```

## API Endpoints

### Contact Forms
- **POST `/api/contact`** - Submit contact form
- **GET `/api/contact`** - API info

**Form Types Supported:**
- `contact` - General contact form
- `onboarding` - Business onboarding requests
- `calculator` - ROI calculator inquiries

### Blog Management
- **GET `/api/blog`** - List blog posts (with filters)
- **POST `/api/blog`** - Create new blog post
- **GET `/api/blog/[slug]`** - Get single blog post
- **PUT `/api/blog/[slug]`** - Update blog post
- **DELETE `/api/blog/[slug]`** - Delete blog post

**Query Parameters:**
- `status=published` - Filter by status
- `category=retail` - Filter by category
- `search=loyalty` - Search in title/content
- `limit=10` - Results per page
- `offset=0` - Pagination offset

### Image Uploads
- **POST `/api/upload`** - Upload image file
- **GET `/api/upload`** - API info

**Upload Types:**
- `blog_image` - Images within blog content
- `featured_image` - Blog post featured images
- `general` - General website images

### Business APIs
- **POST `/api/onboarding`** - Merchant onboarding
- **POST `/api/calculator`** - ROI calculations
- **GET `/api/onboarding`** - API info
- **GET `/api/calculator`** - API info

## Email Templates

### Contact Form Notifications
- Professional HTML formatting
- All form data clearly displayed
- Contact information highlighted
- Form type identification
- Direct reply functionality

### Calculator Results
- ROI calculation summary
- Key metrics highlighted
- Customer contact information
- Follow-up reminders

## Image Processing

### Automatic Optimization
- Resize to max dimensions (1920x1080)
- Compress JPEG (85% quality)
- Convert to modern formats when beneficial
- Generate optimized file names

### Storage Options
- **Production**: AWS S3 with CDN
- **Development**: Local file storage
- Configurable via environment variables

## Environment Configuration

### Required Variables
```env
# Database
DATABASE_URL="postgresql://..."

# Email
EMAIL_FROM="Partners Points <noreply@partnerspoints.com>"
CONTACT_EMAIL="hello@partnerspoints.com"
SMTP_HOST="smtp.your-provider.com"
SMTP_PORT="587"
SMTP_USER="your-smtp-username"
SMTP_PASS="your-smtp-password"

# AWS S3 (Production)
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="partners-points-uploads"
CDN_URL="https://your-cdn.com"
```

## Setup Instructions

### 1. Database Setup
```bash
# Generate migrations
npm run db:generate

# Push schema to database
npm run db:push

# Open database studio
npm run db:studio
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Edit with your actual values
nano .env.local
```

### 3. Email Provider Setup
**Recommended providers:**
- **SendGrid** - Reliable, good free tier
- **AWS SES** - Cost-effective for high volume
- **Mailgun** - Simple integration
- **Gmail SMTP** - For development/testing

### 4. Image Storage Setup
**Development:** Images stored in `/public/uploads`
**Production:** Set up AWS S3 bucket with public read permissions

## Security Features

### File Upload Security
- File type validation (images only)
- File size limits (10MB max)
- Unique filename generation
- Malware scanning ready

### Input Validation
- Zod schema validation on all inputs
- SQL injection prevention via Drizzle ORM
- XSS protection in content processing

### Rate Limiting Ready
- Easy to add rate limiting middleware
- Form submission throttling
- Upload limits per user

## Monitoring & Analytics

### Built-in Tracking
- Blog post view counts
- Form submission analytics
- Upload success/failure rates
- Email delivery status

### Error Handling
- Comprehensive error logging
- Graceful degradation
- User-friendly error messages

## Content Management

### Blog Content Features
- Rich text content support
- SEO meta tag management
- Category/tag organization
- Featured image support
- Draft/publish workflow
- URL slug generation
- View count tracking

### Image Management
- Automatic optimization
- Multiple upload contexts
- Metadata tracking
- Easy integration with blog posts

This backend is production-ready and designed to scale with your business needs!