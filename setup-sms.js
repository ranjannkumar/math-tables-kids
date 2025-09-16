#!/usr/bin/env node

// SMS Setup Script - Adds SMS functionality to existing email configuration

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n📱 Math Tables SMS Setup\n');

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setupSMS() {
  try {
    console.log('This will add SMS notifications to your existing email setup.\n');
    
    // Check if .env file exists
    const envPath = path.join(__dirname, '.env');
    let existingEnv = '';
    
    if (fs.existsSync(envPath)) {
      existingEnv = fs.readFileSync(envPath, 'utf8');
      console.log('✅ Found existing .env file with email configuration.');
    } else {
      console.log('❌ No .env file found. Please set up email first or create .env file manually.');
      return;
    }
    
    // SMS setup
    console.log('\n📱 SMS SETUP:');
    const parentPhone = await askQuestion('Enter parent phone number (1234567890) or press Enter to skip: ');
    
    if (parentPhone.trim()) {
      const cleanPhone = parentPhone.replace(/\D/g, ''); // Remove non-digits
      
      // Check if SMS config already exists
      if (existingEnv.includes('PARENT_PHONE_NUMBER')) {
        // Replace existing phone number
        const updatedEnv = existingEnv.replace(/PARENT_PHONE_NUMBER=.*/, `PARENT_PHONE_NUMBER=${cleanPhone}`);
        fs.writeFileSync(envPath, updatedEnv);
      } else {
        // Add SMS config to existing file
        const smsConfig = `\n# SMS Configuration (No account needed!)\nPARENT_PHONE_NUMBER=${cleanPhone}`;
        fs.writeFileSync(envPath, existingEnv + smsConfig);
      }
    }
    
    console.log('\n✅ Configuration updated in .env file!');
    if (parentPhone.trim()) {
      console.log('📧📱 Email and SMS are now both configured!');
      console.log('🚀 SMS will work automatically with most US carriers!');
    } else {
      console.log('📧 Email remains configured (SMS setup skipped)');
    }
    console.log('\n📋 Next steps:');
    console.log('1. Start/restart the server: npm run server');
    console.log('2. In another terminal, start the app: npm start');
    console.log('3. Complete an addition pre-test to test SMS functionality');
    
  } catch (error) {
    console.error('❌ Error setting up SMS:', error);
  } finally {
    rl.close();
  }
}

setupSMS();