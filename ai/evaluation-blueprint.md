# 📋 Plano de Mapeamento e Avaliação de Rubricas por IA

Este documento descreve detalhadamente o plano de medição e validação das 13 rubricas do projeto. Cada rubrica está associada de forma inequívoca a tarefas específicas de documentação (artefatos descritivos) e código-fonte, permitindo que agentes de IA inspecionem o repositório, identifiquem os responsáveis e atribuam um percentual de conclusão baseado em evidências concretas.

---

## 📐 Estrutura Geral do Cálculo de Progresso

Para cada estudante $X$, o progresso em uma determinada rubrica $R$ ($Progresso(X, R)$) é calculado através do cruzamento de três dimensões de dados avaliadas pelos Agentes de IA:

$$Progresso(X, R) = (0.4 \times Doc) + (0.4 \times Cod) + (0.2 \times Semanal)$$

1. **Documentação ($Doc$ - Peso 40%)**:
   - Mede se a seção específica do documento sob a responsabilidade do aluno está preenchida corretamente, sem marcadores de espaço reservado (placeholders), de forma clara e objetiva.
2. **Código e Trabalho Prático ($Cod$ - Peso 40%)**:
   - Inspeciona se a pasta de código associada à rubrica contém commits ou alterações de arquivos de autoria do aluno.
3. **Engajamento e Feedback Semanal ($Semanal$ - Peso 20%)**:
   - Mede se, nos períodos semanais correspondentes àquele microfundamento (rubrica), a IA detectou participação real do estudante em qualquer arquivo do repositório (texto, código-fonte, diagramação), gerando um parecer de evolução positivo no diário individual do aluno [docs/atas/alunoX.md](docs/atas/alunoX.md).

---

## 📌 Mapeamento Detalhado das Rubricas

Abaixo está o detalhamento de cada uma das 13 rubricas, suas entregas correspondentes e os critérios de validação estruturados para os agentes de IA.

### 1. Rubrica H34a-SI-G: Gerenciar e documentar serviços de TI
* **Descrição**: Gerenciar e documentar serviços de TI, de forma clara e objetiva.
* **Componente de Avaliação**:
  - **Documentação Associada**: Seção `Catálogo de Serviços` em [docs/contexto.md](docs/contexto.md).
  - **Semana Correspondente**: Semana 3 (`ATV1.1` — Especificações do Projeto).
  - **Tarefas de Código/Operações**: Arquivos de script de configuração organizacional ou planejamento no repositório.
* **Critérios de Conclusão para IA**:
  - Identificar se o Catálogo de Serviços descreve ao menos 3 serviços claros com seu SLA, responsável e interfaces.
  - Verificar se a IA emitiu parecer de feedback semanal de participação para o aluno nessas semanas no arquivo [docs/atas/alunoX.md](docs/atas/alunoX.md).
  - Verificar histórico de Git para identificar autoria de trechos na seção do Catálogo.

---

### 2. Rubrica H35a-SI-G: Planejar e documentar uma arquitetura de aplicação distribuída
* **Descrição**: Planejar e documentar uma arquitetura de aplicação distribuída, de forma clara e objetiva.
* **Componente de Avaliação**:
  - **Documentação Associada**: Seção `Arquitetura da Solução` em [docs/contexto.md](docs/contexto.md) (Diagrama de Componentes, Tecnologias Utilizadas e Hospedagem).
  - **Semana Correspondente**: Semana 4 (`ATV1.2` — Arquitetura da Solução).
* **Critérios de Conclusão para IA**:
  - Presença de imagem/diagrama de arquitetura física ou lógica (como arquivo ou link externo).
  - Detalhamento textual de como os componentes de backend, frontend web, frontend mobile e banco de dados se conectam distribuídos na rede.
  - Listagem justificada de tecnologias distribuídas sob responsabilidade declarada do aluno.

---

### 3. Rubrica H35b-SI-G: Desenvolver uma arquitetura de aplicação distribuída
* **Descrição**: Desenvolver uma arquitetura de aplicação distribuída.
* **Componente de Avaliação**:
  - **Local de Código**: Estrutura geral de diretórios em [src/](src/) separando de forma clara as aplicações cliente e o servidor.
  - **Semanas Correspondentes**: Semana 4 (`ATV1.2` — planejamento) e Semanas 5-8, 10-12, 14-16 (`ATV2.1`, `ATV3.1`, `ATV4.1` — integração distribuída em cada camada).
