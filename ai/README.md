# 🤖 Ecossistema de Avaliação por Agentes de IA

Este diretório contém a estrutura de agentes de Inteligência Artificial e a documentação para automatizar e otimizar a avaliação de desempenho individual e em grupo dos alunos. O objetivo é permitir que agentes de IA (como GitHub Copilot, Claude ou ChatGPT) leiam e interpretem as entregas do projeto, validando as rubricas acadêmicas associadas e a participação individual de cada estudante.

## 📂 Estrutura do Diretório

A organização do ambiente dos agentes está estruturada da seguinte forma:

- [ai/README.md](ai/README.md) (este arquivo): Visão geral do ecossistema e instruções de uso.
- [ai/evaluation-blueprint.md](ai/evaluation-blueprint.md): Plano de avaliação de rubricas e mapeamento detalhado entre tarefas, entregas e critérios de notas.
- [ai/agents/contribution-analyst.prompt.md](ai/agents/contribution-analyst.prompt.md): Prompt de sistema e instruções para o Agente Analista de Contribuição Real.
- [ai/agents/rubric-assessor.prompt.md](ai/agents/rubric-assessor.prompt.md): Prompt de sistema e instruções para o Agente Assessor de Rubricas baseado em Contribuição Real.
- [ai/templates/student-evaluation-report-template.md](ai/templates/student-evaluation-report-template.md): Modelo padrão de relatório de avaliação gerado para cada estudante.
- [ai/templates/group-evaluation-report-template.md](ai/templates/group-evaluation-report-template.md): Modelo padrão de relatório consolidado para o grupo.

---

## 👥 Os Agentes de IA

Este ecossistema define dois agentes especializados que devem ser instanciados/executados na revisão do repositório:

### 1. Agente Analista de Contribuições (Contribution Analyst)
- **Função**: Analisar a real participação de cada estudante (lógica e documental) a partir de seus commits do Git nas pastas chaves, mapeando com o arquivo mestre [STUDENTS.md](../../STUDENTS.md) da raiz.
- **Entradas principais**:
  - Cadastro de Alunos em [STUDENTS.md](../../STUDENTS.md).
  - Portais de acompanhamento e feedback individuais localizados na pasta [docs/atas/](docs/atas/).
- **Instruções**: Localizadas em [ai/agents/contribution-analyst.prompt.md](ai/agents/contribution-analyst.prompt.md).

### 2. Agente Assessor de Rubricas (Rubric Assessor)
- **Função**: Avaliar qualitativa e quantitativamente o cumprimento de cada uma das 13 rubricas do projeto para cada estudante, calculando a porcentagem de conclusão individual, escrevendo essas informações diretamente nas respectivas páginas de cada aluno.
- **Entradas principais**:
  - Código-fonte em [src/](src/).
  - Documentos de etapas: [docs/contexto.md](docs/contexto.md), [docs/backend-apis.md](docs/backend-apis.md), [docs/frontend-web.md](docs/frontend-web.md) e [docs/frontend-mobile.md](docs/frontend-mobile.md).
  - Resultados gerados pelo Agente Analista de Contribuições.
- **Instruções**: Localizadas em [ai/agents/rubric-assessor.prompt.md](ai/agents/rubric-assessor.prompt.md).

---

## 🚀 Como Usar os Agentes de IA para Avaliação

Os agentes definidos neste ambiente podem ser invocados manualmente por professores ou integrados a pipelines de CI/CD para emitir relatórios periódicos de avaliação.

### Uso Manual via Chat de IA (GitHub Copilot, ChatGPT, Claude)

Use o seguinte fluxo de prompts para instruir sua IA a realizar a avaliação do projeto:

#### Passo 1: Executar Análise de Contribuições
1. Abra o arquivo de prompt [ai/agents/contribution-analyst.prompt.md](ai/agents/contribution-analyst.prompt.md).
2. Copie o conteúdo completo e envie para o chat do seu assistente de IA no contexto deste repositório.
3. A IA gerará um relatório detalhado de participação ativa e preenchimento dos diários semanais de evolução para cada aluno.

#### Passo 2: Executar Avaliação de Rubricas
1. Abra o arquivo de prompt [ai/agents/rubric-assessor.prompt.md](ai/agents/rubric-assessor.prompt.md).
2. Copie o conteúdo completo e envie para o chat, fornecendo também o relatório gerado no Passo 1.
3. A IA executará a varredura completa da documentação e do código-fonte para mapear cada entrega às rubricas associadas e calcular o percentual de conclusão individual.

### Uso Automatizado via Claude Code

Em vez do fluxo manual acima, é possível rodar `/avaliar-etapa` diretamente no Claude Code (ver [.claude/commands/avaliar-etapa.md](../.claude/commands/avaliar-etapa.md)). O comando lê automaticamente o `STUDENTS.md`, o blueprint de rubricas e o histórico do Git, e já escreve os pareceres curtos e objetivos diretamente em `docs/atas/alunoX.md` e `docs/feedback/etapaX.md`. Exemplos:
- `/avaliar-etapa` — avalia todas as etapas ativas para todos os alunos.
- `/avaliar-etapa 2` — avalia apenas a Etapa 2 (Backend APIs) para todos os alunos.
- `/avaliar-etapa 2 aluno3` — avalia apenas a Etapa 2 para o Aluno 3.

---

## 🎯 Benefícios para Professores e Alunos

- **Transparência**: Alunos sabem exatamente quais artefatos de código e texto influenciam cada rubrica avaliada.
- **Objetividade**: Redução de vieses de avaliação através de critérios objetivos baseados em entregas e dados concretos do Git histórico.
- **Feedbacks Ágeis**: Possibilidade de rodar a avaliação de IA a qualquer momento durante o semestre, permitindo que alunos corrijam rumos antes da entrega final.
- **Rastreabilidade**: Mapeamento direto de quem escreveu o quê na documentação e no código através do cruzamento entre ATAs, relatórios de contribuição do Git e a análise semântica estrutural dos agentes.
