export interface Ocorrencia {
  id: number;
  descricao: string;
  local: string;
  risco: "baixo" | "medio" | "alto";
  data: string;
}