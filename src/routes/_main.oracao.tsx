import { createFileRoute } from "@tanstack/react-router";
import { logo } from "@/components/MobileShell";
import {
  Bell,
  BellOff,
  Check,
  X,
  Play,
  Pause,
  Video,
  Clock,
  MapPin,
  Mic,
  ChevronRight,
  ChevronDown,
  SendHorizonal,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_main/oracao")({
  component: MembrosElo,
  head: () => ({ meta: [{ title: "Membros do 1º Elo — Divina Providência" }] }),
});

type RSVP = "confirmado" | "ausente" | null;

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
    tema: "A Vida na Graça — 4ª Formação",
    tipo: "proxima",
    pregador: "Diác. Marcos Oliveira",
  },
  {
    id: 2,
    dia: "24",
    mes: "AGO",
    ano: "2026",
    diaSemana: "Segunda-feira",
    horario: "19h30",
    local: "Salão Paroquial",
    tema: "Vocação e Missão — 5ª Formação",
    tipo: "proxima",
    pregador: "Pe. Ricardo Souza",
  },
  {
    id: 3,
    dia: "27",
    mes: "JUL",
    ano: "2026",
    diaSemana: "Domingo",
    horario: "10h00",
    local: "Salão Paroquial",
    tema: "Fé e Compromisso — 3ª Formação",
    tipo: "passada",
    pregador: "Diác. Marcos Oliveira",
    duracao: "1h 12min",
    audioUrl: "#",
  },
  {
    id: 4,
    dia: "13",
    mes: "JUL",
    ano: "2026",
    diaSemana: "Domingo",
    horario: "10h00",
    local: "Salão Paroquial",
    tema: "O Espírito Santo na Nossa Vida — 2ª Formação",
    tipo: "passada",
    pregador: "Pe. Ricardo Souza",
    duracao: "58min",
    audioUrl: "#",
    videoUrl: "#",
  },
  {
    id: 5,
    dia: "29",
    mes: "JUN",
    ano: "2026",
    diaSemana: "Domingo",
    horario: "10h00",
    local: "Salão Paroquial",
    tema: "Introdução ao 1º Elo — 1ª Formação",
    tipo: "passada",
    pregador: "Diác. Carlos Ferreira",
    duracao: "1h 05min",
    audioUrl: "#",
  },
  // 2025
  {
    id: 6,
    dia: "14",
    mes: "DEZ",
    ano: "2025",
    diaSemana: "Domingo",
    horario: "10h00",
    local: "Salão Paroquial",
    tema: "Natal e Encarnação — 12ª Formação",
    tipo: "passada",
    pregador: "Pe. Ricardo Souza",
    duracao: "1h 03min",
    audioUrl: "#",
  },
  {
    id: 7,
    dia: "30",
    mes: "NOV",
    ano: "2025",
    diaSemana: "Domingo",
    horario: "10h00",
    local: "Salão Paroquial",
    tema: "Esperança e Advento — 11ª Formação",
    tipo: "passada",
    pregador: "Diác. Marcos Oliveira",
    duracao: "52min",
    audioUrl: "#",
    videoUrl: "#",
  },
  {
    id: 8,
    dia: "16",
    mes: "NOV",
    ano: "2025",
    diaSemana: "Domingo",
    horario: "10h00",
    local: "Salão Paroquial",
    tema: "A Cruz e a Ressurreição — 10ª Formação",
    tipo: "passada",
    pregador: "Pe. Ricardo Souza",
    duracao: "1h 08min",
    audioUrl: "#",
  },
  {
    id: 9,
    dia: "02",
    mes: "NOV",
    ano: "2025",
    diaSemana: "Domingo",
    horario: "10h00",
    local: "Salão Paroquial",
    tema: "Memória e Comunhão dos Santos — 9ª Formação",
    tipo: "passada",
    pregador: "Diác. Carlos Ferreira",
    duracao: "55min",
    audioUrl: "#",
  },
  {
    id: 10,
    dia: "19",
    mes: "OUT",
    ano: "2025",
    diaSemana: "Domingo",
    horario: "10h00",
    local: "Salão Paroquial",
    tema: "Oração e Silêncio — 8ª Formação",
    tipo: "passada",
    pregador: "Diác. Marcos Oliveira",
    duracao: "1h 01min",
    audioUrl: "#",
    videoUrl: "#",
  },
];

// Date box — same design for both próximas and anteriores
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
            <p className="text-sm font-semibold text-foreground">Áudio da formação</p>
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

