---
description: Atualiza o catálogo de customizações do fork em sync-fork.md com base nas alterações recentes. Detecta arquivos modificados/criados, cruza com o catálogo existente e guia a adição, remoção ou atualização de entradas.
agent: build
---

Você está atualizando o catálogo de customizações do fork em `.opencode/commands/sync-fork.md` com base nas alterações feitas desde a última sincronização com o upstream.

**Regra fundamental:** O catálogo em sync-fork.md é a fonte da verdade para o que o fork modificou intencionalmente. Ele precisa estar preciso para que `/check-upstream` e `/sync-fork` funcionem corretamente.

## Fase 1 — Levantamento das alterações

Execute estes comandos para identificar o que mudou:

```bash
# Commits desde o último merge com upstream (se houver)
git log --oneline --format="%h %ad %s" --date=short upstream/main..HEAD 2>/dev/null || echo "(sem upstream configurado)"

# Commits desde a última tag
BASE=$(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)
git log --oneline -30 "$BASE"..HEAD

# Arquivos modificados (staged + unstaged)
git diff --name-only HEAD
git diff --name-only --cached

# Arquivos novos não rastreados (excluindo node_modules, .opencode)
git ls-files --others --exclude-standard --exclude=.opencode
```

## Fase 2 — Análise dos arquivos alterados

Para cada arquivo modificado ou novo (excluindo `.opencode/commands/sync-fork.md` e o próprio `update-fork-catalog.md`):

1. **Este arquivo representa uma divergência intencional do upstream?**
   - Pergunte ao usuário se a alteração é uma customização do fork ou apenas uma mudança funcional normal.
   - Se for mudança normal (algo que o upstream aceitaria), **não** adicione ao catálogo.

2. **O arquivo já existe no catálogo?**
   - Leia a tabela em `.opencode/commands/sync-fork.md`.
   - Compare o arquivo com a coluna "Arquivos" de cada linha.
   - Se existir: verifique se a descrição/precisa ser atualizada, ou se a entrada deve ser removida (se a customização foi revertida).
   - Se não existir: colete as informações para criar uma nova entrada.

3. **Para cada customização identificada, colete:**
   - Nome descritivo curto (ex: "Tema personalizado do painel de LOG")
   - Lista de arquivos envolvidos
   - Estratégia de merge (geralmente "Manter versão do fork")

## Fase 3 — Interação com o usuário

Após identificar cada potencial customização, confirme com o usuário:
- Se a mudança é uma customização intencional do fork
- Qual o nome/descrição apropriada
- Se há outros arquivos relacionados que deveriam estar na mesma entrada

## Fase 4 — Atualização do catálogo

Com base nas respostas:

1. **Nova customização**: Adicione uma nova linha na tabela em `.opencode/commands/sync-fork.md` com o próximo número sequencial.

2. **Customização existente modificada**: Atualize a linha existente — arquivos, descrição, estratégia.

3. **Customização revertida**: Remova a linha da tabela e renumere as entradas seguintes.

4. **Customização que mudou de escopo**: Atualize a lista de arquivos na linha existente.

## Fase 5 — Consistência

Verifique se o catálogo está consistente:
- Numeração sequencial (sem buracos)
- Nenhum arquivo aparece em mais de uma entrada (se aparecer, sugira mesclar ou dividir)
- Todas as linhas têm as 4 colunas preenchidas: `#`, `Customização`, `Arquivos`, `Estratégia`

## Relatório final (pt-BR)

Produza um resumo em português do Brasil com:
- Customizações adicionadas: N (listar)
- Customizações atualizadas: N (listar)
- Customizações removidas: N (listar)
- Link para o catálogo atualizado: `.opencode/commands/sync-fork.md`
