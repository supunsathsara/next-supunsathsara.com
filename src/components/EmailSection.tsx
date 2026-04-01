"use client";

import { getCalApi } from "@calcom/embed-react";
import { CalendarIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Turnstile } from "@marsidev/react-turnstile";
import GithubIcon from "@public/github-icon.svg";
import InstaIcon from "@public/instagram-icon.svg";
import LinkedinIcon from "@public/linkedin-icon.svg";
import XIcon from "@public/x-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");
  const captchaRef = useRef<any>(null);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "quick-chat" });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#030014" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);

    const form = e.target as HTMLFormElement;

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      token: (form.elements.namedItem("cf-turnstile-response") as HTMLInputElement).value,
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Success — show persistent success card, don't reset captcha/form
        setEmailSubmitted(true);
        toast.success("Message sent! I'll be in touch soon.", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        const body = await response.json().catch(() => ({}));
        toast.error(body?.message ?? "Something went wrong. Please try again.", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        // Only reset captcha on error so user can retry
        captchaRef.current?.reset();
        setStatus("");
      }
    } catch {
      toast.error("Network error. Please check your connection.", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      captchaRef.current?.reset();
      setStatus("");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-[80%] md:-translate-x-1/2 -translate-1/2"></div>
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
          data-cal-namespace="quick-chat"
          data-cal-link="supunsathsara/quick-chat"
          data-cal-config='{"layout":"month_view"}'
          className="flex items-center justify-center px-12 py-2 ring-white text-white ring-1 my-8 animate-shimmer bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] bg-[#121212] hover:bg-slate-800 rounded-lg"
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
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/supunsathsara/"
            title="Supun Sathsara on LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
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
              alt="X Icon"
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
              alt="Instagram Icon"
            />
          </Link>
        </div>
      </div>
      <div className="z-5">
        {emailSubmitted ? (
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
              onClick={() => {
                setEmailSubmitted(false);
                setStatus("");
                setTimeout(() => captchaRef.current?.reset(), 100);
              }}
              className="mt-2 text-sm text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
        <form className="flex flex-col" onSubmit={handleSubmit}>
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
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
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
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
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
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
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
              rows={4}
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
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
            disabled={isSending || status !== "solved"}
          >
            {isSending ? (
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
            ) : status !== "solved" ? (
              "Verifying CAPTCHA..."
            ) : (
              "Send Message"
            )}
          </button>
        </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
