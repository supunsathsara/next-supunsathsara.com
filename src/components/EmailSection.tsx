"use client";

import { getCalApi } from "@calcom/embed-react";
import { CalendarIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import GithubIcon from "@public/github-icon.svg";
import InstaIcon from "@public/instagram-icon.svg";
import LinkedinIcon from "@public/linkedin-icon.svg";
import XIcon from "@public/x-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useActionState } from "react";
import { toast } from "react-hot-toast";
import { sendEmailAction } from "@/app/actions/sendEmail";
interface ContactFormProps {
  formAction: (payload: FormData) => void;
  isPending: boolean;
  captchaRef: React.RefObject<TurnstileInstance | null>;
  /** Fired on submit so a stale previous result stops hiding the form. */
  onSubmitAttempt: () => void;
}

/**
 * Owns the CAPTCHA status. The parent remounts this component through a `key`
 * tied to the action result, so a spent token can never leave the submit
 * button stuck enabled.
 */
const ContactForm = ({
  formAction,
  isPending,
  captchaRef,
  onSubmitAttempt,
}: ContactFormProps) => {
  const [status, setStatus] = useState("");

  return (
    <form action={formAction} onSubmit={onSubmitAttempt} className="flex flex-col">
            <div className="mb-6 md:grid md:grid-cols-2 gap-4">
              <div className="mb-6 md:mb-0">
                <label
                  htmlFor="name"
                  className="text-white block text-sm mb-2 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  minLength={3}
                  maxLength={50}
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 focus:outline-hidden focus:ring-2 focus:ring-primary-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-white block mb-2 text-sm font-medium"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 focus:outline-hidden focus:ring-2 focus:ring-primary-500 transition-all"
                  placeholder="jacob@google.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-white block text-sm mb-2 font-medium"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                minLength={3}
                maxLength={50}
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 focus:outline-hidden focus:ring-2 focus:ring-primary-500 transition-all"
                placeholder="Just saying hi"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-white block text-sm mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                minLength={3}
                maxLength={1000}
                rows={4}
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 focus:outline-hidden focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                placeholder="Let's talk about..."
              />
            </div>
            <Turnstile
              siteKey="0x4AAAAAAANZ9isw01CpEZ7d"
              ref={captchaRef}
              className="mb-6"
              options={{
                theme: "dark",
              }}
              onError={() => setStatus("error")}
              onExpire={() => setStatus("expired")}
              onSuccess={() => setStatus("solved")}
            />

            <button
              type="submit"
              className="relative flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 px-5 rounded-lg w-full transition-all duration-200"
              disabled={isPending || status !== "solved"}
            >
              {(() => {
                if (isPending) {
                  return (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  );
                }
                if (status === "solved") {
                  return "Send Message";
                }
                return "Verifying CAPTCHA...";
              })()}
            </button>
    </form>
  );
};

const EmailSection = () => {
  const [dismissed, setDismissed] = useState(false);
  const captchaRef = useRef<TurnstileInstance | null>(null);

  const [state, formAction, isPending] = useActionState(sendEmailAction, {
    success: false,
    message: "",
  });

  // Derived, never mirrored into extra state. `dismissed` only tracks the
  // user pressing "Send another message".
  const showSuccess = state.success && !dismissed;

  // Previous timestamp so the toast does not fire on mount.
  const prevTimestamp = useRef(state.timestamp);

  useEffect(() => {
    if (!state.timestamp || state.timestamp === prevTimestamp.current) return;
    prevTimestamp.current = state.timestamp;

    if (state.success) {
      toast.success(state.message || "Message sent!", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    } else {
      toast.error(state.message || "Something went wrong.", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
      captchaRef.current?.reset();
    }
  }, [state]);

  // Cal.com loads a third-party script, so it is only initialised when the
  // user actually asks to book rather than on every page load.
  const handleScheduleClick = async () => {
    const cal = await getCalApi({ namespace: "quick-chat" });
    cal("ui", {
      theme: "dark",
      styles: { branding: { brandColor: "#030014" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-[80%] md:-translate-x-1/2 -translate-1/2"></div>
      <div className="z-5">
        <h2 className="text-xl font-bold text-white my-2">
          Let&apos;s Connect
        </h2>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          {" "}
          I love to code and I&apos;m always looking for new opportunities to
          learn and grow. I&apos;m currently working on a few projects and
          I&apos;m always open to new ideas and collaborations. If you have any
          questions or want to work with me, feel free to contact me.
        </p>
        <p className="text-lg font-semibold my-5 text-white">
          <EnvelopeIcon className="inline-block mr-2 h-6 w-6 text-white" />
          <a
            href="mailto:contact@supunsathsara.com"
            className="hover:underline"
          >
            contact@supunsathsara.com
          </a>
        </p>
        <button
          type="button"
          onClick={handleScheduleClick}
          data-cal-namespace="quick-chat"
          data-cal-link="supunsathsara/quick-chat"
          data-cal-config='{"layout":"month_view"}'
          className="flex items-center justify-center px-12 py-2 ring-white text-white ring-1 my-8 animate-shimmer bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] bg-[#121212] hover:bg-slate-800 rounded-lg"
        >
          <CalendarIcon className="h-5 w-5 mr-2" />
          <span>Let&apos;s Schedule a Call</span>
        </button>

        <div className="socials flex flex-row gap-2">
          <Link
            href="https://github.com/supunsathsara"
            title="Supun Sathsara on github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={GithubIcon} alt="GitHub profile of Supun Sathsara" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/supunsathsara/"
            title="Supun Sathsara on LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={LinkedinIcon} alt="LinkedIn profile of Supun Sathsara" />
          </Link>
          <Link
            href="https://twitter.com/ssupunsathsara"
            title="Supun Sathsara on Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="p-2"
              src={XIcon}
              height={48}
              width={48}
              alt="Supun Sathsara on X (Twitter)"
            />
          </Link>
          <Link
            href="https://www.instagram.com/s_supun_sathsara"
            title="Supun Sathsara on Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="p-1"
              src={InstaIcon}
              height={48}
              alt="Instagram profile of Supun Sathsara"
            />
          </Link>
        </div>
      </div>
      <div className="z-5">
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8 gap-4">
             <div className="rounded-full bg-green-500/10 p-5 mb-2">
              <svg className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Message Sent!</h3>
            <p className="text-[#ADB7BE] max-w-xs">
              Thanks for reaching out. I&apos;ll get back to you as soon as possible.
            </p>
            <button
              type="button"
              onClick={() => {
                setDismissed(true);
                setTimeout(() => captchaRef.current?.reset(), 100);
              }}
              className="mt-2 text-sm text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <ContactForm
            key={String(state.timestamp ?? "initial")}
            formAction={formAction}
            isPending={isPending}
            captchaRef={captchaRef}
            onSubmitAttempt={() => setDismissed(false)}
          />
        )}
      </div>
    </section>
  );
};

export default EmailSection;
