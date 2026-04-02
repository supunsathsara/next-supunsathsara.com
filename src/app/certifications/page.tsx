"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { GradualSpacing } from "@/components/ui/GradualSpacing";
import { CertificateCard, CertificateLightbox } from "@/components/CertificateItem";
import type { Certificate } from "@/constants/certificates";
import certificates from "@/constants/certificates";

const sorted = [...certificates].sort((a, b) => b.id - a.id);

export default function CertificationPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((cert: Certificate) => {
    const idx = sorted.findIndex((c) => c.id === cert.id);
    setLightboxIndex(idx);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % sorted.length));
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + sorted.length) % sorted.length
    );
  }, []);

  return (
    <>
      <div className="container min-h-screen mx-auto mt-24 pb-20 px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <GradualSpacing
            className="font-display text-4xl font-bold text-white md:text-7xl md:leading-20 mb-3"
            text="Certifications"
          />
          <p className="text-white/40 text-base max-w-xl mx-auto">
            {sorted.length} certifications from industry-leading organizations
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {sorted.map((certificate, index) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              index={index}
              onOpen={openLightbox}
            />
          ))}
        </div>
      </div>

      {/* Lightbox — rendered in-place but z-[9999] so it floats above everything */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <CertificateLightbox
            certificates={sorted}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}
      </AnimatePresence>
    </>
  );
}