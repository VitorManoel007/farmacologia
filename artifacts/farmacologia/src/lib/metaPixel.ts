// ─────────────────────────────────────────────────────────────────────────────
// META PIXEL — Implementação profissional para React SPA
// Pixel ID : 993672840078117
// Stack    : React + TypeScript + Wouter
//
// ARQUITETURA HÍBRIDA:
//   index.html → stub fbq + fbq('init') + fbq('track','PageView') síncrono
//                Isso garante que o Meta Pixel Helper intercepte os eventos.
//   metaPixel.ts → rastreamento SPA (navegações), InitiateCheckout, Purchase
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
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

// ── Deduplicação: bloqueia o mesmo evento disparado em menos de 2 segundos ────
const lastFired: Record<string, number> = {};

function canFire(eventName: string): boolean {
  const now = Date.now();
  if (now - (lastFired[eventName] ?? 0) < 2000) return false;
  lastFired[eventName] = now;
  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// initPixel()
// O stub fbq, fbq('init') e o primeiro PageView já são disparados no index.html
// de forma síncrona — isso garante interceptação pelo Meta Pixel Helper.
// Aqui apenas: marca o PageView inicial como feito + registra listener global.
// ─────────────────────────────────────────────────────────────────────────────
export function initPixel(): void {
  if (typeof window === "undefined") return;
  if (window.__pixelReady) return;
  window.__pixelReady = true;

  // Marca o PageView inicial como já disparado (index.html fez isso)
  lastFired["PageView"] = Date.now();

  // Listener global: qualquer link com checkout / pay / cakto → InitiateCheckout
  document.addEventListener("click", (e) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href") ?? "";
    if (/checkout|pay|cakto/i.test(href)) {
      trackInitiateCheckout();
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// trackPageView()
// Dispara a cada troca de rota SPA (nunca no carregamento inicial).
// ─────────────────────────────────────────────────────────────────────────────
export function trackPageView(): void {
  if (typeof window.fbq === "undefined") return;
  if (!canFire("PageView")) return;
  window.fbq("track", "PageView");
}

// ─────────────────────────────────────────────────────────────────────────────
// trackInitiateCheckout()
// Disparado nos botões CTA e em links de checkout detectados automaticamente.
// ─────────────────────────────────────────────────────────────────────────────
export function trackInitiateCheckout(): void {
  if (typeof window.fbq === "undefined") return;
  if (!canFire("InitiateCheckout")) return;
  window.fbq("track", "InitiateCheckout");
}

// ─────────────────────────────────────────────────────────────────────────────
// trackPurchase()
// Disparado somente em /obrigado, /success ou /purchase.
// ─────────────────────────────────────────────────────────────────────────────
export function trackPurchase(value: number = 0): void {
  if (typeof window.fbq === "undefined") return;
  if (!canFire("Purchase")) return;
  window.fbq("track", "Purchase", { currency: "BRL", value });
}

// ─────────────────────────────────────────────────────────────────────────────
// usePixelTracking()
// Hook SPA com Wouter: detecta trocas de rota e dispara os eventos corretos.
// • Primeiro render → só verifica Purchase (PageView já veio do HTML)
// • Navegações SPA → PageView + verifica Purchase
// ─────────────────────────────────────────────────────────────────────────────
export function usePixelTracking(): void {
  const [location] = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Se o usuário caiu direto em /obrigado, dispara Purchase
      if (/obrigado|success|purchase/i.test(location)) {
        const params = new URLSearchParams(window.location.search);
        const raw = params.get("value") ?? params.get("valor") ?? "0";
        trackPurchase(parseFloat(raw) || 0);
      }
      return;
    }
    // Navegação SPA → PageView
    trackPageView();
    // Verifica rota de compra confirmada
    if (/obrigado|success|purchase/i.test(location)) {
      const params = new URLSearchParams(window.location.search);
      const raw = params.get("value") ?? params.get("valor") ?? "0";
      trackPurchase(parseFloat(raw) || 0);
    }
  }, [location]);
}

// ─────────────────────────────────────────────────────────────────────────────
// COMO ADICIONAR NOVOS EVENTOS
//   window.fbq("track", "ViewContent");
//   window.fbq("track", "AddToCart", { currency: "BRL", value: 10 });
//   window.fbq("track", "Lead");
//
// COMO TESTAR NO META EVENTS MANAGER
//   1. Publique o app (Deploy)
//   2. business.facebook.com → Events Manager → Test Events
//   3. Cole a URL publicada → navegue → eventos aparecem em tempo real
//
// COMO VALIDAR InitiateCheckout e Purchase
//   InitiateCheckout → clique em qualquer botão CTA
//   Purchase         → acesse /obrigado?value=10
// ─────────────────────────────────────────────────────────────────────────────
