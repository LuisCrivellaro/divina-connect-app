import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { Home, Calendar, Shield, Sparkles, User } from "lucide-react";
import logo from "@/assets/logo-divina.png";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/agenda", label: "Agenda", icon: Calendar },
  { to: "/oracao", label: "1º Elo", icon: Shield },
  { to: "/adoracao", label: "Adoração", icon: Sparkles },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function MobileShell() {
  const location = useLocation();

  // Randomise shine-sweep delays so cards don't all shimmer at the same time
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".glow-card").forEach((el, i) => {
      el.style.setProperty("--shine-delay", `${(i * 1.4) % 7}s`);
    });
  }, [location.pathname]);

  // Mouse spotlight: set CSS vars on the hovered .glow-card
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const card = (e.target as Element).closest<HTMLElement>(".glow-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
      card.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
      card.style.setProperty("--go", "1");
    }
    function onOut(e: MouseEvent) {
      const card = (e.target as Element).closest<HTMLElement>(".glow-card");
      if (!card || card.contains(e.relatedTarget as Node)) return;
      card.style.setProperty("--go", "0");
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div className="min-h-screen flex justify-center texture-grain">
      <div className="w-full max-w-[440px] min-h-screen bg-gradient-warm relative pb-28 shadow-elegant">
        <div className="absolute inset-0 bg-gradient-radial-gold pointer-events-none opacity-60" />
        <div className="relative">
          <Outlet />
        </div>

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50 px-4 pb-4">
          <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-elegant px-2 py-1.5">
            <ul className="flex items-center justify-between">
              {tabs.map((t) => {
                const active = location.pathname === t.to;
                const Icon = t.icon;
                return (
                  <li key={t.to} className="flex-1">
                    <Link
                      to={t.to}
                      className="flex flex-col items-center gap-0.5 py-1 px-1 rounded-xl transition-all"
                    >
                      <span
                        className={`flex items-center justify-center h-8 w-8 rounded-xl transition-all ${
                          active
                            ? "bg-gradient-primary text-primary-foreground shadow-gold"
                            : "text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" strokeWidth={active ? 2.5 : 1.75} />
                      </span>
                      <span
                        className={`text-[9px] font-medium ${
                          active ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {t.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  showLogo = false,
}: {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
}) {
  return (
    <header className="px-6 pt-12 pb-6">
      {showLogo && (
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Divina Providência" className="h-14 w-auto" />
        </div>
      )}
      <h1 className="font-display text-3xl text-foreground text-center">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-1 text-center">{subtitle}</p>}
    </header>
  );
}

export { logo };
