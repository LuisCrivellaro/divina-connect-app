import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/MobileShell";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/_main/avisos")({
  component: Avisos,
  head: () => ({ meta: [{ title: "Avisos — Divina Providência" }] }),
});

const avisos = [
  {
    id: 1,
    title: "Inscrições abertas para o Retiro de Verão",
    body: "As inscrições estão abertas até dia 10 de fevereiro. Vagas limitadas. Procure um membro do conselho.",
    time: "há 2 horas",
    author: "Conselho",
    isNew: true,
  },
  {
    id: 2,
    title: "Mudança no horário da missa de domingo",
    body: "A partir de fevereiro, a missa dominical será celebrada às 10h00 (antes 09h30).",
    time: "ontem",
    author: "Conselho",
    isNew: true,
  },
  {
    id: 3,
    title: "Coleta de alimentos no domingo",
    body: "Traga 1kg de alimento não perecível para a próxima missa. Doações para famílias carentes.",
    time: "há 3 dias",
    author: "Pastoral Social",
    isNew: false,
  },
  {
    id: 4,
    title: "Novo grupo de oração para jovens",
    body: "Toda quinta-feira às 19h30 no salão paroquial. Idades 18-30. Venha participar!",
    time: "há 1 semana",
    author: "Conselho",
    isNew: false,
  },
];

function Avisos() {
  return (
    <div>
      <ScreenHeader title="Avisos" subtitle="Comunicados oficiais" />

      <div className="px-6 space-y-3">
        {avisos.map((a) => (
          <article
            key={a.id}
            className={`rounded-3xl border p-5 shadow-soft transition-all ${
              a.isNew ? "bg-card border-primary/40" : "bg-card border-border"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                    {a.author}
                  </span>
                  {a.isNew && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-semibold">
                      NOVO
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg text-foreground leading-tight mt-1">
                  {a.title}
                </h3>
                <p className="text-sm text-foreground/80 mt-2 leading-relaxed">{a.body}</p>
                <p className="text-xs text-muted-foreground mt-3">{a.time}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
