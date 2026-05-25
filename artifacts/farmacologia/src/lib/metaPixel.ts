// Meta Pixel — Pixel ID: 993672840078117
// Inicialização 100% via TypeScript, sem nenhum script no HTML.

const PIXEL_ID = "993672840078117";

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
  }
}

let initialized = false;

export function initPixel(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  // Cria o stub fbq (mesma lógica do snippet oficial da Meta)
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    } as Window["fbq"];

    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
  }

  // Injeta o script fbevents.js da Meta
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  // Init + primeiro PageView
  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

export function trackPageView(): void {
  if (typeof window.fbq === "undefined") return;
  window.fbq("track", "PageView");
}

export function trackInitiateCheckout(): void {
  if (typeof window.fbq === "undefined") return;
  window.fbq("track", "InitiateCheckout");
}

export function trackPurchase(value: number = 0): void {
  if (typeof window.fbq === "undefined") return;
  window.fbq("track", "Purchase", { currency: "BRL", value });
}
