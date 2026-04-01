import TurnstileVerify from "@/lib/TurnstileVerify";
import getCorsHeaders from "@/lib/getCorsHeaders";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  subject: z.string().min(3).max(50),
  message: z.string().min(3).max(500),
  token: z.string().min(3),
});

export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders(
    req.headers.get("Origin") || req.headers.get("origin") || ""
  );

  const body = await req.json();
  const { name, email, subject, message, token } = body;

  if (!name || !email || !subject || !message || !token) {
    return NextResponse.json(
      { success: false, message: "Invalid Request" },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    schema.parse({ name, email, subject, message, token });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.errors?.[0]?.message ?? "Validation error" },
      { status: 400, headers: corsHeaders }
    );
  }

  // Verify Turnstile captcha
  const challenge = await TurnstileVerify(token);
  if (!challenge.success) {
    return NextResponse.json(
      { success: false, message: "Captcha Failed" },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    await resend.batch.send([
      // Admin notification
      {
        from: "Portfolio Contact <no-reply@supunsathsara.com>",
        to: "contact@supunsathsara.com",
        replyTo: email,
        subject: `[Portfolio] ${subject} — from ${name}`,
        html: `
          <div style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px;border-radius:8px;">
            <h2 style="color:#333;margin-bottom:8px;">New message from your portfolio</h2>
            <div style="background:#fff;padding:16px;border-radius:8px;border-left:4px solid #7c3aed;">
              <p style="margin:0 0 8px;"><strong>Name:</strong> ${name}</p>
              <p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="margin:0 0 8px;"><strong>Subject:</strong> ${subject}</p>
              <hr style="border:none;border-top:1px solid #eee;margin:12px 0;" />
              <p style="white-space:pre-wrap;color:#444;">${message}</p>
            </div>
          </div>
        `,
      },
      // Auto-reply to sender
      {
        from: "Supun Sathsara <no-reply@supunsathsara.com>",
        to: `${name} <${email}>`,
        replyTo: "contact@supunsathsara.com",
        subject: "Thanks for reaching out! 👋",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Message Received</title>
          </head>
          <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5;">
            <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
              <div style="background:linear-gradient(135deg,#7c3aed,#06b6d4);padding:32px 24px;text-align:center;">
                <h1 style="color:#fff;margin:0;font-size:24px;">Hey ${name}! 👋</h1>
                <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Thanks for getting in touch.</p>
              </div>
              <div style="padding:32px 24px;">
                <p style="color:#444;line-height:1.6;margin:0 0 16px;">
                  I've received your message and will get back to you as soon as possible — usually within 24–48 hours.
                </p>
                <div style="background:#f9f5ff;border-left:4px solid #7c3aed;border-radius:4px;padding:16px;margin-bottom:24px;">
                  <p style="margin:0;font-weight:bold;color:#333;">Your message:</p>
                  <p style="margin:8px 0 0;color:#555;white-space:pre-wrap;">${message}</p>
                </div>
                <p style="color:#666;font-size:14px;margin:0;">
                  In the meantime, feel free to connect with me on 
                  <a href="https://linkedin.com/in/supunsathsara" style="color:#7c3aed;">LinkedIn</a> or 
                  <a href="https://github.com/supunsathsara" style="color:#7c3aed;">GitHub</a>.
                </p>
              </div>
              <div style="background:#f5f5f5;padding:16px 24px;text-align:center;border-top:1px solid #eee;">
                <p style="margin:0;font-size:12px;color:#999;">
                  Supun Sathsara · <a href="https://supunsathsara.com" style="color:#7c3aed;">supunsathsara.com</a>
                </p>
                <p style="margin:6px 0 0;font-size:11px;color:#bbb;">This is an automated reply. Please do not respond to this email.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      },
    ]);

    return NextResponse.json({ success: true }, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET(req: Request) {
  return NextResponse.json(
    { success: false, message: "Invalid Request" },
    {
      status: 400,
      headers: getCorsHeaders(
        req.headers.get("Origin") || req.headers.get("origin") || ""
      ),
    }
  );
}

export const OPTIONS = async (request: Request) => {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: getCorsHeaders(
        request.headers.get("Origin") || request.headers.get("origin") || ""
      ),
    }
  );
};