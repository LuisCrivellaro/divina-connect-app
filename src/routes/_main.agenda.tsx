import { createFileRoute } from "@tanstack/react-router";
import { logo } from "@/components/MobileShell";
import { useDragScroll } from "@/hooks/useDragScroll";
import community1 from "@/assets/community-1.jpg";
import community3 from "@/assets/community-3.jpg";
import community4 from "@/assets/community-4.jpg";
import { MapPin, Clock, Check, Users, Flame, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_main/agenda")({
  component: Agenda,
  head: () => ({ meta: [{ title: "Agenda — Divina Providência" }] }),
});

const filters = ["Todos", "Oração", "Missa", "Acampamentos"];

const featured = {
  id: 1,
  title: "Acampamento de Verão",
  type: "Acampamentos",
  day: "15", month: "FEV",
  time: "08h00",
  local: "Sítio São José",
  img: community4,
  inscritos: 48,
};

const banners = [
  { label: "Grupo de Oração", sub: "Toda quinta · 19h30", img: community1, color: "from-orange-400/90 to-amber-500/90" },
  { label: "Próxima Missa", sub: "Dom · 10h00", img: community3, color: "from-primary/80 to-primary-glow/80" },
];

const events = [
  { id: 2, day: "15", month: "FEV", title: "Acampamento de Verão", time: "08h00", local: "Sítio São José", type: "Acampamentos" },
  { id: 3, day: "18", month: "FEV", title: "Missa da Comunidade", time: "10h00", local: "Igreja Matriz", type: "Missa" },
  { id: 5, day: "25", month: "FEV", title: "Vigília de Oração", time: "21h00", local: "Capela", type: "Oração" },
  { id: 6, day: "01", month: "MAR", title: "Grupo de Oração", time: "19h30", local: "Salão Paroquial", type: "Oração" },
];

function Agenda() {
  const [active, setActive] = useState("Todos");
  const [confirmed, setConfirmed] = useState<number[]>([]);
  const filtersRef = useDragScroll();

  const filtered = active === "Todos" ? events : events.filter((e) => e.type === active);
  const isFeaturedConfirmed = confirmed.includes(featured.id);

  return (
    <div className="pb-4">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 flex items-center justify-between">
        <img src={logo} alt="Divina Providência" className="h-14 w-auto" />
        <button className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center shadow-soft">
          <Search className="h-4 w-4 text-foreground" />
        </button>
      </header>

      {/* Hero — evento em destaque */}
      <div className="px-6 mt-2">
        <div className="relative rounded-3xl overflow-hidden shadow-gold glow-card" style={{ minHeight: 260 }}>
          {/* Background image */}
          <img src={featured.img} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/40 to-black/70" />

          {/* Orb glow behind center */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 h-28 w-28 rounded-full bg-white/20 blur-2xl" />

          {/* Content */}
          <div className="relative flex flex-col items-center text-center px-6 pt-8 pb-6">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white border border-white/30">
              <Flame className="h-3 w-3" /> {featured.type} em destaque
            </span>

            <h2 className="font-display text-3xl text-white mt-3 leading-tight drop-shadow">
              {featured.title}
            </h2>

            <div className="flex items-center gap-4 mt-3 text-white/80 text-xs">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featured.day} {featured.month} · {featured.time}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {featured.local}</span>
            </div>

            <div className="flex items-center gap-1.5 mt-3 text-white/70 text-xs">
              <Users className="h-3.5 w-3.5" />
              <span>{featured.inscritos} inscritos</span>
            </div>

            <button
              onClick={() => setConfirmed((c) => c.includes(featured.id) ? c.filter((i) => i !== featured.id) : [...c, featured.id])}
              className={`mt-5 px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg ${
                isFeaturedConfirmed
                  ? "bg-white/20 backdrop-blur text-white border border-white/40"
                  : "bg-white text-primary"
              }`}
            >
              {isFeaturedConfirmed ? <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> Confirmado</span> : "Quero participar"}
            </button>
          </div>
        </div>
      </div>

      {/* Banners rápidos */}
      <div className="px-6 mt-4 grid grid-cols-2 gap-3">
        {banners.map((b, i) => (
          <div key={i} className="relative rounded-2xl overflow-hidden h-24 shadow-soft glow-card">
            <img src={b.img} alt={b.label} className="absolute inset-0 h-full w-full object-cover" />
            <div className={`absolute inset-0 bg-linear-to-br ${b.color}`} />
            <div className="relative p-3 flex flex-col justify-end h-full">
              <p className="text-white font-semibold text-sm leading-tight">{b.label}</p>
              <p className="text-white/75 text-[10px] mt-0.5">{b.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div
        ref={filtersRef}
        className="flex gap-2 overflow-x-auto px-6 pt-6 pb-3 select-none"
        style={{ cursor: "grab" }}
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              active === f
                ? "bg-gradient-primary text-primary-foreground shadow-gold"
                : "bg-card border border-border text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Lista de eventos */}
      <div className="px-6 space-y-3 stagger">
        {filtered.map((e) => (
          <article
            key={e.id}
            className="rounded-2xl bg-card border border-border p-4 shadow-soft flex gap-4 glow-card"
          >
            <div className="flex flex-col items-center justify-center w-12 h-14 rounded-xl bg-gradient-primary text-primary-foreground shrink-0">
              <span className="font-display text-xl leading-none">{e.day}</span>
              <span className="text-[9px] uppercase tracking-wider mt-0.5">{e.month}</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">{e.type}</span>
              <h3 className="font-display text-base text-foreground leading-tight">{e.title}</h3>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {e.time}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.local}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
