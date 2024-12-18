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
  const [emailError, setEmailError] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");
  const captchaRef = useRef();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setEmailError(false);
    setEmailSubmitted(false);

    // Get form data
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
      token: e.target["cf-turnstile-response"].value,
    };

    // Define the endpoint
    const endpoint = "/api/send";
    // console.log(data)

    try {
      toast.dismiss();
      toast.promise(
        fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((response) => {
          if (response.status === 200) {
            // Success
            setEmailSubmitted(true);
            setEmailError(false);
            return response.json();
          } else {
            // Error
            setEmailError(true);
            setEmailSubmitted(false);
            throw new Error("An error occurred. Please try again later.");
          }
        }),
        {
          loading: "Sending...",
          success: "Email sent successfully!",
          error: "An error occurred. Please try again later.",
        },
        {
          style: {
            minWidth: "250px",
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "18px",
          },
        }
      );
    } catch (error) {
      console.error("An error occurred:", error);
      setEmailError(true);
      setEmailSubmitted(false);
    } finally {
      setIsSending(false);
      setStatus("");
      captchaRef.current?.reset();
      // Reset the form
      e.target.reset();
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
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
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
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
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
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
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
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
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
            className="bg-primary-700 hover:bg-primary-800 disabled:bg-primary-900 text-white font-medium py-2.5 px-5 rounded-lg w-full"
            disabled={isSending || status !== "solved"}
          >
            {isSending ? "Sending..." : "Send"}
          </button>
          {emailSubmitted && (
            <p className="text-green-400 text-sm md:text-base mt-2 z-5 mx-auto font-bold">
              Email sent successfully!
            </p>
          )}
          {emailError && (
            <p className="text-red-400 text-sm md:text-base mt-2 z-5 mx-auto font-bold">
              An error occurred. Please try again later.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