* **Critérios de Conclusão para IA**:
  - O agente de IA verificará a presença de um modelo multicamadas integrado (como gateway de API, comunicação assíncrona/mensageria ou APIs distribuídas de dados).
  - Análise dos commits do aluno $X$ que incluam inicialização e estruturação dos módulos distribuídos principais (docker-compose, conexões de barramento, portas lógicas de comunicação).

---

### 4. Rubrica H35c-SI-G: Gerenciar uma arquitetura de aplicação distribuída, testando, implantando e avaliando a solução
* **Descrição**: Gerenciar uma arquitetura de aplicação distribuída, testando, implantando e avaliando a solução.
* **Componente de Avaliação**:
  - **Documentação Associada**: Seções de Hospedagem em [docs/contexto.md](docs/contexto.md) e instruções de deploy idealizado nas documentações de cada etapa.
  - **Artefatos Técnicos**: Planejamento e elaboração teórica da arquitetura de implantação, montagem do docker-compose local, ou roteiro idealizado de CI/CD.
  - **Semanas Correspondentes**: Semanas 9, 13 e 17 (`ATV2.2`, `ATV3.2`, `ATV4.2` — testes e proposta de deploy de cada camada).
* **Critérios de Conclusão**:
  - Proposta detalhada de arquitetura física de implantação em nuvem.
  - Arquivo docker-compose configurado para rodar múltiplos nós/serviços e bancos de dados localmente de forma simulada/automatizada para testes locais (sem necessidade de deploy real em nuvem).
  - Participação do aluno demonstrada na autoria destes roteiros ou scripts locais de simulação.

---

### 5. Rubrica H36a-SI-G: Planejar e documentar APIs e Web Services
* **Descrição**: Planejar e documentar APIs e Web Services, de forma clara e objetiva.
* **Componente de Avaliação**:
  - **Documentação Associada**: [docs/backend-apis.md](docs/backend-apis.md) (Modelagem, diagramas de entidade-relacionamento, especificações Swagger/OpenAPI ou tabelas de definição de endpoints).
  - **Semanas Correspondentes**: Semanas 5 a 9 (`ATV2.1`, `ATV2.2`).
* **Critérios de Conclusão para IA**:
  - Tabelas ou arquivos de especificação contendo métodos HTTP (GET, POST, PUT, DELETE), URIs, payloads de requisição, retornos esperados e códigos de status HTTP para cada serviço do catálogo.
  - Atribuição de autoria de textos e arquivos de especificação de API no Git ao aluno $X$.

---

### 6. Rubrica H36b-SI-G: Desenvolver APIs e Web Services
* **Descrição**: Desenvolver APIs e Web Services.
* **Componente de Avaliação**:
  - **Local de Código**: Pasta de código de backend em [src/](src/) (ex: `/src/backend` ou `/src/api`).
  - **Semanas Correspondentes**: Semanas 5 a 8 (`ATV2.1`).
* **Critérios de Conclusão para IA**:
  - Existência física de endpoints que implementem regras de negócio, persistência de dados (Banco de dados) e segurança (JWT por exemplo).
  - Medição de commits do aluno $X$ no diretório correspondente ao backend com contribuição significativa de linhas de código ativas.

---

### 7. Rubrica H36c-SI-G: Gerenciar APIs e Web Services, testando, implantando e avaliando a solução
* **Descrição**: Gerenciar APIs e Web Services, testando, implantando e avaliando a solução.
* **Componente de Avaliação**:
  - **Código Técnico/Testes**: Pasta de testes automatizados do backend (ex: testes de integração da API usando Jest, xUnit ou Postman/Newman collections no repositório).
  - **Documentação de Implantação**: Proposta detalhada de arquitetura de hospedagem em produção, sem necessidade de deploy real na nuvem.
  - **Semanas Correspondentes**: Semana 9 (`ATV2.2`).
* **Critérios de Conclusão**:
  - Arquivos de teste unitário ou de integração criados e modificados pelo aluno $X$ para a API backend.
  - Roteiro de testes de API e proposta de infraestrutura de deploy preenchidos em [docs/backend-apis.md](docs/backend-apis.md).
  - Sucesso de execução do build e execução local dos testes automatizados.

