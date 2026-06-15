"use client";

import { motion } from "framer-motion";
import { receptionTimeline } from "./Itinerary";

export default function VerticalTimeline() {
  return (
    <section className="w-full max-w-md mx-auto px-5 py-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-serif text-2xl text-center mb-8"
        style={{ color: "#D4AF37" }}
      >
        ✦ Programa ✦
      </motion.h2>

      <div className="relative py-2">
        {/* Línea vertical en el centro del ícono (w-10 = 40px -> centro = 20px) */}
        <div className="absolute left-[19px] top-4 bottom-0 w-px bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/20 to-transparent" />

        <div className="space-y-6">
          {receptionTimeline.map((evt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative flex items-start gap-5"
            >
              {/* Ícono de la línea de tiempo */}
              <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-[#060E1A] border border-[#D4AF37]/30 flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.15)] z-10 mt-0.5">
                <div className="text-sm opacity-90" style={{ color: "#F1CF65" }}>
                  {evt.icon}
                </div>
              </div>

              {/* Contenido */}
              <div className="flex-1 pb-2">
                <span className="font-sans text-xs block mb-0.5 uppercase tracking-widest" style={{ color: "rgba(212,175,55,0.70)" }}>
                  {evt.time}
                </span>
                <h3 className="font-serif text-[1.1rem] leading-tight mb-1" style={{ color: "#F1CF65" }}>
                  {evt.title}
                </h3>
                {evt.description && (
                  <p className="font-sans text-[0.75rem] text-foreground/60 leading-relaxed max-w-[90%]">
                    {evt.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
