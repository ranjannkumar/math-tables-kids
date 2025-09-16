#!/usr/bin/env node

// SMS Test Script - Debug SMS functionality

require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('\n🧪 SMS Debug Test\n');

// Check configuration
console.log('📋 Configuration Check:');
const emailUser = process.env.EMAIL_USER || 'not-set';
const emailPass = process.env.EMAIL_PASS || 'not-set';
const parentPhoneNumber = process.env.PARENT_PHONE_NUMBER || 'not-set';

console.log(`📧 Email User: ${emailUser}`);
console.log(`🔑 Email Pass: ${emailPass ? '***set***' : 'NOT SET'}`);
console.log(`📱 Phone Number: ${parentPhoneNumber}`);

if (!parentPhoneNumber || parentPhoneNumber === 'not-set') {
  console.log('\n❌ ERROR: PARENT_PHONE_NUMBER not set in .env file');
  console.log('Run: node setup-sms.js');
  process.exit(1);
}

if (!emailUser || emailUser === 'not-set' || !emailPass || emailPass === 'not-set') {
  console.log('\n❌ ERROR: Email not configured in .env file');
  process.exit(1);
}

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass
  }
});

// Carrier gateways
const carrierGateways = [
  { name: 'Verizon', domain: 'vtext.com' },
  { name: 'AT&T', domain: 'txt.att.net' },
  { name: 'T-Mobile', domain: 'tmomail.net' },
  { name: 'Sprint', domain: 'messaging.sprintpcs.com' },
  { name: 'US Cellular', domain: 'email.uscc.net' }
];

async function testSMS() {
  console.log('\n🚀 Starting SMS test...\n');
  
  const cleanPhone = parentPhoneNumber.replace(/\D/g, '');
  console.log(`📱 Clean phone: ${cleanPhone}`);
  
  if (cleanPhone.length !== 10 && cleanPhone.length !== 11) {
    console.log(`❌ Invalid phone number: ${cleanPhone.length} digits`);
    return;
  }
  
  const phone10 = cleanPhone.slice(-10);
  console.log(`📞 Using: ${phone10}`);
  
  const testMessage = `TEST: Math app SMS working! Time: ${new Date().toLocaleTimeString()}`;
  
  console.log(`📝 Message: "${testMessage}"`);
  console.log(`📧 From: ${emailUser}\n`);
  
  const results = [];
  
  for (const carrier of carrierGateways) {
    try {
      const smsEmail = `${phone10}@${carrier.domain}`;
      console.log(`📨 Testing ${carrier.name}: ${smsEmail}`);
      
      await transporter.sendMail({
        from: emailUser,
        to: smsEmail,
        subject: '',
        text: testMessage
      });
      
      console.log(`✅ ${carrier.name}: Sent successfully`);
      results.push(carrier.name);
    } catch (error) {
      console.log(`❌ ${carrier.name}: ${error.message}`);
    }
  }
  
  console.log(`\n📊 RESULTS:`);
  console.log(`✅ Successful: ${results.length > 0 ? results.join(', ') : 'None'}`);
  console.log(`❌ Failed: ${carrierGateways.length - results.length}`);
  
  if (results.length > 0) {
    console.log(`\n🎉 SMS test completed! Check your phone for test messages.`);
    console.log(`📱 You should receive ${results.length} SMS message(s).`);
  } else {
    console.log(`\n⚠️ No SMS messages sent successfully.`);
    console.log(`💡 Possible issues:`);
    console.log(`   - Wrong phone number format`);
    console.log(`   - Carrier doesn't support email-to-SMS`);
    console.log(`   - Email authentication problems`);
    console.log(`   - Carrier blocking bulk messages`);
  }
}

testSMS().catch(console.error);