---

### 8. Rubrica H37a-SI-G: Planejar e documentar uma aplicação Web
* **Descrição**: Planejar e documentar uma aplicação Web, de forma clara e objetiva.
* **Componente de Avaliação**:
  - **Documentação Associada**: [docs/frontend-web.md](docs/frontend-web.md) (Projeto de interface, wireframes de telas, diagramas de fluxo de dados na camada web, paleta de cores e tipografia).
  - **Semanas Correspondentes**: Semanas 10 a 13 (`ATV3.1`, `ATV3.2`).
* **Critérios de Conclusão para IA**:
  - Inclusão dos wireframes de alta ou baixa fidelidade para as telas chaves do sistema web.
  - Mapeamento das interações descritas, com atribuição de autoria ou planejamento de tarefas no frontend web ao aluno $X$.

---

### 9. Rubrica H37b-SI-G: Desenvolver uma aplicação Web
* **Descrição**: Desenvolver uma aplicação Web.
* **Componente de Avaliação**:
  - **Local de Código**: Pasta correspondente ao frontend web em [src/](src/) (ex: `/src/frontend-web`).
  - **Semanas Correspondentes**: Semanas 10 a 12 (`ATV3.1`).
* **Critérios de Conclusão para IA**:
  - Criação de telas e componentes dinâmicos em frameworks como React, Vue, ou HTML/CSS modernos, realizando consumo assíncrono dos endpoints da API desenvolvida.
  - Consistência de commits e linhas adicionadas pelo aluno $X$ especificamente na pasta do frontend web.

---

### 10. Rubrica H37c-SI-G: Gerenciar uma aplicação Web, testando, implantando e avaliando a solução
* **Descrição**: Gerenciar uma aplicação Web, testando, implantando e avaliando a solução.
* **Componente de Avaliação**:
  - **Código de Testes**: Testes unitários de componentes front-end ou testes de interface de ponta a ponta (Jest, Cypress, Playwright).
  - **Documentação de Implantação**: Proposta detalhada de arquitetura de hospedagem em produção, sem necessidade de deploy real na nuvem.
  - **Semanas Correspondentes**: Semana 13 (`ATV3.2`).
* **Critérios de Conclusão**:
  - Existência e modificação de scripts de testes web de interface criados pelo aluno $X$.
  - Elaboração detalhada e roteiro das premissas de implantação/hospedagem no documento de referência.
  - Execução local de testes automatizados web bem-sucedida.

---

### 11. Rubrica H38a-SI-G: Planejar e documentar uma aplicação móvel
* **Descrição**: Planejar e documentar uma aplicação móvel, de forma clara e objetiva.
* **Componente de Avaliação**:
  - **Documentação Associada**: [docs/frontend-mobile.md](docs/frontend-mobile.md) (Projeto da interface móvel, restrições, wireframes específicos para smartphones, fluxograma de telas móveis).
  - **Semanas Correspondentes**: Semanas 14 a 17 (`ATV4.1`, `ATV4.2`).
* **Critérios de Conclusão para IA**:
  - Inclusão dos wireframes específicos para dispositivos móveis contendo adaptação de usabilidade (gestos, telas menores).
  - Mapeamento das telas móveis com fluxo de telas planejado. Identificação de autoria/planejamento de tarefas atribuída ao aluno $X$.

---

### 12. Rubrica H38b-SI-G: Desenvolver uma aplicação móvel
* **Descrição**: Desenvolver uma aplicação móvel.
* **Componente de Avaliação**:
  - **Local de Código**: Pasta correspondente ao frontend móvel em [src/](src/) (ex: `/src/frontend-mobile`, `/src/mobile`, Expo projects).
  - **Semanas Correspondentes**: Semanas 14 a 16 (`ATV4.1`).
* **Critérios de Conclusão para IA**:
  - Telas construídas de forma nativa ou híbrida (React Native, Flutter) consumindo recursos da API e integradas com persistência ou GPS se aplicável.
  - Commits detalhados no diretório mobile sob identificação de autor do aluno $X$ correspondentes a telas ou fluxos.

---

