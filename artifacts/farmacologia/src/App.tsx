import { useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initPixel, setupSpaTracking, checkPurchaseUrl } from "@/lib/metaPixel";
import { motion } from "framer-motion";
import { Check, CheckCircle2, ShieldCheck, Lock, Mail, CreditCard, Headphones, Star, AlertTriangle, Zap, Clock, Target, Brain, Shield } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import heroImg from "@assets/magnific__criar-mockup-simples-e-altamente-conversor-para-um___1779671297483.png";
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
import testimonialImg1 from "@assets/63b82082514d9837a3df276e1b356bba_1778950811652.jpg";
import testimonialImg2 from "@assets/baixados_1778950811652.png";
import testimonialImg3 from "@assets/346e0250a7bd4237d89e210dd9f60c71_1778950811653.jpg";
import testimonialImg4 from "@assets/917467dffbdfecc9d25e166ccfb23d6b_1778950811653.jpg";
import resultsImg from "@assets/Captura_de_tela_2026-05-15_094946_1778858131817.png";
import painImg from "@assets/Captura_de_tela_2026-05-15_095003_1778858131817.png";
import idealImg from "@assets/Captura_de_tela_2026-05-15_095040_1778858131817.png";

const queryClient = new QueryClient();

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const scrollToOfertas = () => {
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
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(182,255,59,0.08)] pointer-events-none" />
          </div>

          <div className="px-6 pt-7 pb-12 relative">
            {/* Subtle glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-primary/6 blur-3xl pointer-events-none" />

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
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-start gap-2.5"
                  >
                    <span className="text-base shrink-0">✅</span>
                    <span className="text-sm font-medium">{benefit}</span>
                  </motion.div>
                ))}
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
                { emoji: "📄", pain: "PDFs gigantes sem fim" },
                { emoji: "⏳", pain: "Revisão que leva horas" },
                { emoji: "😰", pain: "Ansiedade na véspera da prova" },
                { emoji: "🤯", pain: "Conteúdo demais pra decorar" },
                { emoji: "💊", pain: "Nomes de fármacos impossíveis" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  whileHover={{ scale: 1.02, borderColor: "rgba(182,255,59,0.3)" }}
                  className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 cursor-default transition-colors"
                >
                  <span className="text-2xl shrink-0">{item.emoji}</span>
                  <span className="text-sm font-semibold text-white">{item.pain}</span>
                </motion.div>
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
                    <img src={item.img} alt={item.label} className="w-full h-full object-contain" />
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
               <img src={beforeAfterImg} alt="Comparação" className="w-full max-w-sm object-contain drop-shadow-xl" />
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
          {/* subtle background pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <FadeIn className="relative z-10">
            <h2 className="font-display text-4xl sm:text-5xl font-black leading-[0.95] uppercase mb-6">
              VOCÊ NÃO ESTÁ CANSADO DE ESTUDAR… <br/>
              VOCÊ ESTÁ CANSADO DE <br/>
              <span className="underline decoration-white decoration-4 underline-offset-4">ESQUECER TUDO</span>
            </h2>

            <div className="grid grid-cols-1 gap-2 mb-8 text-left max-w-xs mx-auto">
              {[
                "📚 Horas lendo. PDFs gigantes.",
                "😤 Nomes impossíveis de decorar.",
                "😰 Revisão sem fim, sem fixar.",
                "🧠 Na prova… branco total.",
              ].map((item, i) => (
                <p key={i} className="text-sm font-semibold opacity-95 bg-white/10 rounded-lg px-4 py-2.5">{item}</p>
              ))}
            </div>
            <p className="text-sm font-bold opacity-90 mb-8">O problema não é você. É a forma de estudar.</p>

            <CTAButton onClick={scrollToOfertas} className="!bg-[#0D0F1C] !text-primary hover:!bg-black shadow-[0_4px_14px_rgba(0,0,0,0.3)] border-2 border-[#0D0F1C]">
              QUERO MUDAR MINHA FORMA DE ESTUDAR
            </CTAButton>
          </FadeIn>
        </section>

        {/* BLOCO 07 — OFERTAS (dark navy) */}
        <section id="ofertas" className="px-6 py-14 bg-background">
          <FadeIn>
            <div className="text-center mb-10">
              <CountdownTimer />
              <h2 className="font-display text-5xl font-black leading-none uppercase mb-3">
                ESCOLHA O MELHOR <br/>
                <span className="text-primary">PLANO PARA VOCÊ</span>
              </h2>
              <p className="text-muted-foreground text-sm font-medium">
                Acesso imediato no e-mail • Pagamento único • Sem mensalidades
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* CARD 1 — COMBO ESSENCIAL */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="mb-4 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Plano</span>
                  <h3 className="font-display text-4xl font-black uppercase leading-none text-white">ESSENCIAL</h3>
                </div>

                {/* Imagem do produto */}
                <div className="flex justify-center mb-4">
                  <img src={comboEssencialImg} alt="Kit Essencial de Farmacologia" className="w-full max-w-xs object-contain drop-shadow-xl" />
                </div>

                {/* Benefícios */}
                <ul className="space-y-3 mb-6">
                  {[
                    "+110 mapas mentais de medicamentos completos",
                    "Antirretrovirais, Anticancerígenos e Antidiabéticos",
                    "Mecanismo de ação, dose e contraindicações",
                    "Revise qualquer medicamento em menos de 2 minutos",
                    "PDF otimizado para celular e tablet",
                    "Link no e-mail logo após a confirmação"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[15px] font-medium text-white">
                      <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-primary" strokeWidth={4} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Preço abaixo dos benefícios em verde */}
                <div className="border-t border-border pt-5 mb-6 text-center">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">De <span className="line-through text-gray-500">R$ 47,00</span> por apenas</p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-xl font-bold text-primary">R$</span>
                    <span className="font-display text-6xl font-black leading-none text-primary">10,00</span>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground mt-1">Pagamento único • Acesso imediato • Atualizações inclusas</p>
                </div>

                <a href="https://pay.cakto.com.br/3asoehq_887420" target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-secondary hover:bg-secondary/80 text-white font-bold min-h-14 h-auto py-4 rounded-xl uppercase tracking-wide border border-border whitespace-normal leading-tight text-center">
                    LIBERAR MEU ACESSO
                  </Button>
                </a>
              </div>

              {/* CARD 2 — COMBO COMPLETO */}
              <div className="bg-card border-2 border-primary rounded-2xl p-6 relative shadow-[0_0_30px_rgba(182,255,59,0.25)] mt-4">
                {/* Badge topo */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <div className="bg-destructive text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 shadow-md">
                    🔥 MAIS VENDIDO
                  </div>
                </div>

                {/* Título destaque */}
                <div className="mt-4 mb-4 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">Plano</span>
                  <h3 className="font-display text-4xl font-black uppercase leading-none text-primary">COMPLETO</h3>
                </div>

                {/* Imagem do kit */}
                <div className="flex justify-center mb-4">
                  <img src={comboCompletoImg} alt="Kit Completo de Farmacologia" className="w-full max-w-xs object-contain drop-shadow-xl" />
                </div>

                {/* Benefícios */}
                <ul className="space-y-3 mb-6">
                  {[
                    "Tudo do Combo Essencial",
                    "Guia de Antimicrobianos",
                    "Psicofármacos",
                    "Urgência e Emergência",
                    "Resumos Clínicos",
                    "Tabelas rápidas",
                    "Biblioteca ampliada",
                    "Materiais extras",
                    "Conteúdo avançado"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[15px] font-medium text-white">
                      <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-primary" strokeWidth={4} />
                      </div>
                      <span className={i === 0 ? "font-bold text-primary" : ""}>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Preço após benefícios */}
                <div className="border-t border-border pt-5 mb-6 text-center">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">De <span className="line-through text-gray-500">R$ 97,00</span> por apenas</p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-xl font-bold text-primary">R$</span>
                    <span className="font-display text-6xl font-black leading-none text-primary">25,00</span>
                  </div>
                  <p className="text-xs font-medium text-muted-foreground mt-1">Pagamento único • Acesso imediato • Atualizações inclusas</p>
                </div>

                <a href="https://pay.cakto.com.br/ers4bn6_887486" target="_blank" rel="noopener noreferrer" className="block">
                  <CTAButton>LIBERAR MEU ACESSO COMPLETO</CTAButton>
                </a>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* BLOCO 08 — FEEDBACKS (white bg) — WhatsApp style */}
        <section className="px-4 py-14 bg-[#0A0C16]">
          <FadeIn>
            <h2 className="font-display text-4xl sm:text-5xl font-black leading-[0.95] uppercase mb-2 text-center text-white">
              O QUE ESTÃO <span className="text-primary">FALANDO</span>
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-8 font-medium">Mais de 20 mil estudantes já utilizam esse material</p>

            {/* WhatsApp-style chat bubbles */}
            <div className="flex flex-col gap-4">
              {[
                { name: "Amanda Ferreira", text: "Gente, consegui revisar antibióticos muito mais rápido com esses mapas 😮 nunca pensei que ia ser tão visual", img: testimonialImg1, time: "19:42" },
                { name: "Mayara Souza", text: "Usei antes da prova e ajudou demais!! Lembrei de mecanismo de ação, efeitos adversos, tudo 🙏", img: testimonialImg2, time: "21:15" },
                { name: "Camila Ramos", text: "Finalmente consegui entender farmacologia sem surtar kkkkk recomendo pra todo mundo da turma", img: testimonialImg3, time: "09:03" },
                { name: "Priscila Alves", text: "Uso nos plantões no hospital. Rápido, prático, cabe no celular. Compra sem medo! 💊", img: testimonialImg4, time: "14:27" },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-end gap-2"
                >
                  <img src={t.img} alt={t.name} className="w-9 h-9 rounded-full object-cover object-top shrink-0 border-2 border-[#2a2d3a]" />
                  <div className="flex-1 max-w-[85%]">
                    <p className="text-[10px] font-bold text-primary mb-1 ml-1">{t.name}</p>
                    <div className="bg-[#1e2030] rounded-2xl rounded-bl-sm px-4 py-3 shadow-md border border-[#2a2d3a]">
                      <p className="text-sm text-white leading-relaxed">{t.text}</p>
                      <p className="text-[10px] text-gray-500 mt-1.5 text-right">{t.time} ✓✓</p>
                    </div>
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
            <img src={garantiaImg} alt="Garantia 7 Dias" className="w-64 h-64 mx-auto mb-6 object-contain drop-shadow-2xl" />

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

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
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

// ─── Hook: rastreia mudanças de rota e evento Purchase automático por URL ─────
function usePixelTracking() {
  useEffect(() => {
    // Inicializa o pixel apenas uma vez (anti-duplicação interna no initPixel)
    initPixel();
    // Configura rastreamento de rotas SPA via history.pushState/replaceState
    setupSpaTracking();
    // Verifica se a URL atual indica uma compra concluída
    checkPurchaseUrl();
  }, []);
}

function App() {
  // Ativa o Meta Pixel no topo da árvore, antes de qualquer render de página
  usePixelTracking();

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
