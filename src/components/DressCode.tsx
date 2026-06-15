import { motion } from "framer-motion";
import { GiLargeDress, GiTie } from "react-icons/gi";
import { GiDiamondRing } from "react-icons/gi";

/**
 * DressCode — Código de vestimenta para los XV de Lía Gabriela.
 */
export default function DressCode() {
  return (
    <section className="w-full max-w-sm mx-auto px-5 py-4 text-center">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ fontSize: "28px", fontFamily: "var(--font-cormorant)", color: "#D4AF37" }}
        className="mb-4 leading-tight"
      >
        ✦ Código de Vestimenta ✦
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative backdrop-blur-md rounded-2xl p-5 overflow-hidden"
        style={{
          background: "rgba(13, 27, 42, 0.5)",
          border: "1px solid rgba(212,175,55,0.2)",
          boxShadow: "0 0 30px rgba(137,207,240,0.08)",
        }}
      >
        {/* Adorno de fondo */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: "rgba(137,207,240,0.05)", filter: "blur(40px)" }} />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: "rgba(212,175,55,0.05)", filter: "blur(40px)" }} />

        <div className="flex justify-center gap-8 mb-4" style={{ color: "rgba(241,207,101,0.7)" }}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <GiTie size={28} style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.3))" }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="flex flex-col items-center gap-2"
          >
            <GiDiamondRing size={26} style={{ filter: "drop-shadow(0 0 8px rgba(137,207,240,0.4))" }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <GiLargeDress size={28} style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.3))" }} />
          </motion.div>
        </div>

        <p
          className="text-base mb-2"
          style={{ fontFamily: "var(--font-cormorant)", color: "#F1CF65" }}
        >
          Formal
        </p>

        {/* Nota especial: reservar el celeste */}
        <div
          className="mt-3 py-2 px-3 rounded-xl"
          style={{ background: "rgba(137,207,240,0.08)", border: "1px solid rgba(137,207,240,0.2)" }}
        >
          <p
            className="text-xs leading-relaxed"
            style={{ fontFamily: "var(--font-inter)", color: "rgba(137,207,240,0.8)" }}
          >
            💙 Reservemos el color <strong style={{ color: "#89CFF0" }}>celeste</strong> para la quinceañera
          </p>
        </div>
      </motion.div>
    </section>
  );
}
