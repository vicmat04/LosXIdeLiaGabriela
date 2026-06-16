"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ClockDecoration from "@/components/ClockDecoration";

interface BurstParticle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
}

/**
 * CastleReveal — Pantalla de bienvenida Cuento de Hadas.
 * Dos puertas de palacio que se abren hacia los lados
 * al hacer clic en el sello de lacre central.
 */
export default function LeafReveal({ onReveal }: { onReveal: () => void }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [burstParticles, setBurstParticles] = useState<BurstParticle[]>([]);
  const [isClicked, setIsClicked] = useState(false);

  const handleReveal = () => {
    if (isClicked) return;
    setIsClicked(true);

    // Generar partículas para el "burst" mágico
    const colors = ["#F1CF65", "#89CFF0", "#FFFFFF", "#E0E0E0"];
    const generated = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      // Distribuir uniformemente en 360 grados (20 grados por partícula)
      angle: (i * 20) * (Math.PI / 180),
      distance: Math.random() * 140 + 90, // distancia de vuelo
      size: Math.random() * 6 + 4,       // tamaño
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setBurstParticles(generated);

    // Retardo sutil para apreciar la explosión antes de abrir las puertas
    setTimeout(() => {
      setIsRevealed(true);
      setTimeout(() => onReveal(), 1400); // 1.4s dura la transición de apertura
    }, 550);
  };

  return (
    <div style={{ pointerEvents: isRevealed ? "none" : "auto" }}>
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none"
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
                src="/photos/HEN_5278.jpg"
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
                src="/photos/HEN_5164.jpg"
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

            {/* ── Estrellas de polvo de hadas ambientales en la pantalla de apertura ── */}
            {!isClicked && [...Array(8)].map((_, i) => (
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
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              />
            ))}

            {/* ── Explosión de Partículas (Burst) ── */}
            {burstParticles.map((p) => {
              const targetX = Math.cos(p.angle) * p.distance;
              const targetY = Math.sin(p.angle) * p.distance;
              return (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full pointer-events-none z-30"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: p.color,
                    boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{ x: "-50%", y: "-50%", opacity: 1, scale: 1 }}
                  animate={{
                    x: `calc(-50% + ${targetX}px)`,
                    y: `calc(-50% + ${targetY}px)`,
                    opacity: 0,
                    scale: 0.1,
                  }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              );
            })}

            {/* ── Contenido Central Centralizado ── */}
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center p-5 text-center max-w-xs mx-auto"
              animate={isClicked ? { scale: 1.12, filter: "brightness(1.3)" } : { scale: [1, 1.03, 1] }}
              transition={isClicked ? { duration: 0.4 } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.5 } }}
            >
              {/* Encabezados temáticos */}
              <div className="flex flex-col items-center gap-1 mb-2">
                <p className="text-xs uppercase tracking-[0.25em] mb-0.5" style={{
                  fontFamily: "var(--font-inter)",
                  color: "rgba(137,207,240,0.7)",
                }}>
                  Mis XV Años
                </p>
                <span className="text-4xl text-center leading-none" style={{
                  fontFamily: "var(--font-great-vibes)",
                  color: "#F1CF65",
                  textShadow: "0 0 25px rgba(212,175,55,0.7), 0 0 60px rgba(137,207,240,0.2)",
                }}>
                  Lía Gabriela
                </span>
                <p className="text-sm md:text-base px-2 mt-1" style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  color: "rgba(224,224,224,0.75)",
                }}>
                  Te invitamos al gran baile del palacio
                </p>
              </div>

              {/* Botón Sello de Goma Interactivo */}
              <motion.div
                className="relative cursor-pointer select-none my-5"
                whileHover={!isClicked ? { scale: 1.08, rotate: 2 } : {}}
                whileTap={!isClicked ? { scale: 0.93 } : {}}
                onClick={handleReveal}
              >
                {/* Halo de luz místico detrás del sello */}
                <div className="absolute inset-0 rounded-full blur-xl scale-75 bg-[#89CFF0]/25 pointer-events-none" />
                <Image
                  src="/sello lia.png"
                  alt="Sello de Lacre Lía Gabriela"
                  width={180}
                  height={180}
                  className="object-contain drop-shadow-[0_0_20px_rgba(137,207,240,0.45)]"
                  priority
                />
              </motion.div>

              {/* CTA Instrucción */}
              <motion.div
                className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase font-medium mt-1 mb-8"
                style={{ fontFamily: "var(--font-inter)", color: "rgba(137,207,240,0.8)" }}
                animate={{ opacity: isClicked ? 0 : [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span>✦</span>
                <span>Toca el sello para abrir el reino</span>
                <span>✦</span>
              </motion.div>

              {/* Reloj real del interior animado */}
              <motion.div
                className="scale-75 origin-top mt-2"
                animate={{ opacity: isClicked ? 0 : 0.7 }}
                transition={{ duration: 0.5 }}
              >
                <ClockDecoration />
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
