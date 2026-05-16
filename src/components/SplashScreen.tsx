import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import logoFull from "@/assets/logo-divina-full.png";

export function SplashScreen() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"in" | "hold" | "out" | "done">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 900);
    return () => clearTimeout(t1);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ease-out ${
        phase === "out" ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
      style={{ backgroundColor: "#D29320" }}
      aria-hidden={phase === "out"}
    >
      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.18), transparent 60%)",
        }}
      />

      {/* Top-left wordmark chip */}
      <div
        className={`absolute top-6 left-6 transition-all duration-700 ${
          phase === "in" ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white text-[11px] font-medium tracking-widest uppercase">
          Comunidade
        </span>
      </div>

      {/* Top-right dots */}
      <div
        className={`absolute top-7 right-7 flex gap-1.5 transition-all duration-700 delay-100 ${
          phase === "in" ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
      </div>

      {/* Centered logo */}
      <div
        className={`relative flex items-center justify-center transition-all duration-1000 ease-out ${
          phase === "in"
            ? "opacity-0 scale-90"
            : phase === "out"
            ? "opacity-0 scale-110"
            : "opacity-100 scale-100"
        }`}
      >
        <div className="absolute inset-0 -m-10 rounded-full bg-white/10 blur-2xl animate-pulse" />
        <img
          src={logoFull}
          alt="Divina Providência"
          className="relative h-auto w-[78%] max-w-[320px] drop-shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
        />
      </div>

      {/* Bottom buttons */}
      <div
        className={`absolute bottom-8 left-6 right-6 flex gap-3 transition-all duration-700 delay-200 ${
          phase === "in"
            ? "opacity-0 translate-y-4"
            : phase === "out"
            ? "opacity-0 translate-y-2"
            : "opacity-100 translate-y-0"
        }`}
      >
        <button
          onClick={() => navigate({ to: "/login" })}
          className="flex-1 py-3.5 rounded-2xl bg-white text-[#8a5e10] font-semibold text-sm shadow-lg active:scale-95 transition"
        >
          Entrar
        </button>
        <button
          onClick={() => navigate({ to: "/cadastro" })}
          className="flex-1 py-3.5 rounded-2xl bg-white/25 backdrop-blur text-white font-semibold text-sm border border-white/30 active:scale-95 transition"
        >
          Cadastrar-se
        </button>
      </div>
    </div>
  );
}
