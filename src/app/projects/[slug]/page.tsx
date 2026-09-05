import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { PROJECT_STORIES } from "@/content/stories";
import { resolveProjectImage } from "@/lib/github";
import { createPageMetadata } from "@/lib/metadata";
import TweetEmbed from "@/components/embeds/TweetEmbed";
import LinkedInEmbed from "@/components/embeds/LinkedInEmbed";

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECT_STORIES.map((story) => ({ slug: story.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = PROJECT_STORIES.find((s) => s.slug === slug);
  if (!story) return {};
  return createPageMetadata({
    title: `${story.title} · Project Story`,
    description: story.excerpt,
    path: `/projects/${story.slug}`,
  });
}

const StoryPage = async ({ params }: StoryPageProps) => {
  const { slug } = await params;
  const story = PROJECT_STORIES.find((s) => s.slug === slug);
  if (!story) notFound();

  const banner = story.bannerImage ?? (story.repoFullName ? resolveProjectImage(story.repoFullName) : null);

  return (
    <article className="container mx-auto mt-24 max-w-4xl px-4 pb-24 md:px-8">
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-[#ADB7BE] transition-colors hover:text-white"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        All projects
      </Link>

      <header className="mb-10">
        {(story.chips?.length || story.year) && (
          <ul className="mb-4 flex flex-wrap items-center gap-2">
            {story.chips?.map((chip) => (
              <li
                key={chip}
                className="rounded-full bg-primary-500/20 px-3 py-1 text-xs font-medium text-primary-300 ring-1 ring-primary-500/40"
              >
                {chip}
              </li>
            ))}
            {story.year && (
              <li className="rounded-full bg-[#181818] px-3 py-1 text-xs font-medium text-[#ADB7BE] ring-1 ring-[#33353F]">
                {story.year}
              </li>
            )}
          </ul>
        )}
        <h1 className="text-4xl font-extrabold text-white md:text-6xl">
          {story.title}
        </h1>
        <p className="mt-3 font-handwritten text-2xl text-[#ADB7BE] md:text-3xl">
          {story.tagline}
        </p>
      </header>

      {banner && (
        <div className="relative mb-12 aspect-video overflow-hidden rounded-2xl border border-[#33353F] shadow-xl shadow-[#2A0E61]/40">
          <Image
            src={banner}
            alt={`${story.title} project preview`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      )}

      {story.stats && story.stats.length > 0 && (
        <section className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {story.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[#33353F] bg-[#181818] px-6 py-5 text-center"
            >
              <p className="bg-linear-to-r from-primary-500 to-secondary bg-clip-text text-3xl font-extrabold text-transparent">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-[#ADB7BE]">{stat.label}</p>
            </div>
          ))}
        </section>
      )}

      {story.techStack && story.techStack.length > 0 && (
        <section className="mb-14">
          <h2 className="mb-4 font-handwritten text-2xl font-semibold uppercase tracking-[0.2em] text-primary-300 md:text-3xl">
            Built with
          </h2>
          <ul className="flex flex-wrap gap-2">
            {story.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-[#181818] px-4 py-1.5 text-sm text-gray-200 ring-1 ring-[#33353F]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="space-y-10">
        {story.sections.map((section) => (
          <section key={section.heading ?? section.body[0]?.slice(0, 32)}>
            {section.heading && (
              <h2 className="mb-4 font-handwritten text-3xl font-bold text-white md:text-4xl">
                {section.heading}
              </h2>
            )}
            <div className="space-y-4">
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="leading-relaxed text-[#ADB7BE]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {story.features && story.features.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 font-handwritten text-3xl font-bold text-white md:text-4xl">
            Highlights
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {story.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-[#33353F] bg-[#181818] p-6 transition-colors hover:border-primary-500/40"
              >
                <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-[#ADB7BE]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {story.quote && (
        <section className="mt-14">
          <figure className="rounded-xl border border-[#33353F] bg-[#181818] p-6 md:p-8">
            <blockquote className="border-l-4 border-primary-500 pl-5 font-handwritten text-2xl italic leading-relaxed text-gray-200 md:text-3xl">
              “{story.quote.text}”
            </blockquote>
            <figcaption className="mt-4 pl-5 text-sm text-[#ADB7BE]">
              {story.quote.author && (
                <span className="font-semibold text-white">{story.quote.author}</span>
              )}
              {story.quote.author && story.quote.sourceUrl && " · "}
              {story.quote.sourceUrl && (
                <a
                  href={story.quote.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline"
                >
                  {story.quote.sourceLabel ?? "source"}
                </a>
              )}
            </figcaption>
          </figure>
        </section>
      )}

      {story.embeds && story.embeds.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 font-handwritten text-3xl font-bold text-white md:text-4xl">
            From the feed
          </h2>
          <div className="space-y-8">
            {story.embeds.map((embed) => (
              <figure key={embed.url}>
                {embed.type === "tweet" && <TweetEmbed url={embed.url} />}
                {embed.type === "linkedin" && (
                  <LinkedInEmbed url={embed.url} height={embed.height} />
                )}
                {embed.caption && (
                  <figcaption className="mt-3 text-center text-sm text-[#6b7280]">
                    {embed.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {story.gallery && story.gallery.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 font-handwritten text-3xl font-bold text-white md:text-4xl">Moments</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {story.gallery.map((item) => (
              <figure
                key={item.src}
                className="overflow-hidden rounded-xl border border-[#33353F]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 896px) 50vw, 448px"
                  />
                </div>
                {item.caption && (
                  <figcaption className="bg-[#181818] px-4 py-3 text-sm text-[#ADB7BE]">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {(story.links?.length || story.repoFullName) && (
        <footer className="mt-14 flex flex-wrap gap-4">
          {story.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-br from-primary-500 to-secondary px-6 py-3 font-medium text-white transition-all hover:bg-slate-500"
            >
              {link.label}
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </a>
          ))}
        </footer>
      )}
    </article>
  );
};

export default StoryPage;
