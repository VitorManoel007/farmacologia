// Meta Pixel — Implementação simples e estável
// Pixel ID: 993672840078117

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export function trackPageView(): void {
  console.log("MetaPixel: PageView fired");
  if (typeof window.fbq === "undefined") return;
  window.fbq("track", "PageView");
}

export function trackInitiateCheckout(): void {
  console.log("MetaPixel: InitiateCheckout fired");
  if (typeof window.fbq === "undefined") return;
  window.fbq("track", "InitiateCheckout");
}

export function trackPurchase(value: number = 0): void {
  console.log("MetaPixel: Purchase fired", value);
  if (typeof window.fbq === "undefined") return;
  window.fbq("track", "Purchase", { currency: "BRL", value });
}

// ─────────────────────────────────────────────────────────────────────────────
// COMO ADICIONAR NOVOS EVENTOS:
//   import { trackViewContent } from "@/lib/metaPixel";
//   window.fbq("track", "ViewContent");
//
// COMO TESTAR:
//   1. Instale "Meta Pixel Helper" no Chrome
//   2. Acesse a URL publicada
//   3. Abra o console — os logs confirmam se as funções executam
//   4. PageView    → ao carregar/navegar
//   5. InitiateCheckout → ao clicar em LIBERAR MEU ACESSO
//   6. Purchase    → acesse a URL com /obrigado?value=10
// ─────────────────────────────────────────────────────────────────────────────
