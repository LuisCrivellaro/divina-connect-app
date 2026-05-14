import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/MobileShell";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_main/oracao")({
  component: Oracao,
  head: () => ({ meta: [{ title: "Pedidos de Oração — Divina Providência" }] }),
});

type Pedido = {
  id: number;
  nome: string;
  iniciais: string;
  tempo: string;
  texto: string;
  rezando: number;
  apoio: number;
  meRezando?: boolean;
  meApoio?: boolean;
};

const initialPedidos: Pedido[] = [
  {
    id: 1,
    nome: "João Silva",
    iniciais: "JS",
    tempo: "há 1 hora",
    texto: "Peço orações pela saúde da minha mãe que está internada.",
    rezando: 24,
    apoio: 12,
  },
  {
    id: 2,
    nome: "Ana Maria",
    iniciais: "AM",
    tempo: "há 3 horas",
    texto: "Pelas famílias da nossa comunidade que enfrentam dificuldades financeiras.",
    rezando: 47,
    apoio: 33,
  },
  {
    id: 3,
    nome: "Pedro Costa",
    iniciais: "PC",
    tempo: "ontem",
    texto: "Por discernimento em uma decisão importante na minha vida profissional.",
    rezando: 18,
    apoio: 9,
  },
  {
    id: 4,
    nome: "Lúcia Ferreira",
    iniciais: "LF",
    tempo: "há 2 dias",
    texto: "Pelos jovens da comunidade — que encontrem propósito e fé.",
    rezando: 56,
    apoio: 41,
  },
];

function Oracao() {
  const [pedidos, setPedidos] = useState(initialPedidos);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const react = (id: number, type: "rezando" | "apoio") => {
    setPedidos((p) =>
      p.map((x) => {
        if (x.id !== id) return x;
        const key = type === "rezando" ? "meRezando" : "meApoio";
        const active = !x[key];
        return {
          ...x,
          [key]: active,
          [type]: x[type] + (active ? 1 : -1),
        };
      })
    );
  };

  const submit = () => {
    if (!text.trim()) return;
    setPedidos((p) => [
      {
        id: Date.now(),
        nome: "Você",
        iniciais: "VC",
        tempo: "agora",
        texto: text.trim(),
        rezando: 0,
        apoio: 0,
      },
      ...p,
    ]);
    setText("");
    setOpen(false);
  };

  return (
    <div className="relative">
      <ScreenHeader title="Pedidos de Oração" subtitle="Unidos em oração e apoio" />

      <div className="px-6 space-y-3">
        {pedidos.map((p) => (
          <article key={p.id} className="rounded-3xl bg-card border border-border p-5 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-display text-sm shrink-0">
                {p.iniciais}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-foreground font-semibold">{p.nome}</p>
                  <p className="text-xs text-muted-foreground">{p.tempo}</p>
                </div>
                <p className="text-sm text-foreground/90 mt-2 leading-relaxed">{p.texto}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => react(p.id, "rezando")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      p.meRezando
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/15 text-primary"
                    }`}
                  >
                    🙏 Rezando · {p.rezando}
                  </button>
                  <button
                    onClick={() => react(p.id, "apoio")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      p.meApoio
                        ? "bg-burgundy text-white"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    ❤️ Apoio · {p.apoio}
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-28 left-1/2 translate-x-[140px] z-40 h-14 w-14 rounded-full bg-gradient-primary text-primary-foreground shadow-gold flex items-center justify-center"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-[440px] bg-card border-t border-border rounded-t-3xl p-6 shadow-elegant animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-xl text-foreground">Novo Pedido</h3>
              <button onClick={() => setOpen(false)} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Compartilhe seu pedido com a comunidade..."
              className="w-full h-32 rounded-2xl bg-input border border-border p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary"
            />
            <button
              onClick={submit}
              className="w-full mt-4 py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-gold"
            >
              Enviar pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
