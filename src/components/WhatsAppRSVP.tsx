"use client";

import { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { pauseAudio } from "@/lib/audioControl";
import { supabase } from "@/lib/supabase";

/**
 * WhatsAppRSVP — Botón flotante de confirmación de asistencia.
 *
 * Al tocar el botón se abre un panel inferior (bottom sheet) con
 * la opción de confirmar con la mamá de Lía Gabriela.
 * El nombre del invitado se guarda en Supabase antes de abrir WA.
 */

// ── Números de WhatsApp (con código de país, sin el +) ──
const MAMA_PHONE = "50768819451";
const LIA_PHONE  = "50766947181";

function buildWaLink(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const options = [
  {
    id: "mama",
    label: "María Calvo",
    sublabel: "Confirmar con la mamá de Lía",
    phone: MAMA_PHONE,
    color: "from-[#0D1B2A]/60 to-[#112233]/60 border-[#D4AF37]/30 hover:bg-[#D4AF37]/10",
    iconColor: "text-[#F1CF65]",
  },
  {
    id: "lia",
    label: "Lía Gabriela",
    sublabel: "Confirmar con la quinceañera",
    phone: LIA_PHONE,
    color: "from-[#0D1B2A]/60 to-[#112233]/60 border-[#89CFF0]/30 hover:bg-[#89CFF0]/10",
    iconColor: "text-[#89CFF0]",
  },
] as const;

export default function WhatsAppRSVP({ isVisible = true }: { isVisible?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      {/* ── Bottom Sheet Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel inferior */}
            <motion.div
              key="panel"
              className="fixed bottom-0 left-0 right-0 z-[80] rounded-t-3xl px-6 pt-6 pb-10"
              style={{
                background: "linear-gradient(to top, #060E1A, #0D1B2A)",
                borderTop: "1px solid rgba(212,175,55,0.2)",
                boxShadow: "0 -10px 60px rgba(0,0,0,0.6)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
            >
              {/* Manija decorativa */}
              <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: "rgba(212,175,55,0.3)" }} />

              <h3
                className="text-2xl text-center mb-1"
                style={{ fontFamily: "var(--font-cormorant)", color: "#D4AF37" }}
              >
                Confirmar Asistencia
              </h3>

              <p
                className="text-xs text-center mb-6 mt-1 tracking-wider"
                style={{ fontFamily: "var(--font-cormorant)", color: "rgba(137,207,240,0.7)", fontStyle: "italic" }}
              >
                Por favor confirma antes del 30 de junio de 2026
              </p>

              <motion.div
                className="max-w-xs mx-auto mt-2 mb-8 relative z-10"
                animate={error ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <input
                  type="text"
                  placeholder="Tu Nombre y Apellido"
                  value={guestName}
                  onChange={(e) => {
                    setGuestName(e.target.value);
                    if (error) setError(false);
                  }}
                  disabled={isLoading}
                  className={`w-full rounded-xl px-4 py-3 placeholder:text-[#D4AF37]/40 focus:outline-none focus:ring-1 text-sm text-center transition-colors ${
                    error
                      ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] focus:border-red-400 focus:ring-red-400/50"
                      : "border-[#D4AF37]/30 focus:border-[#89CFF0] focus:ring-[#89CFF0]/50"
                  }`}
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: error ? "1px solid rgb(239,68,68)" : "1px solid rgba(212,175,55,0.3)",
                    color: "#F1CF65",
                    fontFamily: "var(--font-inter)",
                  }}
                />

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -bottom-6 left-0 right-0 text-center text-red-400 text-[11px] tracking-wide"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Por favor, necesitamos saber tu nombre.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <p
                className="text-xs text-center tracking-wider mb-4"
                style={{ fontFamily: "var(--font-inter)", color: "rgba(236,240,244,0.5)" }}
              >
                ¿A quién deseas enviar el mensaje?
              </p>

              <div className="space-y-3 max-w-xs mx-auto">
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    disabled={isLoading}
                    className={`flex items-center gap-4 w-full p-4 rounded-2xl border bg-gradient-to-r ${opt.color} transition-all active:scale-95 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={async () => {
                      if (!guestName.trim()) {
                        setError(true);
                        setTimeout(() => setError(false), 2500);
                        return;
                      }

                      setIsLoading(true);

                      try {
                        await supabase.from("guests").insert([{
                          name: guestName.trim(),
                          confirmed_to: opt.label,
                        }]);
                      } catch (err) {
                        console.error("Error saving to db", err);
                      }

                      setIsLoading(false);
                      pauseAudio();

                      const customMessage =
                        `¡Hola! Soy *${guestName.trim()}*. ` +
                        `Confirmo mi asistencia a los XV años de Lía Gabriela. ✨👑`;

                      window.location.href = buildWaLink(opt.phone, customMessage);

                      setTimeout(() => {
                        setIsOpen(false);
                        setGuestName("");
                      }, 500);
                    }}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-black/30 ${opt.iconColor}`}>
                      <FaWhatsapp size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm" style={{ fontFamily: "var(--font-inter)", color: "#ECF0F4" }}>
                        {opt.label}
                      </p>
                      <p className="text-xs" style={{ fontFamily: "var(--font-inter)", color: "rgba(236,240,244,0.5)" }}>
                        {opt.sublabel}
                      </p>
                    </div>
                    <span style={{ color: "rgba(236,240,244,0.3)", fontSize: "1.2rem" }}>›</span>
                  </button>
                ))}
              </div>

              {/* Cerrar */}
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 mx-auto mt-5 text-xs transition-colors"
                style={{ fontFamily: "var(--font-inter)", color: "rgba(236,240,244,0.4)" }}
              >
                <FaTimes size={10} />
                Cancelar
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Botón flotante principal ── */}
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60]"
        initial={{ y: 120, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: 120, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 28,
          delay: isVisible ? 0.2 : 0,
        }}
      >
        {/* Halo pulsante */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "rgba(37, 211, 102, 0.2)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center justify-center gap-2 active:scale-95 text-white font-semibold text-xs py-3 px-6 w-[80vw] max-w-[280px] rounded-full transition-all duration-200 whitespace-nowrap"
          style={{
            background: "#25D366",
            boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
            fontFamily: "var(--font-inter)",
          }}
          aria-label="Confirmar asistencia por WhatsApp"
        >
          <FaWhatsapp size={16} />
          Confirmar asistencia
        </button>
      </motion.div>
    </>
  );
}
