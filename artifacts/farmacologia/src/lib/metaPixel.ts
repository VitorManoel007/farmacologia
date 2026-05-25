// ─────────────────────────────────────────────────────────────────────────────
// Meta Pixel — Implementação simples e estável
// Pixel ID: 993672840078117
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

// PageView — dispara no carregamento e em cada troca de rota SPA
export function trackPageView(): void {
  if (typeof window.fbq !== "function") return;
  window.fbq("track", "PageView");
}

// InitiateCheckout — chamado via onClick nos botões de compra
export function trackInitiateCheckout(): void {
  if (typeof window.fbq !== "function") return;
  window.fbq("track", "InitiateCheckout", { currency: "BRL" });
}

// Purchase — chamado quando a URL indica página de obrigado/sucesso
export function trackPurchase(value: number): void {
  if (typeof window.fbq !== "function") return;
  window.fbq("track", "Purchase", { value, currency: "BRL" });
}

// ─────────────────────────────────────────────────────────────────────────────
// COMO ADICIONAR NOVOS EVENTOS:
//   export function trackViewContent(): void {
//     if (typeof window.fbq !== "function") return;
//     window.fbq("track", "ViewContent", { currency: "BRL" });
//   }
//
// COMO TESTAR NO META EVENTS MANAGER:
//   1. Instale "Meta Pixel Helper" no Chrome
//   2. Acesse a URL publicada (não o preview do Replit)
//   3. PageView    → aparece ao carregar qualquer página
//   4. InitiateCheckout → clique em "LIBERAR MEU ACESSO" ou "LIBERAR MEU ACESSO COMPLETO"
//   5. Purchase    → acesse uma URL com "obrigado", "success" ou "purchase"
//      Ex: https://seusite.com/obrigado?value=10
// ─────────────────────────────────────────────────────────────────────────────
