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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem("divina:visited", "true"); // ← marca sessão iniciada
    navigate({ to: "/" });
  }

  return (
    <div className="relative min-h-screen flex justify-center">
      <img src={authBg} alt="" className="fixed inset-0 h-full w-full object-cover" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/75" />
      <div className="relative w-full max-w-[440px] min-h-screen flex flex-col px-6 pt-14 pb-10">
        <button
          onClick={() => navigate({ to: "/splash" })} // ← era "/", agora é "/splash"
          className="self-start text-white/85 text-sm font-medium"
        >
          ← Voltar
        </button>

        <div className="flex-1 flex flex-col justify-center py-6">
          <div className="flex flex-col items-center mb-8">
            <h1 className="font-display text-white text-3xl text-center">
              Criar conta
            </h1>
            <p className="text-white/75 text-sm mt-2 text-center">
              Faça parte da Comunidade Divina Providência
            </p>
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
                className="w-full px-4 py-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 transition"
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
                className="w-full px-4 py-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 transition"
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
                className="w-full px-4 py-3.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 transition"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full py-4 rounded-2xl bg-white text-[#8a5e10] font-bold text-sm shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              Criar conta
            </button>

            <p className="text-center text-white/80 text-sm mt-2">
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