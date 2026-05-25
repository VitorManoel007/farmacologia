// ─────────────────────────────────────────────────────────────────────────────
// Meta Pixel — Integração profissional para React + Wouter + TypeScript
// Pixel ID: 993672840078117
//
// ESTRUTURA:
//   - Carregamento dinâmico do script fbevents.js (sem hardcode no HTML)
//   - Tipagem TypeScript completa
//   - Proteção anti-duplicação por evento (janela de 2 segundos)
//   - SPA tracking: monkeypatch em history.pushState/replaceState para Wouter
//   - Listener global de checkout: detecta links com pay|cakto|checkout
//   - Purchase automático por URL: obrigado|success|purchase
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      loaded: boolean;
      version: string;
      push: (...args: unknown[]) => void;
    };
    _fbq: unknown;
  }
}

const PIXEL_ID = "993672840078117";

// ─── Proteção anti-duplicação ─────────────────────────────────────────────────
// Impede múltiplos disparos do mesmo evento em menos de 2 segundos.
const lastFired: Record<string, number> = {};

function isDuplicate(event: string): boolean {
  const now = Date.now();
  if (now - (lastFired[event] ?? 0) < 2000) return true;
  lastFired[event] = now;
  return false;
}

// ─── Carregamento dinâmico do pixel ───────────────────────────────────────────
// Injeta o script fbevents.js em runtime, sem depender do index.html.
// Proteção: não carrega duas vezes (window.fbq já existe).
let pixelLoaded = false;

function loadPixelScript(): void {
  if (pixelLoaded || typeof window === "undefined") return;
  pixelLoaded = true;

  // Inicializa o objeto fbq antes de carregar o script (padrão Meta)
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    } as Window["fbq"];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    if (!window._fbq) window._fbq = fbq;
  }

  // Carrega o script externo de forma assíncrona
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";

  // Fallback: se o script falhar, fbq ainda funciona via queue
  script.onerror = () => {
    console.warn("[MetaPixel] Falha ao carregar fbevents.js. Eventos em fila.");
  };

  const firstScript = document.getElementsByTagName("script")[0];
  firstScript?.parentNode?.insertBefore(script, firstScript);
}

// ─── initPixel() ──────────────────────────────────────────────────────────────
// Inicializa o pixel UMA vez: carrega o script, executa fbq('init') e
// registra os listeners globais (checkout + SPA routing).
// Compatível com React Strict Mode (guard pixelLoaded).
let pixelInitialized = false;

export function initPixel(): void {
  if (pixelInitialized) return;
  pixelInitialized = true;

  loadPixelScript();

  // Aguarda o script carregar antes de chamar init
  const doInit = () => {
    window.fbq("init", PIXEL_ID);
    trackPageView();            // PageView inicial
    setupSpaTracking();         // Monitorar trocas de rota SPA
    setupCheckoutListener();    // Listener global de links de checkout
    checkPurchaseUrl();         // Verificar se URL atual indica compra
  };

  if (typeof window.fbq === "function") {
    doInit();
  } else {
    // Aguarda o script carregar (máx. 5 tentativas × 200ms)
    let attempts = 0;
    const interval = setInterval(() => {
      if (typeof window.fbq === "function") {
        clearInterval(interval);
        doInit();
      } else if (++attempts >= 25) {
        clearInterval(interval);
        console.warn("[MetaPixel] fbq não disponível após timeout.");
      }
    }, 200);
  }
}

// ─── trackPageView() ──────────────────────────────────────────────────────────
// Dispara automaticamente:
//   - no carregamento inicial (chamado pelo initPixel)
//   - em toda troca de rota SPA (chamado pelo setupSpaTracking)
export function trackPageView(): void {
  if (typeof window.fbq !== "function") return;
  if (isDuplicate("PageView")) return;
  window.fbq("track", "PageView");
}

// ─── trackInitiateCheckout() ──────────────────────────────────────────────────
// Dispara nos botões de compra:
//   - CTAButtons que fazem scrollToOfertas (chamada manual)
//   - Links com pay|cakto|checkout (listener global)
export function trackInitiateCheckout(): void {
  if (typeof window.fbq !== "function") return;
  if (isDuplicate("InitiateCheckout")) return;
  window.fbq("track", "InitiateCheckout", {
    content_category: "Farmacologia em Mapas Mentais",
    currency: "BRL",
  });
}

