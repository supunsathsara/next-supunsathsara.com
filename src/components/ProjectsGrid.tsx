"use client";

import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import FeaturedProjectCard from "./FeaturedProjectCard";
import type { Project } from "@/types/project";
import type { ProjectStory } from "@/types/story";

const MAX_FILTERS = 4;

const cardVariants = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const inViewSettings = { once: true, amount: 0.15 };

interface ProjectsGridProps {
  projects: Project[];
  stories?: ProjectStory[];
}

const ProjectsGrid = ({ projects, stories = [] }: ProjectsGridProps) => {
  const [filter, setFilter] = useState("All");

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      if (!project.primaryLanguage) continue;
      counts.set(project.primaryLanguage, (counts.get(project.primaryLanguage) ?? 0) + 1);
    }
    const languages = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_FILTERS)
      .map(([language]) => language);
    return ["All", ...languages];
  }, [projects]);

  const visibleProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.primaryLanguage === filter);

  return (
    <>
      {stories.length > 0 && (
        <div className="mb-10 space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">
            Featured Stories
          </h3>
          {stories.map((story) => (
            <motion.div
              key={story.slug}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={inViewSettings}
              transition={{ duration: 0.3 }}
            >
              <FeaturedProjectCard story={story} />
            </motion.div>
          ))}
        </div>
      )}

      {filters.length > 1 && (
        <div className="flex flex-row flex-wrap justify-center items-center gap-2 py-6 text-white">
          {filters.map((name) => (
            <ProjectTag
              key={name}
              onClick={setFilter}
              name={name}
              isSelected={filter === name}
            />
          ))}
        </div>
      )}

      <motion.ul
        layout
        className="grid gap-8 md:grid-cols-2 md:gap-10 xl:grid-cols-3 md:gap-x-12"
      >
        {visibleProjects.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            viewport={inViewSettings}
            transition={{ duration: 0.3, delay: Math.min(index % 3, 2) * 0.15 }}
          >
            <ProjectCard project={project} />
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
};

export default ProjectsGrid;
