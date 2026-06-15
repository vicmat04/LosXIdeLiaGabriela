"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;        // % horizontal
  y: number;        // % vertical
  size: number;     // px
  duration: number; // segundos
  delay: number;    // segundos
  type: "dot" | "star"; // tipo de partícula
  colorIdx: number; // índice de color
}

const COLORS = [
  { fill: "rgba(137, 207, 240, 0.9)",  glow: "rgba(137, 207, 240, 0.5)" },  // fairy-blue
  { fill: "rgba(241, 207, 101, 0.85)", glow: "rgba(212, 175, 55, 0.5)"  },  // champán
  { fill: "rgba(240, 240, 245, 0.8)",  glow: "rgba(224, 224, 224, 0.4)" },  // plata
];

/**
 * FairyDust — Sistema de partículas que simulan polvo de hadas:
 * destellos azules, dorados y plateados flotando mágicamente.
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
      size: Math.random() * 5 + 2,           // 2 – 7 px
      duration: Math.random() * 10 + 8,       // 8 – 18 s
      delay: Math.random() * 8,               // 0 – 8 s
      type: Math.random() > 0.6 ? "star" : "dot" as "dot" | "star",
      colorIdx: Math.floor(Math.random() * 3),
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
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              borderRadius: p.type === "dot" ? "50%" : "0",
              background: color.fill,
              boxShadow: `0 0 ${p.size * 3}px ${p.size}px ${color.glow}`,
              clipPath:
                p.type === "star"
                  ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                  : undefined,
            }}
            animate={{
              y: [0, -(20 + Math.random() * 40), 10, -(45 + Math.random() * 25)],
              x: [0, 18 + Math.random() * 22, -18 + Math.random() * 14, 6],
              opacity: [0, 1, 0.3, 0.9, 0],
              scale: [0.5, 1.3, 0.8, 1.1, 0.5],
              rotate: p.type === "star" ? [0, 90, 180, 270, 360] : [0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        );
      })}
    </div>
  );
}
