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
  type: "bird" | "star"; // tipo de partícula
  colorIdx: number; // índice de color
  flip: boolean;    // espejo horizontal para variedad
}

const COLORS = [
  { fill: "rgba(137, 207, 240, 0.9)",  glow: "rgba(137, 207, 240, 0.5)" },  // fairy-blue
  { fill: "rgba(241, 207, 101, 0.85)", glow: "rgba(212, 175, 55, 0.5)"  },  // champán
  { fill: "rgba(240, 240, 245, 0.8)",  glow: "rgba(224, 224, 224, 0.4)" },  // plata
];

/**
 * Pajarito SVG minimalista (silueta de ave en vuelo).
 * Se renderiza en el color de su grupo.
 */
function BirdShape({ size, color, flip }: { size: number; color: string; flip: boolean }) {
  return (
    <svg
      width={size * 3.5}
      height={size * 2}
      viewBox="0 0 28 16"
      fill="none"
      style={{
        transform: flip ? "scaleX(-1)" : undefined,
        filter: `drop-shadow(0 0 ${size * 0.8}px ${color})`,
      }}
    >
      {/* Ala izquierda */}
      <path
        d="M14 9 Q9 4 2 6 Q6 8 14 9Z"
        fill={color}
        opacity="0.9"
      />
      {/* Ala derecha */}
      <path
        d="M14 9 Q19 4 26 6 Q22 8 14 9Z"
        fill={color}
        opacity="0.9"
      />
      {/* Cuerpo / cabeza */}
      <ellipse cx="14" cy="9.5" rx="2.5" ry="1.8" fill={color} />
    </svg>
  );
}

/**
 * FairyDust — Sistema de partículas que simulan polvo de hadas:
 * pajaritos azules, dorados y plateados volando mágicamente,
 * junto con destellos de estrellas.
 * Generadas solo en el cliente para evitar hydration mismatch.
 */
export default function FairyDust() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const generated = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,           // 2 – 6 px base
      duration: Math.random() * 10 + 8,       // 8 – 18 s
      delay: Math.random() * 8,               // 0 – 8 s
      type: Math.random() > 0.45 ? "bird" : "star" as "bird" | "star",
      colorIdx: Math.floor(Math.random() * 3),
      flip: Math.random() > 0.5,
    }));
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
              p.type === "bird"
                ? {
                    // Los pájaros se desplazan como si volaran en diagonal
                    y: [0, -(30 + Math.random() * 35), -10, -(50 + Math.random() * 20)],
                    x: [0, 30 + Math.random() * 40, -10, 50 + Math.random() * 30],
                    opacity: [0, 0.85, 0.4, 0.7, 0],
                    scale: [0.6, 1, 0.8, 0.9, 0.6],
                  }
                : {
                    // Las estrellas flotan y rotan
                    y: [0, -(20 + Math.random() * 40), 10, -(45 + Math.random() * 25)],
                    x: [0, 18 + Math.random() * 22, -18 + Math.random() * 14, 6],
                    opacity: [0, 1, 0.3, 0.9, 0],
                    scale: [0.5, 1.3, 0.8, 1.1, 0.5],
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
            {p.type === "bird" ? (
              <BirdShape size={p.size} color={color.fill} flip={p.flip} />
            ) : (
              <div
                style={{
                  width: p.size * 1.5 + 2,
                  height: p.size * 1.5 + 2,
                  background: color.fill,
                  boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${color.glow}`,
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
