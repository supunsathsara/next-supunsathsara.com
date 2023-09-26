"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "NotifIBM",
    description: "NotifIBM is Web application that offers NIBM students timely notifications and a user-friendly GPA calculator, empowering them to stay informed about crucial academic updates and effortlessly manage their academic progress.",
    image: "/images/projects/notifibm-showcase.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/NotifIBM/notifibm.com/",
    previewUrl: "https://notifibm.com",
  },
  {
    id: 2,
    title: "Paws & Claws",
    description: "Paws & Claws is a Web application that offers a platform for pet owners to find pet services",
    image: "/images/projects/paws-&-claws-showcase.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/supunsathsara/Paws-and-Claws",
    previewUrl: "http://chutte00.atwebpages.com/",
  },
  {
    id: 3,
    title: "URL Shortener MicroService",
    description: "URL Shortener MicroService is a Web application that offers a platform for users to shorten their URLs",
    image: "/images/projects/url-shortner-showcase.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/supunsathsara/FCC-URL-Shortener-Microservice",
    previewUrl: "https://fcc-url-shortener.ssupunsathsara.repl.co/",
  },
  {
    id: 4,
    title: "Exercise Tracker MicroService",
    description: "Exercise Tracker is a MicroService that offers a platform for users to track their exercises. Built for FreeCodeCamp backend project",
    image: "/images/projects/Exercise-tracker-showcase.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/supunsathsara/FCC-Exercise-Tracker",
    previewUrl: "https://fcc-exercise-tracker.ssupunsathsara.repl.co/",
  },
  {
    id: 5,
    title: "Network - Social Media App",
    description: "Network is a social media app that offers a platform for users to share their thoughts and connect with others. Built for CS50 Web by Harvard University",
    image: "/images/projects/network-showcase.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/supunsathsara/CS50-Network",
    previewUrl: "https://youtu.be/LJ8K4dmOsjM?si=G5yL76wjvAdnk41k",
  },
  {
    id: 6,
    title: "CineSeat - Movie Ticket Booking App",
    description: "CineSeat is a movie ticket booking app that offers a platform for users to book movie tickets. Built with C# and .NET Framework",
    image: "/images/projects/cineseat-showcase.png",
    tag: ["All", "Other"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Other"
          isSelected={tag === "Other"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
