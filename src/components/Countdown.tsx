"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

/**
 * Countdown — Contador regresivo mágico hacia la fecha del evento.
 * Cada unidad tiene un efecto flip sutil cuando cambia el valor.
 */
export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const calculate = () => {
      const diff = +new Date(targetDate) - +new Date();
      if (diff <= 0) {
        setTimeLeft({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
        return;
      }
      setTimeLeft({
        dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((diff / (1000 * 60)) % 60),
        segundos: Math.floor((diff / 1000) % 60),
      });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Evitar mismatch de hidratación
  if (!isMounted) return null;

  const units: Array<{ label: string; value: number }> = [
    { label: "Días", value: timeLeft.dias },
    { label: "Horas", value: timeLeft.horas },
    { label: "Minutos", value: timeLeft.minutos },
    { label: "Segundos", value: timeLeft.segundos },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          {/* Card con efecto glassmorphism */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            {/* Fondo */}
            <div className="absolute inset-0 rounded-2xl bg-[#0D1B2A]/60 backdrop-blur-md border border-[#D4AF37]/25 shadow-[0_0_15px_rgba(212,175,55,0.1),inset_0_0_10px_rgba(0,0,0,0.3)]" />
            {/* Brillo superior */}
            <div className="absolute top-0 inset-x-0 h-px rounded-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

            {/* Número con animación al cambiar */}
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative z-10 font-serif text-2xl sm:text-3xl"
                style={{ color: "#F1CF65", textShadow: "0 0 12px rgba(212,175,55,0.5)" }}
              >
                {String(value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>

          <span className="mt-2 font-sans text-[10px] sm:text-xs uppercase tracking-widest text-foreground/50">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
