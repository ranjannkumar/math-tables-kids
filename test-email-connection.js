#!/usr/bin/env node

// Quick test to verify email and SMS functionality
const fetch = require('node-fetch');

async function testConnection() {
  console.log('🧪 Testing email and carrier SMS connection...\n');
  
  const testData = {
    childName: 'Test Student',
    section: 'Addition - Sums up to 5',
    score: 8,
    totalQuestions: 10,
    timeTaken: 120,
    accuracy: 80,
    date: new Date().toLocaleString()
  };

  try {
    console.log('Trying proxy URL: /api/send-results');
    let response = await fetch('http://localhost:3000/api/send-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    if (response.ok) {
      console.log('✅ Proxy connection works!');
      return;
    }
  } catch (error) {
    console.log('⚠️  Proxy failed, trying direct connection...');
  }

  try {
    console.log('Trying direct URL: http://localhost:3001/api/send-results');
    let response = await fetch('http://localhost:3001/api/send-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    if (response.ok) {
      console.log('✅ Direct connection works!');
      console.log('📧📱 Test email and carrier SMS should be sent!');
    } else {
      console.log('❌ Connection failed. Check server and .env configuration.');
    }
  } catch (error) {
    console.log('❌ Cannot connect to server. Make sure it\'s running on port 3001.');
    console.log('Run: npm run server');
  }
}

// Only run if node-fetch is available, otherwise show manual test
try {
  testConnection();
} catch (error) {
  console.log('📋 Manual Test Instructions:');
  console.log('1. Set up SMS: node setup-sms.js (if not already done)');
  console.log('2. Install dependencies: npm install');
  console.log('3. Start server: npm run server');
  console.log('4. Start app: npm start');
  console.log('5. Complete an addition pre-test section');
  console.log('6. Check email, SMS (via carrier gateways), and server console for confirmation');
}