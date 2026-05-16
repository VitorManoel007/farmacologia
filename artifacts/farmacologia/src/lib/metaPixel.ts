// ─────────────────────────────────────────────────────────────────────────────
// Meta Pixel — Implementação profissional para React SPA + Wouter
// Pixel ID: 993672840078117
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
    fbqLoaded?: boolean;
  }
}

const PIXEL_ID = "993672840078117";

// ─── Deduplicação: impede múltiplos eventos iguais em menos de 2 segundos ────
const eventTimestamps: Record<string, number> = {};

function isDuplicate(eventName: string): boolean {
  const now = Date.now();
  const last = eventTimestamps[eventName] ?? 0;
  if (now - last < 2000) return true;
  eventTimestamps[eventName] = now;
  return false;
}

// ─── Carregamento dinâmico do script do Facebook Pixel ───────────────────────
export function initPixel(): void {
  // Proteção anti-duplicação: só carrega uma vez
  if (window.fbqLoaded) return;
  window.fbqLoaded = true;

  // Inicializa o stub fbq antes do script carregar (padrão Meta)
  if (typeof window.fbq !== "function") {
    const fbq = function (...args: unknown[]) {
      fbq.callMethod
        ? fbq.callMethod(...args)
        : fbq.queue.push(args);
    } as unknown as {
      (...args: unknown[]): void;
      push: (...args: unknown[]) => void;
      loaded: boolean;
      version: string;
      queue: unknown[][];
      callMethod?: (...args: unknown[]) => void;
    };

    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];

    window.fbq = fbq;
    if (!window._fbq) window._fbq = fbq;
  }

  // Carrega o script de forma assíncrona
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  script.onerror = () => {
    // Fallback silencioso: pixel bloqueado por adblocker
    console.warn("[MetaPixel] Script bloqueado por extensão ou adblocker.");
  };

  const firstScript = document.getElementsByTagName("script")[0];
  firstScript?.parentNode?.insertBefore(script, firstScript);

  // Inicializa o pixel
  window.fbq("init", PIXEL_ID);

  // Dispara PageView no carregamento inicial
  trackPageView();

  // Listener global: detecta automaticamente cliques em links de checkout
  // (URLs contendo: checkout, pay, cakto)
  document.addEventListener("click", handleGlobalCheckoutClick, true);
}

// ─── PageView — dispara no carregamento e a cada troca de rota SPA ───────────
export function trackPageView(): void {
  if (!window.fbq) return;
  if (isDuplicate("PageView")) return;
  window.fbq("track", "PageView");
}

// ─── InitiateCheckout — dispara quando o usuário clica em comprar ─────────────
export function trackInitiateCheckout(): void {
  if (!window.fbq) return;
  if (isDuplicate("InitiateCheckout")) return;
  window.fbq("track", "InitiateCheckout", {
    content_category: "Farmacologia em Mapas Mentais",
    currency: "BRL",
  });
}

// ─── Purchase — dispara quando URL indica conclusão de compra ─────────────────
export function trackPurchase(value?: number): void {
  if (!window.fbq) return;
  if (isDuplicate("Purchase")) return;
  window.fbq("track", "Purchase", {
    value: value ?? 0,
    currency: "BRL",
    content_name: "Farmacologia em Mapas Mentais",
  });
}

// ─── Listener global de checkout ──────────────────────────────────────────────
// Detecta automaticamente cliques em qualquer link/botão de checkout
const CHECKOUT_URL_PATTERN = /checkout|pay|cakto/i;

function handleGlobalCheckoutClick(event: MouseEvent): void {
  const target = event.target as HTMLElement;

  // Sobe na árvore DOM procurando um <a> com href de checkout
  const anchor = target.closest("a");
  if (anchor?.href && CHECKOUT_URL_PATTERN.test(anchor.href)) {
    trackInitiateCheckout();
  }
}

// ─── Rastreamento de rota SPA para Wouter ─────────────────────────────────────
// Wouter usa history.pushState/replaceState — monkeypatch para detectar mudanças
export function setupSpaTracking(): void {
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
  // Pequeno delay para garantir que o DOM atualizou
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

// ─────────────────────────────────────────────────────────────────────────────
// COMO ADICIONAR NOVOS EVENTOS:
//
//   import { trackInitiateCheckout, trackPurchase } from "@/lib/metaPixel";
//
//   // Exemplo: evento customizado
//   window.fbq("trackCustom", "NomeDoEvento", { chave: "valor" });
//
// COMO TESTAR NO META EVENTS MANAGER:
//   1. Acesse: https://business.facebook.com/events_manager
//   2. Selecione o Pixel 993672840078117
//   3. Clique em "Testar Eventos" e insira a URL da página
//   4. Navegue pela página e verifique os eventos em tempo real
//
// VALIDAR InitiateCheckout e Purchase:
//   - Instale a extensão "Meta Pixel Helper" no Chrome
//   - Clique nos botões de compra → deve aparecer "InitiateCheckout"
//   - Acesse uma URL com "obrigado" ou "success" → deve aparecer "Purchase"
// ─────────────────────────────────────────────────────────────────────────────
