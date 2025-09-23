// API endpoint for handling relocation guide form submissions
// Using replitmail integration for PDF delivery

import fs from 'fs';
import path from 'path';
import { sendEmail } from '../src/utils/replitmail.js';

// Simple validation function for form data
function validateFormData(data) {
  const errors = [];
  
  if (!data.firstName || data.firstName.trim().length === 0) {
    errors.push("First name is required");
  }
  if (!data.lastName || data.lastName.trim().length === 0) {
    errors.push("Last name is required");
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Valid email is required");
  }
  if (!data.phone || data.phone.trim().length === 0) {
    errors.push("Phone number is required");
  }
  
  if (errors.length > 0) {
    const error = new Error("Validation failed");
    error.name = "ValidationError";
    error.errors = errors;
    throw error;
  }
  
  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim(),
    phone: data.phone.trim()
  };
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate form data
    const { firstName, lastName, email, phone } = validateFormData(req.body);

    // Read the PDF file and convert to base64
    const pdfPath = path.join(process.cwd(), 'public', 'relocation-guide.pdf');
    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfBase64 = pdfBuffer.toString('base64');

    // Send email to the user with PDF attachment
    const userEmailResult = await sendEmail({
      to: email,
      subject: "Your Complete Mexico Relocation Guide - International Property Management",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="background-color: #2563eb; padding: 8px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
                <h1 style="color: white; margin: 0; font-size: 18px;">IPM</h1>
              </div>
              <h2 style="color: #1f2937; margin: 0;">Thank You for Your Interest!</h2>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">Dear ${firstName},</p>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Thank you for requesting our Complete Mexico Real Estate Investment & Relocation Guide. 
              This comprehensive guide contains everything you need to know about investing in and 
              relocating to Mexico's most desirable locations including Cancún, Playa del Carmen, and Tulum.
            </p>
            
            <div style="background-color: #eff6ff; padding: 20px; border-radius: 6px; border-left: 4px solid #2563eb; margin: 20px 0;">
              <h3 style="color: #1d4ed8; margin: 0 0 10px 0; font-size: 16px;">What's Inside Your Guide:</h3>
              <ul style="color: #4b5563; margin: 10px 0; padding-left: 20px;">
                <li>Legal framework for foreign property ownership</li>
                <li>Financing options and investment strategies</li>
                <li>Step-by-step buying process</li>
                <li>Tax implications for US and Canadian buyers</li>
                <li>Complete relocation and living guide</li>
                <li>Property management and rental optimization</li>
              </ul>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              At International Property Management, we've been helping investors and families successfully 
              navigate the Mexican real estate market since 2010. With over 30 managed properties and 
              occupancy rates between 75-85%, we have the experience to make your investment journey smooth and profitable.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:info@ipmservices.com" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 500;">
                Schedule Your Free Consultation
              </a>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Questions? We're here to help! Feel free to reach out to us at any time. We look forward to 
              helping you discover the incredible opportunities that await in Mexico.
            </p>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">Best regards,</p>
              <p style="color: #1f2937; font-weight: 600; margin: 5px 0;">The IPM Team</p>
              <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">International Property Management</p>
              <p style="color: #6b7280; font-size: 14px; margin: 5px 0;">Maximizing Your Investment Potential Since 2010</p>
            </div>
          </div>
        </div>
      `,
      text: `Dear ${firstName},

Thank you for requesting our Complete Mexico Real Estate Investment & Relocation Guide. This comprehensive guide contains everything you need to know about investing in and relocating to Mexico's most desirable locations including Cancún, Playa del Carmen, and Tulum.

What's Inside Your Guide:
• Legal framework for foreign property ownership
• Financing options and investment strategies  
• Step-by-step buying process
• Tax implications for US and Canadian buyers
• Complete relocation and living guide
• Property management and rental optimization

At International Property Management, we've been helping investors and families successfully navigate the Mexican real estate market since 2010. With over 30 managed properties and occupancy rates between 75-85%, we have the experience to make your investment journey smooth and profitable.

Questions? We're here to help! Feel free to reach out to us at info@ipmservices.com any time. We look forward to helping you discover the incredible opportunities that await in Mexico.

Best regards,
The IPM Team
International Property Management
Maximizing Your Investment Potential Since 2010`,
      attachments: [{
        filename: "Complete-Mexico-Relocation-Guide.pdf",
        content: pdfBase64,
        contentType: "application/pdf",
        encoding: "base64"
      }]
    });

    // Send notification email to the business owner
    const ownerEmailResult = await sendEmail({
      to: "info@ipmservices.com", // Replace with actual business email
      subject: "New Relocation Guide Download - Lead Captured",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1f2937;">New Lead: Relocation Guide Download</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin: 0 0 15px 0;">Contact Information:</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
          
          <div style="background-color: #eff6ff; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
            <p style="margin: 0; color: #1d4ed8; font-weight: 500;">Action: Downloaded Complete Mexico Relocation Guide</p>
          </div>
          
          <p style="color: #4b5563; margin-top: 20px;">
            This lead has received the comprehensive relocation guide via email. 
            Consider following up within 24-48 hours to answer any questions and discuss their specific needs.
          </p>
        </div>
      `,
      text: `New Lead: Relocation Guide Download

Contact Information:
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Date: ${new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}

Action: Downloaded Complete Mexico Relocation Guide

This lead has received the comprehensive relocation guide via email. Consider following up within 24-48 hours to answer any questions and discuss their specific needs.`
    });

    // Log successful email sends
    console.log('Email sent to user:', userEmailResult.accepted);
    console.log('Notification sent to owner:', ownerEmailResult.accepted);

    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Relocation guide sent successfully! Check your email for the PDF guide.' 
    });

  } catch (error) {
    console.error('Error processing relocation guide request:', error);
    
    // Return appropriate error response
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Please check your form inputs',
        details: error.errors 
      });
    }
    
    return res.status(500).json({ 
      error: 'Failed to send relocation guide. Please try again or contact support.' 
    });
  }
}