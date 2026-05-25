// ─────────────────────────────────────────────────────────────────────────────
// META PIXEL — Implementação profissional para React SPA
// Pixel ID : 993672840078117
// Stack    : React + TypeScript + Wouter
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

const PIXEL_ID = "993672840078117";

// ── Tipagem ───────────────────────────────────────────────────────────────────
type FbqFn = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq: FbqFn;
    _fbq: FbqFn;
  }
}

// ── Anti-duplicação: impede inicialização dupla (React Strict Mode safe) ──────
let pixelLoaded = false;

// ── Deduplicação de eventos: bloqueia o mesmo evento em < 2 segundos ──────────
const lastFired: Record<string, number> = {};

function canFire(eventName: string): boolean {
  const now = Date.now();
  const last = lastFired[eventName] ?? 0;
  if (now - last < 2000) return false;
  lastFired[eventName] = now;
  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// initPixel()
// Cria o stub fbq e injeta fbevents.js da Meta dinamicamente.
// Chama init + primeiro PageView.
// Seguro para chamada dupla (React Strict Mode).
// ─────────────────────────────────────────────────────────────────────────────
export function initPixel(): void {
  if (pixelLoaded || typeof window === "undefined") return;
  pixelLoaded = true;

  // Cria o stub fbq idêntico ao snippet oficial da Meta
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    } as FbqFn;

    fbq.push    = fbq;
    fbq.loaded  = true;
    fbq.version = "2.0";
    fbq.queue   = [];

    window.fbq  = fbq;
    window._fbq = fbq;
  }

  // Injeta fbevents.js de forma assíncrona
  const script = document.createElement("script");
  script.async = true;
  script.src   = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  // Init + PageView inicial (ficam na fila até fbevents.js carregar)
  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
  lastFired["PageView"] = Date.now();

  // Fallback noscript (acessibilidade / navegadores sem JS)
  const noscript = document.createElement("noscript");
  const img = document.createElement("img");
  img.height = 1;
  img.width  = 1;
  img.style.display = "none";
  img.src = `https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`;
  noscript.appendChild(img);
  document.body.prepend(noscript);

  // Listener global: detecta automaticamente cliques em links de checkout
  // Dispara InitiateCheckout em qualquer href que contenha checkout / pay / cakto
  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement).closest("a");
    if (!target) return;
    const href = target.getAttribute("href") ?? "";
    if (/checkout|pay|cakto/i.test(href)) {
      trackInitiateCheckout();
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// trackPageView()
// Dispara a cada troca de rota SPA.
// Deduplicado: ignora chamadas repetidas em menos de 2 segundos.
// ─────────────────────────────────────────────────────────────────────────────
export function trackPageView(): void {
  if (typeof window.fbq === "undefined") return;
  if (!canFire("PageView")) return;
  window.fbq("track", "PageView");
}

// ─────────────────────────────────────────────────────────────────────────────
// trackInitiateCheckout()
// Disparado nos botões CTA e nos links de checkout automaticamente.
// ─────────────────────────────────────────────────────────────────────────────
export function trackInitiateCheckout(): void {
  if (typeof window.fbq === "undefined") return;
  if (!canFire("InitiateCheckout")) return;
  window.fbq("track", "InitiateCheckout");
}

// ─────────────────────────────────────────────────────────────────────────────
// trackPurchase()
// Disparado somente na rota /obrigado, /success ou /purchase.
// ─────────────────────────────────────────────────────────────────────────────
export function trackPurchase(value: number = 0): void {
  if (typeof window.fbq === "undefined") return;
  if (!canFire("Purchase")) return;
  window.fbq("track", "Purchase", { currency: "BRL", value });
}

// ─────────────────────────────────────────────────────────────────────────────
// usePixelTracking()
// Hook SPA: detecta troca de rota via Wouter e dispara os eventos corretos.
// Primeiro render: ignora PageView (já disparado em initPixel).
// Navegações seguintes: dispara PageView.
// Purchase: dispara sempre que a rota for /obrigado, /success ou /purchase.
// ─────────────────────────────────────────────────────────────────────────────
export function usePixelTracking(): void {
  const [location] = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Verifica Purchase no carregamento direto de /obrigado
      if (/obrigado|success|purchase/i.test(location)) {
        const params = new URLSearchParams(window.location.search);
        const raw    = params.get("value") ?? params.get("valor") ?? "0";
        trackPurchase(parseFloat(raw) || 0);
      }
      return;
    }

    // Navegação SPA → novo PageView
    trackPageView();

    // Verifica se navegou para rota de compra confirmada
    if (/obrigado|success|purchase/i.test(location)) {
      const params = new URLSearchParams(window.location.search);
      const raw    = params.get("value") ?? params.get("valor") ?? "0";
      trackPurchase(parseFloat(raw) || 0);
    }
  }, [location]);
}

// ─────────────────────────────────────────────────────────────────────────────
// COMO ADICIONAR NOVOS EVENTOS
// ─────────────────────────────────────────────────────────────────────────────
// window.fbq("track", "ViewContent");
// window.fbq("track", "AddToCart", { currency: "BRL", value: 10 });
// window.fbq("track", "Lead");
//
// COMO TESTAR NO META EVENTS MANAGER
// 1. Publique o app (Deploy no Replit)
// 2. Acesse business.facebook.com → Events Manager → Test Events
// 3. Cole a URL publicada e navegue
// 4. Os eventos aparecem em tempo real na aba Test Events
//
// COMO VALIDAR InitiateCheckout e Purchase
// InitiateCheckout → clique em qualquer botão CTA da página
// Purchase         → acesse a URL publicada com /obrigado?value=10
// ─────────────────────────────────────────────────────────────────────────────
