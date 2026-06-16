import React, { createContext, useContext, useState } from "react";
import { Ocorrencia } from "../interfaces/Ocorrencias";
import { mockOcorrencias } from "../data/mock";

// =====================
// TIPOS
// =====================
type OcorrenciasContextType = {
  ocorrencias: Ocorrencia[];
  adicionarOcorrencia: (
    descricao: string,
    local: string,
    risco: "baixo" | "medio" | "alto"
  ) => void;
};

// =====================
// CONTEXTO
// =====================
const OcorrenciasContext = createContext<OcorrenciasContextType | null>(null);

// =====================
// PROVIDER
// =====================
export function OcorrenciasProvider({ children }: { children: React.ReactNode }) {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>(mockOcorrencias);

  function adicionarOcorrencia(
    descricao: string,
    local: string,
    risco: "baixo" | "medio" | "alto"
  ) {
    const nova: Ocorrencia = {
      id: Date.now(),
      descricao,
      local,
      risco,
      data: new Date().toLocaleDateString("pt-BR"),
    };
    setOcorrencias((prev) => [nova, ...prev]);
  }

  return (
    <OcorrenciasContext.Provider value={{ ocorrencias, adicionarOcorrencia }}>
      {children}
    </OcorrenciasContext.Provider>
  );
}

// =====================
// HOOK
// =====================
export function useOcorrencias() {
  const ctx = useContext(OcorrenciasContext);
  if (!ctx) throw new Error("useOcorrencias deve ser usado dentro de OcorrenciasProvider");
  return ctx;
}