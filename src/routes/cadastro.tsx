import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import authBg from "@/assets/auth-bg.jpg";
import logo from "@/assets/logo-divina-horizontal.png";

export const Route = createFileRoute("/cadastro")({
  component: CadastroPage,
});

function CadastroPage() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    sessionStorage.setItem("divina:visited", "true");
    navigate({ to: "/" });
  }

  return (
    <div className="relative min-h-screen flex justify-center">
      <img src={authBg} alt="" className="fixed inset-0 h-full w-full object-cover" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/75" />
      <div className="relative w-full max-w-[440px] min-h-screen flex flex-col px-6 pt-14 pb-10">
        <button
          onClick={() => navigate({ to: "/splash" })}
          className="self-start text-white/85 text-sm font-medium"
        >
          ← Voltar
        </button>

        <div className="flex-1 flex flex-col justify-center py-6">
          <div className="flex flex-col items-center mb-8">
            <h1 className="font-display text-white text-3xl text-center">
              Criar conta
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-2">
              <label className="text-white/90 text-xs font-semibold uppercase tracking-wider">
                Nome completo
              </label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/18 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/90 text-xs font-semibold uppercase tracking-wider">
                E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/18 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/90 text-xs font-semibold uppercase tracking-wider">
                Senha
              </label>
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/18 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full py-4 rounded-2xl bg-white text-[#8a5e10] font-bold text-sm shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Criar conta
            </button>

            {/* Divisor */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-white/25" />
              <span className="text-white/50 text-xs font-medium">ou</span>
              <div className="flex-1 h-px bg-white/25" />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem("divina:visited", "true");
              }}
              className="w-full py-3.5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/18 text-white font-semibold text-sm flex items-center justify-center gap-3 hover:bg-white/15 active:scale-[0.99] transition"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continuar com Google
            </button>

            <p className="text-center text-white/80 text-sm mt-1">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-white font-semibold underline-offset-4 underline">
                Entrar
              </Link>
            </p>
          </form>
        </div>

        <div className="mt-8 flex justify-center">
          <img
            src={logo}
            alt="Divina Providência"
            className="h-12 w-auto opacity-95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}
