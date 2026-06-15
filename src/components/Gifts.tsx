"use client";

import { motion } from "framer-motion";
import { FaEnvelopeOpenText } from "react-icons/fa";

/**
 * Gifts — Lluvia de Sobres para los XV de Lía Gabriela.
 */
export default function Gifts() {
  return (
    <section className="w-full max-w-sm mx-auto px-5 py-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative backdrop-blur-md rounded-2xl p-5 overflow-hidden"
        style={{
          background: "rgba(13, 27, 42, 0.4)",
          border: "1px solid rgba(212,175,55,0.2)",
          boxShadow: "0 0 20px rgba(137,207,240,0.06)",
        }}
      >
        <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full pointer-events-none"
          style={{ background: "rgba(212,175,55,0.05)", filter: "blur(30px)" }} />

        <div className="flex flex-col items-center gap-3">
          <FaEnvelopeOpenText
            size={22}
            style={{ color: "rgba(241,207,101,0.7)", filter: "drop-shadow(0 0 8px rgba(212,175,55,0.3))" }}
          />
          <div
            className="italic tracking-widest text-base"
            style={{ fontFamily: "var(--font-cormorant)", color: "rgba(241,207,101,0.8)" }}
          >
            Lluvia de Sobres
          </div>
          <p
            className="text-xs leading-relaxed max-w-[240px] mx-auto"
            style={{ fontFamily: "var(--font-inter)", color: "rgba(236,240,244,0.5)" }}
          >
            Lo más importante para mí es contar con tu presencia, pero si deseas darme un obsequio, serás bienvenido ✨
          </p>
        </div>
      </motion.div>
    </section>
  );
}
