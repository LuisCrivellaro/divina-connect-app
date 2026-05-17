import { createFileRoute } from "@tanstack/react-router";
import { logo } from "@/components/MobileShell";
import { useDragScroll } from "@/hooks/useDragScroll";
import community1 from "@/assets/community-1.jpg";
import community2 from "@/assets/community-2.jpg";
import community3 from "@/assets/community-3.jpg";
import community4 from "@/assets/community-4.jpg";
import { Plus, X, Search, Users, Music, BookOpen, Baby, Heart } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_main/oracao")({
  component: Oracao,
  head: () => ({ meta: [{ title: "Comunidade — Divina Providência" }] }),
});

type Pedido = {
  id: number;
  nome: string;
  iniciais: string;
  tempo: string;
  texto: string;
  categoria: string;
  rezando: number;
  apoio: number;
  meRezando?: boolean;
  meApoio?: boolean;
};

const grupos = [
  { nome: "Jovens da Fé", membros: 34, icon: Heart, img: community2 },
  { nome: "Louvor", membros: 18, icon: Music, img: community1 },
  { nome: "Catequese", membros: 52, icon: BookOpen, img: community3 },
  { nome: "Pastoral Familiar", membros: 29, icon: Users, img: community4 },
  { nome: "Mães em Oração", membros: 41, icon: Baby, img: community2 },
];

const initialPedidos: Pedido[] = [
  {
    id: 1,
    nome: "João Silva",
    iniciais: "JS",
    tempo: "há 1h",
    texto: "Peço orações pela saúde da minha mãe que está internada.",
    categoria: "Saúde",
    rezando: 24,
    apoio: 12,
  },
  {
    id: 2,
    nome: "Ana Maria",
    iniciais: "AM",
    tempo: "há 3h",
    texto: "Pelas famílias da nossa comunidade que enfrentam dificuldades financeiras.",
    categoria: "Família",
    rezando: 47,
    apoio: 33,
  },
  {
    id: 3,
    nome: "Pedro Costa",
    iniciais: "PC",
    tempo: "ontem",
    texto: "Por discernimento em uma decisão importante na minha vida profissional.",
    categoria: "Trabalho",
    rezando: 18,
    apoio: 9,
  },
  {
    id: 4,
    nome: "Lúcia Ferreira",
    iniciais: "LF",
    tempo: "há 2 dias",
    texto: "Pelos jovens da comunidade — que encontrem propósito e fé.",
    categoria: "Jovens",
    rezando: 56,
    apoio: 41,
  },
];

const categoriaColors: Record<string, string> = {
  Saúde: "bg-rose-400/15 text-rose-500",
  Família: "bg-amber-400/15 text-amber-600",
  Trabalho: "bg-blue-400/15 text-blue-500",
  Jovens: "bg-primary/15 text-primary",
};

