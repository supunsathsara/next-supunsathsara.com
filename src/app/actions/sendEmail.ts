"use server";

import { processEmail, SendEmailInput, SendEmailResponse } from "@/lib/sendEmailCore";
import type { ActionState } from "@/types/email";

export async function sendEmailAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const data: Partial<SendEmailInput> = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
    token: formData.get("cf-turnstile-response") as string,
  };

  const response: SendEmailResponse = await processEmail(data);

  return {
    success: response.success,
    message: response.success ? "Message sent! I'll be in touch soon." : (response.message || "An error occurred"),
    timestamp: Date.now(),
  };
}
