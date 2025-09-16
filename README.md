# Math Tables for Kids

A fun and educational math learning app for children with pre-test functionality and email reporting.

## Features

- **Pre-test Sections**: 4 addition sub-sections with comprehensive question sets
- **Timer**: Real-time counting timer for each pre-test
- **Email Reporting**: Automatic email notifications with detailed results
- **Progress Tracking**: Visual progress indicators and completion status

## Pre-test Sections

1. **Sums upto 5** (Section A): 21 questions
2. **Sums upto 6-10** (Section B): 45 questions  
3. **Sums upto 11-15** (Section C): 70 questions
4. **Sums upto 16-20** (Section D): 95 questions

## Email Setup

To enable email notifications, you need to configure the following environment variables:

### 1. Create a `.env` file in the root directory:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
PARENT_EMAIL=parent@example.com
```

### 2. Gmail Setup Instructions:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password as `EMAIL_PASS`

### 3. Install Dependencies:

```bash
npm install
```

### 4. Start the Application:

```bash
# Terminal 1: Start React app
npm start

# Terminal 2: Start Express server
npm run server
```

## Email Report Features

When a child completes a pre-test, an email is automatically sent containing:

- **Student Information**: Name, section, date
- **Score**: Correct answers out of total questions
- **Accuracy**: Percentage score
- **Time Taken**: Total time in MM:SS format
- **Performance Analysis**: Personalized feedback based on accuracy

## Email Template

The email includes:
- Professional HTML formatting
- Color-coded sections for easy reading
- Performance analysis with personalized feedback
- Encouraging messages for continued practice

## Security Notes

- Never commit your `.env` file to version control
- Use app passwords instead of your main Gmail password
- Consider using environment variables in production

## Troubleshooting

If emails aren't sending:
1. Check your Gmail app password is correct
2. Ensure 2-factor authentication is enabled
3. Verify the parent email address is correct
4. Check the server console for error messages 