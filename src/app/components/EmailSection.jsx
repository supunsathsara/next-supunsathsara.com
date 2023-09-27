'use client';

import { useState } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import XIcon from "../../../public/x-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setEmailError(false);
    setEmailSubmitted(false);

    // Get form data
    const data = {
      name:e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    // Define the endpoint
    const endpoint = "/api/send";
    console.log(data)
    try {
      // Send a POST request with form data
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check the response status
      if (response.status === 200) {
        // Success
        setEmailSubmitted(true);
        setEmailError(false);
      } else {
        // Error
        setEmailError(true);
        setEmailSubmitted(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setEmailError(true);
      setEmailSubmitted(false);
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
          I love to code and I&apos;m always looking for new opportunities to learn and grow. I&apos;m currently working on a few projects and I&apos;m always open to new ideas and collaborations. If you have any questions or want to work with me, feel free to contact me.
        </p>
        <p className="text-lg font-semibold my-5 text-white">
          <EnvelopeIcon className="inline-block mr-2 h-6 w-6 text-white" />
          <a href="mailto:contact@supunsathsara.com" className="hover:underline">
            contact@supunsathsara.com
          </a>
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com/supunsathsara" title="Supun Sathsara on github" target="_blank" rel="noopener noreferrer">
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
          <Link href="https://www.linkedin.com/in/supunsathsara/" title="Supun Sathsara on LinkedIn" target="_blank" rel="noopener noreferrer">
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </Link>
          <Link href="https://twitter.com/ssupunsathsara" title="Supun Sathsara on Twitter" target="_blank" rel="noopener noreferrer">
            <Image className="p-2" src={XIcon} height={48} width={48} alt="X Icon" />
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

          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send"}
          </button>
          {emailSubmitted && (
            <p className="text-green-400 text-sm md:text-base mt-2 z-5 mx-auto font-bold">
              Email sent successfully!
            </p>
          )}
          {emailError && (
            <p className="text-red-400 text-sm md:text-base mt-2">
              An error occurred. Please try again later.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default EmailSection;
