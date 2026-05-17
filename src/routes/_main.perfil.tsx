import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/MobileShell";
import { Bell, Calendar, ChevronRight, LogOut, Settings, Shield, X, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_main/perfil")({
  component: Perfil,
  head: () => ({ meta: [{ title: "Perfil — Divina Providência" }] }),
});

type Panel = "notificacoes" | "eventos" | "privacidade" | "configuracoes" | "sair" | null;

const meusEventos = [
  { titulo: "Grupo de Oração", data: "12 Fev · 19h30", local: "Salão Paroquial" },
  { titulo: "Missa da Comunidade", data: "18 Fev · 10h00", local: "Igreja Matriz" },
  { titulo: "Acampamento de Verão", data: "15 Fev · 08h00", local: "Sítio São José" },
];

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${value ? "bg-gradient-primary" : "bg-muted"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 backdrop-blur-sm">
      <div className="w-full max-w-110 bg-card border-t border-border rounded-t-3xl shadow-elegant animate-in slide-in-from-bottom">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
          <h3 className="font-display text-xl text-foreground">{title}</h3>
          <button onClick={onClose} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function Perfil() {
  const [panel, setPanel] = useState<Panel>(null);
  const [notif, setNotif] = useState({ eventos: true, avisos: true, oracao: false, missa: true });
  const [priv, setPriv] = useState({ pedidosPublicos: true, perfilVisivel: true, compartilharPresenca: false });
  const [conf, setConf] = useState({ modoEscuro: false, reducaoMovimento: false, tamanhoFonte: false });
  const [sairConfirm, setSairConfirm] = useState(false);

  const items = [
    { icon: Bell, label: "Notificações", panel: "notificacoes" as Panel },
    { icon: Calendar, label: "Meus eventos", panel: "eventos" as Panel },
    { icon: Shield, label: "Privacidade", panel: "privacidade" as Panel },
    { icon: Settings, label: "Configurações", panel: "configuracoes" as Panel },
  ];

  return (
    <div className="stagger">
      <ScreenHeader title="Perfil" showLogo />

      {/* Card do usuário */}
      <section className="px-6">
        <div className="rounded-3xl bg-gradient-gold-deep p-6 shadow-gold relative overflow-hidden glow-card">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="flex items-center gap-4 relative">
            <div className="h-20 w-20 rounded-full bg-card border-4 border-primary-foreground/30 flex items-center justify-center font-display text-3xl text-primary">
              MA
            </div>
            <div>
              <h2 className="font-display text-2xl text-primary-foreground">Maria Andrade</h2>
              <span className="inline-flex items-center gap-1.5 mt-1 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground">
                <Shield className="h-3 w-3" /> Membro Comprometido
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="px-6 mt-6 space-y-2">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <button
              key={it.label}
              onClick={() => setPanel(it.panel)}
              className="w-full flex items-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-soft glow-card transition-all active:scale-[0.98]"
            >
              <div className="h-9 w-9 rounded-xl bg-primary/15 flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-foreground font-medium flex-1 text-left">{it.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          );
        })}

        <button
          onClick={() => setSairConfirm(true)}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border border-destructive/40 text-destructive font-medium text-sm mt-2 transition-all active:scale-[0.98]"
        >
          <LogOut className="h-4 w-4" /> Sair da conta
        </button>
      </section>

      {/* ── Painel: Notificações ── */}
      <Sheet open={panel === "notificacoes"} onClose={() => setPanel(null)} title="Notificações">
        <div className="space-y-1">
          {([
            { key: "eventos", label: "Novos eventos", sub: "Alertas sobre eventos da agenda" },
            { key: "avisos", label: "Avisos da comunidade", sub: "Comunicados e novidades" },
            { key: "oracao", label: "Pedidos de oração", sub: "Quando alguém posta um pedido" },
            { key: "missa", label: "Lembretes de missa", sub: "Notificação antes da missa" },
          ] as const).map((n) => (
            <div key={n.key} className="flex items-center justify-between py-4 border-b border-border last:border-0">
              <div>
                <p className="text-sm text-foreground font-medium">{n.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.sub}</p>
              </div>
              <Toggle value={notif[n.key]} onChange={() => setNotif((v) => ({ ...v, [n.key]: !v[n.key] }))} />
            </div>
          ))}
        </div>
      </Sheet>

      {/* ── Painel: Meus eventos ── */}
      <Sheet open={panel === "eventos"} onClose={() => setPanel(null)} title="Meus eventos">
        {meusEventos.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">Nenhum evento confirmado ainda.</p>
        ) : (
          <div className="space-y-3">
            {meusEventos.map((e) => (
              <div key={e.titulo} className="flex items-start gap-3 p-4 rounded-2xl bg-muted">
                <div className="h-8 w-8 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 shadow-gold">
                  <Check className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-foreground font-semibold">{e.titulo}</p>
                  <p className="text-xs text-muted-foreground">{e.data}</p>
                  <p className="text-xs text-muted-foreground">{e.local}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Sheet>

      {/* ── Painel: Privacidade ── */}
      <Sheet open={panel === "privacidade"} onClose={() => setPanel(null)} title="Privacidade">
        <div className="space-y-1">
          {([
            { key: "pedidosPublicos", label: "Pedidos de oração públicos", sub: "Seu nome aparece nos pedidos" },
            { key: "perfilVisivel", label: "Perfil visível na comunidade", sub: "Outros membros podem te ver" },
            { key: "compartilharPresenca", label: "Compartilhar presença", sub: "Notificar quando confirmar evento" },
          ] as const).map((p) => (
            <div key={p.key} className="flex items-center justify-between py-4 border-b border-border last:border-0">
              <div>
                <p className="text-sm text-foreground font-medium">{p.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{p.sub}</p>
              </div>
              <Toggle value={priv[p.key]} onChange={() => setPriv((v) => ({ ...v, [p.key]: !v[p.key] }))} />
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
          Seus dados são usados somente dentro da comunidade e nunca compartilhados com terceiros.
        </p>
      </Sheet>

      {/* ── Painel: Configurações ── */}
      <Sheet open={panel === "configuracoes"} onClose={() => setPanel(null)} title="Configurações">
        <div className="space-y-1">
          {([
            { key: "modoEscuro", label: "Modo escuro", sub: "Tema escuro no app" },
            { key: "reducaoMovimento", label: "Reduzir animações", sub: "Desativa efeitos de movimento" },
            { key: "tamanhoFonte", label: "Fonte maior", sub: "Aumenta o tamanho do texto" },
          ] as const).map((c) => (
            <div key={c.key} className="flex items-center justify-between py-4 border-b border-border last:border-0">
              <div>
                <p className="text-sm text-foreground font-medium">{c.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.sub}</p>
              </div>
              <Toggle value={conf[c.key]} onChange={() => setConf((v) => ({ ...v, [c.key]: !v[c.key] }))} />
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">Divina Connect · versão 1.0.0</p>
        </div>
      </Sheet>

      {/* ── Modal: Sair ── */}
      {sairConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-background/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-card border border-border rounded-3xl p-6 shadow-elegant animate-in zoom-in-95">
            <div className="h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <LogOut className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="font-display text-xl text-foreground text-center">Sair da conta?</h3>
            <p className="text-sm text-muted-foreground text-center mt-2 leading-relaxed">
              Você precisará entrar novamente para acessar o app.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSairConfirm(false)}
                className="flex-1 py-3 rounded-2xl bg-muted text-foreground text-sm font-medium"
              >
                Cancelar
              </button>
              <button className="flex-1 py-3 rounded-2xl bg-destructive text-white text-sm font-semibold">
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
