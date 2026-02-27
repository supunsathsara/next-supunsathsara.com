"use client";
import React, {
  useTransition,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import TabButton from "./TabButton";
import certificates from "@/constants/certificates";
import { useAgeCalculation } from "@/hooks";
import Link from "next/link";

// Constants
const BIRTH_DATE = new Date("2002-08-26");

// Skills component
const SkillsList = () => {
  const skills = [
    "Node Js",
    "Express Js",
    "Next Js",
    "React Js",
    "React Native",
    "SQL",
    "NoSQL",
    "Tailwind CSS",
    "Redis",
    "Python",
    "ASP.NET",
  ];

  return (
    <ul className="list-disc pl-2">
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  );
};

// Education component
const EducationList = () => (
  <ul className="list-disc pl-2">
    <li className="my-3">
      <div className="flex justify-between">
        <span>Higher National Diploma in Software Engineering</span>
      </div>
      <div className="text-sm text-gray-400">(Reading)</div>
      <div className="text-sm text-gray-400">
        National Institute of Business Management
      </div>
      <div className="text-sm text-gray-400">2023</div>
    </li>

    <li className="my-3">
      <div className="flex justify-between">
        <span>Diploma in Software Engineering</span>
      </div>
      <div className="text-sm text-gray-300">
        Gold Medalist
        <span
          className="cursor-pointer"
          title="Recipient of the Gold Medal, awarded to the student with the highest academic achievement across all NIBM branches"
        >
          <sup> ! </sup>
        </span>
        / Scholarship Holder{" "}
        <span
          className="cursor-pointer animate-pulse"
          title="Recipient of the Gold Medal, awarded to the student with the highest academic achievement across all NIBM branches"
        >
          🎖️
        </span>
      </div>
      <div className="text-sm text-gray-400">GPA: 4.00</div>
      <div className="text-sm text-gray-400">
        National Institute of Business Management
      </div>
      <div className="text-sm text-gray-400">2022</div>
    </li>
  </ul>
);

// Certifications component
const CertificationsList = () => {
  const recentCertificates = useMemo(() => certificates.slice(-10), []);

  return (
    <div>
      <ul className="list-disc pl-2">
        {recentCertificates.map((certificate) => (
          <li key={certificate.id}>
            <a
              href={certificate.url}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {certificate.name}
            </a>{" "}
            by {certificate.provider}
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-300 mt-4 hover:text-white hover:underline">
        <Link href="/certifications" className="hover:underline">
          View more
        </Link>
      </p>
    </div>
  );
};

// Tab configuration
const TAB_CONFIG = [
  { id: "skills", title: "Skills", component: SkillsList },
  { id: "education", title: "Education", component: EducationList },
  {
    id: "certifications",
    title: "Certifications",
    component: CertificationsList,
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const [isStopped, setIsStopped] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const playCountRef = useRef(0);
  const maxPlaysRef = useRef(1);
  const isReplayRef = useRef(false);
  const shouldStopNextRef = useRef(false);

  // Custom hooks
  const { age, isBirthday } = useAgeCalculation(BIRTH_DATE);

  // Determine max plays: 2 if cinematic intro was shown, 1 otherwise
  useEffect(() => {
    const introShown = sessionStorage.getItem("intro-shown");
    maxPlaysRef.current = introShown ? 2 : 1;
  }, []);

  // Capture the current video frame to the canvas
  const captureFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  }, []);

  // Play video on mount & handle ended/timeupdate events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});

    // Capture frames near the end so we have the last frame ready
    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const remaining = video.duration - video.currentTime;
      if (remaining < 0.5 && shouldStopNextRef.current) {
        captureFrame();
      }
    };

    const handleEnded = () => {
      playCountRef.current += 1;

      const willStop =
        isReplayRef.current ||
        playCountRef.current >= maxPlaysRef.current;

      if (willStop) {
        // Capture final frame, crossfade to canvas
        captureFrame();
        setShowCanvas(true);
        isReplayRef.current = false;
        shouldStopNextRef.current = false;
        // Let the CSS transition complete, then mark as stopped
        setTimeout(() => setIsStopped(true), 800);
      } else {
        // Determine if the NEXT play will be the last
        if (playCountRef.current + 1 >= maxPlaysRef.current || isReplayRef.current) {
          shouldStopNextRef.current = true;
        }
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    // Pre-flag if first play is the last
    if (maxPlaysRef.current <= 1) {
      shouldStopNextRef.current = true;
    }

    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [captureFrame]);

  // Hover to replay (desktop) / Tap to replay (mobile)
  const handleReplay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isStopped) return;
    isReplayRef.current = true;
    shouldStopNextRef.current = true;
    setIsStopped(false);
    setShowCanvas(false);
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [isStopped]);

  const handleTabChange = useCallback(
    (id) => {
      startTransition(() => {
        setTab(id);
      });
    },
    [startTransition]
  );

  const activeTabContent = useMemo(() => {
    const activeTab = TAB_CONFIG.find((t) => t.id === tab);
    const Component = activeTab?.component;
    return Component ? <Component /> : null;
  }, [tab]);

  return (
    <section className="text-white z-10" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative z-10 flex items-center justify-center"
        >
          {/* Video container with edge-blending gradients */}
          <div
            className="relative w-full max-w-[500px] aspect-[9/16] overflow-hidden"
            onMouseEnter={handleReplay}
            onClick={handleReplay}
          >
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              poster="/images/intro-poster.jpg"
              className="w-full h-full object-cover transition-opacity duration-700 ease-out"
              style={{
                background: "#030014",
                opacity: showCanvas ? 0 : 1,
              }}
            >
              <source src="/intro.webm" type="video/webm" />
              <source src="/intro.mp4" type="video/mp4" />
            </video>
            {/* Freeze-frame canvas for smooth crossfade */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out pointer-events-none"
              style={{ opacity: showCanvas ? 1 : 0 }}
            />
            {/* Edge-blend gradients to dissolve video into background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to top, #030014 0%, transparent 18%),
                  linear-gradient(to bottom, #030014 0%, transparent 18%),
                  linear-gradient(to left, #030014 0%, transparent 12%),
                  linear-gradient(to right, #030014 0%, transparent 12%)
                `,
              }}
            />
            {/* Purple tint overlay to match website palette */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 40%, rgba(88, 28, 135, 0.08) 0%, rgba(3, 0, 20, 0.15) 100%)",
              }}
            />
          </div>
        </motion.div>
            <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg text-justify">
            As a {age}-year-old{" "}
            {isBirthday && (
              <span
                className="animate-pulse"
                title="it's my birthday today! 🥳"
              >
                🎂
              </span>
            )}{" "}
            Software Engineering undergraduate at NIBM Sri Lanka, I&apos;m a
            quick learner driven by a passion for web development.
            <br />I am an{" "}
            <span className="font-bold hover:bg-primary-500 bg-white text-[#030014] rounded-sm px-1 transition-colors">
              Associate Software Engineer
            </span>{" "}
            at Expernetic, where I develop and maintain web applications, APIs,
            and microservices. Additionally, I am involved as a{" "}
            <span className="font-bold text-[#030014] bg-white hover:bg-[#FF6C37] hover:text-white rounded-sm px-1 transition-colors">
              Postman Student Leader
            </span>
            , where I lead and mentor in the Postman student community.
            <br />
            With a strong foundation in web development, I bring responsive web
            design to life. I am dedicated to crafting efficient solutions and
            continuously innovating in the tech world.
          </p>
          <div className="flex flex-row justify-start mt-8 gap-2">
            {TAB_CONFIG.map(({ id, title }) => (
              <TabButton
                key={id}
                selectTab={() => handleTabChange(id)}
                active={tab === id}
              >
                {title}
              </TabButton>
            ))}
          </div>
          <div
            className="mt-4 min-h-[300px] relative"
            role="tabpanel"
            aria-label={`${tab} content`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              >
                {activeTabContent}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
