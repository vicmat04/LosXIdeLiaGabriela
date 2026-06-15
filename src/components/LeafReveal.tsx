"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * CastleReveal — Pantalla de bienvenida Cuento de Hadas.
 * Dos puertas de palacio que se abren hacia los lados
 * revelando la invitación de Lía Gabriela.
 */
export default function LeafReveal({ onReveal }: { onReveal: () => void }) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    setTimeout(() => onReveal(), 1400);
  };

  return (
    <div style={{ pointerEvents: isRevealed ? "none" : "auto" }}>
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer select-none"
            onClick={handleReveal}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 1.2 }}
          >
            {/* ── Puerta izquierda (palacio) ── */}
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
              style={{ background: "#0D1B2A" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.4, ease: [0.645, 0.045, 0.355, 1.0] }}
            >
              <Image
                src="/photos/HEN_5196.jpg"
                alt="Puerta del palacio izquierda"
                fill
                className="object-cover object-center scale-110 opacity-50 mix-blend-luminosity"
                priority
              />
              {/* Overlay azul medianoche */}
              <div className="absolute inset-0" style={{ background: "rgba(6, 14, 26, 0.65)" }} />
              {/* Borde de oro en el lado derecho */}
              <div
                className="absolute inset-y-0 right-0 w-px"
                style={{ background: "linear-gradient(to bottom, transparent, #D4AF37, #89CFF0, #D4AF37, transparent)" }}
              />
              {/* Sombra de profundidad */}
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/80 to-transparent z-10" />
              {/* Detalle arquitectónico: arco superior */}
              <div
                className="absolute top-0 inset-x-0 h-24 opacity-30"
                style={{ background: "radial-gradient(ellipse at center top, rgba(212,175,55,0.4), transparent)" }}
              />
            </motion.div>

            {/* ── Puerta derecha (palacio) ── */}
            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
              style={{ background: "#112233" }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.4, ease: [0.645, 0.045, 0.355, 1.0] }}
            >
              <Image
                src="/photos/HEN_5248.jpg"
                alt="Puerta del palacio derecha"
                fill
                className="object-cover object-center scale-110 opacity-50 mix-blend-luminosity"
                priority
              />
              <div className="absolute inset-0" style={{ background: "rgba(6, 14, 26, 0.65)" }} />
              {/* Borde de oro en el lado izquierdo */}
              <div
                className="absolute inset-y-0 left-0 w-px"
                style={{ background: "linear-gradient(to bottom, transparent, #D4AF37, #89CFF0, #D4AF37, transparent)" }}
              />
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/80 to-transparent z-10" />
              <div
                className="absolute top-0 inset-x-0 h-24 opacity-30"
                style={{ background: "radial-gradient(ellipse at center top, rgba(212,175,55,0.4), transparent)" }}
              />
            </motion.div>

            {/* ── Estrellas de polvo de hadas en la pantalla de apertura ── */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full pointer-events-none"
                style={{
                  left: `${10 + i * 11}%`,
                  top: `${15 + (i % 3) * 25}%`,
                  background: i % 2 === 0 ? "#89CFF0" : "#F1CF65",
                  boxShadow: `0 0 6px 2px ${i % 2 === 0 ? "rgba(137,207,240,0.6)" : "rgba(241,207,101,0.5)"}`,
                }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              />
            ))}

            {/* ── Medalón central ── */}
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center p-5"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              exit={{ scale: 1.3, opacity: 0 }}
            >
              {/* Círculo con blur de fondo, borde dorado/plata */}
              <div
                className="relative flex flex-col items-center justify-center w-56 h-56 rounded-full backdrop-blur-md"
                style={{
                  background: "rgba(6, 14, 26, 0.5)",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  boxShadow: "0 0 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(137,207,240,0.05), 0 0 40px rgba(137,207,240,0.1)",
                }}
              >
                {/* Anillo ornamental exterior */}
                <div
                  className="absolute inset-0 rounded-full scale-110"
                  style={{ border: "1px solid rgba(137, 207, 240, 0.15)" }}
                />

                {/* Corona decorativa */}
                <span className="text-2xl mb-1 select-none" style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.8))" }}>👑</span>

                {/* Nombre con Great Vibes */}
                <h2
                  className="text-3xl text-center leading-tight mb-1"
                  style={{
                    fontFamily: "var(--font-great-vibes)",
                    color: "#F1CF65",
                    textShadow: "0 0 30px rgba(212,175,55,0.7), 0 0 60px rgba(137,207,240,0.3)",
                  }}
                >
                  Lía Gabriela
                </h2>

                {/* Subtítulo */}
                <p
                  className="italic text-sm mb-3"
                  style={{ fontFamily: "var(--font-cormorant)", color: "rgba(137,207,240,0.8)" }}
                >
                  XV Años
                </p>

                <div
                  className="w-14 h-px mb-3"
                  style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.6), transparent)" }}
                />

                {/* CTA parpadeante */}
                <motion.div
                  className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-inter)", color: "rgba(137,207,240,0.7)" }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span>✨</span>
                  <span>Toca para descubrir</span>
                  <span>✨</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
