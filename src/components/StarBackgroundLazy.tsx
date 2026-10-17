"use client";

import dynamic from "next/dynamic";

/**
 * three.js + react-three-fiber weigh ~870KB minified and are only a decorative
 * backdrop, so they must never sit in the initial bundle. `ssr: false` moves the
 * whole canvas to a client-only chunk that loads after hydration.
 *
 * The dynamic() wrapper lives here rather than in layout.tsx because
 * `ssr: false` is not permitted inside a Server Component.
 */
const StarBackground = dynamic(() => import("./StarBackground"), {
  ssr: false,
});

export default StarBackground;