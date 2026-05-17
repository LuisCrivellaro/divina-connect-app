import { createFileRoute } from "@tanstack/react-router";
import { logo } from "@/components/MobileShell";
import adoracaoImg from "@/assets/adoracao.jpg";
import { Sparkles, Info, Phone, MapPin, MessageCircle, User, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_main/adoracao")({
  component: Adoracao,
  head: () => ({ meta: [{ title: "Adoração Perpétua — Divina Providência" }] }),
});

const contatos = [
  { tipo: "Telefone", valor: "(11) 9999-0000", icon: Phone, desc: "Coordenação geral" },
  { tipo: "WhatsApp", valor: "(11) 9999-0001", icon: MessageCircle, desc: "Agendamento de turno" },
  { tipo: "Endereço", valor: "Rua Exemplo, 123 — Centro", icon: MapPin, desc: "São Paulo — SP" },
];

const coordenadores = [
  { nome: "Ir. Maria José", iniciais: "MJ", turno: "Noite · todos os dias" },
  { nome: "Diácono Carlos", iniciais: "DC", turno: "Manhã · Seg–Sex" },
  { nome: "Ir. Ana Paula", iniciais: "AP", turno: "Tarde · todos os dias" },
];

const orientacoes = [
  "Mantenha o silêncio respeitoso na capela.",
  "Desligue ou silencie o celular antes de entrar.",
  "Vista-se com modéstia e simplicidade.",
  "Reserve seu horário com a coordenação se possível.",
];

function Adoracao() {
  return (
    <div className="pb-4">

      {/* Hero */}
      <div className="relative h-72 overflow-hidden">
        <img src={adoracaoImg} alt="Adoração" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/25 to-background" />
        <div className="absolute top-10 left-0 right-0 flex justify-center">
          <img src={logo} alt="Divina Providência" className="h-14 w-auto drop-shadow-lg" />
        </div>
        <div className="absolute bottom-5 left-6 right-6 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-primary font-semibold px-3 py-1 rounded-full bg-card/85 backdrop-blur border border-border">
            <Sparkles className="h-3 w-3" /> Adoração Perpétua · 24h
          </span>
          <h1 className="font-display text-4xl text-foreground mt-2 leading-tight drop-shadow-sm">
            Diante do <span className="italic text-primary">Santíssimo</span>
          </h1>
        </div>
      </div>

      <div className="px-6 mt-5 space-y-5 stagger">

        {/* Convite */}
        <div className="rounded-3xl bg-gradient-gold-deep p-6 shadow-gold glow-card">
          <p className="text-xs uppercase tracking-widest text-primary-foreground/75 font-semibold">Convite à Adoração</p>
          <p className="font-display text-xl text-primary-foreground italic leading-snug mt-2">
            "Não pudestes vigiar uma hora comigo?"
          </p>
          <p className="text-xs text-primary-foreground/75 mt-2">Mateus 26:40</p>
        </div>

        {/* Aberta 24h */}
        <div className="flex gap-3">
          {[
            { label: "24 horas", sub: "por dia" },
            { label: "7 dias", sub: "por semana" },
            { label: "365 dias", sub: "por ano" },
          ].map((item) => (
            <div key={item.label} className="flex-1 rounded-2xl bg-card border border-border p-4 text-center shadow-soft">
              <p className="font-display text-xl text-primary leading-none">{item.label}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Coordenadores */}
        <section>
          <h3 className="font-display text-lg text-foreground mb-3 flex items-center gap-2">
            <User className="h-4 w-4 text-primary" /> Coordenadores
          </h3>
          <div className="space-y-2">
            {coordenadores.map((c) => (
              <div key={c.nome} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-soft glow-card">
                <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-display shrink-0 shadow-gold">
                  {c.iniciais}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground font-semibold">{c.nome}</p>
                  <p className="text-xs text-muted-foreground">{c.turno}</p>
                </div>
                <Phone className="h-4 w-4 text-primary" />
              </div>
            ))}
          </div>
        </section>

        {/* Contatos */}
        <section>
          <h3 className="font-display text-lg text-foreground mb-3 flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" /> Contatos e localização
          </h3>
          <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-soft">
            {contatos.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} className={`flex items-center gap-4 px-5 py-4 ${i !== contatos.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="h-9 w-9 rounded-xl bg-primary/12 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{c.tipo}</p>
                    <p className="text-sm text-foreground font-semibold">{c.valor}</p>
                    <p className="text-[10px] text-muted-foreground">{c.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              );
            })}
          </div>
        </section>

        {/* Orientações */}
        <section>
          <h3 className="font-display text-lg text-foreground mb-3 flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" /> Orientações
          </h3>
          <ul className="space-y-2">
            {orientacoes.map((o, i) => (
              <li key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-border">
                <span className="h-6 w-6 shrink-0 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground/90 leading-relaxed">{o}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}
