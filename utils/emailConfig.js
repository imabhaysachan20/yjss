import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Email templates
const emailTemplates = {
  submission: (name, problem) => ({
    subject: 'आपकी शिकायत प्राप्त हुई - Complaint Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="background-color: #2196F3; color: white; padding: 20px; text-align: center; border-radius: 5px;">
          <h1 style="margin: 0;">शिकायत प्राप्त हुई</h1>
        </div>
        
        <div style="padding: 20px;">
          <p>प्रिय ${name},</p>
          
          <p>हमें आपकी शिकायत प्राप्त हुई है। हमारी टीम जल्द ही इसकी समीक्षा करेगी:</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #2196F3; margin: 20px 0;">
            <strong>आपकी शिकायत:</strong><br>
            ${problem}
          </div>
          
          <p>हम आपकी शिकायत पर कार्रवाई करेंगे और आपको स्थिति अपडेट के साथ सूचित करेंगे।</p>
          
          <p>धन्यवाद,<br>
          <strong>सहायता टीम</strong></p>
        </div>
        
        <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #666;">
          यह एक स्वचालित ईमेल है। कृपया इसका उत्तर न दें।
        </div>
      </div>
    `,
    text: `प्रिय ${name}, आपकी शिकायत "${problem}" प्राप्त हुई है। हम जल्द ही इसकी समीक्षा करेंगे।`
  }),

  resolved: (name, problem) => ({
    subject: 'समस्या हल हो गई - Your Issue Has Been Resolved',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 5px;">
          <h1 style="margin: 0;">समस्या हल हो गई!</h1>
        </div>
        
        <div style="padding: 20px;">
          <p>प्रिय ${name},</p>
          
          <p>हमें यह बताते हुए खुशी हो रही है कि आपकी निम्नलिखित समस्या को सफलतापूर्वक हल कर दिया गया है:</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0;">
            <strong>आपकी समस्या:</strong><br>
            ${problem}
          </div>
          
          <p>अगर आपको कोई और सहायता चाहिए या कोई अन्य समस्या है, तो कृपया बेझिझक हमसे संपर्क करें।</p>
          
          <p>धन्यवाद,<br>
          <strong>सहायता टीम</strong></p>
        </div>
        
        <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #666;">
          यह एक स्वचालित ईमेल है। कृपया इसका उत्तर न दें।
        </div>
      </div>
    `,
    text: `प्रिय ${name}, आपकी समस्या "${problem}" को सफलतापूर्वक हल कर दिया गया है। धन्यवाद।`
  }),

  rejected: (name, problem) => ({
    subject: 'समस्या की स्थिति अपडेट - Issue Status Update',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="background-color: #f44336; color: white; padding: 20px; text-align: center; border-radius: 5px;">
          <h1 style="margin: 0;">समस्या की स्थिति अपडेट</h1>
        </div>
        
        <div style="padding: 20px;">
          <p>प्रिय ${name},</p>
          
          <p>हमें खेद है कि हम आपकी निम्नलिखित समस्या को इस समय हल नहीं कर सके:</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #f44336; margin: 20px 0;">
            <strong>आपकी समस्या:</strong><br>
            ${problem}
          </div>
          
          <p>कृपया अधिक जानकारी के लिए या वैकल्पिक समाधान के लिए हमारी टीम से संपर्क करें। हम आपकी सहायता करने के लिए प्रतिबद्ध हैं।</p>
          
          <p>संपर्क विवरण:<br>
          ईमेल: yjssofficial@gmail.com<br>
          फोन: +91-7376366014</p>
          
          <p>धन्यवाद,<br>
          <strong>सहायता टीम</strong></p>
        </div>
        
        <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #666;">
          यह एक स्वचालित ईमेल है। कृपया इसका उत्तर न दें।
        </div>
      </div>
    `,
    text: `प्रिय ${name}, खेद है कि हम आपकी समस्या "${problem}" को इस समय हल नहीं कर सके। अधिक जानकारी के लिए कृपया हमसे संपर्क करें।`
  }),

  in_progress: (name, problem) => ({
    subject: 'समस्या पर काम चल रहा है - Your Issue is Being Processed',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="background-color: #2196F3; color: white; padding: 20px; text-align: center; border-radius: 5px;">
          <h1 style="margin: 0;">समस्या पर काम चल रहा है</h1>
        </div>
        
        <div style="padding: 20px;">
          <p>प्रिय ${name},</p>
          
          <p>हमारी टीम आपकी निम्नलिखित समस्या पर सक्रिय रूप से काम कर रही है:</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #2196F3; margin: 20px 0;">
            <strong>आपकी समस्या:</strong><br>
            ${problem}
          </div>
          
          <p>हम जल्द ही इसे हल करने का प्रयास कर रहे हैं। कृपया धैर्य रखें। हम आपको स्थिति की जानकारी देते रहेंगे।</p>
          
          <p>धन्यवाद,<br>
          <strong>सहायता टीम</strong></p>
        </div>
        
        <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #666;">
          यह एक स्वचालित ईमेल है। कृपया इसका उत्तर न दें।
        </div>
      </div>
    `,
    text: `प्रिय ${name}, आपकी समस्या "${problem}" पर हमारी टीम काम कर रही है। जल्द ही अपडेट मिलेगी।`
  })
};

// Send submission confirmation email
export const sendSubmissionConfirmationEmail = async (email, name, problem) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates.submission;
    
    if (!template) {
      throw new Error('No submission email template found');
    }

    const { subject, html, text } = template(name, problem);

    const mailOptions = {
      from: `"सहायता टीम" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Submission confirmation email sent:', info.messageId);
    return { 
      success: true, 
      message: 'Submission confirmation email sent successfully', 
      messageId: info.messageId 
    };

  } catch (error) {
    console.error('Error sending submission confirmation email:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

// Send status update email
export const sendStatusUpdateEmail = async (email, name, problem, newStatus, oldStatus) => {
  try {
    // Send email for any status change, not just from pending
    if (!['resolved', 'rejected', 'in_progress'].includes(newStatus)) {
      return { success: false, message: 'No email needed for this status change' };
    }

    const transporter = createTransporter();
    const template = emailTemplates[newStatus];
    
    if (!template) {
      throw new Error(`No email template found for status: ${newStatus}`);
    }

    const { subject, html, text } = template(name, problem);

    const mailOptions = {
      from: `"सहायता टीम" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Status update email sent:', info.messageId);
    return { 
      success: true, 
      message: 'Status update email sent successfully', 
      messageId: info.messageId 
    };

  } catch (error) {
    console.error('Error sending status update email:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};