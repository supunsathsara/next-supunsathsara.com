import Link from "next/link";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Page not found",
    description: "This page does not exist on supunsathsara.com.",
    path: "/404",
  }),
  robots: { index: false, follow: false },
};

const PROJECTS = [
  { href: "/#projects", label: "Projects" },
  { href: "/certifications", label: "Certifications" },
  { href: "/#contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-32 text-center">
      <p className="bg-linear-to-r from-primary-500 to-secondary bg-clip-text font-handwritten text-7xl font-bold text-transparent md:text-9xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-white md:text-3xl">
        This page took a wrong turn
      </h1>
      <p className="mt-4 text-[#ADB7BE]">
        The link may be broken, or the page may have been moved. Here is where
        everything actually lives.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-linear-to-br from-primary-500 to-secondary px-6 py-3 font-medium text-white transition-all hover:bg-slate-500"
        >
          Back to home
        </Link>
        {PROJECTS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-6 py-3 font-medium text-[#ADB7BE] ring-1 ring-[#33353F] transition-colors hover:text-white hover:ring-primary-500/50"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}