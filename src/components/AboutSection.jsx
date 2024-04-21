"use client";
import React, { useTransition, useState, useEffect } from "react";
import Image from "next/image";
import { differenceInYears, isToday } from 'date-fns';
import TabButton from "./TabButton";
import certificates from "@/constants/certificates";
import AboutImage from "@public/images/about-1.jpg";
import AboutImage2 from "@public/images/about-2.jpg";
import AboutImage3 from "@public/images/about-3.jpg";


const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Node Js</li>
        <li>Express Js</li>
        <li>Next Js</li>
        <li>React Js</li>
        <li>SQL</li>
        <li>NoSQL</li>
        <li>Tailwind CSS</li>
        <li>Redis</li>
        <li>Python</li>
        <li>Java</li>
      </ul>

    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        {/* HNDSE */}
        <li className="my-3">
          <div className="flex justify-between">
            <span>Higher National Diploma in Software Engineering</span>
          </div>
          <div className="text-sm text-gray-400">(Reading)</div>
          <div className="text-sm text-gray-400">National Institute of Business Management</div>
          <div className="text-sm text-gray-400">2023</div>
        </li>

        {/* DSE */}
        <li className="my-3">
          <div className="flex justify-between">
            <span>Diploma in Software Engineering</span>
          </div>
          <div className="text-sm text-gray-300">Gold Medalist
            <span
              className="cursor-pointer"
              title="Recipient of the Gold Medal, awarded to the student with the highest academic achievement across all NIBM branches"
            >
              <sup>{" "}!{" "}</sup>
            </span>
            / Scholarship Holder  <span
              className="cursor-pointer animate-pulse"
              title="Recipient of the Gold Medal, awarded to the student with the highest academic achievement across all NIBM branches"
            >🎖️</span></div>
          <div className="text-sm text-gray-400">GPA: 4.00</div>
          <div className="text-sm text-gray-400">National Institute of Business Management</div>
          <div className="text-sm text-gray-400">2022</div>
        </li>

      </ul>

    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        {certificates.map((certificate) => (
          <li key={certificate.id}>
            <a
              href={certificate.url}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {certificate.name}
            </a> by {certificate.provider}
          </li>
        ))
        }


      </ul>


    ),
  },
];

const images = [AboutImage, AboutImage2, AboutImage3];


const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [age, setAge] = useState(21);
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    // Fetch a random image index on initial render and on subsequent page reloads
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomIndex);
  }, []);

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  useEffect(() => {
    const birthDate = new Date('2002-08-26');
    const currentDate = new Date();
    const calculatedAge = differenceInYears(currentDate, birthDate);

    setAge(calculatedAge);
    setIsBirthday(isToday(birthDate));

  }, []);

  return (
    <section className="text-white z-10" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image className="shadow-lg z-10 rounded-sm" src={images[currentImageIndex]} width={500} alt="About image" />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg text-justify">
            As a {age}-year-old {
              isBirthday ? (
                <span className="animate-pulse" title="it's my birthday today! 🥳">🎂</span>
              ) : null
            } Software Engineering undergraduate at NIBM Sri Lanka, I&apos;m a quick learner driven by a passion for web development.
            <br />
            I currently work part-time as an {" "}
            <span className="font-bold hover:bg-primary-500 bg-white text-[#030014] rounded-sm px-1">Academic Tutor</span> at NIBM, where I am dedicated to providing educational support and fostering a learning environment for students. Additionally, I am involved as a <span className="font-bold text-[#030014] bg-white hover:bg-[#FF6C37] hover:text-white rounded-sm px-1">Postman Student Leader</span>, where I lead and mentor in the Postman student community.
            <br />
            With a strong foundation in backend development, I bring responsive web design to life and
            I&apos;m dedicated to crafting efficient solutions and continuously innovating in the tech world.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
