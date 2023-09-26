// import { EmailTemplate } from '../../../components/EmailTemplate';
import { NextResponse } from "next/server";



export async function POST(req,res) {

  const body  = await req.json();
  //console.log(body);
  const {email, subject, message } = body;
  if(!email || !subject || !message) {
    //send status 400
    return NextResponse.json({ success: false, message: "Invalid Request"}, { status: 400 });
  }
  console.log(email, subject, message);
  return NextResponse.json({ success: true});

}