// ─── trackPurchase() ──────────────────────────────────────────────────────────
// Dispara SOMENTE quando a URL contém: obrigado | success | purchase
// Não é chamado em nenhum outro contexto.
export function trackPurchase(value = 0): void {
  if (typeof window.fbq !== "function") return;
  if (isDuplicate("Purchase")) return;
  window.fbq("track", "Purchase", {
    value,
    currency: "BRL",
    content_name: "Farmacologia em Mapas Mentais",
  });
}

// ─── checkPurchaseUrl() ───────────────────────────────────────────────────────
// Verifica a URL atual e dispara Purchase se corresponder ao padrão.
// Chamado no carregamento inicial e em cada troca de rota SPA.
const PURCHASE_PATTERN = /obrigado|success|purchase/i;

export function checkPurchaseUrl(): void {
  if (!PURCHASE_PATTERN.test(window.location.href)) return;
  trackPurchase();
}

// ─── SPA Tracking para Wouter ─────────────────────────────────────────────────
// Wouter usa history.pushState/replaceState sem eventos nativos.
// Monkeypatch intercepta as chamadas e dispara PageView + checkPurchaseUrl.
let spaSetup = false;

function setupSpaTracking(): void {
  if (spaSetup) return;
  spaSetup = true;

  const _pushState = history.pushState.bind(history);
  const _replaceState = history.replaceState.bind(history);

  // Intercepta pushState (navegação normal)
  history.pushState = (...args) => {
    _pushState(...args);
    onRouteChange();
  };

  // Intercepta replaceState (redirect, replace)
  history.replaceState = (...args) => {
    _replaceState(...args);
    onRouteChange();
  };

  // Botão voltar/avançar do browser
  window.addEventListener("popstate", onRouteChange);
}

function onRouteChange(): void {
  // Pequeno delay para garantir que o Wouter já atualizou a URL
  setTimeout(() => {
    trackPageView();
    checkPurchaseUrl();
  }, 100);
}

// ─── Listener global de checkout ──────────────────────────────────────────────
// Detecta automaticamente qualquer clique em links contendo:
//   pay | cakto | checkout
// Dispara InitiateCheckout sem necessidade de instrumentar cada botão.
const CHECKOUT_PATTERN = /pay|cakto|checkout/i;
let checkoutListenerAdded = false;

function setupCheckoutListener(): void {
  if (checkoutListenerAdded) return;
  checkoutListenerAdded = true;

  document.addEventListener(
    "click",
    (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a");
      if (anchor?.href && CHECKOUT_PATTERN.test(anchor.href)) {
        trackInitiateCheckout();
      }
    },
    true // capture phase: captura antes do link ser seguido
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMO ADICIONAR NOVOS EVENTOS:
//
//   import { trackCustomEvent } from "@/lib/metaPixel";
//
//   export function trackCustomEvent(): void {
//     if (typeof window.fbq !== "function") return;
//     if (isDuplicate("CustomEvent")) return;
//     window.fbq("track", "CustomEvent", { /* parâmetros */ });
//   }
//
// COMO TESTAR NO META EVENTS MANAGER:
//   1. Instale "Meta Pixel Helper" no Chrome
//   2. Acesse a URL publicada (não o preview do Replit)
//   3. A extensão deve mostrar: Pixel 993672840078117 + PageView
//   4. Clique em qualquer botão de compra → InitiateCheckout
//   5. No Events Manager: Testar eventos > inserir a URL do site publicado
//
// COMO VALIDAR InitiateCheckout e Purchase:
//   - InitiateCheckout: clique em qualquer botão/link de checkout
//   - Purchase: acesse uma URL contendo "obrigado", "success" ou "purchase"
//     Ex: https://seusite.com/obrigado
//
// CONFIGURAR REDIRECT NO CAKTO (para Purchase):
//   Após a compra → redirecionar para: https://seusite.com/obrigado
// ─────────────────────────────────────────────────────────────────────────────
