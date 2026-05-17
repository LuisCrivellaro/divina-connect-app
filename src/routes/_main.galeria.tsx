import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/MobileShell";
import community1 from "@/assets/community-1.jpg";
import community2 from "@/assets/community-2.jpg";
import community3 from "@/assets/community-3.jpg";
import community4 from "@/assets/community-4.jpg";
import { useState } from "react";

export const Route = createFileRoute("/_main/galeria")({
  component: Galeria,
  head: () => ({ meta: [{ title: "Galeria — Divina Providência" }] }),
});

const albums = [
  { id: 1, nome: "Acampamento de Janeiro", data: "Jan 2026", capa: community4, fotos: 48 },
  { id: 2, nome: "Missa de Aniversário", data: "Dez 2025", capa: community3, fotos: 32 },
  { id: 3, nome: "Grupo de Oração", data: "Dez 2025", capa: community1, fotos: 18 },
  { id: 4, nome: "Retiro de Advento", data: "Nov 2025", capa: community2, fotos: 64 },
];

const fotos = [community1, community2, community3, community4, community1, community4, community2, community3, community1];

function Galeria() {
  const [tab, setTab] = useState<"albuns" | "todas">("albuns");

  return (
    <div>
      <ScreenHeader title="Galeria" subtitle="Momentos da comunidade" showLogo />

      <div className="px-6 mb-4">
        <div className="inline-flex p-1 rounded-2xl bg-card border border-border">
          {(["albuns", "todas"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                tab === t ? "bg-gradient-primary text-primary-foreground shadow-gold" : "text-muted-foreground"
              }`}
            >
              {t === "albuns" ? "Álbuns" : "Todas as fotos"}
            </button>
          ))}
        </div>
      </div>

      {tab === "albuns" ? (
        <div className="px-6 grid grid-cols-2 gap-3 stagger">
          {albums.map((a) => (
            <article key={a.id} className="rounded-3xl bg-card border border-border overflow-hidden shadow-soft glow-card">
              <div className="aspect-square">
                <img src={a.capa} alt={a.nome} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-3">
                <h4 className="text-sm font-semibold text-foreground leading-tight">{a.nome}</h4>
                <p className="text-[10px] text-muted-foreground mt-1">{a.data} · {a.fotos} fotos</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="px-6 grid grid-cols-3 gap-1.5">
          {fotos.map((f, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden bg-muted">
              <img src={f} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
