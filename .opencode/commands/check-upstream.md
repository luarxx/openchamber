---
description: Verifica o upstream (btriapitsyn/openchamber) e determina se vale a pena sincronizar o fork. Analisa os commits pendentes, classifica por tipo/impacto e cruza com as customizações do fork para prever conflitos. Relatório final em pt-BR com recomendação.
agent: build
---

Você está analisando o upstream (`btriapitsyn/openchamber`) para decidir se o fork (`luarxx/openchamber`) deve ser sincronizado.

**Este comando é somente leitura — não faça merge, não modifique arquivos.**

## Pre-flight

1. Busque o upstream:
   ```
   git fetch upstream --tags
   ```
2. Liste os commits pendentes com data:
   ```
   git log --oneline --format="%h %ad %s" --date=short origin/main..upstream/main
   ```
3. Estatísticas da diferença:
   ```
   git diff --stat origin/main...upstream/main
   git diff --shortstat origin/main...upstream/main
   ```

## Análise dos commits pendentes

Para cada commit do upstream, classifique-o em uma das categorias abaixo:

| Categoria | Peso | Significado |
|---|---|---|
| `feature` | Alto | Nova funcionalidade, melhoria de experiência |
| `fix` | Alto | Correção de bug (especialmente crashes, vazamentos, segurança) |
| `perf` | Médio | Melhoria de performance, redução de latência |
| `security` | Crítico | Correção de vulnerabilidade |
| `refactor` | Baixo | Reorganização interna sem mudança funcional |
| `chore` | Baixo | Manutenção, deps, docs, CI |
| `ui` | Médio | Mudança visual ou de componente (risco de conflito com fork) |

## Cruzamento com customizações do fork

Consulte o catálogo de customizações em `.opencode/commands/sync-fork.md` e cruze cada arquivo alterado pelo upstream com a lista de arquivos customizados pelo fork.

Arquivos com customização do fork que o upstream também alterou representam **conflitos certos** e precisam de mesclagem manual.

Para cada arquivo em conflito, determine:
- O que o upstream mudou (peça funcional do diff)
- O que o fork mudou (customização)
- Se a mudança do upstream é compatível com a customização do fork

## Recomendação

Com base na análise, classifique a sincronização como:

| Classificação | Critério |
|---|---|
| **URGENTE** | Correção de segurança, crash que afeta o fork, breaking change no ecossistema |
| **Recomendado** | Features significativas, múltiplos bug fixes relevantes, melhorias de performance notáveis |
| **Opcional** | Mudanças menores, poucos conflitos, benefício marginal |
| **Não recomendado** | Apenas chores/docs, muitos conflitos de alto risco, mudanças que quebram customizações sem ganho |

## Relatório final (pt-BR)

Produza um relatório em português do Brasil com as seguintes seções:

### Resumo executivo

2-3 frases resumindo o cenário: quantos commits, quantos arquivos alterados, impacto geral. Comece com a recomendação em **negrito** (ex: **Recomendado — vale a pena sincronizar**).

### Commits pendentes

Liste cada commit com:
- SHA abreviado e título
- Categoria (feature/fix/perf/chore/ui)
- 1 frase descrevendo o que mudou e por que importa

Agrupe por categoria, ordene por importância (security > fix > feature > perf > ui > chore).

### Arquivos em conflito com o fork

Tabela com:

| Arquivo | Customização do fork (#) | Mudança do upstream | Risco |
|---|---|---|---|

Se não houver conflitos, informe "Nenhum conflito previsto com as customizações do fork."

### Mudanças que valem a pena

Lista do que realmente agrega valor ao fork se sincronizado — priorize features, bug fixes relevantes e melhorias de performance.

### Mudanças que NÃO valem a pena

Lista do que não justifica o esforço — chores cosméticos, mudanças que conflitam desnecessariamente com customizações, etc.

### Esforço estimado

- Arquivos sem conflito: N (merge automático)
- Arquivos com conflito: N (mesclagem manual)
- Complexidade: Baixa / Média / Alta

### Recomendação final

**Classificação** (Urgente / Recomendado / Opcional / Não recomendado) com justificativa de 2-3 frases.

### Próximos passos

- Se **Urgente** ou **Recomendado**: execute `/sync-fork` para fazer o merge.
- Se **Opcional**: pode esperar acumular mais mudanças no upstream.
- Se **Não recomendado**: aguarde o próximo ciclo.
