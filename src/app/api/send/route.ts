import { processEmail } from "@/lib/sendEmailCore";
import getCorsHeaders from "@/lib/getCorsHeaders";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders(
    req.headers.get("Origin") || req.headers.get("origin") || ""
  );

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