import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/MobileShell";
import { Bell, Calendar, ChevronRight, LogOut, Settings, Shield } from "lucide-react";

export const Route = createFileRoute("/_main/perfil")({
  component: Perfil,
  head: () => ({ meta: [{ title: "Perfil — Divina Providência" }] }),
});

const stats = [
  { label: "Eventos", value: "24" },
  { label: "Orações", value: "156" },
  { label: "Anos", value: "3" },
];

const items = [
  { icon: Bell, label: "Notificações" },
  { icon: Calendar, label: "Meus eventos" },
  { icon: Shield, label: "Privacidade" },
  { icon: Settings, label: "Configurações" },
];

function Perfil() {
  return (
    <div>
      <ScreenHeader title="Perfil" />

      <section className="px-6">
        <div className="rounded-3xl bg-gradient-gold-deep p-6 shadow-gold relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="flex items-center gap-4 relative">
            <div className="h-20 w-20 rounded-full bg-card border-4 border-primary-foreground/30 flex items-center justify-center font-display text-3xl text-primary">
              MA
            </div>
            <div>
              <h2 className="font-display text-2xl text-primary-foreground">Maria Andrade</h2>
              <span className="inline-flex items-center gap-1.5 mt-1 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground backdrop-blur">
                <Shield className="h-3 w-3" /> Membro Comprometido
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6 relative">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-card/15 backdrop-blur border border-primary-foreground/20 p-3 text-center">
                <p className="font-display text-2xl text-primary-foreground">{s.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-primary-foreground/80 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 mt-6">
        <h3 className="font-display text-lg text-foreground mb-3">Histórico recente</h3>
        <div className="rounded-3xl bg-card border border-border divide-y divide-border overflow-hidden">
          {[
            { t: "Grupo de Oração", d: "5 Fev · Confirmado" },
            { t: "Missa Dominical", d: "2 Fev · Presente" },
            { t: "Retiro de Advento", d: "Dez 2025 · Presente" },
          ].map((x, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm text-foreground font-medium">{x.t}</p>
                <p className="text-xs text-muted-foreground">{x.d}</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-primary" />
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 mt-6 space-y-2">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <button
              key={it.label}
              className="w-full flex items-center gap-3 p-4 rounded-2xl bg-card border border-border"
            >
              <div className="h-9 w-9 rounded-xl bg-primary/15 flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-foreground font-medium flex-1 text-left">{it.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          );
        })}

        <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border border-destructive/40 text-destructive font-medium text-sm mt-4">
          <LogOut className="h-4 w-4" /> Sair
        </button>
      </section>
    </div>
  );
}
