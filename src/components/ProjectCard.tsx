"use client";

import React, { useState } from "react";
import { CodeBracketIcon, EyeIcon, StarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { Project } from "@/types/project";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Kotlin: "#A97BFF",
  C: "#555555",
  "C#": "#178600",
  "C++": "#f34b7d",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#F05138",
  Rust: "#dea584",
  Dart: "#00B4AB",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#663399",
  Svelte: "#ff3e00",
  Vue: "#41b883",
};

const PLACEHOLDER_IMAGE = "/images/project-placeholder.svg";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [imageSrc, setImageSrc] = useState(project.image);
  const languageColor = project.primaryLanguage
    ? LANGUAGE_COLORS[project.primaryLanguage] ?? "#8b949e"
    : null;

  return (
    <div className="group/card flex h-full flex-col">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-[#33353F] shadow-lg transition-transform duration-300 group-hover/card:-translate-y-1">
        <Image
          src={imageSrc}
          alt={`Preview card for ${project.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          onError={() => setImageSrc(PLACEHOLDER_IMAGE)}
        />
        <div className="overlay absolute inset-0 hidden items-center justify-center gap-3 bg-[#181818] opacity-0 transition-all duration-300 group-hover/card:flex group-hover/card:opacity-90">
          <Link
            href={project.gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code on GitHub`}
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#ADB7BE] hover:border-white"
          >
            <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] hover:text-white" />
          </Link>
          {project.previewUrl && (
            <Link
              href={project.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live preview`}
              className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#ADB7BE] hover:border-white"
            >
              <EyeIcon className="h-10 w-10 text-[#ADB7BE] hover:text-white" />
            </Link>
          )}
        </div>
      </div>

      <div className="mt-3 flex grow flex-col rounded-b-xl bg-[#181818] px-4 py-5 text-white">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          {project.stars > 0 && (
            <span className="flex shrink-0 items-center gap-1 text-sm text-[#ADB7BE]">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              {project.stars}
            </span>
          )}
        </div>

        {project.primaryLanguage && (
          <p className="mb-2 flex items-center gap-2 text-sm text-[#ADB7BE]">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: languageColor as string }}
            />
            {project.primaryLanguage}
            <span aria-hidden="true">·</span>
            <span>Updated {format(new Date(project.updatedAt), "MMM yyyy")}</span>
          </p>
        )}

        <p className="text-sm leading-relaxed text-[#ADB7BE]">{project.description}</p>

        {project.topics.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2 pt-1">
            {project.topics.map((topic) => (
              <li
                key={topic}
                className="rounded-full bg-primary-500/20 px-3 py-1 text-xs font-medium text-primary-300 ring-1 ring-primary-500/40"
              >
                {topic}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
