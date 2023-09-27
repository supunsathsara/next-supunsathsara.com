// import { EmailTemplate } from '../../../components/EmailTemplate';
import { NextResponse } from "next/server";
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req, res) {

  const body = await req.json();
  const { name, email, subject, message } = body;
  if (!name || !email || !subject || !message) {
    //send status 400
    return NextResponse.json({ success: false, message: "Invalid Request" }, { status: 400 });
  }

  const adminMsg = {
    to: 'contact@supunsathsara.com',
    from: {
      name: name,
      email: "no-reply@supunsathsara.com"
    },
    replyTo: email,
    subject: `${subject} Inquiry from ${name}`,
    text: message,
    html: `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
  <h3 style="color: #333; margin-bottom: 10px;">Message from ${email}</h3>
  <div style="background-color: #fff; padding: 15px; border-radius: 5px;">
    <h4 style="color: #333;"><b>Name:</b> ${name}</h4>
    <h4 style="color: #333;"><b>Subject:</b> ${subject}</h4>
    <p style="color: #666; margin-top: 10px;">${message}</p>
  </div>
</div>

  `,
  };

  const clientMsg = {
    to: {
      name: name,
      email: email
    },
    from: {
      name: "Supun Sathsara",
      email: "no-reply@supunsathsara.com"
    },
    replyTo: "contact@supunsathsara.com",
    subject: `Thank you for contacting me`,
    text: "I received your message and I will get back to you as soon as possible.",
    html: `
  <h3>Hi ${name},</h3>
  <h3>Thank you for contacting me</h3>
  <p>I received your message and I will get back to you as soon as possible.</p>
  <p>Best Regards,</p>
  <p>Supun Sathsara</p>
  <br/>
  <p style="font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
  `
  }

  // console.log(name, email, subject, message);
  try {
    const [adminResponse, clientResponse] = await Promise.all([
      sgMail.send(adminMsg),
      sgMail.send(clientMsg),
    ]);
    // console.log(adminResponse);
    if (adminResponse[0].statusCode == 202) {
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }

  return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });

}
