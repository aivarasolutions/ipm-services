// Replit Mail utility - JavaScript version
// Using replitmail integration for PDF delivery

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateSmtpMessage(message) {
  if (!message || typeof message !== 'object') {
    throw new Error('Message must be an object');
  }
  
  if (!message.to) {
    throw new Error('Recipient email address is required');
  }
  
  // Validate email format
  const emails = Array.isArray(message.to) ? message.to : [message.to];
  for (const email of emails) {
    if (!validateEmail(email)) {
      throw new Error(`Invalid email format: ${email}`);
    }
  }
  
  if (!message.subject) {
    throw new Error('Email subject is required');
  }
  
  return true;
}

function getAuthToken() {
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!xReplitToken) {
    throw new Error(
      "No authentication token found. Please set REPL_IDENTITY or ensure you're running in Replit environment."
    );
  }

  return xReplitToken;
}

export async function sendEmail(message) {
  // Validate the message
  validateSmtpMessage(message);
  
  const authToken = getAuthToken();

  const response = await fetch(
    "https://connectors.replit.com/api/v2/mailer/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X_REPLIT_TOKEN": authToken,
      },
      body: JSON.stringify({
        to: message.to,
        cc: message.cc,
        subject: message.subject,
        text: message.text,
        html: message.html,
        attachments: message.attachments,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to send email");
  }

  return await response.json();
}