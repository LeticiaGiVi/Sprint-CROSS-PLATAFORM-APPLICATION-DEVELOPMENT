APP para solução para vegetação alta em trechos da rodovia, para o gestor/supervisor, nele o usuario pode ver o tamanho da grama nos entronos da pista e as ocorrencias, a principal ação do app é facilitar a visualização do crescimento do crescimento da grama e dos registros de cresciemento para facilitar a gestão de equipes

## Integrantes 


| Nome  | função |
|---|---|
| Leticia | organização + Git |
| Giovanna | lógica (estado) |
| Sarah | telas |
| Luize | modelagem (types) |
| Livia | Design(figma)|
| Guilherme | navegação|

### Ciência da computação - 2CCR
---


2. Funcionalidades do app (MVP)

O app vai ter:
Cadastro de ocorrência
Listagem de ocorrências
Visualização de detalhe
Classificação de risco (baixo, médio, alto)
visualização do mapa
visualização das equipes


# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Estrutura do projeto

```
src/
  screens/      # Telas do app (Lista, Cadastro, Detalhe)
  components/   # Componentes reutilizáveis (OcorrenciaCard)
  types/        # Tipos TypeScript (Ocorrencia)
  data/         # Dados de exemplo (mock, não usados em runtime)
  services/     # Toda a persistência (AsyncStorage) fica aqui
```

## Modelagem

```typescript
export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;
  risco: "baixo" | "medio" | "alto";
  data: string;
};
```

## Fluxo do app

1. **Criar**: na tela de Lista, toque em "+ Nova Ocorrência" → preencha
   descrição, local e risco → "Salvar". O app chama
   `ocorrenciasService.adicionarOcorrencia`, que grava no AsyncStorage.
2. **Listar**: ao voltar do cadastro, a Lista é atualizada com o novo item
   imediatamente (sem reiniciar o app), pois o `App.tsx` guarda o estado em
   memória e o atualiza com o retorno do service.
3. **Ver detalhe**: toque em qualquer card da lista para abrir a tela de
   Detalhe, que mostra descrição, local, risco (com selo colorido) e data.
4. **Reabrir o app**: ao fechar e abrir o app novamente, o `App.tsx` chama
   `ocorrenciasService.getOcorrencias()` assim que monta (`useEffect`), e a
   Lista aparece exatamente como estava antes de fechar — os dados nunca
   dependem de estado em memória sozinho.