import { Ocorrencia } from "@/types/Ocorrencia";

export const RISCO_LABEL: Record<Ocorrencia["risco"], string> = {
  baixo: "BAIXO",
  medio: "MÉDIO",
  alto: "ALTO",
};

export const RISCO_COR: Record<Ocorrencia["risco"], string> = {
  baixo: "#2ECC71",
  medio: "#F1C40F",
  alto: "#E74C3C",
};
