"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;        // % horizontal
  y: number;        // % vertical
  size: number;     // px base
  duration: number; // segundos
  delay: number;    // segundos
  type: "swallow" | "star"; // tipo de partícula
  colorIdx: number; // índice de color
  flip: boolean;    // espejo horizontal para variedad
}

const COLORS = [
  { fill: "rgba(137, 207, 240, 0.85)", glow: "rgba(137, 207, 240, 0.4)" },  // Fairy Blue
  { fill: "rgba(241, 207, 101, 0.8)",  glow: "rgba(212, 175, 55, 0.35)" },  // Champán
  { fill: "rgba(240, 240, 245, 0.75)", glow: "rgba(224, 224, 224, 0.3)" },  // Plata
  { fill: "rgba(186, 157, 240, 0.8)",  glow: "rgba(186, 157, 240, 0.35)" }, // Lavanda
  { fill: "rgba(240, 157, 185, 0.8)",  glow: "rgba(240, 157, 185, 0.35)" }, // Rosa Pastel
];

/**
 * Swallow (Golondrina) SVG.
 * Silueta estilizada con alas arqueadas y cola profundamente bifurcada en V.
 */
function SwallowShape({ size, color, flip }: { size: number; color: string; flip: boolean }) {
  return (
    <svg
      width={size * 3.5}
      height={size * 2.2}
      viewBox="0 0 32 20"
      fill="none"
      style={{
        transform: flip ? "scaleX(-1)" : undefined,
        filter: `drop-shadow(0 0 ${size * 0.5}px ${color})`,
      }}
    >
      {/* Cuerpo, alas arqueadas y cola en V de Golondrina */}
      <path
        d="M16 2 C12 6 4 9 1 12 C6 11 12 9 16 7 C20 9 26 11 31 12 C28 9 20 6 16 2 Z M16 7 L12 18 L16 13 L20 18 Z"
        fill={color}
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * FairyDust — Sistema de partículas que simulan polvo de hadas:
 * golondrinas pequeñas de diversos colores y estrellas diminutas que flotan sutilmente.
 * Reducido en cantidad (16 partículas en total) para evitar saturar la pantalla.
 */
export default function FairyDust() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // 21 partículas en total: 13 golondrinas (las 5 extra solicitadas) y 8 estrellas
    const totalSwallows = 13;
    const totalStars = 8;
    const totalCount = totalSwallows + totalStars;

    const generated = Array.from({ length: totalCount }).map((_, i) => {
      const isSwallow = i < totalSwallows;
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        // Golondrinas un poquito más grandes (base 3 – 5px), estrellas bien diminutas (base 1.2 – 2px)
        size: isSwallow ? (Math.random() * 2 + 3) : (Math.random() * 0.8 + 1.2),
        duration: Math.random() * 12 + 10,       // 10 – 22 s
        delay: Math.random() * 10,               // 0 – 10 s
        type: isSwallow ? ("swallow" as const) : ("star" as const),
        colorIdx: Math.floor(Math.random() * COLORS.length),
        flip: Math.random() > 0.5,
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => {
        const color = COLORS[p.colorIdx];
        return (
          <motion.div
            key={p.id}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={
              p.type === "swallow"
                ? {
                    // Golondrinas vuelan en diagonal de forma sutil
                    y: [0, -(25 + Math.random() * 25), -5, -(40 + Math.random() * 15)],
                    x: [0, 20 + Math.random() * 30, -5, 35 + Math.random() * 20],
                    opacity: [0, 0.75, 0.3, 0.6, 0],
                    scale: [0.5, 0.9, 0.7, 0.8, 0.5],
                  }
                : {
                    // Estrellas diminutas flotan y rotan
                    y: [0, -(15 + Math.random() * 30), 5, -(35 + Math.random() * 20)],
                    x: [0, 12 + Math.random() * 18, -12 + Math.random() * 10, 4],
                    opacity: [0, 0.85, 0.25, 0.75, 0],
                    scale: [0.4, 0.9, 0.6, 0.8, 0.4],
                    rotate: [0, 90, 180, 270, 360],
                  }
            }
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: p.delay,
            }}
          >
            {p.type === "swallow" ? (
              <SwallowShape size={p.size} color={color.fill} flip={p.flip} />
            ) : (
              <div
                style={{
                  width: p.size * 1.1 + 1,
                  height: p.size * 1.1 + 1,
                  background: color.fill,
                  boxShadow: `0 0 ${p.size * 2}px ${p.size * 0.7}px ${color.glow}`,
                  clipPath:
                    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
