// ─────────────────────────────────────────────────────────────────────────────
// META PIXEL — 993672840078117
// Stack: React + TypeScript + Wouter SPA
//
// ARQUITETURA:
//   index.html → stub fbq + fbq('init') síncrono (Pixel Helper intercepta)
//   usePixelTracking() → PageView em cada rota
//   trackInitiateCheckout() → chamado explicitamente via onClick
//   trackPurchase() → chamado em /obrigado
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
    __checkoutLock?: boolean;
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
// trackInitiateCheckout() — disparado SOMENTE via onClick explícito
// window.__checkoutLock impede re-disparo por 3s (sobrevive a HMR e re-renders)
// ─────────────────────────────────────────────────────────────────────────────
export function trackInitiateCheckout(): void {
  if (typeof window.fbq === "undefined") return;

  if (window.__checkoutLock) {
    console.log("InitiateCheckout BLOCKED by lock — duplicate prevented");
    console.trace();
    return;
  }

  window.__checkoutLock = true;
  setTimeout(() => {
    window.__checkoutLock = false;
  }, 3000);

  console.log("InitiateCheckout fired");
  console.trace();
  window.fbq("track", "InitiateCheckout");
}

// ─────────────────────────────────────────────────────────────────────────────
// trackPurchase() — disparado em /obrigado
// ─────────────────────────────────────────────────────────────────────────────
export function trackPurchase(value: number = 0): void {
  if (typeof window.fbq === "undefined") return;
  window.fbq("track", "Purchase", { currency: "BRL", value });
}

// ─────────────────────────────────────────────────────────────────────────────
// usePixelTracking()
// Dispara PageView a cada mudança de rota. Também dispara Purchase em /obrigado.
// ─────────────────────────────────────────────────────────────────────────────
export function usePixelTracking(): void {
  const [location] = useLocation();

  useEffect(() => {
    trackPageView();

    if (/obrigado|success|purchase/i.test(location)) {
      const params = new URLSearchParams(window.location.search);
      const raw = params.get("value") ?? params.get("valor") ?? "0";
      trackPurchase(parseFloat(raw) || 0);
    }
  }, [location]);
}
