import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ocorrencia } from "../types/Ocorrencia";

// Chave usada no AsyncStorage. Centralizada aqui para evitar strings
// "mágicas" espalhadas pelo app.
const STORAGE_KEY = "@rodovia_app:ocorrencias";

/**
 * Camada de persistência das ocorrências.
 *
 * Nenhuma tela deve importar o AsyncStorage diretamente: todo acesso
 * ao armazenamento passa por estas funções, o que facilita trocar a
 * estratégia de persistência no futuro (ex: API remota) sem alterar
 * as telas.
 */

/**
 * Lê e retorna todas as ocorrências salvas no dispositivo.
 * Se ainda não houver nada salvo, retorna um array vazio.
 */
export async function getOcorrencias(): Promise<Ocorrencia[]> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    const dados = JSON.parse(json);
    return Array.isArray(dados) ? dados : [];
  } catch (error) {
    console.error("Erro ao ler ocorrências do AsyncStorage:", error);
    return [];
  }
}

/**
 * Substitui a lista inteira salva no dispositivo.
 * Uso interno; as demais funções do serviço chamam esta.
 */
async function salvarOcorrencias(ocorrencias: Ocorrencia[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ocorrencias));
  } catch (error) {
    console.error("Erro ao salvar ocorrências no AsyncStorage:", error);
    throw error;
  }
}

/**
 * Cria uma nova ocorrência, persiste no AsyncStorage e retorna a
 * lista atualizada (nova ocorrência no início da lista).
 */
export async function adicionarOcorrencia(dados: {
  descricao: string;
  local: string;
  risco: Ocorrencia["risco"];
}): Promise<Ocorrencia[]> {
  const atuais = await getOcorrencias();

  const nova: Ocorrencia = {
    id: Date.now(),
    descricao: dados.descricao,
    local: dados.local,
    risco: dados.risco,
    data: new Date().toLocaleDateString("pt-BR"),
  };

  const atualizadas = [nova, ...atuais];
  await salvarOcorrencias(atualizadas);
  return atualizadas;
}

/**
 * Busca uma ocorrência específica pelo id.
 */
export async function getOcorrenciaPorId(
  id: number
): Promise<Ocorrencia | undefined> {
  const todas = await getOcorrencias();
  return todas.find((o) => o.id === id);
}

/**
 * Remove todas as ocorrências salvas. Útil para testes/reset manual.
 */
export async function limparOcorrencias(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
