# Email & SMS Setup Guide

## Step 1: Create a .env file
Create a file named `.env` in the math-tables-kids folder with the following content:

```
# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
PARENT_EMAIL=parent@example.com

# SMS Configuration (Optional - just add phone number!)
PARENT_PHONE_NUMBER=1234567890
```

## Step 2: Set up Gmail App Password
1. Go to your Google Account settings
2. Enable 2-Step Verification if not already enabled
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Use this password as your EMAIL_PASS

## Step 3: Update the .env file
Replace the placeholders with your actual values:

**Email Configuration:**
- `your-gmail@gmail.com` → Your Gmail address
- `your-gmail-app-password` → The app password you generated
- `parent@example.com` → The email where you want to receive reports

**SMS Configuration (Optional):**
- `1234567890` → Parent's 10-digit phone number (no spaces, dashes, or +1)

**How SMS Works:**
- Uses carrier email-to-SMS gateways (no account needed!)
- Automatically tries all major US carriers (Verizon, AT&T, T-Mobile, etc.)
- Works with most US phone numbers
- No setup required - just enter the phone number!

**Quick SMS Setup:**
If you already have email configured, just run:
```bash
node setup-sms.js
```

## Step 4: Install dependencies
```bash
npm install
```

## Step 5: Restart the server
Stop the current server (Ctrl+C) and restart it:
```bash
npm run server
```

## Troubleshooting
1. **Check if server is running**: Look for "Server running on port 3001" in the console
2. **Check browser console**: Open Developer Tools (F12) and look for any errors
3. **Check server console**: Look for any error messages when completing a test

## Test the setup
1. Complete a pre-test
2. Check if you receive an email
3. If not, check the server console for error messages 