"use client";

import { motion } from "framer-motion";

/**
 * ClockDecoration — Reloj decorativo CSS que avanza sus manecillas
 * hacia las 12 en punto. Evoca la magia del cuento de Cenicienta.
 * Es puramente decorativo, no muestra la hora real.
 */
export default function ClockDecoration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center gap-3"
    >
      {/* Contenedor circular del reloj */}
      <div
        className="relative w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 35% 35%, #1a2e45, #060E1A)",
          border: "2px solid rgba(212,175,55,0.5)",
          boxShadow:
            "0 0 20px rgba(137,207,240,0.15), 0 0 40px rgba(0,0,0,0.5), inset 0 0 15px rgba(0,0,0,0.4)",
        }}
      >
        {/* Anillo exterior decorativo */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(137,207,240,0.2)", transform: "scale(1.08)" }}
        />

        {/* Marcas de las horas (12, 3, 6, 9) */}
        {[0, 90, 180, 270].map((deg, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: 2,
              height: i % 2 === 0 ? 8 : 5,
              background: "rgba(212,175,55,0.6)",
              borderRadius: 2,
              top: "8%",
              left: "50%",
              transformOrigin: "1px 40px",
              transform: `translateX(-50%) rotate(${deg}deg)`,
            }}
          />
        ))}

        {/* Número 12 */}
        <span
          className="absolute"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "9px",
            color: "rgba(212,175,55,0.7)",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            letterSpacing: "0.05em",
          }}
        >12</span>

        {/* Centro del reloj */}
        <div
          className="absolute w-2 h-2 rounded-full z-20"
          style={{ background: "#D4AF37", boxShadow: "0 0 6px rgba(212,175,55,0.8)" }}
        />

        {/* Manecilla de la hora — avanza lentamente hacia las 12 */}
        <motion.div
          className="absolute origin-bottom"
          style={{
            width: 2,
            height: 26,
            background: "linear-gradient(to top, #D4AF37, #F1CF65)",
            borderRadius: 2,
            bottom: "50%",
            left: "calc(50% - 1px)",
          }}
          animate={{ rotate: [240, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />

        {/* Manecilla de los minutos — gira más rápido */}
        <motion.div
          className="absolute origin-bottom"
          style={{
            width: 1.5,
            height: 32,
            background: "linear-gradient(to top, #89CFF0, #E0E0E0)",
            borderRadius: 2,
            bottom: "50%",
            left: "calc(50% - 0.75px)",
          }}
          animate={{ rotate: [0, 720] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
      </div>

      {/* Texto debajo del reloj */}
      <p
        className="text-xs tracking-[0.25em] uppercase"
        style={{ fontFamily: "var(--font-inter)", color: "rgba(137,207,240,0.5)" }}
      >
        La magia comienza
      </p>
    </motion.div>
  );
}
