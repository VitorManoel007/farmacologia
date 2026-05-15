import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Check, CheckCircle2, ShieldCheck, Lock, Mail, CreditCard, Headphones, Star, AlertTriangle, Zap, Clock, Target, Brain, Shield } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import heroImg from "@assets/magnific_quero-que-voce-mude-o-ult_2989036019-Photoroom_1778858706667.png";
import carouselImg from "@assets/Captura_de_tela_2026-05-15_094756_1778858131816.png";
import benefitsImg from "@assets/Captura_de_tela_2026-05-15_094845_1778858131816.png";
import beforeAfterImg from "@assets/Captura_de_tela_2026-05-15_094915_1778858131816.png";
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

const CTAButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <Button 
    className={`w-full bg-primary hover:bg-[#a3e635] text-[#0D0F1C] font-black text-lg h-16 rounded-xl uppercase tracking-wide shadow-[0_4px_14px_rgba(182,255,59,0.4)] transition-transform hover:-translate-y-1 active:translate-y-0 ${className}`}
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
        <section className="px-6 pt-10 pb-12 bg-background relative">
          <FadeIn>
            <h1 className="font-display text-5xl sm:text-6xl font-black leading-[0.95] uppercase mb-6">
              +110 PÁGINAS DE <br/>
              <span className="text-primary block">MAPAS MENTAIS</span>
              PARA VOCÊ <br/>
              <span className="text-primary block">MEMORIZAR FARMACOLOGIA</span>
              DE FORMA <br/>
              <span className="text-primary block">PRÁTICA, VISUAL E RÁPIDA</span>
            </h1>
            
            <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
              Pare de perder horas lendo PDFs confusos e esquecendo tudo na prova. Aprenda farmacologia através de mapas mentais organizados visualmente para acelerar sua memorização e facilitar sua revisão clínica.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Organizado por classes farmacológicas",
                "Revisão rápida antes das provas",
                "Conteúdo visual e objetivo",
                "Ideal para medicina, enfermagem e áreas da saúde"
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="w-full mb-8 flex items-center justify-center">
              <img src={heroImg} alt="Mockup do material" className="w-full max-w-[380px] object-contain drop-shadow-2xl" />
            </div>

            <div className="bg-secondary/50 rounded-lg p-4 mb-6 flex items-start gap-3 border border-border">
              <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Receba todos os materiais no mesmo dia diretamente no seu Gmail após a compra.
              </p>
            </div>

            <CTAButton>QUERO A OFERTA</CTAButton>
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
                "Classes Farmacológicas", "Antibióticos", "Anti-inflamatórios", "Psicofármacos", 
                "Urgência e Emergência", "Sistema Nervoso", "Farmacologia Clínica", 
                "Resumos Visuais", "Tabelas de Revisão", "Mecanismos de Ação"
              ].map((item, i) => (
                <div key={i} className="snap-center shrink-0 w-[260px] flex flex-col gap-3">
                  <div className="aspect-[3/4] rounded-xl bg-gray-100 overflow-hidden relative shadow-sm border border-gray-200">
                    <img src={carouselImg} alt={item} className="w-full h-full object-cover opacity-90" />
                  </div>
                  <h3 className="font-bold text-sm text-center">{item}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6">
            <FadeIn>
              <p className="text-gray-600 text-sm text-center font-medium leading-relaxed mb-8 px-2">
                Todos os mapas foram organizados com cores, setas, conexões visuais e estruturas que facilitam a memorização de medicamentos e mecanismos farmacológicos.
              </p>
              <CTAButton>QUERO ESTUDAR ASSIM</CTAButton>
            </FadeIn>
          </div>
        </section>

        {/* BLOCO 03 — BENEFÍCIOS (dark navy bg) */}
        <section className="px-6 py-14 bg-background">
          <FadeIn>
            <h2 className="font-display text-4xl sm:text-5xl font-black leading-none uppercase mb-4 text-center">
              O QUE VAI MUDAR NA SUA <br/>
              <span className="text-primary">ROTINA DE ESTUDOS</span>
            </h2>
            <p className="text-muted-foreground text-center text-sm mb-10 font-medium">
              Chega de estudar por horas e esquecer tudo depois. Agora você aprende visualmente e revisa em minutos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { icon: Zap, title: "APRENDA MAIS RÁPIDO", text: "Visualize mecanismos de ação e memorize medicamentos sem precisar decorar páginas enormes." },
                { icon: Clock, title: "REVISE EM MINUTOS", text: "Ideal para revisar antes da prova, plantão ou estágio sem perder tempo." },
                { icon: Target, title: "ESTUDE COM MAIS CLAREZA", text: "Os conteúdos são organizados de forma simples e intuitiva para facilitar o entendimento." },
                { icon: Brain, title: "MENOS CONFUSÃO", text: "Pare de misturar nomes, classes e indicações clínicas durante os estudos." },
                { icon: Shield, title: "MAIS SEGURANÇA", text: "Chegue nas provas sabendo exatamente como cada medicamento funciona." },
                { icon: Target, title: "FOCO NO QUE IMPORTA", text: "Sem enrolação, sem textos gigantes e sem teoria desnecessária." }
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-[15px] mb-2 uppercase">{item.title}</h3>
                  <p className="text-muted-foreground text-[13px] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <CTAButton>QUERO MEMORIZAR MAIS RÁPIDO</CTAButton>
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

            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8 shadow-lg border border-gray-200 relative">
               <img src={beforeAfterImg} alt="Comparação" className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                <h3 className="text-destructive font-black uppercase text-lg flex items-center gap-2 mb-4">
                  <span className="text-xl">❌</span> SEM O MATERIAL
                </h3>
                <ul className="space-y-3">
                  {["Muito conteúdo espalhado", "Dificuldade para memorizar", "Revisões cansativas", "Confusão entre medicamentos", "Horas estudando sem resultado"].map((item, i) => (
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
                  {["Estudo visual e organizado", "Revisão rápida e eficiente", "Memorização acelerada", "Mais confiança nas provas", "Conteúdo simplificado"].map((item, i) => (
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

            <h2 className="font-display text-4xl font-black leading-none uppercase mb-4">
              VOCÊ VAI SENTIR A <br/>
              <span className="underline decoration-primary decoration-4 underline-offset-4">DIFERENÇA LOGO NOS PRIMEIROS ESTUDOS</span>
            </h2>

            <p className="text-muted-foreground text-sm italic font-medium mb-8">
              "Imagine chegar na prova e lembrar de cada detalhe estudado com mais clareza, rapidez e confiança."
            </p>

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

            <CTAButton>QUERO ACESSO IMEDIATO</CTAButton>
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

            <p className="text-[15px] font-medium leading-relaxed mb-8 opacity-90">
              Você passa horas lendo farmacologia, tenta decorar nomes impossíveis, revisa inúmeras vezes… e mesmo assim chega na prova sentindo que não lembra de nada. O problema não é sua capacidade. O problema é estudar da forma errada. Seu cérebro aprende muito mais rápido quando o conteúdo é visual, organizado e resumido estrategicamente.
            </p>

            <CTAButton className="!bg-[#0D0F1C] !text-primary hover:!bg-black shadow-[0_4px_14px_rgba(0,0,0,0.3)] border-2 border-[#0D0F1C]">
              QUERO MUDAR MINHA FORMA DE ESTUDAR
            </CTAButton>
          </FadeIn>
        </section>

        {/* BLOCO 07 — OFERTAS (dark navy) */}
        <section className="px-6 py-14 bg-background">
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

            <div className="flex flex-col gap-6">
              {/* CARD 1 — COMBO ESSENCIAL */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold text-xl uppercase mb-2">COMBO ESSENCIAL</h3>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-lg font-bold text-muted-foreground">R$</span>
                  <span className="font-display text-5xl font-black leading-none">10,00</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-6">Pagamento único</p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "+110 páginas de mapas mentais",
                    "Principais classes farmacológicas",
                    "Conteúdo visual e organizado",
                    "Revisões rápidas",
                    "Material em PDF",
                    "Acesso imediato"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[15px] font-medium text-gray-300">
                      <Check className="w-4 h-4 text-primary shrink-0" strokeWidth={3} />
                      {item}
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-secondary hover:bg-secondary/80 text-white font-bold h-14 rounded-xl uppercase tracking-wide border border-border">
                  GARANTIR COMBO ESSENCIAL
                </Button>
              </div>

              {/* CARD 2 — COMBO COMPLETO */}
              <div className="bg-card border-2 border-primary rounded-2xl p-6 relative shadow-[0_0_20px_rgba(182,255,59,0.15)] mt-4">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-[#0D0F1C] text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap flex items-center gap-1.5 shadow-sm">
                  <Star className="w-3 h-3 fill-current" /> MAIS ESCOLHIDO PELOS ESTUDANTES
                </div>

                <h3 className="font-bold text-xl uppercase mb-2">COMBO COMPLETO</h3>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-lg font-bold text-primary">R$</span>
                  <span className="font-display text-5xl font-black leading-none text-primary">25,00</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-6">Pagamento único</p>
                
                <ul className="space-y-3 mb-8">
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

                <CTAButton>GARANTIR COMBO COMPLETO</CTAButton>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* BLOCO 08 — FEEDBACKS (white bg) */}
        <section className="px-6 py-14 bg-white text-[#0D0F1C]">
          <FadeIn>
            <h2 className="font-display text-4xl sm:text-5xl font-black leading-[0.95] uppercase mb-10 text-center">
              MAIS DE <span className="text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">20 MIL ESTUDANTES</span> <br/>
              JÁ UTILIZAM ESSE MATERIAL
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {[
                "Finalmente consegui revisar farmacologia sem ficar perdido em textos enormes.",
                "Usei antes da prova e consegui memorizar muito mais rápido.",
                "O material deixa tudo mais simples e organizado visualmente.",
                "Perfeito para revisão de estágio e plantão."
              ].map((text, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                      {["A", "M", "C", "P"][i]}
                    </div>
                    <div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-[#0D0F1C] text-[#0D0F1C]" />
                        ))}
                      </div>
                      <p className="text-xs font-bold mt-0.5 text-gray-500">Estudante Verificado</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium leading-relaxed italic text-gray-700">"{text}"</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* BLOCO 09 — GARANTIA (dark navy) */}
        <section className="px-6 py-14 bg-background text-center">
          <FadeIn>
            <div className="w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(182,255,59,0.3)]">
              <span className="font-display text-5xl font-black text-[#0D0F1C] mt-2">7</span>
              <span className="text-xs font-black text-[#0D0F1C] uppercase ml-1 flex flex-col items-start leading-none mt-1">
                <span>DIAS</span>
                <span className="text-[8px]">GARANTIA</span>
              </span>
            </div>

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
                { icon: Headphones, text: "Suporte ao Aluno" }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-gray-400">
                  <badge.icon className="w-3.5 h-3.5 text-primary" />
                  {badge.text}
                </div>
              ))}
            </div>

            <CTAButton>GARANTIR MEU ACESSO AGORA</CTAButton>
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
