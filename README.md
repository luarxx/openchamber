# OpenChamber

Fork de [openchamber](https://github.com/btriapitsyn/openchamber).

Este repositório é uma cópia do projeto original com **modificações na UI** para uso pessoal. O projeto original foi criado por [btriapitsyn](https://github.com/btriapitsyn).

Visão geral do OpenChamber Desktop com o layout inspirado no VSCode, explorador de arquivos à esquerda, editor de código + terminal integrado ao centro, e painel de chat com o agente de IA à direita:
<img width="2560" height="989" alt="Captura de tela do OpenChamber Desktop: explorador de arquivos à esquerda, editor Markdown + terminal ao centro, chat do agente com diff de commit à direita" src="https://github.com/user-attachments/assets/d5bff7eb-ad10-4bc4-87bd-6faaebede5e3" />


---

## Sobre o Projeto Original

OpenChamber é uma interface rica para [OpenCode](https://opencode.ai). Permite revisar diffs, gerenciar agentes, rodar dev servers e manter uma visão geral enquanto sua IA programa.

![OpenChamber Chat](docs/references/chat_example.png)

### Por que usar OpenChamber?

- **Continuidade entre dispositivos**: Comece no TUI, continue no tablet/phone, volte ao terminal — mesma sessão
- **Acesso remoto**: Use o OpenCode de qualquer lugar via navegador
- **Familiaridade**: Uma alternativa visual para desenvolvedores que preferem fluxos de trabalho com GUI

## Funcionalidades

### Core (todas as versões)

- Timeline de chat com branching usando `/undo`, `/redo` e forks com um clique de turnos anteriores
- UIs inteligentes para diffs, operações de arquivos, permissões e progresso de tarefas longas
- Modo de voz com entrada de fala e respostas em áudio para workflows mãos-livres
- Execuções multi-agente a partir de um prompt com worktrees isolados para comparações seguras lado a lado
- Workflows Git no app: identidades, commits, criação de PR, checks e ações de merge
- Workflows nativos do GitHub: inicie sessões a partir de issues e pull requests com contexto já anexado
- Modo Plan/Build com uma visualização dedicada para planejar e iterar etapas de implementação
- Comentários inline em diffs, arquivos e planos que podem ser enviados de volta ao agente
- Ferramentas de visibilidade de contexto (breakdowns de token/custo, inspeção de mensagens e resumos de atividade)
- Terminal integrado com sessões por diretório e desempenho estável em saídas pesadas
- Catálogo de skills integrado e gerenciamento local de skills para automações reutilizáveis

### Web / PWA

- Modelo de acesso via tunnel com modos Cloudflare `quick`, `managed-remote` e `managed-local`
- Onboarding com QR code + helpers de URL com senha
- Experiência mobile-first: controles de chat otimizados, layouts seguros para teclado e UI amigável a anexos
- Notificações em background e rastreamento de atividade entre abas
- Fluxo de auto-atualização + reinicialização que preserva as configurações do servidor

### Desktop (macOS + Windows)

- Mini Chat flutuante: mantenha um assistente sempre visível ao lado do seu editor, navegador ou terminal
- Múltiplas janelas nativas para projetos ou sessões separadas
- Notificações nativas para alertas de tarefas enquanto o OpenChamber está oculto
- Abra no VS Code, Cursor, Terminal, Finder, Explorer e mais com um clique
- Switcher de host desktop para instâncias locais e remotas do OpenChamber
- Gerenciamento conveniente de tunnel sem configuração manual
- Conexões via deep-link para acessar OpenChamber remoto a partir de um link
- Acesso remoto via SSH com import de host, gerenciamento de conexão e port forwarding

### Extensão VS Code

- Workflow nativo do editor: abra arquivos diretamente da saída de ferramentas e mantenha sessões ao lado do seu código
- Agent Manager para execuções paralelas multi-modelo a partir de um prompt
- Ações de clique-direito para adicionar contexto, explicar seleções e melhorar código in-place
- Configurações na extensão, layout responsivo e mapeamento de temas que combina com seu editor
- Ciclo de vida robusto e health checks para inicialização mais rápida e menos estados de reconexão travados

### Customizações

- 18+ temas embutidos com variantes claro/escuro
- Temas personalizados via arquivos JSON em `~/.config/openchamber/themes/` — hot reload, sem reinício
- Atalhos de teclado configuráveis para chat, painéis e serviços
- Controles de tamanho de fonte, espaçamento, raio de bordura e layout
- Ícones de projeto personalizáveis com upload e descoberta automática de favicon
- Catálogo de skills e gerenciamento local de skills para automação reutilizável

---

## Modificações neste Fork

- **Alterações na UI** — Modificações visuais e de interface do usuário para atender necessidades específicas. O visual ficou semelhante ao VSCode, para quem é acostumado com a interface dele.

---

## Início Rápido

> **Pré-requisito:** [OpenCode CLI](https://opencode.ai) instalado.

### Desktop (macOS + Windows)
Baixe em [Releases](https://github.com/btriapitsyn/openchamber/releases).

### VS Code
Instale via [Marketplace](https://marketplace.visualstudio.com/items?itemName=fedaykindev.openchamber) ou pesquise "OpenChamber" nas Extensões.

### CLI (Web + PWA)
_requer Node.js 22+_

```bash
curl -fsSL https://raw.githubusercontent.com/btriapitsyn/openchamber/main/scripts/install.sh | bash
openchamber --ui-password sua-senha-aqui
```

---

## Reconhecimentos

Projeto independente, não afiliado à equipe do OpenCode.

**Agradecimentos especiais:**

- [OpenCode](https://opencode.ai) — Pela excelente API e arquitetura extensível.
- [Flexoki](https://github.com/kepano/flexoki) — Esquema de cores lindo criado por [Steph Ango](https://stephango.com/flexoki).
- [Pierre](https://pierrejs-docs.vercel.app/) — Visualizador de diffs rápido e bonito com syntax highlighting.
- [Ghostty-web](https://github.com/coder/ghostty-web) — Ótima implementação do renderer web do Ghostty.
- [David Hill](https://x.com/iamdavidhill) — Que me inspirou a lançar isso sem [ficar pensando demais](https://x.com/iamdavidhill/status/1993648326450020746).
- [A esposa do autor](https://github.com/yulia-ivashko), que — sem nenhuma experiência com IA — sentou pela primeira vez no app e construiu a celebração de fogos que toca a cada push bem-sucedido.
- Cada contribuidor que moldou este projeto com seus PRs, ideias e atenção aos detalhes.

## Contribuindo

Consulte [CONTRIBUTING.md](./CONTRIBUTING.md) para configuração de desenvolvimento e diretrizes.

## Licença

MIT
