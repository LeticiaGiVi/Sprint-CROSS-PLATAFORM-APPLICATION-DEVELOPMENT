# Motiva – Gestão de Ocorrências em Rodovias
 
Aplicativo mobile para **gestores e supervisores de rodovia** registrarem e acompanharem ocorrências de vegetação alta nas margens da pista, classificando cada uma por nível de risco.
  
---
##  Integrantes
 
**Ciência da Computação – 2CCR**
 
| Nome | RM | Função |
|---|---|---|
| Giovanna | RM562018 | Lógica (estado) |
| Guilherme | RM565319 | Navegação |
| Leticia | RM564028 | Organização + Git |
| Livia | RM562967 | Design (Figma) |
| Luize | RM564016 | Modelagem (types) |
| Sarah | RM563841 | Telas |

---

##  O problema
 
A vegetação alta nas margens das rodovias reduz a visibilidade, esconde sinalização e aumenta o risco de acidentes. Hoje, o acompanhamento costuma ser disperso e difícil de priorizar.
 
- **Usuário:** gestor/supervisor responsável por equipes de manutenção da rodovia.
- **Ação principal:** **registrar uma ocorrência** (local, descrição e nível de risco) e acompanhá-la em uma lista, priorizando o que é mais crítico.

##  O que o app faz
 
- Cadastro de ocorrência
- Listagem de ocorrências
- Detalhe da ocorrência
- Classificação de risco (baixo, médio, alto) visível na lista e no detalhe
- Persistência local: os dados continuam disponíveis ao fechar e reabrir o app

---
 
## Estrutura de pastas
 
```
.
├── app.json
├── package.json
└── src/
    ├── app/                        # rotas (Expo Router)
    │   ├── _layout.tsx             # Stack de navegação
    │   ├── index.tsx               # Lista
    │   ├── cadastro.tsx            # Cadastro
    │   └── ocorrencia/[id].tsx     # Detalhe
    ├── components/
    │   └── OcorrenciaCard.tsx
    ├── types/
    │   ├── Ocorrencia.ts
    │   └── risco.ts                # rótulos e cores de risco
    ├── data/
    │   └── mock.ts
    └── services/
        └── ocorrenciasService.ts   # persistência (AsyncStorage)
```
 
##  Tipo `Ocorrencia`
 
Definido em `src/types/Ocorrencia.ts`:
 
```typescript
export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;
  risco: "baixo" | "medio" | "alto";
  data: string;
};
```
 
**Onde é usado:**
 
| Arquivo | Uso |
|---|---|
| `app/index.tsx`, `app/ocorrencia/[id].tsx` | Tipam o estado com as ocorrências carregadas |
| `services/ocorrenciasService.ts` | Tipa leitura, criação e busca de ocorrências |
| `components/OcorrenciaCard.tsx` | Tipa a prop do card e o mapa de cores de risco |
| `app/cadastro.tsx` | Tipa o campo de risco |
 
---
 
##  Como rodar
 
**Pré-requisitos:** Node.js (versão LTS)

Stack: Expo SDK 58, React Native 0.88, React 19 e Expo Router.
 
```bash
npm install
npx expo install --fix   # alinha as versões ao SDK
npx expo start
```
 
Depois, escaneie o QR Code com o Expo Go (Android) ou com a câmera (iOS). Também é possível pressionar `a` (emulador Android), `i` (simulador iOS) ou `w` (navegador) no terminal.
 
---
 
##  Comportamento esperado
 
1. **Abrir o app:** a lista aparece (vazia na primeira execução, com a mensagem "Nenhuma ocorrência cadastrada.").
2. **Criar:** toque em **+ Nova Ocorrência**, preencha descrição e local, escolha o risco (baixo, médio ou alto) e toque em **Salvar**.
3. **Ver na lista:** o app volta para a lista e o novo card aparece no topo, com o selo de risco.
4. **Abrir o detalhe:** toque no card para ver ID, descrição, local, risco e data. Use **Voltar** para retornar.
5. **Fechar e reabrir o app:** feche o app por completo e abra de novo. As ocorrências cadastradas continuam na lista.
Os campos descrição e local são obrigatórios; sem eles o app exibe um alerta e não salva.
 
##  Classificação de risco
 
O risco aparece como selo colorido **no card da lista** e **no detalhe**:
 
| Risco | Cor | Significado |
|---|---|---|
| BAIXO | Verde | Situação monitorada, sem urgência |
| MÉDIO | Amarelo | Requer atenção e planejamento |
| ALTO | Vermelho | Prioridade para ação da equipe |
 
---
 
##  Vídeo
 
https://youtu.be/5RSoLEBdJJw?is=LX4NmXmkEjTdSBvP