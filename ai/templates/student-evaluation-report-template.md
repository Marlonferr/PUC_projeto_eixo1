# 👤 Relatório Individual de Desempenho e Rubricas por IA (Modelo)

Este modelo de documento é utilizado pelos agentes de IA para registrar a avaliação individualizada de cada estudante. Ele serve como fita métrica de acompanhamento de competências ao longo do semestre.

---

## 📋 Informações do Estudante
- **Nome Completo**: [Nome do Aluno]
- **Matrícula/ID**: [ID do Aluno]
- **Identificador de Commit (Git Username)**: [user_git]
- **Vínculo de Diário (Portal)**: [docs/atas/alunoX.md](docs/atas/alunoX.md)

---

## 📈 Gráfico de Progresso das Competências (Representação Textual)

*(O agente de IA gerará uma barra de conclusão de 0 a 10 para cada uma das competências básicas)*

- **Gestão de Serviços (H34)**: `[████████░░]` (80%)
- **Arquitetura Distribuída (H35)**: `[██████████]` (100%)
- **APIs & Web Services (H36)**: `[████░░░░░░]` (40%)
- **Desenvolvimento Web (H37)**: `[░░░░░░░░░░]` (0%)
- **Desenvolvimento Móvel (H38)**: `[░░░░░░░░░░]` (0%)

---

## 🔍 Detalhamento por Rubrica

### 📍 Competência: Gestão de Serviços de TI
#### ◽ Rubrica H34a - Gerenciar e documentar serviços de TI: **gerenciar e documentar serviços de TI, de forma clara e objetiva.**
- **Percentual de Conclusão**: `[X]%`
- **Itens de Evidência Identificados**:
  - [ ] Planejamento no catálogo de serviços em [docs/contexto.md](docs/contexto.md).
  - [ ] Registro e parecer de evolução positivo no Portal de Acompanhamento [docs/atas/alunoX.md](docs/atas/alunoX.md).
- **Análise Semântica de IA**: [Descreva se a documentação do catálogo de serviços está legível, objetiva e atende aos requisitos teóricos].
- **Ações corretivas para atingir 100%**: [Insira recomendações personalizadas].

---

### 📍 Competência: Arquitetura de Software Distribuído
#### ◽ Rubrica H35a - Planejar e documentar uma arquitetura de aplicação distribuída
- **Percentual de Conclusão**: `[X]%`
- **Evidências**: [Descreva diagramas, escolha de hospedagem, justificativa tecnológica e onde no documento reside].
- **Feedback de IA**: [Revisar qualidade das seções].

#### ◽ Rubrica H35b - Desenvolver uma arquitetura de aplicação distribuída
- **Percentual de Conclusão**: `[X]%`
- **Evidências (Diretório de Código)**: [Citar arquivos ou caminhos específicos criados pelo aluno].
- **Feedback de IA**: [Revisar modularidade de comunicação ou barramento].

#### ◽ Rubrica H35c - Gerenciar arquitetura de aplicação distribuída (testando, implantando e avaliando)
- **Percentual de Conclusão**: `[X]%`
- **Evidências (Docker/Pipelines)**: [Citar arquivos yaml, dockerfiles ou pipelines GitHub Actions modificados pelo aluno].
- **Feedback de IA**: [Verificar se o docker-compose ou workflows de deploy estão funcionando e se o aluno os modificou].

---

### 📍 Competência: APIs e Web Services
#### ◽ Rubrica H36a - Planejar e documentar APIs e Web Services
- **Percentual de Conclusão**: `[X]%`
- **Evidências**: [Especificações REST no backend-apis.md (verbos, payloads, codes)].
- **Feedback de IA**: ...

#### ◽ Rubrica H36b - Desenvolver APIs e Web Services
- **Percentual de Conclusão**: `[X]%`
- **Evidências (Diretório de Código)**: [Citar arquivos JS, TS, CS, PY, JAVA e lógica de manipulação de banco de dados].
- **Feedback de IA**: ...

#### ◽ Rubrica H36c - Gerenciar APIs (testando, implantando e avaliando)
- **Percentual de Conclusão**: `[X]%`
- **Evidências (Suites de testes backend e infra)**: [Citar arquivos de teste unitário/integração backend].
- **Feedback de IA**: ...

---

### 📍 Competência: Aplicação Web
#### ◽ Rubrica H37a - Planejar e documentar uma aplicação Web
- **Percentual de Conclusão**: `[X]%`
- **Evidências**: [Wireframes e especificações visuais em frontend-web.md].
- **Feedback de IA**: ...

#### ◽ Rubrica H37b - Desenvolver uma aplicação Web
- **Percentual de Conclusão**: `[X]%`
- **Evidências (Diretório de Código)**: [Análise de componentes web, renderização reativa e consumo de endpoints].
- **Feedback de IA**: ...

#### ◽ Rubrica H37c - Gerenciar aplicação Web (testando, implantando e avaliando)
- **Percentual de Conclusão**: `[X]%`
- **Evidências**: [Testes E2E, Jest front-end, relatório Lighthouse ou Vercel deployment].
- **Feedback de IA**: ...

---

### 📍 Competência: Aplicação Móvel
#### ◽ Rubrica H38a - Planejar e documentar uma aplicação móvel
- **Percentual de Conclusão**: `[X]%`
- **Evidências**: [Wireframes móveis, usabilidade física e de fluxograma em frontend-mobile.md].
- **Feedback de IA**: ...

#### ◽ Rubrica H38b - Desenvolver uma aplicação móvel
- **Percentual de Conclusão**: `[X]%`
- **Evidências (Diretório de Código)**: [Telas React Native, Flutter, Expo, manipulação de estado móvel].
- **Feedback de IA**: ...

#### ◽ Rubrica H38c - Gerenciar aplicação móvel (testando, implantando e avaliando)
- **Percentual de Conclusão**: `[X]%`
- **Evidências**: [Builds do Expo, compilações IPA/APK ou simulação mobile em testes de usabilidade].
- **Feedback de IA**: ...

---

## 📑 Diário de Commits & Valores de Sincronismo

Tabela com datas e listagem dos commits chaves realizados por este aluno que serviram de suporte técnico para validação destas rubricas.

| Hash de Commit | Data | Módulo Afetado | Resumo da Mensagem | Rubricas Associadas |
| :---: | :---: | :--- | :--- | :---: |
| `[hash]` | `[data]` | `[backend]` | `[feat: implement auth middleware]` | `H36b`, `H36c` |
| `[hash]` | `[data]` | `[docs]` | `[docs: finalize mobile interface wireframes]` | `H38a` |

---

*Gerado autonomamente pelo Agente de IA para suporte de auditoria docente.*
