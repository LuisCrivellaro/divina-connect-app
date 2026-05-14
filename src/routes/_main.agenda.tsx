import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/MobileShell";
import { MapPin, Clock, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_main/agenda")({
  component: Agenda,
  head: () => ({ meta: [{ title: "Agenda — Divina Providência" }] }),
});

const filters = ["Todos", "Oração", "Missa", "Retiro", "Reunião"];

const events = [
  { id: 1, day: "12", month: "FEV", title: "Grupo de Oração", time: "19h30", local: "Salão Paroquial", type: "Oração" },
  { id: 2, day: "15", month: "FEV", title: "Acampamento de Verão", time: "08h00", local: "Sítio São José", type: "Retiro" },
  { id: 3, day: "18", month: "FEV", title: "Missa da Comunidade", time: "10h00", local: "Igreja Matriz", type: "Missa" },
  { id: 4, day: "22", month: "FEV", title: "Reunião do Conselho", time: "20h00", local: "Sala Pastoral", type: "Reunião" },
  { id: 5, day: "25", month: "FEV", title: "Vigília de Oração", time: "21h00", local: "Capela", type: "Oração" },
];

function Agenda() {
  const [active, setActive] = useState("Todos");
  const [confirmed, setConfirmed] = useState<number[]>([]);

  const filtered = active === "Todos" ? events : events.filter((e) => e.type === active);

  return (
    <div>
      <ScreenHeader title="Agenda" subtitle="Eventos da comunidade" />

      <div className="flex gap-2 overflow-x-auto px-6 pb-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              active === f
                ? "bg-gradient-primary text-primary-foreground shadow-gold"
                : "bg-card border border-border text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="px-6 space-y-3">
        {filtered.map((e) => {
          const isConfirmed = confirmed.includes(e.id);
          return (
            <article
              key={e.id}
              className="rounded-3xl bg-card border border-border p-4 shadow-soft flex gap-4"
            >
              <div className="flex flex-col items-center justify-center w-14 h-16 rounded-2xl bg-gradient-primary text-primary-foreground shrink-0">
                <span className="font-display text-2xl leading-none">{e.day}</span>
                <span className="text-[10px] uppercase tracking-wider mt-1">{e.month}</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                  {e.type}
                </span>
                <h3 className="font-display text-lg text-foreground leading-tight">{e.title}</h3>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {e.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {e.local}
                  </span>
                </div>
                <button
                  onClick={() =>
                    setConfirmed((c) =>
                      c.includes(e.id) ? c.filter((i) => i !== e.id) : [...c, e.id]
                    )
                  }
                  className={`mt-3 text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center gap-1 ${
                    isConfirmed
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {isConfirmed ? <><Check className="h-3 w-3" /> Confirmado</> : "Confirmar presença"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
