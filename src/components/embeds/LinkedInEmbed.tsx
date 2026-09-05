import React from "react";

interface LinkedInEmbedProps {
  url: string;
  height?: number;
}

/** Extracts the activity id from a linkedin.com/posts/... URL. */
function extractActivityId(url: string): string | null {
  const match = url.match(/activity[-:](\d+)/);
  return match?.[1] ?? null;
}

const LinkedInEmbed = ({ url, height = 640 }: LinkedInEmbedProps) => {
  const activityId = extractActivityId(url);
  if (!activityId) return null;

  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-[#33353F] bg-white shadow-lg">
      <iframe
        src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId}`}
        height={height}
        width="100%"
        allowFullScreen
        title="LinkedIn post"
        loading="lazy"
      />
    </div>
  );
};

export default LinkedInEmbed;
