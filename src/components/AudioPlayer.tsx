"use client";

import { useState, useEffect, useRef } from "react";
import { FaMusic, FaPause } from "react-icons/fa";
import { motion } from "framer-motion";
import { registerAudio } from "@/lib/audioControl";

/**
 * AudioPlayer — Reproductor de música ambiental del Cuento de Hadas.
 *
 * ─────────────────────────────────────────────────────────────────────
 *  🎵  PARA PERSONALIZAR LA MÚSICA:
 *  1. Coloca tu archivo MP3 en:  /public/music/cancion.mp3
 *  2. ¡Listo! Se usará automáticamente sin cambiar ningún código.
 *     Si no hay archivo local, se reproduce una pista ambiental de bosque.
 * ─────────────────────────────────────────────────────────────────────
 */

// URL de respaldo — se usa solo si /music/cancion.mp3 no existe
const FALLBACK_SRC =
  "https://cdn.pixabay.com/download/audio/2022/01/27/audio_d35a9a81e7.mp3?filename=forest-with-small-river-birds-and-nature-field-recording-6735.mp3";
const LOCAL_SRC = "/music/cancion.mp3";

export default function AudioPlayer({
  autoPlayTrigger,
}: {
  autoPlayTrigger: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Pausar música cuando el usuario abandona o minimiza la página
  useEffect(() => {
    const handleVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Registrar el elemento de audio en el singleton de control
  useEffect(() => {
    registerAudio(audioRef.current);
    return () => registerAudio(null);
  }, []);

  // Intentar autoplay cuando se revela la invitación
  useEffect(() => {
    const audio = audioRef.current;
    if (!autoPlayTrigger || !audio) return;

    // Autoplay con fade-in
    audio.currentTime = 5;
    audio.volume = 0;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          let vol = 0;
          const fade = setInterval(() => {
            if (vol < 0.45) {
              vol = Math.min(vol + 0.03, 0.45);
              audio.volume = vol;
            } else {
              clearInterval(fade);
            }
          }, 150);
        })
        .catch(() => {
          // Bloqueado por el navegador
          setIsPlaying(false);
        });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const handleError = () => {
    const audio = audioRef.current;
    if (audio && audio.src !== FALLBACK_SRC) {
      audio.src = FALLBACK_SRC;
      if (isPlaying) audio.play().catch(console.error);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={LOCAL_SRC}
        loop
        preload="auto"
        onError={handleError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      
      <motion.button
        onClick={togglePlay}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="fixed top-5 right-5 z-50 w-11 h-11 flex items-center justify-center rounded-full backdrop-blur-md border transition-all duration-300"
        style={{
          background: isPlaying ? "rgba(13, 27, 42, 0.8)" : "rgba(0,0,0,0.5)",
          borderColor: isPlaying ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.2)",
          color: isPlaying ? "#F1CF65" : "rgba(236,240,244,0.5)",
          boxShadow: isPlaying ? "0 0 15px rgba(137,207,240,0.2), 0 0 8px rgba(212,175,55,0.2)" : "none",
        }}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        title={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {/* Anillo pulsante cuando reproduce */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(137,207,240,0.3)" }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        {isPlaying ? <FaPause size={13} /> : <FaMusic size={13} />}
      </motion.button>
    </>
  );
}
