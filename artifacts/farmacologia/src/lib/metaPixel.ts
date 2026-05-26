// ─────────────────────────────────────────────────────────────────────────────
// META PIXEL — 993672840078117
// Stack: React + TypeScript + Wouter SPA
//
// ARQUITETURA:
//   index.html → stub fbq + fbq('init') síncrono (Pixel Helper intercepta)
//   usePixelTracking() → PageView em cada rota
//
// InitiateCheckout e Purchase são responsabilidade da Cakto.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[][];
      loaded: boolean;
      version: string;
      push: (...args: unknown[]) => void;
    };
    _fbq: Window["fbq"];
    __pixelReady?: boolean;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// initPixel()
// index.html já criou o stub e chamou fbq('init').
// Aqui apenas marca que o pixel foi inicializado pelo React.
// ─────────────────────────────────────────────────────────────────────────────
export function initPixel(): void {
  if (typeof window === "undefined") return;
  if (window.__pixelReady) return;
  window.__pixelReady = true;
}

// ─────────────────────────────────────────────────────────────────────────────
// trackPageView() — 1 rota = 1 PageView
// ─────────────────────────────────────────────────────────────────────────────
export function trackPageView(): void {
  if (typeof window.fbq === "undefined") return;
  window.fbq("track", "PageView");
}

// ─────────────────────────────────────────────────────────────────────────────
// usePixelTracking()
// Dispara PageView a cada mudança de rota.
// ─────────────────────────────────────────────────────────────────────────────
export function usePixelTracking(): void {
  const [location] = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location]);
}
