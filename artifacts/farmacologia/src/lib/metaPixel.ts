// ─────────────────────────────────────────────────────────────────────────────
// Meta Pixel — Integração SPA para React + Wouter
// Pixel ID: 993672840078117
//
// O código base do pixel (init + PageView inicial) está no index.html.
// Este módulo gerencia apenas:
//   - PageView em trocas de rota SPA
//   - InitiateCheckout nos botões de compra
//   - Purchase automático por URL com valor dinâmico por plano
//   - Deduplicação de eventos
//   - Listener global de checkout
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

// ─── Valores dos planos ────────────────────────────────────────────────────────
const PLAN_VALUES: Record<string, number> = {
  essencial: 10.00,
  completo:  25.00,
  "1":       10.00,
  "2":       25.00,
};

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
// Valor dinâmico lido de ?plano=essencial|completo|1|2 ou ?value=XX
export function trackPurchase(value?: number): void {
  if (typeof window.fbq !== "function") return;
  if (isDuplicate("Purchase")) return;
  const resolvedValue = value ?? resolvePurchaseValue();
  window.fbq("track", "Purchase", {
    value: resolvedValue,
    currency: "BRL",
    content_name: "Farmacologia em Mapas Mentais",
  });
}

function resolvePurchaseValue(): number {
  try {
    const params = new URLSearchParams(window.location.search);

    // ?plano=essencial|completo|1|2
    const plano = params.get("plano") ?? params.get("plan") ?? params.get("produto");
    if (plano && PLAN_VALUES[plano.toLowerCase()] !== undefined) {
      return PLAN_VALUES[plano.toLowerCase()];
    }

    // ?value=10.00
    const rawValue = params.get("value") ?? params.get("valor");
    if (rawValue) {
      const parsed = parseFloat(rawValue);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
  } catch {
    // silently ignore param parsing errors
  }
  return 0;
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
const PURCHASE_URL_PATTERN = /obrigado|success|purchase|confirmado|aprovado/i;

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
// COMO TESTAR:
//   1. Instale "Meta Pixel Helper" no Chrome
//   2. Acesse a URL publicada (não o preview do Replit)
//   3. Helper deve mostrar: Pixel ID 993672840078117 + PageView
//   4. Clique num botão de compra → InitiateCheckout
//   5. Acesse /?plano=essencial na URL de obrigado → Purchase value=10.00
//      Acesse /?plano=completo na URL de obrigado  → Purchase value=25.00
//
// CONFIGURAR REDIRECT NO CAKTO:
//   Plano Essencial → https://seudominio.com/obrigado?plano=essencial
//   Plano Completo  → https://seudominio.com/obrigado?plano=completo
// ─────────────────────────────────────────────────────────────────────────────
