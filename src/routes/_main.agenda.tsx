import { createFileRoute } from "@tanstack/react-router";
import { logo } from "@/components/MobileShell";
import community4 from "@/assets/community-4.jpg";
import {
  Play,
  Pause,
  Video,
  Clock,
  MapPin,
  Mic,
  ChevronRight,
  ChevronDown,
  Route as RouteIcon,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_main/agenda")({
  component: Caminhos,
  head: () => ({ meta: [{ title: "Caminhos — Divina Providência" }] }),
});

type Formacao = {
  id: number;
  dia: string;
  mes: string;
  ano: string;
  diaSemana: string;
  horario: string;
  local: string;
  tema: string;
  tipo: "proxima" | "passada";
  pregador: string;
  audioUrl?: string;
  videoUrl?: string;
  duracao?: string;
};

const formacoes: Formacao[] = [
  {
    id: 1,
    dia: "10",
    mes: "AGO",
    ano: "2026",
    diaSemana: "Segunda-feira",
    horario: "19h30",
    local: "Salão Paroquial",
    tema: "O Discipulado — 3ª Etapa",
    tipo: "proxima",
    pregador: "Pe. André Lima",
  },
  {
    id: 2,
    dia: "28",
    mes: "AGO",
    ano: "2026",
    diaSemana: "Quinta-feira",
    horario: "19h30",
    local: "Salão Paroquial",
    tema: "Evangelização — 4ª Etapa",
    tipo: "proxima",
    pregador: "Diác. Paulo Mendes",
  },
  {
    id: 3,
    dia: "20",
    mes: "JUL",
    ano: "2026",
    diaSemana: "Domingo",
    horario: "10h00",
    local: "Salão Paroquial",
    tema: "A Oração no Caminho — 2ª Etapa",
    tipo: "passada",
    pregador: "Pe. André Lima",
    duracao: "1h 15min",
    audioUrl: "#",
  },
  {
    id: 4,
    dia: "06",
    mes: "JUL",
    ano: "2026",
    diaSemana: "Domingo",
    horario: "10h00",
    local: "Salão Paroquial",
    tema: "Introdução ao Caminhos — 1ª Etapa",
    tipo: "passada",
    pregador: "Diác. Paulo Mendes",
    duracao: "1h 02min",
    audioUrl: "#",
    videoUrl: "#",
  },
  // 2025
  {
    id: 5,
    dia: "07",
    mes: "DEZ",
    ano: "2025",
    diaSemana: "Domingo",
    horario: "10h00",
    local: "Salão Paroquial",
    tema: "Missão e Serviço — 12ª Etapa",
    tipo: "passada",
    pregador: "Pe. André Lima",
    duracao: "58min",
    audioUrl: "#",
  },
  {
    id: 6,
    dia: "23",
    mes: "NOV",
    ano: "2025",
    diaSemana: "Domingo",
    horario: "10h00",
    local: "Salão Paroquial",
    tema: "Kerygma e Testemunho — 11ª Etapa",
    tipo: "passada",
    pregador: "Diác. Paulo Mendes",
    duracao: "1h 10min",
    audioUrl: "#",
    videoUrl: "#",
  },
  {
    id: 7,
    dia: "09",
    mes: "NOV",
    ano: "2025",
    diaSemana: "Domingo",
    horario: "10h00",
    local: "Salão Paroquial",
    tema: "O Caminho da Cruz — 10ª Etapa",
    tipo: "passada",
    pregador: "Pe. André Lima",
    duracao: "1h 05min",
    audioUrl: "#",
  },
  {
    id: 8,
    dia: "26",
    mes: "OUT",
    ano: "2025",
    diaSemana: "Domingo",
    horario: "10h00",
    local: "Salão Paroquial",
    tema: "Vida no Espírito — 9ª Etapa",
    tipo: "passada",
    pregador: "Diác. Paulo Mendes",
    duracao: "1h 00min",
    audioUrl: "#",
  },
];