### 13. Rubrica H38c-SI-G: Gerenciar uma aplicação móvel, testando, implantando e avaliando a solução
* **Descrição**: Gerenciar uma aplicação móvel, testando, implantando e avaliando a solução.
* **Componente de Avaliação**:
  - **Testes e Build**: Testes unitários de componentes mobile, arquivos de automação (Expo builds, configuração native gradle/pods).
  - **Documentação de Implantação**: Proposta detalhada de arquitetura de hospedagem em produção, sem necessidade de deploy real na nuvem.
  - **Semanas Correspondentes**: Semana 17 (`ATV4.2`).
* **Critérios de Conclusão**:
  - Roteiro de testes de usabilidade móvel preenchido na documentação sob a responsabilidade do aluno $X$.
  - Configuração lógica local para empacotamento ou roteiro detalhado de emulação (sem necessidade de deploy nativo real em lojas de aplicativos).

---

## 📅 Matriz de Relação: Rubricas vs. Microfundamentos vs. Semanas do Cronograma

A tabela a seguir consolida a correspondência entre as rubricas, a semana relativa do [Cronograma do Semestre](../docs/contexto.md#-cronograma-do-semestre-semana--periodo) (ver `docs/contexto.md`) e o arquivo do Diário (Portal do Aluno) onde a participação deve estar registrada pela IA como evidência. As Atividades Semanais (`ATVx.y`) referenciadas aqui são as mesmas definidas nas tabelas `QUADRO DE CONTRIBUIÇÃO REAL` de cada etapa:

| Rubrica | Microfundamento Geral | Semana(s) / Atividade Semanal | Arquivo de Documentação Alvo | Diretório de Código Alvo |
|:---:|:---|:---:|:---|:---|
| **H34a** | Gestão de Serviços de TI | Semana 3 (`ATV1.1`) | [docs/contexto.md](docs/contexto.md) | — (apenas documentação) |
| **H35a** | Arquitetura de Software Distribuído | Semana 4 (`ATV1.2`) | [docs/contexto.md](docs/contexto.md) | `src/` |
| **H35b** | Arquitetura de Software Distribuído | Semanas 5-8, 10-12, 14-16 (`ATV2.1`, `ATV3.1`, `ATV4.1`) | [docs/contexto.md](docs/contexto.md) | `src/` |
| **H35c** | Arquitetura de Software Distribuído | Semanas 9, 13, 17 (`ATV2.2`, `ATV3.2`, `ATV4.2`) | [docs/contexto.md](docs/contexto.md) | `.github/workflows/`, `./` |
| **H36a** | APIs e Web Services | Semanas 5-9 (`ATV2.1`, `ATV2.2`) | [docs/backend-apis.md](docs/backend-apis.md) | `src/backend/` |
| **H36b** | APIs e Web Services | Semanas 5-8 (`ATV2.1`) | [docs/backend-apis.md](docs/backend-apis.md) | `src/backend/` |
| **H36c** | APIs e Web Services | Semana 9 (`ATV2.2`) | [docs/backend-apis.md](docs/backend-apis.md) | `src/backend/tests` |
| **H37a** | Recuperação de Inf. na Web | Semanas 10-13 (`ATV3.1`, `ATV3.2`) | [docs/frontend-web.md](docs/frontend-web.md) | `src/frontend/` |
| **H37b** | Recuperação de Inf. na Web | Semanas 10-12 (`ATV3.1`) | [docs/frontend-web.md](docs/frontend-web.md) | `src/frontend/` |
| **H37c** | Recuperação de Inf. na Web | Semana 13 (`ATV3.2`) | [docs/frontend-web.md](docs/frontend-web.md) | `src/frontend/tests` |
| **H38a** | Desenvol. de Aplicações Móveis | Semanas 14-17 (`ATV4.1`, `ATV4.2`) | [docs/frontend-mobile.md](docs/frontend-mobile.md) | `src/mobile/` |
| **H38b** | Desenvol. de Aplicações Móveis | Semanas 14-16 (`ATV4.1`) | [docs/frontend-mobile.md](docs/frontend-mobile.md) | `src/mobile/` |
| **H38c** | Desenvol. de Aplicações Móveis | Semana 17 (`ATV4.2`) | [docs/frontend-mobile.md](docs/frontend-mobile.md) | `src/mobile/tests` |
