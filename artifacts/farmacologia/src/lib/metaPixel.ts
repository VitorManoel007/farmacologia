// ─────────────────────────────────────────────────────────────────────────────
// Meta Pixel — Integração SPA para React + Wouter
// Pixel ID: 993672840078117
//
// O código base do pixel (init + PageView inicial) está no index.html.
// Este módulo gerencia apenas:
//   - PageView em trocas de rota SPA
//   - InitiateCheckout nos botões de compra
//   - Purchase automático por URL
//   - Deduplicação de eventos
//   - Listener global de checkout
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

// ─── Deduplicação: impede múltiplos eventos iguais em menos de 2 segundos ────
const eventTimestamps: Record<string, number> = {};

function isDuplicate(eventName: string): boolean {
  const now = Date.now();
  const last = eventTimestamps[eventName] ?? 0;
  if (now - last < 2000) return true;
  eventTimestamps[eventName] = now;
  return false;
}

// ─── PageView — dispara a cada troca de rota SPA ──────────────────────────────
export function trackPageView(): void {
  if (typeof window.fbq !== "function") return;
  if (isDuplicate("PageView")) return;
  window.fbq("track", "PageView");
}

// ─── InitiateCheckout — dispara no clique em botão de compra ──────────────────
export function trackInitiateCheckout(): void {
  if (typeof window.fbq !== "function") return;
  if (isDuplicate("InitiateCheckout")) return;
  window.fbq("track", "InitiateCheckout", {
    content_category: "Farmacologia em Mapas Mentais",
    currency: "BRL",
  });
}

// ─── Purchase — dispara quando URL indica conclusão de compra ─────────────────
export function trackPurchase(value?: number): void {
  if (typeof window.fbq !== "function") return;
  if (isDuplicate("Purchase")) return;
  window.fbq("track", "Purchase", {
    value: value ?? 0,
    currency: "BRL",
    content_name: "Farmacologia em Mapas Mentais",
  });
}

// ─── Listener global de checkout ──────────────────────────────────────────────
// Detecta automaticamente cliques em qualquer link contendo: pay, cakto, checkout
const CHECKOUT_URL_PATTERN = /checkout|pay|cakto/i;
let checkoutListenerAdded = false;

function handleGlobalCheckoutClick(event: MouseEvent): void {
  const anchor = (event.target as HTMLElement).closest("a");
  if (anchor?.href && CHECKOUT_URL_PATTERN.test(anchor.href)) {
    trackInitiateCheckout();
  }
}

// ─── Rastreamento de rota SPA para Wouter ─────────────────────────────────────
// Wouter usa history.pushState/replaceState — monkeypatch para detectar mudanças
let spaTrackingSetup = false;

export function setupSpaTracking(): void {
  if (spaTrackingSetup) return;
  spaTrackingSetup = true;

  const originalPushState = history.pushState.bind(history);
  const originalReplaceState = history.replaceState.bind(history);

  history.pushState = (...args) => {
    originalPushState(...args);
    onRouteChange();
  };

  history.replaceState = (...args) => {
    originalReplaceState(...args);
    onRouteChange();
  };

  window.addEventListener("popstate", onRouteChange);
}

function onRouteChange(): void {
  setTimeout(() => {
    trackPageView();
    checkPurchaseUrl();
  }, 100);
}

// ─── Purchase automático por URL ──────────────────────────────────────────────
const PURCHASE_URL_PATTERN = /obrigado|success|purchase/i;

export function checkPurchaseUrl(): void {
  if (PURCHASE_URL_PATTERN.test(window.location.href)) {
    trackPurchase();
  }
}

// ─── Inicialização dos listeners (sem re-carregar o pixel do index.html) ──────
export function initPixel(): void {
  if (checkoutListenerAdded) return;
  checkoutListenerAdded = true;
  document.addEventListener("click", handleGlobalCheckoutClick, true);
}

// ─────────────────────────────────────────────────────────────────────────────
// COMO ADICIONAR NOVOS EVENTOS:
//   import { trackInitiateCheckout } from "@/lib/metaPixel";
//   window.fbq("trackCustom", "NomeDoEvento", { chave: "valor" });
//
// COMO TESTAR:
//   1. Instale "Meta Pixel Helper" no Chrome
//   2. Acesse a URL publicada (não o preview do Replit)
//   3. O Helper deve mostrar: Pixel ID 993672840078117 + evento PageView
//   4. Clique num botão de compra → deve aparecer InitiateCheckout
// ─────────────────────────────────────────────────────────────────────────────
