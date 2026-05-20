import { createContext, useContext, useEffect, useState } from "react";

const USER_ID = "MA"; // replaced by real auth ID when auth is implemented

export type Settings = {
  modoEscuro: boolean;
  reducaoMovimento: boolean;
  tamanhoFonte: boolean;
};

const DEFAULTS: Settings = {
  modoEscuro: false,
  reducaoMovimento: false,
  tamanhoFonte: false,
};

function storageKey(uid: string) {
  return `divina:cfg:${uid}`;
}

function load(uid: string): Settings {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(storageKey(uid)) ?? "{}") };
  } catch {
    return DEFAULTS;
  }
}

function applyToDOM(s: Settings) {
  const h = document.documentElement;
  h.classList.toggle("dark", s.modoEscuro);
  h.classList.toggle("reduce-motion", s.reducaoMovimento);
  h.classList.toggle("font-large", s.tamanhoFonte);
}

type SettingsCtx = { cfg: Settings; toggle: (k: keyof Settings) => void };
const SettingsContext = createContext<SettingsCtx | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [cfg, setCfg] = useState<Settings>(() => {
    const s = load(USER_ID);
    applyToDOM(s);
    return s;
  });

  useEffect(() => {
    applyToDOM(cfg);
    localStorage.setItem(storageKey(USER_ID), JSON.stringify(cfg));
  }, [cfg]);

  const toggle = (k: keyof Settings) => setCfg((p) => ({ ...p, [k]: !p[k] }));

  return (
    <SettingsContext.Provider value={{ cfg, toggle }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be inside SettingsProvider");
  return ctx;
}
