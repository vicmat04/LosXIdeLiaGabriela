"use client";

import { useState } from "react";
import { FaGlassCheers, FaMapMarkerAlt, FaWaze, FaUsers, FaCrown, FaRing, FaMusic, FaMask, FaStar, FaConciergeBell } from "react-icons/fa";
import { motion } from "framer-motion";
import MapModal from "./MapModal";

export interface Event {
  title: string;
  time: string;
  location?: string;
  address?: string;
  mapQuery?: string;  // query para el iframe del mapa
  gmapsLink?: string;
  wazeLink?: string;
  icon: React.ReactNode;
  description?: string;
}

/**
 * Itinerary — Lista de eventos del día con botones de navegación.
 *
 * ─────────────────────────────────────────────────────────────────
 *  📍  PERSONALIZA AQUÍ:
 *  - Cambia `location` y `address` al lugar real del evento.
 *  - Actualiza `gmapsLink` y `wazeLink` con las URLs de tu ubicación.
 *    Google Maps: Busca el lugar → Compartir → Copiar enlace
 *    Waze:        https://waze.com/ul?ll=LAT,LON&navigate=yes
 * ─────────────────────────────────────────────────────────────────
 */
export const receptionEvent: Event = {
  time: "Sábado 11 de julio\n7:00 PM",
  title: "Recepción",
  location: "Eventos Carolina",
  address: "Sigue el corazón hasta la magia ✨",
  mapQuery: "Eventos Carolina Panamá",
  gmapsLink: "https://maps.app.goo.gl/n6HAfN2vLJbGtxMt6?g_st=aw",
  wazeLink: "https://waze.com/ul/hd1qv1upex",
  icon: <FaGlassCheers className="text-2xl" style={{ color: "#F1CF65" }} />,
};

export const receptionTimeline: Event[] = [
  {
    time: "7:00 PM",
    title: "Recepción de invitados",
    description: "Llegada de familiares y amigos (30-45 min), música ambiental.",
    icon: <FaUsers className="text-2xl" style={{ color: "#F1CF65" }} />,
  },
  {
    time: "8:00 PM",
    title: "Entrada de la Quinceañera",
    description: "Entrada oficial al salón.",
    icon: <FaCrown className="text-2xl" style={{ color: "#F1CF65" }} />,
  },
  {
    time: "8:20 PM",
    title: "Protocolo",
    icon: <FaRing className="text-2xl" style={{ color: "#F1CF65" }} />,
  },
  {
    time: "8:40 PM",
    title: "Vals",
    icon: <FaMusic className="text-2xl" style={{ color: "#F1CF65" }} />,
  },
  {
    time: "9:10 PM",
    title: "Buffet",
    icon: <FaConciergeBell className="text-2xl" style={{ color: "#F1CF65" }} />,
  },
  {
    time: "9:45 PM",
    title: "Baile grupal",
    description: "Coreografía con amigos.",
    icon: <FaStar className="text-2xl" style={{ color: "#F1CF65" }} />,
  },
  {
    time: "10:50 PM",
    title: "Baile General",
    description: "Apertura de la pista de baile.",
    icon: <FaMusic className="text-2xl" style={{ color: "#F1CF65" }} />,
  },
  {
    time: "11:30 PM",
    title: "Hora Loca",
    icon: <FaMask className="text-2xl" style={{ color: "#F1CF65" }} />,
  },
];

interface ModalState {
  locationName: string;
  address: string;
  mapQuery: string;
  navigateTo: string;
  appName: "Maps" | "Waze";
}

interface ItineraryProps {
  title?: string;
  showTitle?: boolean;
  events?: Event[];
}

export default function Itinerary({ title = "Itinerario", showTitle = true, events = [receptionEvent] }: ItineraryProps) {
  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = (evt: Event, app: "Maps" | "Waze") => {
    setModal({
      locationName: evt.location || "",
      address: evt.address || "",
      mapQuery: evt.mapQuery || "",
      navigateTo: app === "Maps" ? (evt.gmapsLink || "") : (evt.wazeLink || ""),
      appName: app,
    });
  };

  return (
    <>
      <section className="w-full max-w-sm mx-auto px-5 py-4">
        {showTitle && (
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-3xl text-center mb-10"
            style={{ color: "#D4AF37" }}
          >
            ✦ {title} ✦
          </motion.h2>
        )}

        <div className="relative">
          {/* Línea vertical decorativa */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4AF37]/10 via-[#D4AF37]/30 to-[#D4AF37]/10" />

          <div className="space-y-8">
            {events.map((evt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="flex items-start gap-5"
              >
                {/* Ícono circular */}
                <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-[#0D1B2A] border border-[#D4AF37]/30 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.15)] z-10">
                  {evt.icon}
                </div>

                {/* Contenido */}
                <div className="flex-1 bg-[#0D1B2A]/50 backdrop-blur-sm border border-[#89CFF0]/20 rounded-2xl p-5 shadow-md">
                  <p className="font-sans text-xs uppercase tracking-widest text-[#D4AF37]/60 mb-1 whitespace-pre-line">
                    {evt.time}
                  </p>
                  <h3 className="font-serif text-xl text-[#F1CF65] mb-1">
                    {evt.title}
                  </h3>
                  {evt.location && (
                    <p className="font-sans text-sm text-foreground/80 mb-1">
                      {evt.location}
                    </p>
                  )}
                  {evt.address && (
                    <p className="font-sans text-xs text-foreground/50 mb-4">
                      {evt.address}
                    </p>
                  )}
                  {evt.description && (
                    <p className="font-sans text-xs text-foreground/70 mb-2 leading-relaxed">
                      {evt.description}
                    </p>
                  )}

                  {/* Botones de navegación */}
                  {(evt.gmapsLink || evt.wazeLink) && (
                    <div className="flex gap-3 mt-4">
                      {evt.gmapsLink && (
                        <button
                          onClick={() => openModal(evt, "Maps")}
                          className="flex flex-1 items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-black/40 border border-[#D4AF37]/25 text-[#F1CF65] hover:bg-[#D4AF37] hover:text-black transition-colors text-xs font-sans font-medium"
                          aria-label={`Cómo llegar a ${evt.title} por Google Maps`}
                        >
                          <FaMapMarkerAlt />
                          <span>Maps</span>
                        </button>
                      )}
                      {evt.wazeLink && (
                        <button
                          onClick={() => openModal(evt, "Waze")}
                          className="flex flex-1 items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#33ccff]/10 border border-[#33ccff]/25 text-[#33ccff] hover:bg-[#33ccff] hover:text-black transition-colors text-xs font-sans font-medium"
                          aria-label={`Cómo llegar a ${evt.title} por Waze`}
                        >
                          <FaWaze />
                          <span>Waze</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de mapa */}
      {modal && (
        <MapModal
          isOpen={!!modal}
          onClose={() => setModal(null)}
          locationName={modal.locationName}
          address={modal.address}
          mapQuery={modal.mapQuery}
          navigateTo={modal.navigateTo}
          appName={modal.appName}
        />
      )}
    </>
  );
}
