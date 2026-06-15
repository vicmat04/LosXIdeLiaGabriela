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
 * Rediseñado como esferas de cristal circulares con bordes de aura giratoria,
 * iconos superiores y destellos mágicos (flash scale) al cambiar los valores.
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

  const units: Array<{ label: string; value: number; icon: string }> = [
    { label: "Días", value: timeLeft.dias, icon: "🌙" },
    { label: "Horas", value: timeLeft.horas, icon: "⭐" },
    { label: "Minutos", value: timeLeft.minutos, icon: "✨" },
    { label: "Segundos", value: timeLeft.segundos, icon: "⏳" },
  ];

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm mx-auto py-2">
      {/* Encabezado del contador */}
      <div className="text-center">
        <span 
          className="text-2xl tracking-wide block mb-1" 
          style={{ 
            fontFamily: "var(--font-great-vibes)", 
            color: "#F1CF65", 
            textShadow: "0 0 15px rgba(241, 207, 101, 0.4)" 
          }}
        >
          La magia comienza en...
        </span>
      </div>

      {/* Esferas de la cuenta regresiva */}
      <div className="flex justify-center gap-3.5 sm:gap-5">
        {units.map(({ label, value, icon }) => (
          <div key={label} className="flex flex-col items-center relative group">
            
            {/* Ícono temático superior flotando */}
            <span className="text-xs mb-1.5 opacity-80 group-hover:scale-110 transition-transform duration-300">
              {icon}
            </span>

            {/* Esfera circular con borde de aura giratoria */}
            <div className="relative w-[70px] h-[70px] sm:w-[82px] sm:h-[82px] flex items-center justify-center rounded-full overflow-hidden">
              
              {/* Borde con gradiente cónico giratorio continuo (Aura Mágica) */}
              <div 
                className="absolute inset-0 rounded-full animate-[spin_7s_linear_infinite]"
                style={{
                  background: "conic-gradient(from 0deg, #D4AF37 0%, rgba(224,224,224,0.1) 25%, #89CFF0 50%, rgba(212,175,55,0.1) 75%, #D4AF37 100%)",
                }}
              />

              {/* Centro de la esfera (Cristal oscuro con radial gradient y blur) */}
              <div 
                className="absolute inset-[2px] rounded-full z-10 flex items-center justify-center overflow-hidden"
                style={{
                  background: "radial-gradient(circle at center, #0D1B2A 50%, #060E1A 100%)",
                  boxShadow: "inset 0 0 12px rgba(0,0,0,0.7), 0 0 8px rgba(137,207,240,0.15)",
                }}
              >
                {/* Reflejo de cristal de la esfera en el borde superior */}
                <div 
                  className="absolute top-0 inset-x-0 h-1/2 w-full opacity-10 pointer-events-none rounded-t-full bg-gradient-to-b from-white to-transparent" 
                />

                {/* Número con animación de destello (Flash Scale) al cambiar */}
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={value}
                    initial={{ scale: 1.35, opacity: 0, filter: "brightness(2)" }}
                    animate={{ scale: 1, opacity: 1, filter: "brightness(1)" }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="relative z-20 font-medium text-xl sm:text-2xl select-none"
                    style={{ 
                      color: "#E8E8E8", 
                      fontFamily: "var(--font-display)", 
                      textShadow: "0 0 10px rgba(232, 232, 232, 0.45), 0 0 22px rgba(137, 207, 240, 0.3)" 
                    }}
                  >
                    {String(value).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Label de la unidad en oro/champán tenue */}
            <span 
              className="mt-2.5 font-medium text-[9px] sm:text-[10px] uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-inter)", color: "rgba(241,207,101,0.55)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
