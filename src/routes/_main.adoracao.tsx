import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/MobileShell";
import adoracaoImg from "@/assets/adoracao.jpg";
import { Sparkles, Clock, Info } from "lucide-react";

export const Route = createFileRoute("/_main/adoracao")({
  component: Adoracao,
  head: () => ({ meta: [{ title: "Adoração Perpétua — Divina Providência" }] }),
});

const horarios = [
  { dia: "Segunda a Sexta", hora: "06h00 — 22h00" },
  { dia: "Sábado", hora: "07h00 — 20h00" },
  { dia: "Domingo", hora: "08h00 — 21h00" },
];

const orientacoes = [
  "Mantenha o silêncio respeitoso na capela.",
  "Desligue ou silencie o celular antes de entrar.",
  "Vista-se com modéstia e simplicidade.",
  "Reserve seu horário com a coordenação se possível.",
];

function Adoracao() {
  return (
    <div>
      <div className="relative h-56 overflow-hidden">
        <img src={adoracaoImg} alt="Adoração" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        <div className="absolute bottom-4 left-6 right-6">
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-primary font-semibold px-3 py-1 rounded-full bg-card/80 backdrop-blur border border-border">
            <Sparkles className="h-3 w-3" /> Adoração Perpétua
          </span>
          <h1 className="font-display text-4xl text-foreground mt-2 leading-tight">
            Diante do <span className="italic text-primary">Santíssimo</span>
          </h1>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-5">
        <p className="text-sm text-muted-foreground leading-relaxed">
          A capela está aberta para que cada membro possa permanecer em adoração e oração diante do
          Santíssimo Sacramento. Um espaço de silêncio, paz e encontro com Deus.
        </p>

        <section>
          <h3 className="font-display text-xl text-foreground mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" /> Horários
          </h3>
          <div className="rounded-3xl bg-card border border-border overflow-hidden">
            {horarios.map((h, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-5 py-4 ${
                  i !== horarios.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span className="text-sm text-foreground font-medium">{h.dia}</span>
                <span className="text-sm text-primary font-semibold">{h.hora}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-display text-xl text-foreground mb-3 flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" /> Orientações
          </h3>
          <ul className="space-y-2">
            {orientacoes.map((o, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-border"
              >
                <span className="h-6 w-6 shrink-0 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground/90 leading-relaxed">{o}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="rounded-3xl bg-gradient-gold-deep p-6 shadow-gold">
          <p className="text-xs uppercase tracking-widest text-primary-foreground/80 font-medium">
            Aviso da Adoração
          </p>
          <p className="font-display text-xl text-primary-foreground italic leading-snug mt-2">
            "Não pudestes vigiar uma hora comigo?"
          </p>
          <p className="text-xs text-primary-foreground/80 mt-2">Mateus 26:40</p>
        </div>
      </div>
    </div>
  );
}
