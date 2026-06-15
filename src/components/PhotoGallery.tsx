"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCreative } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { motion } from "framer-motion";

// Estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

/** Lista completa de fotos de la sesión de Lía Gabriela */
const photos = [
  "/photos/HEN_5168.jpg",
  "/photos/HEN_5182.jpg",
  "/photos/HEN_5200.jpg",
  "/photos/HEN_5205.jpg",
  "/photos/HEN_5234.jpg",
  "/photos/HEN_5260.jpg",
  "/photos/HEN_5270.jpg",
  "/photos/HEN_5278.jpg",
  "/photos/HEN_5290.jpg",
  "/photos/HEN_5296.jpg",
  "/photos/HEN_5299.jpg",
  "/photos/HEN_5315.jpg",
  "/photos/HEN_5349.jpg",
  "/photos/HEN_5395.jpg",
  "/photos/HEN_5412.jpg",
];

/**
 * PhotoGallery — Carrusel automático de fotos estilo "stories".
 * Cambia de foto cada 3.5 s con efecto de deslizamiento suave.
 * El usuario puede tocar/deslizar para navegar manualmente.
 */
export default function PhotoGallery() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="relative w-full max-w-sm mx-auto"
    >
      {/* Marco ornamental con brillo dorado y fairy-blue */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-b from-[#D4AF37]/20 via-[#89CFF0]/10 to-[#D4AF37]/20 blur-md z-0" />

      <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/20 shadow-[0_0_40px_rgba(212,175,55,0.15)] z-10">
        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          modules={[Pagination, Autoplay, EffectCreative]}
          effect="creative"
          creativeEffect={{
            prev: { shadow: true, translate: ["-20%", 0, -1] },
            next: { translate: ["100%", 0, 0] },
          }}
          pagination={{
            clickable: false,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          loop={true}
          speed={700}
          style={{ height: "70vh", maxHeight: "560px" } as React.CSSProperties}
        >
          {photos.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`Lía Gabriela — Sesión de fotos ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 384px"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                {/* Gradiente inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Contador */}
                <div className="absolute bottom-10 right-4 font-sans text-xs text-white/50 tracking-widest">
                  {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Estilos inline para los puntos de paginación — fairy-blue */}
      <style>{`
        .swiper-pagination-bullet {
          background: rgba(137, 207, 240, 0.5) !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #89CFF0 !important;
          transform: scale(1.3);
        }
      `}</style>
    </motion.div>
  );
}