function DateBox({ mes, dia, ano }: { mes: string; dia: string; ano: string }) {
  return (
    <div className="shrink-0 w-12 rounded-2xl overflow-hidden border border-primary/25 shadow-sm">
      <div className="bg-gradient-primary px-1 py-1 text-center">
        <span className="text-[9px] font-bold text-primary-foreground uppercase tracking-wider leading-none">
          {mes}
        </span>
      </div>
      <div className="bg-primary/8 flex flex-col items-center pt-1.5 pb-2 px-1">
        <span className="font-display text-2xl text-primary leading-none">{dia}</span>
        <span className="text-[9px] text-primary/50 leading-none mt-1">{ano}</span>
      </div>
    </div>
  );
}

function AudioPlayer({ formacao }: { formacao: Formacao }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mt-3 space-y-2">
      <div className="rounded-2xl bg-primary/8 border border-primary/20 p-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPlaying(!playing)}
            className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 shadow-gold"
          >
            {playing ? (
              <Pause className="h-4 w-4 text-white" />
            ) : (
              <Play className="h-4 w-4 text-white ml-0.5" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Áudio da etapa</p>
            <p className="text-xs text-muted-foreground">{formacao.duracao}</p>
            <div className="mt-1.5 h-1 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
                style={{ width: playing ? "30%" : "0%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {formacao.videoUrl && (
        <button className="w-full rounded-2xl border border-border bg-muted/50 py-2.5 flex items-center gap-2 px-4 text-sm text-muted-foreground font-medium">
          <Video className="h-3.5 w-3.5 shrink-0" />
          <span>Assistir gravação em vídeo</span>
          <ChevronRight className="h-3.5 w-3.5 ml-auto" />
        </button>
      )}
    </div>
  );
}

function Caminhos() {
  const [openYears, setOpenYears] = useState<Set<number>>(new Set([2026]));
  const [openFormacaoId, setOpenFormacaoId] = useState<number | null>(null);

  const proximas = formacoes.filter((f) => f.tipo === "proxima");
  const passadas = formacoes.filter((f) => f.tipo === "passada");

  const formacoesByYear = passadas.reduce<Record<number, Formacao[]>>((acc, f) => {
    const year = parseInt(f.ano);
    if (!acc[year]) acc[year] = [];
    acc[year].push(f);
    return acc;
  }, {});
  const anos = Object.keys(formacoesByYear).map(Number).sort((a, b) => b - a);

  const toggleYear = (year: number) => {
    setOpenYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  const toggleFormacao = (id: number) => {
    setOpenFormacaoId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative pb-4">

      {/* Header — logo centralizada igual à home */}
      <header className="px-6 pt-12 pb-4 flex items-center justify-center">
        <img src={logo} alt="Divina Providência" className="h-14 w-auto" />
      </header>

      {/* Título da página */}
      <div className="px-6 mb-5">
        <div className="flex items-center gap-2 mb-0.5">
          <RouteIcon className="h-5 w-5 text-primary" />
          <h2 className="font-display text-3xl text-foreground">Caminhos</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Um percurso de formação espiritual para o discipulado
        </p>
      </div>

      {/* Hero box — community4 */}
      <div className="px-6 mb-6">
        <div className="relative rounded-3xl overflow-hidden shadow-gold glow-card" style={{ minHeight: 220 }}>
          <img src={community4} alt="Caminhos" className="absolute inset-0 h-full w-full object-cover scale-110 object-center" />
          <div className="absolute inset-0 bg-linear-to-b from-primary/55 via-primary/35 to-black/80" />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 h-28 w-28 rounded-full bg-white/20 blur-2xl" />

          <div className="relative flex flex-col items-center text-center px-6 pt-8 pb-7">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white border border-white/30">
              <RouteIcon className="h-3 w-3" /> Grupo de Formação
            </span>

            <h2 className="font-display text-3xl text-white mt-3 leading-tight drop-shadow">
              Caminhos
            </h2>

            <p className="text-white/85 text-sm mt-2 leading-relaxed max-w-[260px]">
              Crescer como discípulo e missionário de Cristo através de etapas de formação.
            </p>
          </div>
        </div>
      </div>

      {/* Versículo */}
      <div className="px-6 mb-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-gold-deep px-6 py-5 shadow-gold glow-card">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-3 -top-1 font-display text-9xl text-white/10 leading-none select-none pointer-events-none">
            "
          </div>
          <p className="font-display text-xl text-primary-foreground leading-relaxed italic relative z-10">
            "Mostra-me, Senhor, os teus caminhos; ensina-me as tuas veredas."
          </p>
          <div className="mt-4">
            <p className="text-xs text-primary-foreground/65 font-semibold tracking-wide text-center">
              Salmo 25:4
            </p>
          </div>
        </div>
      </div>

      {/* Próximas etapas */}
      <section className="mb-6">
        <div className="px-6 mb-3 flex items-center justify-between">
          <h3 className="font-display text-lg text-foreground">Próximas Etapas</h3>
          <span className="text-sm text-primary font-medium">{proximas.length} agendadas</span>
        </div>
        <div className="px-6 space-y-3">
          {proximas.map((f) => (
            <article key={f.id} className="rounded-3xl bg-card-warm border border-border p-4 shadow-soft glow-card">
              <div className="flex items-start gap-3">
                <DateBox mes={f.mes} dia={f.dia} ano={f.ano} />
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-foreground leading-snug">{f.tema}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                    <p className="text-sm text-muted-foreground">{f.diaSemana}, {f.horario}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                    <p className="text-sm text-muted-foreground">{f.local}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Mic className="h-3 w-3 text-primary shrink-0" />
                    <p className="text-sm text-primary font-medium">{f.pregador}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Etapas anteriores — arquivo por ano */}
      <section>
        <div className="px-6 mb-3">
          <h3 className="font-display text-lg text-foreground">Etapas Anteriores</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {passadas.length} etapas · áudios e vídeos salvos
          </p>
        </div>
        <div className="px-6 space-y-2">
          {anos.map((ano) => {
            const lista = formacoesByYear[ano];
            const isOpen = openYears.has(ano);
            return (
              <div key={ano} className="rounded-3xl bg-card-warm border border-border shadow-soft overflow-hidden glow-card">
                <button
                  onClick={() => toggleYear(ano)}
                  className="w-full flex items-center justify-between px-4 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl text-foreground">{ano}</span>
                    <span className="text-sm text-muted-foreground">
                      {lista.length} {lista.length === 1 ? "etapa" : "etapas"}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-border divide-y divide-border">
                    {lista.map((f) => {
                      const expanded = openFormacaoId === f.id;
                      return (
                        <div key={f.id}>
                          <button
                            onClick={() => toggleFormacao(f.id)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left"
                          >
                            <DateBox mes={f.mes} dia={f.dia} ano={f.ano} />
                            <div className="flex-1 min-w-0">
                              <p className="text-base text-foreground font-medium truncate">
                                {f.tema}
                              </p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <Mic className="h-3 w-3 text-primary shrink-0" />
                                <p className="text-xs text-primary font-medium truncate">
                                  {f.pregador}
                                </p>
                                {f.duracao && (
                                  <span className="text-xs text-muted-foreground">
                                    · {f.duracao}
                                    {f.videoUrl && " · vídeo"}
                                  </span>
                                )}
                              </div>
                            </div>
                            {expanded ? (
                              <ChevronDown className="h-4 w-4 text-primary shrink-0 rotate-180 transition-transform" />
                            ) : (
                              <Play className="h-3.5 w-3.5 text-primary shrink-0" />
                            )}
                          </button>

                          {expanded && f.audioUrl && (
                            <div className="px-4 pb-4">
                              <AudioPlayer formacao={f} />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
