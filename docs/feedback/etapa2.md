# 📊 Painel de Avaliação e Feedback Contínuo: Etapa 2 (APIs Backend)

Este documento serve como painel de monitoramento do progresso individual e coletivo da equipe referente às competências e rubricas da **Etapa 2: APIs, Web Services e Persistência**.

---

## 📅 Histórico de Avaliações
- **Última Execução**: *Aguardando primeira verificação e consolidação do painel de notas*
- **Avaliador**: Coordenação Acadêmica / Mecanismos de Feedback
- **Submissão Atual**: `Versão de Inicialização de Planejamento (Template)`

---

## 📊 PAINEL GERAL DE PARTICIPAÇÃO E RUBRICAS (ETAPA 2)

Análise estruturada de entregas do backend (código em [src/](src/) ou equivalente APIs), do progresso do Portal de Acompanhamento e autoria de trechos de código/documentação:

| Estudante Avaliado | Nota Contribuição Real | H35b (Arq Distr Cod) | H35c (Arq Distr Ops) | H36b (APIs Dev) | H36c (APIs Ops Teste) | Status Global da Etapa |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Aluno 1** | `0%` | `0%` | `0%` | `0%` | `0%` | ❌ Pendente |
| **Aluno 2** | `0%` | `0%` | `0%` | `0%` | `0%` | ❌ Pendente |
| **Aluno 3** | `0%` | `0%` | `0%` | `0%` | `0%` | ❌ Pendente |
| **Aluno 4** | `0%` | `0%` | `0%` | `0%` | `0%` | ❌ Pendente |
| **Aluno 5** | `0%` | `0%` | `0%` | `0%` | `0%` | ❌ Pendente |
| **Aluno 6** | `0%` | `0%` | `0%` | `0%` | `0%` | ❌ Pendente |

*Legenda de Status*: `❌ Pendente (<50%)` | `⚠️ Atenção (51% a 89%)` | `✔️ Concluído (>=90%)`

---

## 🔍 MAPEAMENTO DETALHADO POR ESTUDANTE (ENTREGUE vs. LACUNAS)

O quadro abaixo mapeia o que foi constatado de entrega técnica relevante no repositório de backend e as respectivas tarefas/atividades em andamento:

### 👤 Aluno 1: [Nome do Aluno 1]
- **Tarefas de Código / Backend Associadas**: `T2.1` (Configuração do Boilerplate da API) e `T2.7` (Docker/docker-compose)
- **✔️ O que foi entregue (Sinal de Contribuição Real)**:
  - *Evidência*: Nenhuma alteração substantiva encontrada no código backend.
- **❌ Lacunas Identificadas (O que falta fazer)**:
  - Inicializar o projeto backend com a estrutura de rotas em [src/backend/](src/backend/).
  - Desenvolver o Dockerfile e docker-compose.yml de orquestração.
  - Atualizar o status físico das tarefas no Portal de Acompanhamento [docs/atas/aluno1.md](docs/atas/aluno1.md).

---

### 👤 Aluno 2: [Nome do Aluno 2]
- **Tarefas de Código / Backend Associadas**: `T2.2` (Modelagem e Persistência de Dados)
- **✔️ O que foi entregue (Sinal de Contribuição Real)**:
  - *Evidência*: Nenhuma alteração substantiva encontrada no código backend.
- **❌ Lacunas Identificadas (O que falta fazer)**:
  - Desenvolver os schemas, migrations ou scripts de persistência de dados no banco escolhido.
  - Atualizar o status físico das tarefas no Portal de Acompanhamento [docs/atas/aluno2.md](docs/atas/aluno2.md).

---

### 👤 Aluno 3: [Nome do Aluno 3]
- **Tarefas de Código / Backend Associadas**: `T2.3` (Endpoints CRUD e Lógica de Negócios)
- **✔️ O que foi entregue (Sinal de Contribuição Real)**:
  - *Evidência*: Nenhuma alteração substantiva encontrada no código backend.
- **❌ Lacunas Identificadas (O que falta fazer)**:
  - Construir os controllers e handlers das rotas lógicas fundamentais.
  - Atualizar o status físico das tarefas no Portal de Acompanhamento [docs/atas/aluno3.md](docs/atas/aluno3.md).

---

### 👤 Aluno 4: [Nome do Aluno 4]
- **Tarefas de Código / Backend Associadas**: `T2.4` (Mecanismo de Segurança/JWT)
- **✔️ O que foi entregue (Sinal de Contribuição Real)**:
  - *Evidência*: Nenhuma alteração substantiva encontrada no código backend.
- **❌ Lacunas Identificadas (O que falta fazer)**:
  - Implementar o middleware de validação e parser de tokens de segurança.
  - Atualizar o status físico das tarefas no Portal de Acompanhamento [docs/atas/aluno4.md](docs/atas/aluno4.md).

---

### 👤 Aluno 5: [Nome do Aluno 5]
- **Tarefas de Código / Backend Associadas**: `T2.5` (Gateway/Integração) e `T2.8` (Pipeline CI-CD/Deploy)
- **✔️ O que foi entregue (Sinal de Contribuição Real)**:
  - *Evidência*: Nenhuma alteração substantiva encontrada no código backend.
- **❌ Lacunas Identificadas (O que falta fazer)**:
  - Desenvolver e documentar conectores lógicos ou proxies de chamadas a microsserviços.
  - Estruturar os fluxos automáticos de implantação contínua (CI/CD) em `.github/workflows/`.
  - Atualizar o status físico das tarefas no Portal de Acompanhamento [docs/atas/aluno5.md](docs/atas/aluno5.md).

---

### 👤 Aluno 6: [Nome do Aluno 6]
- **Tarefas de Código / Backend Associadas**: `T2.6` (Testes automatizados backend)
- **✔️ O que foi entregue (Sinal de Contribuição Real)**:
  - *Evidência*: Nenhuma alteração substantiva encontrada no código backend.
- **❌ Lacunas Identificadas (O que falta fazer)**:
  - Escrever o conjunto de suítes de testes lógicos no backend.
  - Atualizar o status físico das tarefas no Portal de Acompanhamento [docs/atas/aluno6.md](docs/atas/aluno6.md).

---

## 🛠️ DIRETRIZES DE AVALIAÇÃO DO BACKEND

1. **Validação Operacional**: O avaliador inspeciona o código em `/src/` para confirmar que as rotas da API respondem com dados reais do banco (Postgres, MySql, MongoDB, Redis) e não com arquivos estáticos em memória.
2. **Autoria de Endpoints**: Realiza mapeamento de commits para certificar a autoria das rotas rest, validações de requisição e as chaves de middlewares.
3. **Qualidade de Testes**: Verifica fisicamente se existem arquivos com suítes de testes instrumentados funcionais que cobrem os fluxos normais e de exceção das APIs.

