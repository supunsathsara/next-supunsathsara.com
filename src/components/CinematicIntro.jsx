"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CinematicIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState("loading"); // "loading" | "playing" | "text" | "exit" | "done"
  const videoRef = useRef(null);
  const hasTriggeredExit = useRef(false);

  // Check if intro was already shown this session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const shown = sessionStorage.getItem("intro-shown");
      if (shown) {
        setPhase("done");
        onComplete?.();
      }
    }
  }, [onComplete]);

  // Lock scroll during intro
  useEffect(() => {
    if (phase !== "done") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [phase]);

  // Start playing once video is ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video || phase !== "loading") return;

    const startPlayback = () => {
      video
        .play()
        .then(() => setPhase("playing"))
        .catch(() => {
          // Autoplay blocked — skip intro gracefully
          setPhase("done");
          sessionStorage.setItem("intro-shown", "true");
          onComplete?.();
        });
    };

    if (video.readyState >= 3) {
      startPlayback();
    } else {
      video.addEventListener("canplay", startPlayback, { once: true });
      return () => video.removeEventListener("canplay", startPlayback);
    }
  }, [phase, onComplete]);

  const triggerExit = useCallback(() => {
    if (hasTriggeredExit.current) return;
    hasTriggeredExit.current = true;

    // Show the name text overlay
    setPhase("text");

    // After name is displayed, begin the fade-out exit
    setTimeout(() => {
      setPhase("exit");
    }, 2200);

    // Complete and unmount
    setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("intro-shown", "true");
      onComplete?.();
    }, 3800);
  }, [onComplete]);

  // Watch video time — let it play ~10 seconds before triggering exit
  useEffect(() => {
    const video = videoRef.current;
    if (!video || phase !== "playing") return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 10) {
        triggerExit();
      }
    };

    const handleEnded = () => triggerExit();

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    // Fallback if video stalls
    const fallbackTimer = setTimeout(() => triggerExit(), 14000);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      clearTimeout(fallbackTimer);
    };
  }, [phase, triggerExit]);

  // Skip on click/tap
  const handleSkip = useCallback(() => triggerExit(), [triggerExit]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer"
          style={{ background: "#030014" }}
          onClick={handleSkip}
          initial={{ opacity: 1 }}
          animate={{
            opacity: phase === "exit" ? 0 : 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: phase === "exit" ? 1.6 : 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Video layer */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            animate={{
              scale: phase === "text" || phase === "exit" ? 1.05 : 1,
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              poster="/images/intro-poster.jpg"
              className="h-full w-auto max-w-none object-contain"
              style={{ background: "transparent" }}
            >
              <source src="/intro.webm" type="video/webm" />
              <source src="/intro.mp4" type="video/mp4" />
            </video>

            {/* 
              Color-matching overlay: tints the video's pure black areas 
              to match the site's #030014 purple-dark background.
              Uses a full-coverage tint so there's no sharp color boundary.
            */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "rgba(3, 0, 20, 0.35)",
                mixBlendMode: "lighten",
              }}
            />

            {/* Subtle purple atmosphere that matches the site palette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(88, 28, 135, 0.06) 0%, rgba(3, 0, 20, 0.4) 70%, #030014 100%)",
              }}
            />

            {/* Vignette — dissolves edges into #030014 */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 30%, #030014 85%)",
              }}
            />

            {/* Cinematic letterbox bars */}
            <div
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                height: "10%",
                background:
                  "linear-gradient(to bottom, #030014 0%, transparent 100%)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: "10%",
                background:
                  "linear-gradient(to top, #030014 0%, transparent 100%)",
              }}
            />
            {/* Side fade */}
            <div
              className="absolute top-0 bottom-0 left-0 pointer-events-none"
              style={{
                width: "15%",
                background:
                  "linear-gradient(to right, #030014 0%, transparent 100%)",
              }}
            />
            <div
              className="absolute top-0 bottom-0 right-0 pointer-events-none"
              style={{
                width: "15%",
                background:
                  "linear-gradient(to left, #030014 0%, transparent 100%)",
              }}
            />
          </motion.div>

          {/* Name text overlay — appears in "text" and "exit" phases */}
          <AnimatePresence>
            {(phase === "text" || phase === "exit") && (
              <motion.div
                className="absolute inset-0 flex items-end justify-center pb-[15%] pointer-events-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="text-center">
                  <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider"
                    style={{
                      background:
                        "linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    initial={{ letterSpacing: "0.5em", opacity: 0 }}
                    animate={{ letterSpacing: "0.15em", opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  >
                    SUPUN SATHSARA
                  </motion.h1>
                  <motion.p
                    className="text-gray-400 text-sm sm:text-base mt-3 tracking-[0.3em] uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    Software Engineer
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip hint */}
          <motion.p
            className="absolute bottom-6 right-6 text-gray-600 text-xs tracking-widest uppercase pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            tap to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
