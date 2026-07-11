import { processEmail } from "@/lib/sendEmailCore";
import getCorsHeaders from "@/lib/getCorsHeaders";
import { rateLimit } from "@/lib/rateLimit";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders(
    req.headers.get("Origin") || req.headers.get("origin") || ""
  );

  // Rate limiting by IP address.
  // Vercel sets x-real-ip to the client's real IP on every request — this is
  // the most reliable single-value header. x-forwarded-for may contain
  // multiple chained IPs; we take the first if x-real-ip is absent.
  const ip =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const { allowed, remaining } = rateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "Retry-After": "60",
          "X-RateLimit-Remaining": String(remaining),
        },
      }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400, headers: corsHeaders }
    );
  }

  const response = await processEmail(body);

  if (!response.success) {
    // Determine status purely from our unified logic (validation/captcha usually 400)
    const isErrorServerSide = response.message?.includes("Something went wrong");
    return NextResponse.json(
      response,
      { status: isErrorServerSide ? 500 : 400, headers: corsHeaders }
    );
  }

  return NextResponse.json(response, { status: 200, headers: corsHeaders });
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