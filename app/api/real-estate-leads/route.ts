import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, budget, location, goals } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" }, 
        { status: 400 }
      );
    }

    // TODO: Integrate with your CRM or email service
    // Example with Resend:
    // const RESEND_API_KEY = process.env.RESEND_API_KEY;
    // if (RESEND_API_KEY) {
    //   await fetch("https://api.resend.com/emails", {
    //     method: "POST",
    //     headers: {
    //       "Authorization": `Bearer ${RESEND_API_KEY}`,
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       from: "Real Estate <leads@ipm.services>",
    //       to: ["sales@ipm.services"],
    //       subject: "New Real Estate Lead",
    //       html: `
    //         <h2>New Real Estate Lead</h2>
    //         <p><strong>Name:</strong> ${name}</p>
    //         <p><strong>Email:</strong> ${email}</p>
    //         <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    //         <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
    //         <p><strong>Location:</strong> ${location || 'Any'}</p>
    //         <p><strong>Goals:</strong> ${goals || 'Not specified'}</p>
    //       `
    //     })
    //   });
    // }

    // Log to console for now
    console.log('New Real Estate Lead:', {
      name, email, phone, budget, location, goals,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Real estate lead error:', error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

