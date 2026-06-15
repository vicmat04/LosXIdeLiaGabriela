"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import LeafReveal from "@/components/LeafReveal";
import Fireflies from "@/components/Fireflies";
import PhotoGallery from "@/components/PhotoGallery";
import Countdown from "@/components/Countdown";
import AudioPlayer from "@/components/AudioPlayer";
import Itinerary, { receptionEvent } from "@/components/Itinerary";
import WhatsAppRSVP from "@/components/WhatsAppRSVP";
import DressCode from "@/components/DressCode";
import Gifts from "@/components/Gifts";
import VerticalTimeline from "@/components/VerticalTimeline";
import AdminPanel from "@/components/AdminPanel";
import ClockDecoration from "@/components/ClockDecoration";

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [secretClicks, setSecretClicks] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showRSVP, setShowRSVP] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  // ── Observamos el final de la página para mostrar el RSVP ──
  useEffect(() => {
    if (!isRevealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowRSVP(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentSentinel = footerRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [isRevealed]);

  const handleSecretClick = () => {
    setSecretClicks(prev => {
      if (prev + 1 >= 3) {
        setShowAdmin(true);
        return 0;
      }
      return prev + 1;
    });
  };

  // ──────────────────────────────────────────────────────────────
  //  FECHA DEL EVENTO: 11 de julio de 2026 a las 5:00 PM (Recepción)
  // ──────────────────────────────────────────────────────────────
  const eventDate = "2026-07-11T17:00:00";

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.215, 0.61, 0.355, 1] as const, // easeOutCubic
      },
    },
  };

  return (
    <main className="relative min-h-screen w-full pb-32 overflow-x-hidden">

      {/* ── Foto de fondo fija (Lía Gabriela) ── */}
      <div
        className="fixed inset-0 z-[-3] pointer-events-none"
        style={{
          backgroundImage: "url('/photos/HEN_5162.jpg')",
          backgroundSize: "auto 100vh",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── Fondo degradado base (sobre la foto) ── */}
      <div
        className="fixed inset-0 z-[-2]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,14,26,0.88) 0%, rgba(13,27,42,0.82) 50%, rgba(6,14,26,0.93) 100%)",
        }}
      />

      {/* ── Nebulosa de color ambiental — tonos cuento de hadas ── */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: "rgba(137, 207, 240, 0.08)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-[100px]"
          style={{ background: "rgba(13, 27, 42, 0.6)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[80px]"
          style={{ background: "rgba(212, 175, 55, 0.04)" }}
        />
        <div
          className="absolute top-1/4 right-10 w-48 h-48 rounded-full blur-[90px]"
          style={{ background: "rgba(137, 207, 240, 0.05)" }}
        />
      </div>

      {/* ── Polvo de hadas ── */}
      <Fireflies />

      {/* ── Pantalla de apertura con puertas de palacio ── */}
      <LeafReveal onReveal={() => setIsRevealed(true)} />

      {/* ── Contenido principal (se revela tras la animación) ── */}
      {isRevealed && (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.16,
                delayChildren: 0.1,
              },
            },
          }}
          className="relative z-10"
        >
          {/* ── Reproductor de audio ── */}
          <AudioPlayer autoPlayTrigger={isRevealed} />

          {/* ────────────────────────────────────────────────────── */}
          {/*  HERO — Encabezado principal                           */}
          {/* ────────────────────────────────────────────────────── */}
          <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 min-h-[75vh]">

            {/* Ornamento con corona — trigger secreto del panel admin */}
            <motion.div
              variants={itemVariants}
              className="text-2xl tracking-[0.3em] mb-4 select-none cursor-pointer"
              style={{ color: "rgba(212,175,55,0.7)" }}
              onClick={handleSecretClick}
              aria-hidden
            >
              ✦ 👑 ✦
            </motion.div>

            {/* Bendición de los padres */}
            <motion.p
              variants={itemVariants}
              className="text-xs tracking-[0.3em] uppercase mb-1"
              style={{
                fontFamily: "var(--font-inter)",
                color: "rgba(137,207,240,0.6)",
              }}
            >
              Con la bendición de Dios y el amor de
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm mb-5"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                color: "rgba(212,175,55,0.65)",
              }}
            >
              María Calvo &amp; Medardo Moreno
            </motion.p>

            {/* Subtítulo */}
            <motion.p
              variants={itemVariants}
              className="text-xs tracking-[0.4em] uppercase mb-3"
              style={{
                fontFamily: "var(--font-inter)",
                color: "rgba(137,207,240,0.55)",
              }}
            >
              Te invito a celebrar
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="italic text-3xl md:text-4xl mb-4"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "rgba(212,175,55,0.75)",
              }}
            >
              Mis XV Años
            </motion.p>

            {/* Nombre principal con Great Vibes */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl mb-6 leading-tight [animation:shimmer_3s_ease-in-out_infinite]"
              style={{
                fontFamily: "var(--font-great-vibes)",
                color: "#F1CF65",
                textShadow:
                  "0 0 20px rgba(212,175,55,0.5), 0 0 60px rgba(137,207,240,0.15), 0 0 100px rgba(212,175,55,0.2)",
              }}
            >
              Lía Gabriela
            </motion.h1>

            {/* Línea divisora brillante */}
            <motion.div
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                show: { scaleX: 1, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } }
              }}
              className="w-40 h-px mb-6"
              style={{
                background:
                  "linear-gradient(to right, transparent, #D4AF37, #89CFF0, #D4AF37, transparent)",
              }}
            />

            {/* Quote — cuento de hadas */}
            <motion.p
              variants={itemVariants}
              className="italic text-base md:text-lg max-w-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "rgba(236,240,244,0.65)",
              }}
            >
              &ldquo;Desde el primer momento en que llegaste a nuestras vidas,
              supimos que sería una historia llena de amor.&rdquo;
            </motion.p>

            {/* ── Fecha con halo luminoso ── */}
            <motion.div
              variants={itemVariants}
              className="relative flex flex-col items-center justify-center mt-8 mb-6"
            >
              {/* Halo de luz difusa detrás */}
              <div
                className="absolute w-64 h-16 rounded-full pointer-events-none"
                style={{ background: "rgba(137,207,240,0.12)", filter: "blur(48px)" }}
              />
              <div
                className="absolute w-40 h-10 rounded-full pointer-events-none"
                style={{ background: "rgba(212,175,55,0.2)", filter: "blur(24px)" }}
              />

              {/* Líneas decorativas */}
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="w-12 h-px"
                  style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5))" }}
                />
                <span className="text-xs tracking-[0.3em] select-none" style={{ color: "rgba(212,175,55,0.5)" }}>✦</span>
                <div
                  className="w-12 h-px"
                  style={{ background: "linear-gradient(to left, transparent, rgba(212,175,55,0.5))" }}
                />
              </div>

              {/* Fecha */}
              <p
                className="relative text-2xl md:text-3xl tracking-widest"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  color: "#F1CF65",
                  textShadow:
                    "0 0 18px rgba(212,175,55,0.7), 0 0 48px rgba(137,207,240,0.2)",
                }}
              >
                11 de julio · 2026
              </p>
            </motion.div>

            {/* Ornamento inferior */}
            <motion.div
              variants={itemVariants}
              className="text-xl tracking-[0.3em] mt-2 select-none"
              style={{ color: "rgba(212,175,55,0.35)" }}
              aria-hidden
            >
              ✦ ✦ ✦
            </motion.div>
          </section>

          {/* ────────────────────────────────────────────────────── */}
          {/*  GALERÍA DE FOTOS                                       */}
          {/* ────────────────────────────────────────────────────── */}
          <section className="px-4 mb-4">
            <PhotoGallery />
          </section>

          {/* Separador decorativo */}
          <div
            className="w-3/4 max-w-sm mx-auto h-px my-12"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(212,175,55,0.25), rgba(137,207,240,0.2), rgba(212,175,55,0.25), transparent)",
            }}
          />

          {/* ────────────────────────────────────────────────────── */}
          {/*  RECEPCIÓN (único evento — sin misa)                   */}
          {/* ────────────────────────────────────────────────────── */}
          <Itinerary title="Recepción" showTitle={true} events={[receptionEvent]} />

          {/* Separador */}
          <div
            className="w-3/4 max-w-sm mx-auto h-px my-12"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(212,175,55,0.25), rgba(137,207,240,0.2), rgba(212,175,55,0.25), transparent)",
            }}
          />

          {/* ────────────────────────────────────────────────────── */}
          {/*  PROGRAMA (LÍNEA DE TIEMPO VERTICAL)                    */}
          {/* ────────────────────────────────────────────────────── */}
          <VerticalTimeline />

          {/* ── Reloj decorativo — La magia comienza ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center my-8"
          >
            <ClockDecoration />
          </motion.div>

          {/* Separador */}
          <div
            className="w-3/4 max-w-sm mx-auto h-px my-12"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(137,207,240,0.2), rgba(212,175,55,0.25), rgba(137,207,240,0.2), transparent)",
            }}
          />

          {/* ────────────────────────────────────────────────────── */}
          {/*  CONTADOR REGRESIVO                                     */}
          {/* ────────────────────────────────────────────────────── */}
          <section className="flex flex-col items-center px-4 mb-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl text-center mb-2"
              style={{ fontFamily: "var(--font-cormorant)", color: "#D4AF37" }}
            >
              ✦ Faltan ✦
            </motion.h2>
            <p
              className="text-xs tracking-widest uppercase mb-6"
              style={{ fontFamily: "var(--font-inter)", color: "rgba(137,207,240,0.5)" }}
            >
              11 de Julio · 5:00 PM
            </p>
            <Countdown targetDate={eventDate} />
          </section>

          {/* Separador */}
          <div
            className="w-3/4 max-w-sm mx-auto h-px my-12"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(212,175,55,0.25), rgba(137,207,240,0.2), rgba(212,175,55,0.25), transparent)",
            }}
          />

          {/* ────────────────────────────────────────────────────── */}
          {/*  CÓDIGO DE VESTIMENTA                                   */}
          {/* ────────────────────────────────────────────────────── */}
          <DressCode />

          {/* Separador */}
          <div
            className="w-3/4 max-w-sm mx-auto h-px my-12"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(212,175,55,0.25), rgba(137,207,240,0.2), rgba(212,175,55,0.25), transparent)",
            }}
          />

          {/* ────────────────────────────────────────────────────── */}
          {/*  CIERRE — FIRMA, REGALOS Y FOOTER                      */}
          {/* ────────────────────────────────────────────────────── */}
          <section className="flex flex-col items-center px-4 mt-8 mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pb-8 text-center"
            >
              <div
                className="w-24 h-px mx-auto mb-4"
                style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)" }}
              />
              <p
                className="italic text-sm"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  color: "rgba(236,240,244,0.4)",
                }}
              >
                Con amor,
              </p>
              <p
                className="text-4xl mt-1"
                style={{
                  fontFamily: "var(--font-great-vibes)",
                  color: "rgba(241,207,101,0.65)",
                  textShadow: "0 0 15px rgba(212,175,55,0.2)",
                }}
              >
                Lía Gabriela
              </p>
              <p
                className="text-xs tracking-widest uppercase mt-2"
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "rgba(236,240,244,0.28)",
                }}
              >
                ✦ 11 · Julio · 2026 ✦
              </p>
            </motion.div>

            <Gifts />

            {/* ── Marketing Footer ── */}
            <div
              className="mt-12 mb-8 text-center py-4 px-6 rounded-2xl inline-block"
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(137,207,240,0.08)",
              }}
            >
              <a
                href="https://wa.me/50767005805?text=Hola!%20Me%20encant%C3%B3%20esta%20invitaci%C3%B3n%20digital%20interactiva.%20Quisiera%20pedir%20informaci%C3%B3n%20para%20un%20evento."
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <p
                  className="text-[11px] leading-relaxed tracking-wider transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "rgba(137,207,240,0.5)",
                  }}
                >
                  Invitación interactiva diseñada con 💙<br />
                  ¿Te gustaría una para tu evento?{" "}
                  <br className="md:hidden" />
                  <span
                    className="underline decoration-[#89CFF0]/40 underline-offset-4"
                    style={{ color: "rgba(137,207,240,0.75)" }}
                  >
                    Contáctanos aquí
                  </span>
                </p>
              </a>
            </div>

          </section>

          {/* ── Centinela para detectar el final (RSVP) ── */}
          <div ref={footerRef} className="h-10 w-full" aria-hidden />

        </motion.div>
      )}

      {/* ── Botón RSVP flotante (se muestra al llegar al final) ── */}
      {isRevealed && <WhatsAppRSVP isVisible={showRSVP} />}

      {/* ── Panel Secreto de Admin ── */}
      <AdminPanel isOpen={showAdmin} onClose={() => setShowAdmin(false)} />
    </main>
  );
}