function Oracao() {
  const [pedidos, setPedidos] = useState(initialPedidos);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [categoria, setCategoria] = useState("Família");
  const gruposRef = useDragScroll();

  const react = (id: number, type: "rezando" | "apoio") => {
    setPedidos((p) =>
      p.map((x) => {
        if (x.id !== id) return x;
        const key = type === "rezando" ? "meRezando" : "meApoio";
        const active = !x[key];
        return { ...x, [key]: active, [type]: x[type] + (active ? 1 : -1) };
      })
    );
  };

  const submit = () => {
    if (!text.trim()) return;
    setPedidos((p) => [
      { id: Date.now(), nome: "Você", iniciais: "VC", tempo: "agora", texto: text.trim(), categoria, rezando: 0, apoio: 0 },
      ...p,
    ]);
    setText("");
    setOpen(false);
  };

  return (
    <div className="relative pb-4">

      {/* Header */}
      <header className="px-6 pt-12 pb-4 flex items-center justify-between">
        <img src={logo} alt="Divina Providência" className="h-14 w-auto" />
        <button className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center shadow-soft">
          <Search className="h-4 w-4 text-foreground" />
        </button>
      </header>

      {/* Intenção da semana */}
      <div className="px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-gold-deep p-5 shadow-gold glow-card">
          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          <p className="text-[10px] uppercase tracking-widest text-primary-foreground/70 font-semibold">
            Intenção da Semana
          </p>
          <p className="font-display text-xl text-primary-foreground mt-1.5 italic leading-snug">
            "Pelos enfermos e suas famílias — que encontrem força e consolo em Deus."
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div className="flex -space-x-2">
              {["JS", "AM", "PC"].map((i) => (
                <div key={i} className="h-7 w-7 rounded-full bg-white/30 border-2 border-white/50 flex items-center justify-center text-[9px] text-white font-bold">
                  {i}
                </div>
              ))}
            </div>
            <p className="text-xs text-primary-foreground/80">+128 orando juntos</p>
          </div>
        </div>
      </div>

      {/* Grupos */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-6 mb-3">
          <h3 className="font-display text-lg text-foreground">Grupos da comunidade</h3>
          <span className="text-xs text-primary">{grupos.length} grupos</span>
        </div>
        <div
          ref={gruposRef}
          className="flex gap-3 overflow-x-auto px-6 pb-1 select-none"
          style={{ cursor: "grab" }}
        >
          {grupos.map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.nome} className="shrink-0 flex flex-col items-center gap-2 w-20">
                <div className="relative h-16 w-16 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-soft glow-card">
                  <img src={g.img} alt={g.nome} className="h-full w-full object-cover" draggable={false} />
                  <div className="absolute inset-0 bg-primary/20" />
                  <div className="absolute bottom-1 right-1 h-5 w-5 rounded-lg bg-primary flex items-center justify-center">
                    <Icon className="h-2.5 w-2.5 text-white" />
                  </div>
                </div>
                <p className="text-[10px] text-foreground font-medium text-center leading-tight">{g.nome}</p>
                <p className="text-[9px] text-muted-foreground -mt-1.5">{g.membros} membros</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mural de oração */}
      <section className="mt-6">
        <div className="flex items-center justify-between px-6 mb-3">
          <h3 className="font-display text-lg text-foreground">Mural de oração</h3>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 text-xs text-primary font-semibold"
          >
            <Plus className="h-3.5 w-3.5" /> Novo pedido
          </button>
        </div>

        <div className="px-6 space-y-3 stagger">
          {pedidos.map((p) => (
            <article key={p.id} className="rounded-3xl bg-card border border-border p-4 shadow-soft glow-card">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-display text-xs shrink-0 shadow-gold">
                  {p.iniciais}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm text-foreground font-semibold truncate">{p.nome}</p>
                    <span className={`shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-full ${categoriaColors[p.categoria] ?? "bg-muted text-muted-foreground"}`}>
                      {p.categoria}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.tempo}</p>
                  <p className="text-sm text-foreground/85 mt-2 leading-relaxed">{p.texto}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => react(p.id, "rezando")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        p.meRezando ? "bg-primary text-primary-foreground shadow-gold" : "bg-primary/12 text-primary"
                      }`}
                    >
                      🙏 {p.rezando}
                    </button>
                    <button
                      onClick={() => react(p.id, "apoio")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        p.meApoio ? "bg-rose-500 text-white" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      ❤️ {p.apoio}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-28 left-1/2 translate-x-[140px] z-40 h-14 w-14 rounded-full bg-gradient-primary text-primary-foreground shadow-gold flex items-center justify-center"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 backdrop-blur-sm">
          <div className="w-full max-w-[440px] bg-card border-t border-border rounded-t-3xl p-6 shadow-elegant animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl text-foreground">Novo Pedido</h3>
              <button onClick={() => setOpen(false)} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Categoria */}
            <div className="flex gap-2 mb-3 flex-wrap">
              {Object.keys(categoriaColors).map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoria(c)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    categoria === c ? "bg-gradient-primary text-primary-foreground shadow-gold" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Compartilhe seu pedido com a comunidade..."
              className="w-full h-28 rounded-2xl bg-input border border-border p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary"
            />
            <button
              onClick={submit}
              className="w-full mt-3 py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-gold"
            >
              Enviar pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
