import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import type { ProjectStory } from "@/types/story";
import { resolveProjectImage } from "@/lib/github";

interface FeaturedProjectCardProps {
  story: ProjectStory;
}

const FeaturedProjectCard = ({ story }: FeaturedProjectCardProps) => {
  const banner =
    story.bannerImage ??
    (story.repoFullName ? resolveProjectImage(story.repoFullName) : null);

  return (
    <Link
      href={`/projects/${story.slug}`}
      className="group block"
      aria-label={`Read the story behind ${story.title}`}
    >
      <article className="overflow-hidden rounded-xl border border-[#33353F] bg-[#181818] shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary-500/50 group-hover:shadow-xl group-hover:shadow-[#2A0E61]/40 md:flex">
        {banner && (
          <div className="relative aspect-video md:aspect-auto md:w-2/5 md:shrink-0">
            <Image
              src={banner}
              alt={`${story.title} preview`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <span className="absolute top-3 left-3 rounded-full bg-[#030014]/80 px-3 py-1 font-handwritten text-base font-semibold tracking-wide text-white backdrop-blur-sm">
              Featured Story
            </span>
          </div>
        )}

        <div className="flex flex-1 flex-col p-6 md:p-8">
          {(story.chips?.length || story.year) && (
            <ul className="mb-3 flex flex-wrap items-center gap-2">
              {story.chips?.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full bg-primary-500/20 px-3 py-1 text-xs font-medium text-primary-300 ring-1 ring-primary-500/40"
                >
                  {chip}
                </li>
              ))}
              {story.year && (
                <li className="text-xs text-[#6b7280]">{story.year}</li>
              )}
            </ul>
          )}

          <h3 className="mb-2 text-2xl font-bold text-white">{story.title}</h3>
          <p className="mb-3 font-handwritten text-xl font-medium text-gray-200 md:text-2xl">
            {story.tagline}
          </p>
          <p className="mb-6 text-sm leading-relaxed text-[#ADB7BE]">
            {story.excerpt}
          </p>

          <span className="mt-auto inline-flex items-center gap-2 font-handwritten text-lg font-medium text-primary-300 transition-colors group-hover:text-primary-500">
            <BookOpenIcon className="h-4 w-4" />
            Read the full story
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </article>
    </Link>
  );
};

export default FeaturedProjectCard;
