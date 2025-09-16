# 📧📱 Email & SMS Setup - Quick Start Guide

**Good news!** Your email and SMS functionality is already fully implemented! 🎉

## What Happens When an Addition Pre-test is Completed

When a user completes an addition pre-test section, the system automatically:

1. ✅ Calculates the results (score, accuracy, time taken)
2. ✅ Sends a beautifully formatted email report
3. ✅ Sends a concise SMS text message
4. ✅ Includes performance analysis and encouragement

## Email Report Includes

- **Student name and section completed**
- **Score and accuracy percentage**
- **Time taken to complete**
- **Performance analysis with recommendations**
- **Professional HTML formatting**

## SMS Report Includes

- **📊 Quick summary with emojis**
- **📝 Section and score overview**
- **⏱️ Time taken**
- **🌟 Performance encouragement**
- **Concise format perfect for mobile**

## Setup Instructions (2 minutes)

### Option 1: Use the SMS Setup Script
```bash
node setup-sms.js
```

### Option 2: Manual Setup
1. Create a `.env` file in the `math-tables-kids` folder
2. Add these lines (replace with your actual values):
```
# Email Configuration (Required for email)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
PARENT_EMAIL=parent@example.com

# SMS Configuration (Optional - just add phone number!)
PARENT_PHONE_NUMBER=1234567890
```

### Gmail App Password Setup
1. Go to Google Account settings
2. Enable 2-Step Verification
3. Go to Security → App passwords
4. Generate password for "Mail"
5. Use this password as `EMAIL_PASS`

### Simple SMS Setup (Optional)
1. Just add the parent's 10-digit phone number
2. No account creation needed!
3. Works with all major US carriers automatically
4. Format: 1234567890 (no spaces, dashes, or +1)

## Running the System

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the email & SMS server:**
   ```bash
   npm run server
   ```

3. **Start the app (in another terminal):**
   ```bash
   npm start
   ```

4. **Test it:**
   - Complete an addition pre-test section
   - Check your email and phone for the reports!

## Example Reports

### Email Report
The email includes:
- 📊 Visual score display
- ⏱️ Time tracking
- 📈 Performance analysis
- 💡 Personalized recommendations
- 🎨 Professional HTML design

### SMS Report Example
```
📊 Math Pre-test Results for Emma

📝 Section: Addition - Sums upto 5
✅ Score: 8/10 (80.0%)
⏱️ Time: 2:15

👍 Good progress!

Keep encouraging your child! 🎓
```

## Troubleshooting

- **No email/SMS received?** Check server console for errors
- **Configuration issues?** Server shows status for both email and SMS
- **Gmail issues?** Ensure App Password is correct (not regular password)
- **SMS not working?** 
  - Use 10-digit format: 1234567890 (no +1, spaces, or dashes)
  - SMS works with most US carriers (Verizon, AT&T, T-Mobile, etc.)
  - Some carriers may block or delay SMS from email gateways
  - Check server console to see which carriers were attempted

---

**That's it!** Your email and SMS functionality is ready to use. The system will automatically send reports when addition pre-tests are completed.