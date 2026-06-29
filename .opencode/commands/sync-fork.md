---
description: Sincroniza o fork (luarxx/openchamber) com o upstream (btriapitsyn/openchamber). Mescla alterações preservando as customizações de UI do fork. Relatório final em pt-BR.
agent: build
---

Você está sincronizando este fork (`luarxx/openchamber`) com o upstream (`btriapitsyn/openchamber`).
Sua diretiva principal é **mesclar as alterações do upstream sem quebrar as customizações de UI do fork.**

## Pre-flight

1. Adicione o remote upstream se não existir:
   ```
   git remote add upstream https://github.com/btriapitsyn/openchamber.git
   ```
2. Busque as alterações do upstream:
   ```
   git fetch upstream --tags
   ```
3. Liste os commits pendentes do upstream:
   ```
   git log --oneline origin/main..upstream/main
   ```
4. Inspecione os arquivos alterados antes de fazer merge:
   ```
   git diff --stat origin/main...upstream/main
   git diff --name-only origin/main...upstream/main
   ```

## Estratégia de merge

### Fase 1 — Arquivos de backend primeiro

Faça merge das alterações do upstream que **não** mexem em código de UI/apresentação. Aceite a versão upstream para:

- Lógica do servidor (`packages/web/server/lib/**`)
- CLI (`packages/web/bin/**`)
- Extension host do VS Code (`packages/vscode/src/**`)
- Configuração de build, scripts, ferramental, CI
- Definições de tipo que não alteram props de componentes

Esta fase deve aplicar sem conflitos na maioria dos casos. Resolva conflitos triviais a favor do upstream quando o fork não tiver divergência intencional.

### Fase 2 — Arquivos de UI/componentes (ALTA CAUTELA)

Antes de mexer em qualquer arquivo de UI, carregue e siga rigorosamente estas regras do AGENTS.md:
- **Sistema de tema**: Todas as cores devem usar theme tokens via `packages/ui/src/lib/theme/` — nunca valores hardcoded ou classes de cor raw do Tailwind. Ícones devem usar o componente `Icon` compartilhado do sistema de sprite SVG — nunca importar de `@remixicon/react` diretamente.
- **Primitivos de UI**: Reutilize os primitivos compartilhados em `packages/ui/src/components/ui/` (wrappers Base UI) antes de introduzir novos padrões de marcação.
- **Disciplina de stores**: Nunca amplie o fanout. Agrupe estado por frequência de mudança e conjunto de assinantes. Use seletores folha. Preserve igualdade referencial.
- **Performance**: Sem iteração em hot-path. Filtre operações caras atrás de verificações baratas. Pule atualizações no-op.

Para cada arquivo que tiver **tanto** alterações do upstream **quanto** divergência do fork:

1. Leia a versão do fork primeiro para entender a customização intencional.
2. Leia a versão do upstream para entender qual feature/bugfix está sendo adicionado.
3. **Mescle manualmente**: carregue a customização de UI do fork enquanto integra a mudança de lógica do upstream.
4. Se a customização for puramente visual (tema, layout, escolha de componente), **mantenha a versão do fork** e reaplique apenas o patch de lógica do upstream sobre ela.
5. Se o upstream adicionar um componente ou página totalmente novo, integre-o seguindo os padrões de componentes existentes no fork (verifique arquivos vizinhos para convenções).

### Fase 3 — Regras de resolução de conflitos

| Tipo de conflito | Resolução |
|---|---|
| CSS/cor do upstream vs theme token do fork | Mantenha o theme token do fork, descarte a cor raw do upstream |
| Import de ícone do upstream (`@remixicon/react`) vs `Icon` do fork | Mantenha o uso de `Icon` do fork |
| Novo componente do upstream vs padrões de componente do fork | Use os padrões do fork (wrappers Base UI, Tailwind v4, theme vars, tipografia de `packages/ui/src/lib/typography.ts`) |
| Mudança de store do upstream vs arquitetura de store do fork | Mantenha a separação de stores do fork. Nunca adicione estado de alta frequência em stores amplas. |
| Upstream adiciona uma nova dependência | Instale apenas se a feature do upstream genuinamente exigir. Não adicione dep só porque o upstream adicionou. |
| Conflito trivial (espaçamento, ordem de imports) | Aceite a versão do upstream |

### Fase 4 — Execução do merge

```
git merge upstream/main --no-commit --no-ff
```

Resolva conflitos manualmente seguindo as regras acima. **Nunca** use `--strategy-option theirs` ou `--strategy-option ours` em arquivos que mexeram em código de UI — resolva linha por linha.

### Fase 5 — Validação

Após resolver todos os conflitos e antes de commitar:

1. Rode type-check nos pacotes que tiveram alterações:
   ```
   bun run type-check
   ```
2. Rode lint:
   ```
   bun run lint
   ```
3. Se algum arquivo alterado pertence a um módulo documentado (listado no mapa de documentação do AGENTS.md), releia seu `DOCUMENTATION.md` e verifique se o merge não violou o contrato.
4. Para alterações em arquivos de UI, verifique:
   - Nenhuma cor hardcoded — apenas theme tokens
   - Nenhum import de `@remixicon/react` — apenas `Icon` compartilhado
   - Nenhuma classe de cor raw do Tailwind (ex: `text-red-500`, `bg-blue-600`)
   - Primitivos de `packages/ui/src/components/ui/` usados onde aplicável

**Não faça push.** Commite apenas quando a validação passar.

### Commit

```
git commit -m "sync: merge upstream/main — preserve fork UI customizations"
```

Descreva no corpo do commit todos os conflitos resolvidos e quais arquivos foram mantidos na versão do fork.

## Relatório final (pt-BR)

Após o merge ser commitado (mas **não** enviado com push), produza um resumo em português do Brasil com as seguintes seções:

### Commits do upstream mergeados

Liste os SHAs e títulos dos commits mergeados de `upstream/main`.

### Arquivos alterados

Agrupe por pacote e classifique cada arquivo conforme a disposição do merge:

- `(upstream)` — sem divergência do fork, versão upstream aplicada diretamente.
- `(mesclado)` — ambos os lados tinham alterações, reconciliado manualmente.
- `(mantido fork)` — customização intencional do fork preservada, alteração do upstream descartada.
- `(integrado)` — funcionalidade/arquivo novo do upstream adaptado aos padrões do fork.

### Customizações do fork preservadas

Liste cada alteração específica do fork que foi mantida durante o merge e o motivo.

### Novas funcionalidades integradas

Liste funcionalidades do upstream que são novas para o fork e como foram adaptadas (se necessário).

### Resultado da validação

Saída do `type-check` e `lint`, mais quaisquer verificações manuais realizadas.

### Próximos passos

- Se a validação passou: o merge está pronto para revisão e push para `origin/main`.
- Se a validação falhou: liste as falhas e o que precisa ser corrigido antes do push.
