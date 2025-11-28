"use client";

import YouTube from "react-youtube";

const YoutubePlayer = () => {
  return (
    <div className="relative mx-4 rounded-xl aspect-video md:mx-auto max-w-3xl mt-16 md:mt-8 mb-8 bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4 overflow-visible">
      {/* Fun handwritten arrow and text */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-top-10 md:-right-16 lg:-right-20 z-10 transform md:rotate-12 w-auto md:w-48">
        <div className="relative">
          {/* Handwritten text */}
          <p
            className="text-yellow-400 text-sm md:text-lg lg:text-xl font-bold mb-2 transform md:-rotate-6 whitespace-nowrap text-center md:text-left"
            style={{
              fontFamily: "Kalam, cursive",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              filter: "drop-shadow(0 0 8px rgba(255, 193, 7, 0.4))",
            }}
          >
            🏆 Won The NIBM Gold Medal!
          </p>
          {/* Curly arrow SVG - hidden on mobile */}
          <svg
            className="hidden md:block w-20 h-20 text-yellow-400 animate-bounce"
            viewBox="0 0 100 100"
            style={{ filter: "drop-shadow(0 0 6px rgba(255, 193, 7, 0.6))" }}
          >
            {/* Curly arrow body */}
            <path
              d="M20,80 Q35,20 50,40 Q65,60 80,30"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: "6,4",
                animation: "draw 2s ease-in-out infinite alternate",
              }}
            />
          </svg>
        </div>
      </div>

      <YouTube
        videoId="qCDPhRVrhZY"
        className="relative w-full aspect-video overflow-hidden rounded-xl"
        iframeClassName="absolute inset-0 w-full h-full"
        opts={{ autoplay: 0, controls: 0 }}
      />

      {/* CSS animations */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap");

        @keyframes draw {
          0% {
            stroke-dashoffset: 20;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(12deg);
          }
          25% {
            transform: rotate(8deg);
          }
          75% {
            transform: rotate(16deg);
          }
        }

        .wiggle {
          animation: wiggle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default YoutubePlayer;
