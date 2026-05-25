import { useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { trackPageView, trackInitiateCheckout, trackPurchase } from "@/lib/metaPixel";
import { motion } from "framer-motion";
import { Check, Lock, Mail, CreditCard, Star, AlertTriangle, Zap, Clock, Target, Brain, Shield } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import heroImg from "@assets/magnific__quero-que-crie-uma-imagem-muito-parecida-img1-s-qu___1779676683806.png";
import carouselImg1 from "@assets/Captura_de_tela_2026-05-15_110029_1778947984603.png";
import carouselImg2 from "@assets/Captura_de_tela_2026-05-15_110103_1778947984604.png";
import carouselImg3 from "@assets/Captura_de_tela_2026-05-15_110126_1778947984604.png";
import carouselImg4 from "@assets/Captura_de_tela_2026-05-15_110140_1778947984604.png";
import carouselImg5 from "@assets/Captura_de_tela_2026-05-15_110531_1778947984605.png";
import carouselImg6 from "@assets/Captura_de_tela_2026-05-15_112259_1778947984605.png";
import benefitsImg from "@assets/Captura_de_tela_2026-05-15_094845_1778858131816.png";
import beforeAfterImg from "@assets/magnific_quero-que-mude-o-tema-que_2989263901-Photoroom_1778947859877.png";
import garantiaImg from "@assets/ea2f6b28975c2ded20e94d7e88c8db5f-Photoroom_1778949445674.png";
import comboCompletoImg from "@assets/magnific_quero-que-voce-mude-o-ult_2989036019-Photoroom_1778949609656.png";
import comboEssencialImg from "@assets/magnific__quero-que-pague-o-elemento-principal-e-retiro-que-___1778949793083.png";
import whatsappLidia from "@assets/IMG_1883-ezremove_1779676478637.png";
import whatsappRafaela from "@assets/WhatsApp_Image_2026-05-25_at_10.08.45-ezremove_1779714798107.png";
import whatsappAlicia from "@assets/IMG_1885-ezremove_1779676478637.png";
import painImgMedicamentos from "@assets/5-Photoroom_1779712544475.png";
import painImgCansado from "@assets/2-Photoroom_1779712544476.png";
import painImgEstresse from "@assets/3_-_Copia-Photoroom_1779712544476.png";
import painImgCerebro from "@assets/4-Photoroom_1779712544475.png";

const queryClient = new QueryClient();

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-5%" }}
    transition={{ duration: 0.3, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const scrollToOfertas = () => {
  trackInitiateCheckout();
  document.getElementById("ofertas")?.scrollIntoView({ behavior: "smooth" });
};

// ─── Countdown Timer — urgência na seção de ofertas ───────────────────────────
function getOrCreateExpiry(): number {
  try {
    const stored = sessionStorage.getItem("oferta_expira");
    if (stored) return Number(stored);
    const expira = Date.now() + 23 * 3600 * 1000 + 47 * 60 * 1000 + 12 * 1000;
    sessionStorage.setItem("oferta_expira", String(expira));
    return expira;
  } catch {
    return Date.now() + 23 * 3600 * 1000 + 47 * 60 * 1000 + 12 * 1000;
  }
}

function CountdownTimer() {
  const [secs, setSecs] = useState(() =>
    Math.max(0, Math.floor((getOrCreateExpiry() - Date.now()) / 1000))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setSecs(Math.max(0, Math.floor((getOrCreateExpiry() - Date.now()) / 1000)));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-1.5 mb-2">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Oferta expira em</span>
      {[h, m, s].map((unit, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="bg-destructive text-white font-black text-sm px-2 py-0.5 rounded-md tabular-nums min-w-[28px] text-center">{unit}</span>
          {i < 2 && <span className="text-destructive font-black text-sm">:</span>}
        </span>
      ))}
    </div>
  );
}

const CTAButton = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <Button 
    onClick={onClick}
    className={`w-full bg-primary hover:bg-[#a3e635] text-[#0D0F1C] font-black text-base min-h-16 h-auto py-4 px-4 rounded-xl uppercase tracking-wide whitespace-normal leading-tight text-center shadow-[0_4px_14px_rgba(182,255,59,0.4)] transition-transform hover:-translate-y-1 active:translate-y-0 ${className}`}
  >
    {children}
  </Button>
);

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05060A] text-white font-sans flex justify-center">
      {/* Mobile App Container */}
      <div className="w-full max-w-[430px] bg-background relative shadow-2xl overflow-x-hidden">
        
        {/* TOP BAR */}
        <div className="bg-destructive w-full py-1.5 px-4 text-center">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            OFERTA LIBERADA HOJE — ACESSO IMEDIATO NO E-MAIL
          </p>
        </div>

        {/* BLOCO 01 — HERO */}
        <section className="bg-background relative overflow-hidden">
          {/* Hero image full-width with green glow overlay */}
          <div className="relative w-full">
            <img
              src={heroImg}
              alt="Estudante revisando farmacologia com mapas mentais"
              className="w-full object-cover object-center"
              style={{ maxHeight: 380 }}
              fetchPriority="high"
              decoding="sync"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
          </div>

          <div className="px-6 pt-7 pb-12 relative">

            <FadeIn>
              <h1 className="font-display text-4xl sm:text-5xl font-black leading-[1.05] mb-4">
                Farmacologia não é difícil.
                <span className="text-primary block mt-1">Difícil é esquecer tudo depois de horas estudando.</span>
              </h1>

              <p className="text-muted-foreground text-[15px] leading-relaxed mb-6">
                Mapas mentais visuais criados para revisar mais rápido e memorizar farmacologia sem sofrer com PDFs gigantes.
              </p>

              <div className="space-y-3 mb-7">
                {[
                  "Revisão rápida antes da prova",
                  "Memorize visualmente",
                  "PDFs organizados e simples",
                  "Acesso imediato no celular"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-base shrink-0">✅</span>
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center mb-3">
                <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/40 rounded-full px-4 py-2">
                  <span className="text-xs font-bold text-white/70 uppercase tracking-widest">por apenas</span>
                  <span className="font-display text-2xl font-black text-primary leading-none">R$10</span>
                </div>
              </div>
              <CTAButton onClick={scrollToOfertas}>QUERO REVISAR MAIS RÁPIDO</CTAButton>

              <p className="text-center text-xs text-muted-foreground font-medium mt-3">
                Mais de 20 mil estudantes já usam esse material.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* BLOCO 01B — IDENTIFICAÇÃO (pain cards) */}
        <section className="px-6 py-12 bg-[#0A0C16]">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl font-black leading-[1.1] mb-8">
              Você não está cansado de estudar…
              <span className="text-destructive block mt-1">está cansado de esquecer tudo.</span>
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {[
                { img: painImgMedicamentos, pain: "PDFs gigantes sem fim" },
                { img: painImgCansado,      pain: "Revisão que leva horas" },
                { img: painImgEstresse,     pain: "Ansiedade na véspera da prova" },
                { img: painImgCerebro,      pain: "Conteúdo demais pra decorar" },
                { img: painImgMedicamentos, pain: "Nomes de fármacos impossíveis" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3"
                >
                  <img src={item.img} alt="" className="w-32 h-32 shrink-0 object-contain" />
                  <span className="text-sm font-semibold text-white">{item.pain}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-primary/10 border border-primary/30 px-5 py-4 text-center">
              <p className="text-primary font-black text-[15px] leading-snug">
                "Finalmente achei um jeito mais fácil de revisar farmacologia."
              </p>
            </div>
          </FadeIn>
        </section>

        {/* BLOCO 02 — VISUALIZAÇÃO DO MATERIAL (white bg) */}
        <section className="py-12 bg-white text-[#0D0F1C] overflow-hidden">
          <div className="px-6 mb-8">
            <FadeIn>
              <h2 className="font-display text-4xl sm:text-5xl font-black leading-none uppercase mb-4">
                VEJA COMO SÃO OS <br/>
                <span className="text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">MAPAS MENTAIS</span>
              </h2>
              <p className="text-gray-600 text-sm font-medium">
                Mais de 110 páginas desenvolvidas para transformar conteúdos difíceis em revisões rápidas e intuitivas.
              </p>
            </FadeIn>
          </div>

          <div className="w-full mb-8">
            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-6 pr-6 gap-4 pb-4">
              {[
                { label: "Abacavir — Antirretroviral", img: carouselImg1 },
                { label: "Abiraterona — Anticancerígeno", img: carouselImg2 },
                { label: "Acarbosa — Antidiabético", img: carouselImg3 },
                { label: "Aceclofenac — Anti-inflamatório", img: carouselImg4 },
                { label: "Acetazolamida — Diurético", img: carouselImg5 },
                { label: "Ácido Ascórbico — Vitamina C", img: carouselImg6 },
              ].map((item, i) => (
                <div key={i} className="snap-center shrink-0 w-[220px] flex flex-col gap-2">
                  <div className="w-[220px] h-[220px] rounded-xl bg-white overflow-hidden shadow-md border border-gray-200 flex items-center justify-center">
                    <img src={item.img} alt={item.label} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                  </div>
                  <h3 className="font-semibold text-xs text-center text-gray-700 px-1 leading-snug">{item.label}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6">
            <FadeIn>
              <CTAButton onClick={scrollToOfertas}>QUERO ESTUDAR ASSIM</CTAButton>
            </FadeIn>
          </div>
        </section>

        {/* BLOCO 03 — BENEFÍCIOS (dark navy bg) */}
        <section className="px-6 py-14 bg-background">
          <FadeIn>
            <h2 className="font-display text-4xl sm:text-5xl font-black leading-none uppercase mb-8 text-center">
              O QUE VAI MUDAR NA SUA <br/>
              <span className="text-primary">ROTINA DE ESTUDOS</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { icon: Zap, title: "APRENDA MAIS RÁPIDO", text: "Mecanismos de ação sem decorar páginas inteiras." },
                { icon: Clock, title: "REVISE EM MINUTOS", text: "Prova, plantão ou estágio — revisão rápida onde precisar." },
                { icon: Target, title: "MAIS CLAREZA", text: "Conteúdo simples, visual e direto ao ponto." },
                { icon: Brain, title: "MENOS CONFUSÃO", text: "Pare de misturar nomes, classes e indicações." },
                { icon: Shield, title: "MAIS SEGURANÇA", text: "Chegue nas provas sabendo cada medicamento." },
                { icon: Target, title: "FOCO TOTAL", text: "Sem textos gigantes. Só o que importa." }
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-[15px] mb-1.5 uppercase">{item.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <CTAButton onClick={scrollToOfertas}>QUERO MEMORIZAR MAIS RÁPIDO</CTAButton>
          </FadeIn>
        </section>

        {/* BLOCO 04 — COMPARAÇÃO (white bg) */}
        <section className="px-6 py-14 bg-white text-[#0D0F1C]">
          <FadeIn>
            <h2 className="font-display text-4xl font-black leading-none uppercase mb-8 text-center">
              VEJA A DIFERENÇA <br/>
              <span className="text-destructive">SEM O MATERIAL</span> E <br/>
              <span className="text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">COM O MATERIAL</span>
            </h2>

            <div className="w-full mb-8 flex items-center justify-center">
               <img src={beforeAfterImg} alt="Comparação" className="w-full max-w-sm object-contain drop-shadow-xl" loading="lazy" decoding="async" />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                <h3 className="text-destructive font-black uppercase text-lg flex items-center gap-2 mb-4">
                  <span className="text-xl">❌</span> SEM O MATERIAL
                </h3>
                <ul className="space-y-3">
                  {[
                    "Confunde beta-bloqueador com bloqueador de canal de cálcio",
                    "Decora mecanismo hoje, esquece amanhã",
                    "Perde tempo relendo a mesma apostila 5 vezes",
                    "Na prova, mistura indicação com contraindicação",
                    "Horas estudando farmacologia sem sentir evolução"
                  ].map((item, i) => (
                    <li key={i} className="text-sm font-medium text-gray-700 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                <h3 className="text-[#0D0F1C] font-black uppercase text-lg flex items-center gap-2 mb-4">
                  <span className="text-xl">✅</span> COM O MATERIAL
                </h3>
                <ul className="space-y-3">
                  {[
                    "Diferencia classes farmacológicas pelo mapa visual",
                    "Revisão de um medicamento completo em 2 minutos",
                    "Associa mecanismo de ação com efeito adverso facilmente",
                    "Chega na prova sabendo indicação, dose e contraindicação",
                    "Estuda menos tempo com muito mais fixação"
                  ].map((item, i) => (
                    <li key={i} className="text-sm font-medium text-gray-800 flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* BLOCO 05 — RESULTADO (dark navy bg) */}
        <section className="px-6 py-14 bg-background">
          <FadeIn className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
            
            <div className="inline-flex items-center gap-1.5 bg-secondary/50 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-6 border border-border text-primary">
              <Star className="w-3.5 h-3.5 fill-current" /> RESULTADO REAL
            </div>

            <h2 className="font-display text-4xl font-black leading-none uppercase mb-6">
              VOCÊ VAI SENTIR A <br/>
              <span className="underline decoration-primary decoration-4 underline-offset-4">DIFERENÇA LOGO NOS PRIMEIROS ESTUDOS</span>
            </h2>

            <ul className="space-y-4 mb-8">
              {[
                "Memoriza mecanismos farmacológicos mais rápido",
                "Entende classes medicamentosas sem decorar",
                "Revisões de conteúdos em poucos minutos",
                "Aprende de forma visual e prática",
                "Mais segurança para provas e estágios",
                "Organização mental muito mais eficiente",
                "Menos ansiedade antes das avaliações"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_8px_rgba(182,255,59,0.3)]">
                    <Check className="w-3.5 h-3.5 text-[#0D0F1C]" strokeWidth={3} />
                  </div>
                  <span className="text-[15px] font-medium leading-tight">{item}</span>
                </li>
              ))}
            </ul>

            <CTAButton onClick={scrollToOfertas}>QUERO ACESSO IMEDIATO</CTAButton>
          </FadeIn>
        </section>

        {/* BLOCO 06 — DOR (red background #FF3B3B) */}
        <section className="px-6 py-16 bg-destructive text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <FadeIn className="relative z-10">
            <p className="font-display text-4xl sm:text-5xl font-black uppercase leading-[0.95]">
              Pare de sofrer com<br/>
              <span className="underline decoration-white decoration-4 underline-offset-4">farmacologia hoje.</span>
            </p>
          </FadeIn>
        </section>

        {/* BLOCO 07 — OFERTAS (dark navy) */}
        <section id="ofertas" className="px-6 py-14 bg-background">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="font-display text-5xl font-black leading-none uppercase mb-3">
                ESCOLHA O MELHOR <br/>
                <span className="text-primary">PLANO PARA VOCÊ</span>
              </h2>
              <p className="text-muted-foreground text-sm font-medium">
                Acesso imediato no e-mail • Pagamento único • Sem mensalidades
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {/* CARD 1 — ESSENCIAL */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="mb-5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Plano</span>
                  <h3 className="font-display text-3xl font-black uppercase leading-none text-white mt-0.5">ESSENCIAL</h3>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {[
                    "+110 mapas mentais farmacológicos",
                    "Revisão rápida antes da prova",
                    "PDFs organizados e simples",
                    "Acesso imediato no celular",
                    "Atualizações inclusas",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[14px] font-medium text-white/90">
                      <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={3} />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-5 mb-5">
                  <p className="text-xs text-muted-foreground mb-1">
                    De <span className="line-through">R$47</span> por apenas
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-lg font-bold text-primary">R$</span>
                    <span className="font-display text-5xl font-black leading-none text-primary">10</span>
                    <span className="text-lg font-bold text-primary mb-1">,00</span>
                  </div>
                </div>

                <a href="https://pay.cakto.com.br/3asoehq_887420" target="_blank" rel="noopener noreferrer" className="block" onClick={() => trackInitiateCheckout()}>
                  <Button className="w-full bg-secondary hover:bg-secondary/80 text-white font-black min-h-14 h-auto py-4 rounded-xl uppercase tracking-wide border border-border text-sm">
                    LIBERAR MEU ACESSO
                  </Button>
                </a>
                <p className="text-center text-[11px] text-muted-foreground mt-2.5">
                  Acesso imediato após a compra · Pagamento único · Funciona no celular e tablet
                </p>
              </div>

              {/* CARD 2 — COMPLETO */}
              <div className="bg-card border-2 border-primary rounded-2xl p-6 relative shadow-[0_0_24px_rgba(182,255,59,0.15)]">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-destructive text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                    🔥 MAIS VENDIDO
                  </span>
                </div>

                <div className="mb-5 mt-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Plano</span>
                  <h3 className="font-display text-3xl font-black uppercase leading-none text-primary mt-0.5">COMPLETO</h3>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {[
                    { text: "Tudo do plano essencial", highlight: true },
                    { text: "Antimicrobianos" },
                    { text: "Psicofármacos" },
                    { text: "Urgência e emergência" },
                    { text: "Resumos clínicos" },
                    { text: "Biblioteca ampliada" },
                  ].map((item, i) => (
                    <li key={i} className={`flex items-center gap-2.5 text-[14px] font-medium ${item.highlight ? "text-primary font-bold" : "text-white/90"}`}>
                      <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={3} />
                      {item.text}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-5 mb-5">
                  <p className="text-xs text-muted-foreground mb-1">
                    De <span className="line-through">R$97</span> por apenas
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-lg font-bold text-primary">R$</span>
                    <span className="font-display text-5xl font-black leading-none text-primary">25</span>
                    <span className="text-lg font-bold text-primary mb-1">,00</span>
                  </div>
                </div>

                <a href="https://pay.cakto.com.br/ers4bn6_887486" target="_blank" rel="noopener noreferrer" className="block" onClick={() => trackInitiateCheckout()}>
                  <CTAButton>LIBERAR MEU ACESSO COMPLETO</CTAButton>
                </a>
                <p className="text-center text-[11px] text-muted-foreground mt-2.5">
                  Acesso imediato após a compra · Pagamento único · Funciona no celular e tablet
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* BLOCO 08 — FEEDBACKS — WhatsApp screenshots reais */}
        <section className="px-4 py-14 bg-[#0A0C16]">
          <FadeIn>
            <h2 className="font-display text-4xl sm:text-5xl font-black leading-[0.95] uppercase mb-2 text-center text-white">
              O QUE ESTÃO <span className="text-primary">FALANDO</span>
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-8 font-medium">Conversas reais de quem já comprou o material</p>

            <div className="flex flex-col gap-5">
              {[
                { img: whatsappLidia, name: "Lidia", highlight: "chegou tudo certinho no gmail" },
                { img: whatsappRafaela, name: "Rafaela", highlight: "passei nas provas finais" },
                { img: whatsappAlicia, name: "Alicia", highlight: "passei na prova semana passada" },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.12 }}
                  className="relative"
                >
                  {/* Phone frame */}
                  <div className="rounded-[24px] overflow-hidden border-[3px] border-[#2a2d3a] shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-black">
                    <img
                      src={t.img}
                      alt={`Depoimento de ${t.name}`}
                      className="w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  {/* Label abaixo */}
                  <div className="flex items-center justify-center gap-2 mt-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <p className="text-xs text-muted-foreground font-semibold">
                      <span className="text-white">{t.name}</span> — {t.highlight}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <CTAButton onClick={scrollToOfertas}>QUERO ESTUDAR ASSIM TAMBÉM</CTAButton>
            </div>
          </FadeIn>
        </section>

        {/* BLOCO 09 — GARANTIA (dark navy) */}
        <section className="px-6 py-14 bg-background text-center">
          <FadeIn>
            <img src={garantiaImg} alt="Garantia 7 Dias" className="w-64 h-64 mx-auto mb-6 object-contain drop-shadow-2xl" loading="lazy" decoding="async" />

            <h2 className="font-display text-4xl sm:text-5xl font-black leading-none uppercase mb-4">
              TESTE POR <br/>
              <span className="text-primary">7 DIAS SEM RISCO</span>
            </h2>
            
            <p className="text-muted-foreground text-sm font-medium mb-10 leading-relaxed max-w-[320px] mx-auto">
              Se você não gostar do material ou sentir que ele não te ajuda nos estudos, devolvemos 100% do seu dinheiro. Sem burocracia.
            </p>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 mb-10">
              {[
                { icon: Lock, text: "Compra Segura" },
                { icon: Mail, text: "Acesso Imediato" },
                { icon: CreditCard, text: "Pagamento Protegido" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-gray-400">
                  <badge.icon className="w-3.5 h-3.5 text-primary" />
                  {badge.text}
                </div>
              ))}
            </div>

            <CTAButton onClick={scrollToOfertas}>GARANTIR MEU ACESSO AGORA</CTAButton>
          </FadeIn>
        </section>

        {/* BLOCO 10 — FAQ (white bg) */}
        <section className="px-6 py-14 bg-white text-[#0D0F1C]">
          <FadeIn>
            <h2 className="font-display text-4xl font-black leading-none uppercase mb-8 text-center">
              DÚVIDAS FREQUENTES
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "A compra é segura?", a: "Sim. O pagamento é processado em ambiente totalmente protegido e criptografado." },
                { q: "Quando recebo o material?", a: "O acesso chega imediatamente no seu e-mail após a confirmação do pagamento." },
                { q: "O material é físico?", a: "Não. Todo o conteúdo é digital em PDF." },
                { q: "Posso acessar pelo celular?", a: "Sim. Você pode estudar pelo celular, tablet ou computador." },
                { q: "Serve para qual área?", a: "Ideal para estudantes e profissionais da saúde." },
                { q: "O acesso expira?", a: "Não. O acesso é vitalício." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-200">
                  <AccordionTrigger className="text-left font-bold text-[15px] hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 font-medium pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </section>

        {/* FOOTER (dark navy) */}
        <footer className="px-6 py-8 bg-background border-t border-border text-center">
          <p className="text-xs text-muted-foreground font-medium mb-2">
            Farmacologia Mapas Mentais &copy; 2026 | Todos os direitos reservados.
          </p>
          <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500 font-bold uppercase">
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
          </div>
        </footer>

      </div>
    </div>
  );
}

function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#05060A] text-white font-sans flex justify-center">
      <div className="w-full max-w-[430px] bg-background relative shadow-2xl flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 shadow-[0_0_32px_rgba(182,255,59,0.4)]">
          <Check className="w-9 h-9 text-[#0D0F1C]" strokeWidth={3} />
        </div>
        <h1 className="font-display text-4xl font-black uppercase leading-tight mb-4">
          Compra <span className="text-primary">confirmada!</span>
        </h1>
        <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
          Seu acesso foi liberado. Verifique seu e-mail — o material chega em instantes.
        </p>
        <a href="/" className="inline-block">
          <Button className="bg-secondary hover:bg-secondary/80 text-white font-bold uppercase tracking-wide px-8 py-3 rounded-xl">
            Voltar ao início
          </Button>
        </a>
      </div>
    </div>
  );
}

function Router() {
  usePixelTracking();
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/obrigado" component={ThankYouPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[#05060A] flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-400">Página não encontrada</p>
      </div>
    </div>
  );
}

// ─── Hook: SPA tracking simples com Wouter ───────────────────────────────────
// Dispara PageView a cada troca de rota. Verifica Purchase por URL.
function usePixelTracking() {
  const [location] = useLocation();

  useEffect(() => {
    trackPageView();
    if (/obrigado|success|purchase/i.test(location)) {
      const params = new URLSearchParams(window.location.search);
      const raw = params.get("value") ?? params.get("valor") ?? "0";
      const value = parseFloat(raw) || 0;
      trackPurchase(value);
    }
  }, [location]);
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
