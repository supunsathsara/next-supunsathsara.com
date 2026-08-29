import type { ProjectStory } from "@/types/story";

/**
 * Featured project stories, rendered at /projects/<slug> and highlighted
 * on the homepage. Add a new object here and everything else (page, SEO,
 * sitemap, featured card) is generated automatically.
 *
 * Each story composes optional blocks (stats, quote, features, techStack,
 * gallery) differently, so no two pages share the same layout.
 */
export const PROJECT_STORIES: ProjectStory[] = [
  {
    slug: "notifibm",
    title: "NotifIBM",
    tagline:
      "The SMS service that told NIBM students their results were out, before they even asked.",
    excerpt:
      "I built NotifIBM because my whole batch was stuck refreshing the LMS. It ended up earning a perfect A+ and helped me win the NIBM Gold Medal.",
    repoFullName: "NotifIBM/notifibm.com",
    chips: ["NIBM", "Gold Medal Project", "Automation"],
    year: "2023",
    links: [
      { label: "Visit notifibm.com", href: "https://notifibm.com" },
      {
        label: "View on GitHub",
        href: "https://github.com/NotifIBM/notifibm.com",
      },
    ],
    embeds: [
      {
        type: "tweet",
        url: "https://x.com/notifibm/status/1741754583943373148",
        caption: "The results bot announcing on X",
      },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "In my first semester at NIBM, results just appeared on the LMS with no warning. No notification, no email, nothing. So the entire batch developed the same nervous habit: logging in every few hours and refreshing, sometimes for days, hoping to see something new.",
          "I kept thinking there had to be a better way. Instead of a few hundred students polling the same page, why not have one system watch it for all of us and send a text the second anything changes?",
        ],
      },
      {
        heading: "Working around a 10 second limit",
        body: [
          "The first version was simple. A cron job on Deta would scrape the LMS and notify anyone registered. Then I hit the catch: Deta's free tier kills any request after 10 seconds, and scraping results for the whole batch took longer than that.",
          "The workaround turned out to be the most interesting part of the system. The cron job only watched one sentinel student. If a new result showed up for them, it queued a GitHub Actions workflow. Actions had no such timeout, so it could take its time scraping every student's results and pushing them to the server. From there, the server fanned out notifications to everyone registered for that specific result.",
        ],
      },
      {
        heading: "The details that made it real",
        body: [
          "A Redis cache held index numbers and results, so the LMS only got scraped when something actually changed. Emails went out through Resend, and SMS through Dialog's e-SMS API.",
          "Getting the SMS mask approved is probably my favorite memory from this project. It took a few conversations with Dialog, but they eventually approved 'NotifIBM' as the sender name. The first time I saw that name pop up on a classmate's phone, it stopped feeling like a side project.",
          "There was even a Twitter bot that announced each batch's results publicly the moment they dropped.",
        ],
      },
      {
        heading: "Where it went",
        body: [
          "Students across NIBM started using it, and it scored a perfect A+ as my final project. But the part I'm proudest of is what came after: the work contributed to the overall performance that won me the NIBM Gold Medal for Software Engineering that year.",
          "A tool I built out of my own frustration ending up on a medal citation still feels surreal.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/gallery/notifibm-demo.jpg",
        alt: "Presenting NotifIBM on the big screen at an NIBM seminar",
        caption: "Presenting NotifIBM at a campus seminar",
      },
      {
        src: "/images/gallery/gold-medal.jpg",
        alt: "NIBM Gold Medal award certificate for Diploma in Software Engineering 2023",
        caption: "The Gold Medal citation",
      },
      {
        src: "/images/gallery/convocation.jpg",
        alt: "Receiving the NIBM Gold Medal at convocation",
        caption: "Convocation day",
      },
    ],
  },
  {
    slug: "eventure",
    title: "Eventure",
    tagline:
      "A complete event management and ticketing platform, built with Ballerina.",
    excerpt:
      "My team Phoenix Code took Eventure to the top 10 out of 500+ teams at WSO2's Innovate with Ballerina hackathon.",
    repoFullName: "supunsathsara/iwb325-phoenix-code",
    chips: ["Innovate with Ballerina", "Top 10 Finalist", "Team Phoenix Code"],
    year: "2024",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/supunsathsara/iwb325-phoenix-code",
      },
      {
        label: "Announcement on X",
        href: "https://x.com/Ssupunsathsara/status/1854673273881346508",
      },
      {
        label: "Video demo on LinkedIn",
        href: "https://www.linkedin.com/posts/supunsathsara_eventure-innovatewithballerina-ballerinalang-activity-7255435452315271168-fpKg",
      },
    ],
    stats: [
      { value: "Top 10", label: "Final placement" },
      { value: "500+", label: "Teams competed" },
      { value: "1,800+", label: "Participants" },
    ],
    techStack: [
      "Ballerina",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "PostgreSQL",
      "Asgardeo",
      "PayHere",
      "AWS S3",
      "Resend",
    ],
    embeds: [
      {
        type: "tweet",
        url: "https://x.com/Ssupunsathsara/status/1854673273881346508",
        caption: "Announcing our top 10 finish",
      },
      {
        type: "linkedin",
        url: "https://www.linkedin.com/posts/supunsathsara_eventure-innovatewithballerina-ballerinalang-activity-7255435452315271168-fpKg",
        caption: "The full video demo on LinkedIn",
        height: 720,
      },
    ],
    sections: [
      {
        heading: "The hackathon",
        body: [
          "Innovate with Ballerina is a hackathon built around Ballerina, the cloud-native programming language from WSO2. The challenge was to build something that genuinely uses what makes the language different.",
          "Our team, Phoenix Code, was me, Kavishka Dinajara and Prageeth Ravindra. Together we built Eventure, an event management system where organizers set up and run events, and participants register and pay in a few clicks.",
        ],
      },
      {
        heading: "What we built",
        body: [
          "Eventure covered the full event lifecycle. Organizers could create events, manage registrations, and collect payments through a PayHere integration. Ballerina powered the backend, and honestly its first-class REST API support kept the service layer cleaner than anything I'd written before.",
          "We used Ballerina's built-in security features to lock things down, Asgardeo for authentication, Resend for emails, and AWS S3 for file storage. The frontend was Next.js with Tailwind CSS and shadcn/ui, which gave us a polished interface without burning hackathon time on design decisions.",
        ],
      },
      {
        heading: "The result",
        body: [
          "Out of more than 500 teams and 1,800+ participants, Eventure made the top 10 finalists. For three of us competing in our first major hackathon, that felt huge.",
          "Presenting to the judges and hearing them react to the architecture choices was the best part. We also got to thank NIBM and our lecturers publicly, who supported us throughout the run.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/gallery/presenting-at-iwb.jpg",
        alt: "Presenting Eventure at the Innovate with Ballerina showcase",
        caption: "On stage at the IWB showcase",
      },
      {
        src: "/images/gallery/iwb-top-10.jpg",
        alt: "Team Phoenix Code recognized among the top 10 finalists at IWB",
        caption: "Top 10 finalists",
      },
    ],
  },
  {
    slug: "graha",
    title: "Graha",
    tagline: "A Vedic astrology engine that refuses to guess.",
    excerpt:
      "Sidereal birth charts powered by Swiss Ephemeris and validated against NASA JPL Horizons, with 100+ rule-based interpretation engines behind every reading.",
    repoFullName: "supunsathsara/graha",
    chips: ["TypeScript", "Monorepo", "Live at graha.chutte.dev"],
    links: [
      { label: "Try it live", href: "https://graha.chutte.dev" },
      {
        label: "View on GitHub",
        href: "https://github.com/supunsathsara/graha",
      },
    ],
    techStack: [
      "Hono",
      "Swiss Ephemeris (C++)",
      "Next.js 15",
      "React 19",
      "Drizzle ORM",
      "Neon PostgreSQL",
      "TanStack Query",
      "Turborepo",
      "Groq",
    ],
    features: [
      {
        title: "Astronomical-grade accuracy",
        description:
          "Sidereal (Nirayana) calculations with Lahiri Ayanamsa, checked by a 44-assertion test suite against JPL Horizons, NASA's moon-phase catalog, and published almanac data.",
      },
      {
        title: "100+ interpretation rules",
        description:
          "108 planet-in-house rules, 108 planet-in-sign dignity mappings, and 144 house-lord placements. A deterministic rule engine, not vague generated text.",
      },
      {
        title: "Vimshottari Dasa engine",
        description:
          "The full 120-year planetary period cycle with real calendar dates for all 9 Mahadasas and their Antardasas, locked down by 33 validation assertions.",
      },
      {
        title: "Guna Milan matchmaking",
        description:
          "Complete 36-point Ashtakoota scoring with classical exceptions, dosha cancellation rules, and Sri Lankan-practice Lagna compatibility, covered by 42 assertions.",
      },
      {
        title: "Sinhala Panchanga",
        description:
          "Daily Rahu Kala, Yama Kala and Gulika Kala computed from real ephemeris sunrise and sunset times. These are the inauspicious windows people here actually plan around.",
      },
      {
        title: "Family chart vault",
        description:
          "Cloud storage for the whole family's charts, guarded by a portable recovery key that restores everything on any device.",
      },
    ],
    sections: [
      {
        heading: "Why an astrology engine?",
        body: [
          "Astrology software is everywhere, and almost all of it is a black box. Rough calculations, unverifiable outputs, interpretations that came from nowhere. Graha started with a simple question: how hard could it be to build one that is genuinely, provably accurate?",
          "That question shaped everything. Pair the gold-standard Swiss Ephemeris, a native C++ addon, with a fully rule-based interpretation layer, then make every single layer testable.",
        ],
      },
      {
        heading: "Engineering over mysticism",
        body: [
          "Every core number in Graha is tested. The ephemeris suite checks planetary positions against NASA's JPL Horizons, moon phases against NASA's 6000-year catalog, and sunrise and sunset times against published Colombo almanac values. The Dasa and matchmaking engines each ship their own assertion suites.",
          "AI plays a deliberately small role here. The rule engine produces the reading, and an optional Groq-powered pass only polishes the language. Never the astrology.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "A Turborepo monorepo splits a Hono.js API from a Next.js 15 frontend, with shared types in a common package. The browser never sees the API secret because a server-side proxy injects the auth headers, and Neon PostgreSQL backs the family vault behind a user-held recovery key.",
        ],
      },
    ],
  },
  {
    slug: "whatsapp-ai-assistant",
    title: "WhatsApp AI Assistant",
    tagline: "A serverless AI swiss-army knife living inside WhatsApp.",
    excerpt:
      "Hybrid Groq and Hugging Face intelligence, image generation, and a Telegram media bridge, all dodging serverless timeouts with a 50ms queue-and-ack pipeline.",
    repoFullName: "supunsathsara/WA-bot",
    chips: ["Serverless", "Edge", "WhatsApp Business API"],
    techStack: [
      "Hono",
      "Upstash Workflow",
      "QStash",
      "Groq (Llama-3)",
      "Hugging Face",
      "Supabase",
      "Upstash Redis",
      "Axiom",
      "MTProto",
    ],
    features: [
      {
        title: "50ms queue-and-ack",
        description:
          "Incoming webhooks get offloaded to Upstash's background queue instantly, so Meta receives a 200 OK before the AI even starts thinking. No more 10-second serverless execution limits.",
      },
      {
        title: "Hybrid AI engines",
        description:
          "Groq's Llama-3 handles everyday requests with function calling, like live-scraping Sri Lankan train schedules. An unrestricted Hugging Face model takes over in uncensored mode, with a Redis-backed 10-message memory.",
      },
      {
        title: "AI image generation and editing",
        description:
          "/imagine generates images from a prompt. Send a photo with a caption and the bot runs the full image-to-image pipeline through the Meta Graph API.",
      },
      {
        title: "Telegram media bridge",
        description:
          "Send any t.me link and the bot downloads the media over MTProto, including photos, videos, documents, and grouped albums from protected channels, then re-delivers it on WhatsApp.",
      },
      {
        title: "Abuse-proof by design",
        description:
          "A Supabase allowlist and an Upstash sliding-window rate limiter silently drop strangers, while an atomic SETNX lock dedupes WhatsApp's aggressive retry payloads.",
      },
      {
        title: "Tuned to free tiers",
        description:
          "Every dependency, from Vercel to Supabase, Groq, Hugging Face, and Upstash, runs on free plans, with payloads deliberately engineered to stay inside their limits.",
      },
    ],
    sections: [
      {
        heading: "The idea",
        body: [
          "I wanted a personal AI assistant inside the app I already have open all day, not another web app to visit. WhatsApp's Business API made it the perfect host. No frontend to build, no app to install, just a chat.",
          "The hard part was never the AI. It was the plumbing. Serverless platforms kill long-running requests, WhatsApp retries webhooks aggressively, and free tiers come with tight ceilings on everything.",
        ],
      },
      {
        heading: "The pipeline",
        body: [
          "A Meta webhook lands on a Hono router, which validates it, offloads the payload to an Upstash Workflow queue, and acknowledges within about 50ms. QStash then drives the background execution loop: duplicate filtering, allowlist checks, rate limits. Only after all that does the request reach an AI engine.",
          "From there, Groq decides whether the message needs a tool call, like checking train availability by scraping a live source, or a plain response. Uncensored mode swaps in Hugging Face with conversational memory attached. The reply goes back out through the Graph API, and structured logs flush to Axiom and Supabase.",
        ],
      },
    ],
  },
];
