import { Ocorrencia } from "../types/Ocorrencia";

// Dados de exemplo, usados apenas para referência/testes manuais.
// Não são carregados automaticamente no app: a lista real vem sempre
// do AsyncStorage (ver src/services/ocorrenciasService.ts).
export const mockOcorrencias: Ocorrencia[] = [
  {
    id: 1,
    descricao: "Buraco na pista",
    local: "Rodovia SP-330",
    risco: "alto",
    data: "15/06/2026",
  },
  {
    id: 2,
    descricao: "Sinalização danificada",
    local: "Km 120",
    risco: "medio",
    data: "14/06/2026",
  },
];
