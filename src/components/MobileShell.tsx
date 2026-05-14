import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Home, Calendar, Bell, Heart, Sparkles, Image as ImageIcon, User } from "lucide-react";
import logo from "@/assets/logo-divina.png";

const tabs = [
  { to: "/", label: "Início", icon: Home },
  { to: "/agenda", label: "Agenda", icon: Calendar },
  { to: "/avisos", label: "Avisos", icon: Bell },
  { to: "/adoracao", label: "Adoração", icon: Sparkles },
  { to: "/oracao", label: "Oração", icon: Heart },
  { to: "/galeria", label: "Galeria", icon: ImageIcon },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function MobileShell() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex justify-center texture-grain">
      <div className="w-full max-w-[440px] min-h-screen bg-gradient-warm relative pb-28 shadow-elegant">
        <div className="absolute inset-0 bg-gradient-radial-gold pointer-events-none opacity-60" />
        <div className="relative">
          <Outlet />
        </div>

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50 px-3 pb-3 pt-2">
          <div className="bg-card/85 backdrop-blur-xl border border-border rounded-3xl shadow-elegant px-2 py-2">
            <ul className="flex items-center justify-between">
              {tabs.map((t) => {
                const active = location.pathname === t.to;
                const Icon = t.icon;
                return (
                  <li key={t.to} className="flex-1">
                    <Link
                      to={t.to}
                      className="flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-2xl transition-all"
                    >
                      <span
                        className={`flex items-center justify-center h-9 w-9 rounded-2xl transition-all ${
                          active
                            ? "bg-gradient-primary text-primary-foreground shadow-gold"
                            : "text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.5 : 2} />
                      </span>
                      <span
                        className={`text-[10px] font-medium ${
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
      <h1 className="font-display text-3xl text-foreground">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </header>
  );
}

export { logo };
