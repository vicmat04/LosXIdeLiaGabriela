# Notas del Proyecto: Los XV de Lía Gabriela 👑✨

Este documento sirve como bitácora y guía técnica de la invitación web con temática **"Cuento de Hadas / Cenicienta"**.

---

## Parte 1: Datos del Evento

| Campo | Valor |
|---|---|
| **Quinceañera** | Lía Gabriela |
| **Padres** | María Calvo & Medardo Moreno |
| **Fecha** | Sábado 11 de julio de 2026 |
| **Hora** | 17:00 hrs |
| **Lugar** | Eventos Carolina |
| **Google Maps** | https://maps.app.goo.gl/n6HAfN2vLJbGtxMt6 |
| **Waze** | https://waze.com/ul/hd1qv1upex |
| **Confirmar antes de** | 30 de junio de 2026 |
| **Vestimenta** | Formal (reservar celeste para la quinceañera) |
| **WhatsApp RSVP** | +507 6881-9451 (mamá María Calvo) |

---

## Parte 2: Resumen Técnico

### ¿Qué se construyó?
1. **Refactorización completa** del proyecto anterior (XV Ana Victoria - Bosque Encantado).
2. **Nueva paleta Cuento de Hadas:** Azul Cenicienta (`#89CFF0`), Azul Medianoche (`#0D1B2A`), Champán (`#D4AF37`), Plata (`#E0E0E0`).
3. **Nueva tipografía:** `Great Vibes` (nombre, firma), `Cormorant Garamond` (títulos), `Inter` (cuerpos).
4. **Pantalla de apertura:** Puertas de palacio que se abren (reemplazó las hojas del bosque).
5. **Polvo de hadas:** Partículas azules, doradas y plateadas (reemplazó las luciérnagas verdes).
6. **Reloj decorativo:** CSS animado que avanza sus manecillas hacia las 12, evocando Cenicienta.
7. **Sin Eucaristía:** Este evento es solo recepción (un único lugar).
8. **RSVP:** Un solo número (+507 6881-9451 — mamá María Calvo).

---

## Parte 3: Ficha Técnica

### Tecnologías Utilizadas
- **Framework Principal:** Next.js (App Router, v15+) + React
- **Estilos:** Tailwind CSS v4 con tokens CSS custom en `@theme`
- **Animaciones:** Framer Motion
- **Íconos:** `react-icons` (fa, gi)
- **Carrusel:** SwiperJS
- **Base de Datos:** Supabase (PostgreSQL)

### Supabase
- **URL:** `https://ohzimevkczcgmhpcozmj.supabase.co`
- **Anon Key:** Configurada en `src/lib/supabase.ts`
- La tabla se llama `guests` con columnas: `id`, `name`, `confirmed_to`, `created_at`

### Panel de Administración
- **Trigger:** 3 toques rápidos sobre el ornamento `✦ 👑 ✦` del hero
- **Contraseña:** `Lia15`
- **Funciones:** ver confirmados, editar nombres, eliminar, compartir lista por WhatsApp

### Fotos
- **Fondo fijo:** `/photos/HEN_5162.jpg` (en carpeta raíz `/photos/`)
- **Puertas de apertura:** `HEN_5196.jpg` (izq) y `HEN_5248.jpg` (der)
- **Galería:** 15 fotos en `/public/photos/HEN_5168.jpg` → `HEN_5412.jpg`

---

## Parte 4: Publicación en Vercel

**Pasos para el despliegue final:**
1. Obtener la Supabase anon key y actualizar `src/lib/supabase.ts`
2. Subir cambios a GitHub: `git add . && git commit -m "feat: refactorización XV Lía Gabriela"`
3. En **[Vercel](https://vercel.com/)** → Import project → `LosXV-AnaVictoria`
4. Click en **Deploy** (no requiere variables de entorno — anon key hardcodeada por diseño)
5. URL generada con terminación `.vercel.app` lista para compartir

---

## Parte 5: Árbol de Archivos Clave

```
src/
  app/
    globals.css      — Paleta Cuento de Hadas + keyframes
    layout.tsx       — Fuentes Google + metadata Lía Gabriela
    page.tsx         — Orquestador principal
    icon.svg         — Favicon L dorada sobre fondo midnight
  components/
    LeafReveal.tsx   — Pantalla de apertura (puertas de palacio)
    Fireflies.tsx    — Polvo de hadas (partículas mágicas)
    ClockDecoration.tsx — Reloj decorativo animado (NUEVO)
    PhotoGallery.tsx — Carrusel 15 fotos Lía
    Itinerary.tsx    — Evento de recepción (sin misa)
    VerticalTimeline.tsx — Programa del evento
    Countdown.tsx    — Cuenta regresiva al 11 jul 5:00 PM
    DressCode.tsx    — Código formal + nota celeste reservado
    Gifts.tsx        — Lluvia de sobres
    WhatsAppRSVP.tsx — Confirmación → +507 6881-9451
    AdminPanel.tsx   — Panel secreto (contraseña: Lia15)
    AudioPlayer.tsx  — Reproductor /music/cancion.mp3
    MapModal.tsx     — Modal de mapa integrado
  lib/
    supabase.ts      — ⚠️ Pendiente anon key
    audioControl.ts  — Singleton de control de audio
public/
  photos/            — 17 fotos HEN_5xxx
  music/             — cancion.mp3
photos/              — HEN_5162.jpg (fondo fijo)
```
