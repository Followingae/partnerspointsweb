# Deployment Guide for Partners Points Web

## Quick Deploy Commands

### For cPanel/Shared Hosting:
```bash
# 1. Build for production (includes assets)
npm run build:production

# 2. Create deployment package
npm run package:deploy

# 3. Upload .next folder and package to your hosting
```

### Manual Steps:
1. Run `npm run build:production`
2. Upload these folders to your hosting:
   - `.next/` (entire folder)
   - `public/` (entire folder) 
   - `package.json`
   - `.env` (your environment file)

## Environment Variables Required:
Make sure these are set on your live server:

```env
# Email Configuration
SMTP_HOST="d3395.lon1.stableserver.net"
SMTP_PORT="465"
SMTP_USER="admin@partnerspoints.ae"
SMTP_PASS="your-password"
ADMIN_EMAIL="zain.ali@rfmloyaltyco.ae,zzain.ali@outlook.ae,zain@following.ae"

# Database (if using)
DATABASE_URL="your-database-url"
```

## Verify Deployment:
- ✅ RFM logo loads: https://partnerspoints.ae/rfm-loyalty-logo.jpg
- ✅ Email forms send to all 3 admin emails
- ✅ All pages load correctly

## Troubleshooting:
- **Images not loading**: Make sure `public/` folder uploaded correctly
- **Emails not working**: Check `.env` file has correct SMTP settings
- **404 errors**: Verify `.next/` folder uploaded completely