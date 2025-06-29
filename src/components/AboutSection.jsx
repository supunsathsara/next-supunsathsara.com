"use client";
import React, {
  useTransition,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import TabButton from "./TabButton";
import certificates from "@/constants/certificates";
import { useRandomImage, useAgeCalculation } from "@/hooks";
import AboutImage from "@public/images/about-1.jpg";
import AboutImage2 from "@public/images/about-2.jpg";
import AboutImage3 from "@public/images/about-3.jpg";
import AboutImage4 from "@public/images/about-4.jpg";
import AboutImage5 from "@public/images/about-5.jpg";
import Link from "next/link";

// Constants
const BIRTH_DATE = new Date("2002-08-26");
const IMAGES = [AboutImage, AboutImage2, AboutImage3, AboutImage4, AboutImage5];

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

  // Custom hooks
  const currentImage = useRandomImage(IMAGES);
  const { age, isBirthday } = useAgeCalculation(BIRTH_DATE);

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
        <Image
          className="shadow-lg z-10 rounded-sm"
          src={currentImage}
          width={500}
          height={500}
          alt="About image"
          priority={false}
          placeholder="blur"
        />
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