function JustificativaModal({
  tema,
  data,
  onSave,
  onClose,
}: {
  tema: string;
  data: string;
  onSave: (text: string) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 backdrop-blur-sm">
      <div className="w-full max-w-110 bg-card border-t border-border rounded-t-3xl px-6 pt-4 pb-28 shadow-elegant animate-in slide-in-from-bottom">
        {/* Drag handle */}
        <div className="flex justify-center mb-4">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Header centralizado */}
        <div className="relative flex items-center justify-center mb-1">
          <h3 className="font-display text-xl text-foreground">Justificativa de Ausência</h3>
          <button
            onClick={onClose}
            className="absolute right-0 h-8 w-8 rounded-full bg-muted flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground text-center mb-5">
          {tema} — {data}
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Descreva o motivo da sua ausência..."
          className="w-full h-20 rounded-2xl bg-input border border-border p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary"
          autoFocus
        />
        <button
          onClick={() => {
            onSave(text);
            onClose();
          }}
          className="w-full mt-3 py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-gold flex items-center justify-center gap-2"
        >
          <SendHorizonal className="h-4 w-4" />
          Enviar justificativa
        </button>
      </div>
    </div>
  );
}

function MembrosElo() {
  const [rsvps, setRsvps] = useState<Record<number, RSVP>>({});
  const [justificativas, setJustificativas] = useState<Record<number, string>>({});
  const [justificativaAberta, setJustificativaAberta] = useState<number | null>(null);
  const [notificacoes, setNotificacoes] = useState(false);
  const [showNotifPrompt, setShowNotifPrompt] = useState(false);
  const [openYears, setOpenYears] = useState<Set<number>>(new Set([2026]));

  useEffect(() => {
    const jaPergunhou = localStorage.getItem("divina:elo:notif-asked");
    if (!jaPergunhou) {
      const t = setTimeout(() => setShowNotifPrompt(true), 600);
      return () => clearTimeout(t);
    }
  }, []);
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

  const responderPrompt = (ativar: boolean) => {
    localStorage.setItem("divina:elo:notif-asked", "true");
    setShowNotifPrompt(false);
    if (ativar) {
      setNotificacoes(true);
      toast.success("Notificações ativadas", {
        description: "Você será avisado antes de cada formação do 1º Elo.",
      });
    }
  };

  const toggleNotificacoes = () => {
    const novoEstado = !notificacoes;
    setNotificacoes(novoEstado);
    if (novoEstado) {
      toast.success("Notificações ativadas", {
        description: "Você será avisado antes de cada formação do 1º Elo.",
      });
    }
  };

  const handleRSVP = (id: number, value: RSVP) => {
    setRsvps((prev) => ({ ...prev, [id]: value }));
    if (value === "ausente") {
      setJustificativaAberta(id);
    }
  };

  const salvarJustificativa = (id: number, text: string) => {
    if (text.trim()) {
      setJustificativas((prev) => ({ ...prev, [id]: text.trim() }));
    }
  };

  const formacaoAberta = formacoes.find((f) => f.id === justificativaAberta);

  return (
    <div className="relative pb-4">

      {/* Header — logo centralizada */}
      <header className="px-6 pt-12 pb-4 relative flex items-center justify-center">
        <img src={logo} alt="Divina Providência" className="h-14 w-auto" />
        <button
          onClick={toggleNotificacoes}
          className={`absolute right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border flex items-center justify-center shadow-soft transition-all ${
            notificacoes ? "bg-primary/10 border-primary/30" : "bg-card border-border"
          }`}
          aria-label={notificacoes ? "Desativar notificações" : "Ativar notificações"}
        >
          {notificacoes ? (
            <Bell className="h-4 w-4 text-primary" />
          ) : (
            <BellOff className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </header>

      {/* Título */}
      <div className="px-6 mb-5">
        <h2 className="font-display text-3xl text-foreground">Membros do 1º Elo</h2>
        <p className="text-sm text-muted-foreground mt-1">Formação e compromisso</p>
      </div>

      {/* Versículo — tamanhos intocados */}
      <div className="px-6 mb-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-gold-deep px-6 py-5 shadow-gold glow-card">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -left-3 -top-1 font-display text-9xl text-white/10 leading-none select-none pointer-events-none">
            "
          </div>
          <p className="font-display text-xl text-primary-foreground leading-relaxed italic relative z-10">
            "E se alguém prevalecer contra um, dois lhe resistirão; e o cordão de três dobras não se quebra tão depressa."
          </p>
          <div className="mt-4">
            <p className="text-xs text-primary-foreground/65 font-semibold tracking-wide text-center">
              Eclesiastes 4:12
            </p>
          </div>
        </div>
      </div>

      {/* Próximas formações */}
      <section className="mb-6">
        <div className="px-6 mb-3 flex items-center justify-between">
          <h3 className="font-display text-lg text-foreground">Próximas Formações</h3>
          <span className="text-sm text-primary font-medium">{proximas.length} agendadas</span>
        </div>
        <div className="px-6 space-y-3">
          {proximas.map((f) => {
            const rsvp = rsvps[f.id] ?? null;
            return (
              <article key={f.id} className="rounded-3xl bg-card-warm border border-border p-4 shadow-soft glow-card">
                <div className="flex items-start gap-3">
                  <DateBox mes={f.mes} dia={f.dia} ano={f.ano} />
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-foreground leading-snug">{f.tema}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Clock className="h-3 w-3 text-muted-foreground shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        {f.diaSemana}, {f.horario}
                      </p>
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

                {/* RSVP */}
                <div className="mt-3 pt-3 border-t border-border">
                  {rsvp === null && (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">Confirme sua presença:</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRSVP(f.id, "confirmado")}
                          className="flex-1 py-2 rounded-xl bg-emerald-500/15 text-emerald-700 text-sm font-semibold border border-emerald-500/30 flex items-center justify-center gap-1.5 transition-all active:scale-95"
                        >
                          <Check className="h-3.5 w-3.5" /> Confirmar presença
                        </button>
                        <button
                          onClick={() => handleRSVP(f.id, "ausente")}
                          className="flex-1 py-2 rounded-xl bg-muted text-muted-foreground text-sm font-semibold border border-border flex items-center justify-center gap-1.5 transition-all active:scale-95"
                        >
                          <X className="h-3.5 w-3.5" /> Não poderei ir
                        </button>
                      </div>
                    </>
                  )}

                  {rsvp === "confirmado" && (
                    <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                      <p className="text-sm text-emerald-700 font-semibold">Presença confirmada!</p>
                      <button
                        onClick={() => handleRSVP(f.id, null)}
                        className="ml-auto text-xs text-muted-foreground underline"
                      >
                        Alterar
                      </button>
                    </div>
                  )}

                  {rsvp === "ausente" && (
                    <div className="flex items-start gap-2 py-2 px-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                      <X className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-rose-600 font-semibold">Ausência registrada</p>
                        {justificativas[f.id] ? (
                          <p className="text-xs text-muted-foreground mt-0.5 italic line-clamp-2">
                            "{justificativas[f.id]}"
                          </p>
                        ) : (
                          <button
                            onClick={() => setJustificativaAberta(f.id)}
                            className="text-xs text-primary font-medium mt-0.5"
                          >
                            + Adicionar justificativa
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleRSVP(f.id, null)}
                        className="text-xs text-muted-foreground underline shrink-0"
                      >
                        Alterar
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Formações anteriores — arquivo por ano */}
      <section>
        <div className="px-6 mb-3">
          <h3 className="font-display text-lg text-foreground">Formações Anteriores</h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {passadas.length} formações · áudios e vídeos salvos
          </p>
        </div>
        <div className="px-6 space-y-2">
          {anos.map((ano) => {
            const lista = formacoesByYear[ano];
            const isOpen = openYears.has(ano);
            return (
              <div key={ano} className="rounded-3xl bg-card-warm border border-border shadow-soft overflow-hidden glow-card">
                {/* Year header */}
                <button
                  onClick={() => toggleYear(ano)}
                  className="w-full flex items-center justify-between px-4 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl text-foreground">{ano}</span>
                    <span className="text-sm text-muted-foreground">
                      {lista.length} {lista.length === 1 ? "formação" : "formações"}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Formation rows */}
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

      {/* Prompt de notificações — primeiro acesso */}
      {showNotifPrompt && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 backdrop-blur-sm">
          <div className="w-full max-w-110 bg-card border-t border-border rounded-t-3xl px-6 pt-4 pb-28 shadow-elegant animate-in slide-in-from-bottom">
            <div className="flex justify-center mb-4">
              <div className="h-1 w-10 rounded-full bg-border" />
            </div>

            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-1">
                Ativar notificações?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Deseja receber lembretes antes de cada formação do{" "}
                <span className="font-semibold text-foreground">1º Elo</span>?
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => responderPrompt(true)}
                className="w-full py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-semibold shadow-gold flex items-center justify-center gap-2"
              >
                <Bell className="h-4 w-4" />
                Sim, quero ser avisado
              </button>
              <button
                onClick={() => responderPrompt(false)}
                className="w-full py-3 rounded-2xl bg-muted text-muted-foreground font-semibold text-sm"
              >
                Agora não
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Justificativa modal */}
      {justificativaAberta !== null && formacaoAberta && (
        <JustificativaModal
          tema={formacaoAberta.tema}
          data={`${formacaoAberta.dia} ${formacaoAberta.mes} ${formacaoAberta.ano}`}
          onSave={(text) => salvarJustificativa(justificativaAberta, text)}
          onClose={() => setJustificativaAberta(null)}
        />
      )}
    </div>
  );
}
