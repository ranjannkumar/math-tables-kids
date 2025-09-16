require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Carrier email-to-SMS gateways
const carrierGateways = [
  { name: 'Verizon', domain: 'vtext.com' },
  { name: 'AT&T', domain: 'txt.att.net' },
  { name: 'T-Mobile', domain: 'tmomail.net' },
  { name: 'Sprint', domain: 'messaging.sprintpcs.com' },
  { name: 'US Cellular', domain: 'email.uscc.net' },
  { name: 'Cricket', domain: 'sms.cricketwireless.net' },
  { name: 'Metro PCS', domain: 'mymetropcs.com' },
  { name: 'Boost Mobile', domain: 'smsmyboostmobile.com' },
  { name: 'Virgin Mobile', domain: 'vmobl.com' }
];

// Function to send SMS via carrier email gateways
async function sendSMSViaEmail(phoneNumber, message, fromEmail) {
  console.log(`\n🔍 SMS DEBUG: Starting SMS send process`);
  console.log(`📱 Phone number received: "${phoneNumber}"`);
  
  const cleanPhone = phoneNumber.replace(/\D/g, ''); // Remove non-digits
  console.log(`🧹 Cleaned phone number: "${cleanPhone}"`);
  
  if (cleanPhone.length !== 10 && cleanPhone.length !== 11) {
    const error = `Invalid phone number format. Got ${cleanPhone.length} digits: "${cleanPhone}"`;
    console.log(`❌ ${error}`);
    throw new Error(error);
  }
  
  // Use last 10 digits for US numbers
  const phone10 = cleanPhone.slice(-10);
  console.log(`📞 Using 10-digit number: "${phone10}"`);
  console.log(`📧 Sending from email: "${fromEmail}"`);
  console.log(`💬 Message length: ${message.length} characters`);
  
  const results = [];
  const failures = [];
  
  // Try multiple carriers simultaneously
  console.log(`🚀 Attempting to send via ${carrierGateways.length} carriers...`);
  
  for (const carrier of carrierGateways) {
    try {
      const smsEmail = `${phone10}@${carrier.domain}`;
      console.log(`📨 Trying ${carrier.name}: ${smsEmail}`);
      
      await transporter.sendMail({
        from: fromEmail,
        to: smsEmail,
        subject: '', // SMS gateways work better with empty subject
        text: message
      });
      
      console.log(`✅ ${carrier.name}: SUCCESS`);
      results.push(carrier.name);
    } catch (error) {
      console.log(`❌ ${carrier.name}: FAILED - ${error.message}`);
      failures.push({ carrier: carrier.name, error: error.message });
    }
  }
  
  console.log(`\n📊 SMS SUMMARY:`);
  console.log(`✅ Successful carriers: ${results.length > 0 ? results.join(', ') : 'None'}`);
  console.log(`❌ Failed carriers: ${failures.length}`);
  
  if (failures.length > 0) {
    console.log(`\n🔧 FAILURE DETAILS:`);
    failures.forEach(f => console.log(`   ${f.carrier}: ${f.error}`));
  }
  
  return results;
}

