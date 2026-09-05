import { Tweet } from "react-tweet";
import "react-tweet/theme.css";

interface TweetEmbedProps {
  url: string;
}

const TweetEmbed = ({ url }: TweetEmbedProps) => {
  const id = url.match(/status\/(\d+)/)?.[1];
  if (!id) return null;

  return (
    <div
      className="dark mx-auto w-full max-w-xl"
      data-theme="dark"
      style={{ "--tweet-container-background": "#181818" } as React.CSSProperties}
    >
      <Tweet
        id={id}
        fallback={
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-[#33353F] bg-[#181818] px-6 py-5 text-center text-sm text-[#ADB7BE] transition-colors hover:border-primary-500/40 hover:text-white"
          >
            View this post on X
          </a>
        }
      />
    </div>
  );
};

export default TweetEmbed;
