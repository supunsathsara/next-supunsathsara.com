"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
  MagnifyingGlassPlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

interface Certificate {
  id: number;
  name: string;
  url: string;
  provider: string;
  image: string;
}

interface CertificateItemProps {
  certificate: Certificate;
  index: number;
  onOpen: (certificate: Certificate) => void;
}

export function CertificateCard({ certificate, index, onOpen }: Readonly<CertificateItemProps>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      className="group relative"
    >
      <motion.button
        type="button"
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onOpen(certificate)}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        aria-label={`View certificate: ${certificate.name}`}
      >
        {/* Card */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0d0d1a] to-[#12122a] border border-white/[0.06] shadow-xl">

          {/* Glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: isHovered
                ? "0 0 0 1px rgba(139,92,246,0.4), 0 20px 60px -10px rgba(139,92,246,0.2)"
                : "0 0 0 1px rgba(255,255,255,0.06)",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a18]">
            <Image
              src={`/certificates/${certificate.image}`}
              alt={certificate.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full"
                animate={{ scale: isHovered ? 1 : 0.85, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <MagnifyingGlassPlusIcon className="h-4 w-4" />
                View Certificate
              </motion.div>
            </motion.div>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-1">
              {certificate.name}
            </p>
            <div className="flex items-center gap-1.5">
              <CheckBadgeIcon className="h-4 w-4 text-purple-400 shrink-0" />
              <p className="text-purple-300/80 text-xs font-medium truncate">
                {certificate.provider}
              </p>
            </div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

/* ───────────── Light-box Modal ───────────── */

interface LightboxProps {
  certificates: Certificate[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function CertificateLightbox({
  certificates,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: Readonly<LightboxProps>) {
  const certificate = certificates[currentIndex];
  const overlayRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    globalThis.addEventListener("keydown", handleKey);
    return () => globalThis.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  // Trap scroll behind modal
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  return (
    <motion.div
      ref={overlayRef}
      className="fixed inset-0 flex items-center justify-center p-4 md:p-8"
      style={{ zIndex: 9999 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-label={`Certificate: ${certificate.name}`}
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-50 flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>

      {/* Prev */}
      {certificates.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-1 md:left-6 z-50 flex items-center justify-center h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white transition-colors backdrop-blur-md"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
      )}

      {/* Next */}
      {certificates.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-1 md:right-20 z-50 flex items-center justify-center h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white transition-colors backdrop-blur-md"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      )}

      {/* Modal card */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-5 w-full max-w-4xl max-h-[90vh]"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#0a0a18] border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src={`/certificates/${certificate.image}`}
                alt={certificate.name}
                width={1200}
                height={900}
                className="w-full h-auto object-contain max-h-[65vh]"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Info bar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`info-${certificate.id}`}
            className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            <div className="text-center sm:text-left">
              <p className="text-white font-semibold text-base leading-snug">
                {certificate.name}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                <CheckBadgeIcon className="h-4 w-4 text-purple-400 shrink-0" />
                <p className="text-purple-300/80 text-sm">{certificate.provider}</p>
              </div>
            </div>

            <a
              href={certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 shrink-0 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              Verify Certificate
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Counter */}
        {certificates.length > 1 && (
          <p className="text-white/40 text-xs tabular-nums">
            {currentIndex + 1} / {certificates.length}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