// API endpoint to send pre-test results
app.post('/api/send-results', async (req, res) => {
  try {
    console.log('Received pre-test results request:', req.body);
    
    const { childName, section, score, totalQuestions, timeTaken, accuracy, date } = req.body;
    
    // Check if email and SMS configuration is set up
    const emailUser = process.env.EMAIL_USER || 'your-email@gmail.com';
    const emailPass = process.env.EMAIL_PASS || 'your-app-password';
    const parentEmail = process.env.PARENT_EMAIL || 'your-actual-email@example.com';
    const parentPhoneNumber = process.env.PARENT_PHONE_NUMBER || '';
    
    console.log('Configuration status:', {
      email: {
        from: emailUser,
        to: parentEmail,
        hasPassword: !!emailPass
      },
      sms: {
        to: parentPhoneNumber ? parentPhoneNumber.replace(/\d(?=\d{4})/g, '*') : 'Not configured',
        configured: !!parentPhoneNumber
      }
    });
    
    const emailConfigured = emailUser !== 'your-email@gmail.com' && 
                           emailPass !== 'your-app-password' && 
                           parentEmail !== 'your-actual-email@example.com';
    
    const smsConfigured = !!parentPhoneNumber && parentPhoneNumber.length >= 10;
    
    if (!emailConfigured && !smsConfigured) {
      console.log('Neither email nor SMS configured properly. Please set up your .env file.');
      return res.status(400).json({ 
        success: false, 
        message: 'Neither email nor SMS configured. Please add EMAIL or PARENT_PHONE_NUMBER to .env file.' 
      });
    }
    
    const timeFormatted = `${Math.floor(timeTaken / 60)}:${(timeTaken % 60).toString().padStart(2, '0')}`;
    
    const mailOptions = {
      from: emailUser,
      to: parentEmail,
      subject: `Math Pre-test Results - ${childName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d3748; text-align: center;">Math Pre-test Results</h2>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4a5568; margin-bottom: 15px;">Student Information</h3>
            <p><strong>Name:</strong> ${childName}</p>
            <p><strong>Section:</strong> ${section}</p>
            <p><strong>Date:</strong> ${date}</p>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
            <div style="background-color: #ebf8ff; padding: 15px; border-radius: 8px; text-align: center;">
              <h4 style="color: #2b6cb0; margin: 0; font-size: 24px;">${score}/${totalQuestions}</h4>
              <p style="color: #4a5568; margin: 5px 0 0 0;">Correct Answers</p>
            </div>
            
            <div style="background-color: #f0fff4; padding: 15px; border-radius: 8px; text-align: center;">
              <h4 style="color: #38a169; margin: 0; font-size: 24px;">${accuracy.toFixed(1)}%</h4>
              <p style="color: #4a5568; margin: 5px 0 0 0;">Accuracy</p>
            </div>
          </div>
          
          <div style="background-color: #fef5e7; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h4 style="color: #d69e2e; margin: 0; font-size: 24px;">⏱️ ${timeFormatted}</h4>
            <p style="color: #4a5568; margin: 5px 0 0 0;">Time Taken</p>
          </div>
          
          <div style="background-color: #f3e8ff; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h4 style="color: #7c3aed; margin: 0; font-size: 24px;">${score > 0 ? (timeTaken / score).toFixed(1) : '0.0'}s</h4>
            <p style="color: #4a5568; margin: 5px 0 0 0;">Average Time per Answer</p>
          </div>
          
          <div style="background-color: #fed7d7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #c53030; margin: 0 0 10px 0;">Performance Analysis</h4>
            <p style="color: #4a5568; margin: 0;">
              ${accuracy >= 90 ? 'Excellent work! Your child is showing strong math skills.' : 
                accuracy >= 70 ? 'Good progress! Some areas need more practice.' : 
                'More practice needed. Consider reviewing basic addition facts.'}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #718096;">
            <p>Keep encouraging your child to practice regularly!</p>
          </div>
        </div>
      `
    };
    
    const results = [];
    
    // Send email if configured
    if (emailConfigured) {
      try {
        console.log('Attempting to send email...');
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        results.push('email');
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
    }
    
    // Send SMS if configured
    if (smsConfigured) {
      try {
        console.log('\n📱 SMS CONFIGURED - Attempting to send SMS via carrier email gateways...');
        console.log(`📧 From email: ${emailUser}`);
        console.log(`📱 To phone: ${parentPhoneNumber}`);
        
        const avgTimePerAnswer = score > 0 ? (timeTaken / score).toFixed(1) : '0.0';
        
        const smsMessage = `Math Results for ${childName}

${section}: ${score}/${totalQuestions} (${accuracy.toFixed(1)}%)
Time: ${timeFormatted}
Avg: ${avgTimePerAnswer}s per answer

${accuracy >= 90 ? 'Excellent work!' : 
  accuracy >= 70 ? 'Good progress!' : 
  'Keep practicing!'}

Keep encouraging your child!`;

        console.log(`📝 SMS Message Preview:\n${smsMessage}`);

        const carrierResults = await sendSMSViaEmail(parentPhoneNumber, smsMessage, emailUser);
        
        if (carrierResults.length > 0) {
          console.log(`\n🎉 SMS SENT SUCCESSFULLY via: ${carrierResults.join(', ')}`);
          results.push('SMS');
        } else {
          console.log('\n⚠️ SMS SENDING FAILED - No carriers succeeded');
          console.log('💡 This might be due to:');
          console.log('   - Carrier blocking email-to-SMS');
          console.log('   - Wrong phone number format');
          console.log('   - Email authentication issues');
        }
      } catch (smsError) {
        console.error('\n❌ ERROR SENDING SMS:', smsError.message);
        console.error('Full error:', smsError);
      }
    } else {
      console.log('\n📱 SMS NOT CONFIGURED - Skipping SMS send');
      console.log(`Phone number: "${parentPhoneNumber}"`);
    }
    
    if (results.length > 0) {
      res.json({ 
        success: true, 
        message: `Results sent successfully via ${results.join(' and ')}` 
      });
    } else {
      throw new Error('Failed to send via any configured method');
    }
  } catch (error) {
    console.error('Error sending results:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send results',
      error: error.message 
    });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 