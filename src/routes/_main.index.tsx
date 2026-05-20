import { createFileRoute } from "@tanstack/react-router";
import { useDragScroll } from "@/hooks/useDragScroll";
import logo from "@/assets/logo-divina.png";
import community1 from "@/assets/community-1.jpg";
import community2 from "@/assets/community-2.jpg";
import community3 from "@/assets/community-3.jpg";
import community4 from "@/assets/community-4.jpg";
import community5 from "@/assets/community-5.jpg";
import community6 from "@/assets/community-6.jpg";
import { Bell, ChevronRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_main/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Comunidade Divina Providência" },
      { name: "description", content: "Plataforma digital oficial da Comunidade Divina Providência." },
    ],
  }),
});

const events = [
  { id: 1, title: "Grupo de Oração", date: "Qui · 19h30", img: community1, type: "Oração" },
  { id: 2, title: "Missa da Comunidade", date: "Dom · 10h00", img: community4, type: "Missa" },
  { id: 3, title: "Acampamento Senior", date: "15-17 Fev", img: community3, type: "Retiro" },
];

const avisos = [
  { id: 1, title: "Inscrições para o Retiro", time: "há 2h", isNew: true },
  { id: 2, title: "Mudança no horário da missa", time: "ontem", isNew: true },
  { id: 3, title: "Coleta de alimentos no domingo", time: "há 3 dias", isNew: false },
];

function Dashboard() {
  const carouselRef = useDragScroll();

  return (
    <div className="pb-4 stagger">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 relative flex items-center justify-center">
        <img src={logo} alt="Divina Providência" className="h-14 w-auto" />
        <button className="absolute right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center">
          <Bell className="h-4 w-4 text-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
        </button>
      </header>

      <div className="px-6">
        <h2 className="font-display text-3xl text-foreground">Bem-vindo, Maria</h2>
      </div>

      {/* Verse of the day */}
      <div className="px-6 mt-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-gold-deep p-6 shadow-gold glow-card">
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <p className="text-xs uppercase tracking-widest text-primary-foreground/80 font-medium">
            Versículo do Dia
          </p>
          <p className="font-display text-2xl leading-snug text-primary-foreground mt-2 italic">
            "Tudo posso naquele que me fortalece."
          </p>
          <p className="text-xs text-primary-foreground/80 mt-3">Filipenses 4:13</p>
        </div>
      </div>

      {/* Próximos eventos */}
      <section className="mt-8">
        <div className="flex items-center justify-between px-6 mb-3">
          <h3 className="font-display text-xl text-foreground">Próximos eventos</h3>
          <a className="text-xs text-primary flex items-center gap-1">
            Ver todos <ChevronRight className="h-3 w-3" />
          </a>
        </div>
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto px-6 pb-2 select-none"
          style={{ cursor: "grab" }}
        >
          {events.map((e) => (
            <article
              key={e.id}
              className="shrink-0 w-56 rounded-3xl bg-card border border-border overflow-hidden shadow-soft glow-card"
            >
              <div className="relative h-32">
                <img src={e.img} alt={e.title} className="h-full w-full object-cover" loading="lazy" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground font-medium">
                  {e.type}
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs text-primary font-medium">{e.date}</p>
                <h4 className="text-sm text-foreground font-semibold mt-0.5">{e.title}</h4>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Adoração card */}
      <section className="px-6 mt-6">
        <div className="rounded-3xl bg-card border border-border p-5 flex items-center gap-4 shadow-soft glow-card">
          <div className="h-12 w-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-gold">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Adoração Perpétua</p>
            <p className="font-display text-lg text-foreground leading-tight">Capela aberta 24h</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </section>

      {/* Avisos */}
      <section className="mt-8">
        <div className="flex items-center justify-between px-6 mb-3">
          <h3 className="font-display text-xl text-foreground">Avisos recentes</h3>
        </div>
        <div className="px-6 space-y-2 stagger">
          {avisos.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border glow-card"
            >
              <div className="h-9 w-9 rounded-xl bg-primary/15 flex items-center justify-center">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </div>
              {a.isNew && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-semibold">
                  NOVO
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pedidos de oração */}
      <section className="px-6 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-xl text-foreground">Pedidos de oração</h3>
        </div>
        <div className="rounded-3xl bg-card border border-border p-5 shadow-soft glow-card">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-display text-sm">
              JS
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium">João Silva</p>
              <p className="text-xs text-muted-foreground">há 1 hora</p>
              <p className="text-sm text-foreground/90 mt-2 leading-relaxed">
                Peço orações pela saúde da minha mãe que está internada.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-medium">
                  🙏 Rezando · 24
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-foreground text-xs font-medium">
                  ❤️ Apoio · 12
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria preview */}
      <section className="mt-8"> 
        <div className="flex items-center justify-between px-6 mb-3">
          <h3 className="font-display text-xl text-foreground">Momentos</h3>
        </div>
        <div className="grid grid-cols-3 gap-2 px-6">
          {[community1, community2, community3, community4, community5, community6].map((src, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
