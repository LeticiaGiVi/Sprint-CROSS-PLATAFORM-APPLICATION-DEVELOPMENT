import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";

import ListaOcorrenciasScreen from "./src/screens/Lista";
import CadastroOcorrenciaScreen from "./src/screens/Cadastro";
import DetalheOcorrenciaScreen from "./src/screens/Detalhe";
import { Ocorrencia } from "./src/types/Ocorrencia";
import * as ocorrenciasService from "./src/services/ocorrenciasService";

type Tela = "lista" | "cadastro" | "detalhe";

export default function App() {
  const [tela, setTela] = useState<Tela>("lista");
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [selecionada, setSelecionada] = useState<Ocorrencia | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Carrega os dados persistidos assim que o app abre.
  // É isso que garante que, ao fechar e reabrir o app, a lista
  // apareça exatamente como estava.
  useEffect(() => {
    async function carregarDados() {
      const salvas = await ocorrenciasService.getOcorrencias();
      setOcorrencias(salvas);
      setCarregando(false);
    }
    carregarDados();
  }, []);

  async function handleSalvarOcorrencia(dados: {
    descricao: string;
    local: string;
    risco: Ocorrencia["risco"];
  }) {
    const atualizadas = await ocorrenciasService.adicionarOcorrencia(dados);
    setOcorrencias(atualizadas);
    setTela("lista");
  }

  function handleSelecionarOcorrencia(ocorrencia: Ocorrencia) {
    setSelecionada(ocorrencia);
    setTela("detalhe");
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />

      {tela === "cadastro" && (
        <CadastroOcorrenciaScreen
          onSalvar={handleSalvarOcorrencia}
          voltar={() => setTela("lista")}
        />
      )}

      {tela === "detalhe" && selecionada && (
        <DetalheOcorrenciaScreen
          ocorrencia={selecionada}
          voltar={() => setTela("lista")}
        />
      )}

      {tela === "lista" && (
        <ListaOcorrenciasScreen
          ocorrencias={ocorrencias}
          carregando={carregando}
          onNovaOcorrencia={() => setTela("cadastro")}
          onSelecionar={handleSelecionarOcorrencia}
        />
      )}
    </>
  );
}
