"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaDirections } from "react-icons/fa";
import { pauseAudio } from "@/lib/audioControl";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  address: string;
  mapQuery: string;
  navigateTo: string;
  appName: "Maps" | "Waze";
}

export default function MapModal({
  isOpen,
  onClose,
  locationName,
  address,
  mapQuery,
  navigateTo,
  appName,
}: MapModalProps) {
  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const iframeSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed&hl=es&z=16`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Contenedor centrador — flex centering */}
          <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-6 pointer-events-none">

            {/* Panel del modal */}
            <motion.div
              className="relative w-full max-w-lg flex flex-col rounded-3xl overflow-hidden pointer-events-auto"
              style={{
                maxHeight: "88vh",
                border: "1px solid rgba(212,175,55,0.3)",
                boxShadow: "0 0 60px rgba(0,0,0,0.8), 0 0 30px rgba(137,207,240,0.08)",
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div className="relative flex-shrink-0 flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b" style={{ background: "rgba(6,14,26,0.95)", borderColor: "rgba(212,175,55,0.2)" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 rounded-full" style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)" }} />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] mb-0.5" style={{ fontFamily: "var(--font-inter)", color: "rgba(212,175,55,0.5)" }}>Cómo llegar</p>
                  <h3 className="text-xl leading-tight" style={{ fontFamily: "var(--font-cormorant)", color: "#F1CF65", textShadow: "0 0 20px rgba(212,175,55,0.4)" }}>
                    {locationName}
                  </h3>
                  <p className="text-xs mt-1" style={{ fontFamily: "var(--font-inter)", color: "rgba(236,240,244,0.5)" }}>{address}</p>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
                  style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(212,175,55,0.2)", color: "rgba(236,240,244,0.5)" }}
                  aria-label="Cerrar"
                >
                  <FaTimes size={13} />
                </button>
              </div>

              {/* Mapa — altura fija para garantizar render del iframe */}
              <div className="relative w-full bg-black" style={{ height: "280px" }}>
                <iframe
                  src={iframeSrc}
                  width="100%"
                  height="280"
                  style={{ border: 0, filter: "saturate(0.7) brightness(0.85)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa de ${locationName}`}
                />
              </div>

              {/* Footer */}
              <div className="flex-shrink-0 flex gap-3 px-5 py-4 border-t" style={{ background: "rgba(6,14,26,0.95)", borderColor: "rgba(212,175,55,0.2)" }}>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-inter)",
                    border: "1px solid rgba(212,175,55,0.25)",
                    color: "rgba(236,240,244,0.6)",
                  }}
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    pauseAudio();
                    window.open(navigateTo, "_blank", "noopener,noreferrer");
                  }}
                  className="flex flex-[2] items-center justify-center gap-2 py-2.5 rounded-full text-black text-sm font-semibold transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-inter)",
                    background: "#D4AF37",
                    boxShadow: "0 0 20px rgba(212,175,55,0.3)",
                  }}
                >
                  <FaDirections size={15} />
                  Ir con {appName}
                </button>
              </div>
            </motion.div>

          </div>
        </>
      )}
    </AnimatePresence>
  );
}
