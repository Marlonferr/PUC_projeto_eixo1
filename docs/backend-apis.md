# ⚙️ Etapa 2: APIs, Web Services e Persistência de Dados Distribuída

Este documento serve como diretriz mestre de engenharia e repositório de evidências para a **Etapa 2: Desenvolvimento de APIs, Web Services e Persistência**. Ele foi estruturado para orientar o desenvolvimento prático do backend distribuído e permitir o acompanhamento e auto-gestão das atividades pelos alunos.

---

## 🎯 Rubricas de Avaliação desta Etapa

Ao final desta Etapa, cada aluno será avaliado individualmente nestas 6 competências (incluindo oportunidades de desenvolvimento e reavaliação):

1. **H21a-ADS-CST - Aplicar corretamente os padrões de codificação para o desenvolvimento da API.**: Gerenciar e documentar serviços de TI, de forma clara e objetiva (Reavaliação teórica e prática a partir do gerenciamento de serviços no backend em [src/backend/](src/backend/)).
2. **H23a-ADS-CST - Modelar os dados da API dentro do contexto levantado.**: Desenvolver uma arquitetura de aplicação distribuída (Medido no código em [src/backend/](src/backend/) e na seção [Modelagem da Aplicação e Arquitetura de Dados](#2-modelagem-da-aplicacao-e-arquitetura-de-dados)).
3. **H23b-ADS-CST - Definir corretamente os recursos e as rotas da API.**: Gerenciar uma arquitetura de aplicação distribuída, testando, implantando e avaliando a solução (Medido na seção [Instruções de Implantação e DevOps](#5-instrucoes-de-implantacao-e-devops)).
4. **H23d-ADS-CST - Implementar o processo de autenticação de usuário do sistema.**: Desenvolver APIs e Web Services (Medido na seção [Especificação Avançada de Endpoints](#3-especificacao-avancada-de-endpoints) e atualizações no design de contratos).
5. **H24a-ADS-CST - Definir e documentar a arquitetura da aplicação distribuída.**: Planejar e documentar APIs e Web Services, de forma clara e objetiva (Medido em [src/backend/](src/backend/) e na construção real dos endpoints).
6. **H24b-ADS-CST - Projetar a arquitetura baseada em API.**: Gerenciar APIs e Web Services, testando, implantando e avaliando a solução (Medido na seção [Estratégia e Relatório de Testes Automatizados](#4-estrategia-e-relatorio-de-testes-automatizados)).
7. **H25a-ADS-CST - Selecionar e avaliar corretamente o modelo de dados NoSQL para o contexto da aplicação distribuída.**: Planejar e documentar Banco de dados No-SQL, de forma clara e objetiva (Medido em [src/backend/](src/backend/) e na construção real dos endpoints).
8. **H25b-ADS-CST - Implementar corretamente as funcionalidades que envolvem o banco de dados NoSQL para armazenamento e recuperação de dados.**: Planejar e documentar Banco de dados No-SQL, de forma clara e objetiva (Medido em [src/backend/](src/backend/) e na construção real dos endpoints).
9. **H27a-ADS-CST - Desenvolver testes de unidade.**: Gerenciar APIs e Web Services, testando, implantando e avaliando a solução (Medido na seção [Estratégia e Relatório de Testes Automatizados](#4-estrategia-e-relatorio-de-testes-automatizados)).


---

## 📅 QUADRO DE CONTRIBUIÇÃO REAL (ETAPA 2)

**Atenção alunos:** Preencham esta tabela para atualizar o andamento das tarefas e quem foi o responsável técnico pela construção do backend. Os nomes, usuários e links de evidências devem corresponder aos entregáveis em [src/backend/](src/backend/).

- **Status admitidos**: `⌛ Não Iniciado` | `📝 Em Progresso` | `✔️ Entregue`
- **Autoria Git**: Indica se há commits desse estudante nos arquivos da tarefa.

**Atividades Semanais desta Etapa** (ver [Cronograma do Semestre](contexto.md#-cronograma-do-semestre-semana--periodo)):
- `ATV2.1` — Desenvolvimento de Funcionalidades - API (Semanas 5 a 8)
- `ATV2.2` — Testes - API (Semana 9)

| Rubrica Curricular | ID Tarefa | Atividade Semanal | Descrição Detalhada da Tarefa | Estudante Responsável | GitHub Username | Status de Entrega | Evidência/Seção Temática | Autoria Git |
| :---: | :---: | :---: | :--- | :--- | :---: | :---: | :--- | :---: |
| **H36b** | `T2.1` | `ATV2.1` | Configuração do Boilerplate da API, Roteamento e Inicialização | [Nome do Aluno 1] | `username1` | `⌛ Não Iniciado` | [Instalação/README](src/backend/README.md) | [ ] |
| **H36b** | `T2.2` | `ATV2.1` | Modelagem e Persistência de Dados (Conexão DB, ORM, Schemas) | [Nome do Aluno 2] | `username2` | `⌛ Não Iniciado` | [Seção 2.1](#21-schema-e-diagrama-entidade-relacionamento) | [ ] |
| **H36b** | `T2.3` | `ATV2.1` | Implementação de Endpoints CRUD e Lógica de Negócios Principal | [Nome do Aluno 3] | `username3` | `⌛ Não Iniciado` | [Seção 3.0](#3-especificacao-avancada-de-endpoints) | [ ] |
| **H36b** | `T2.4` | `ATV2.1` | Mecanismo de Segurança da API (Autenticação/Autorização JWT) | [Nome do Aluno 4] | `username4` | `⌛ Não Iniciado` | [Seção 3.3](#33-seguranca-e-autorizacao) | [ ] |
| **H35b** | `T2.5` | `ATV2.1` | Gateway, Integração de Serviços Web e Clientes HTTP Externos | [Nome do Aluno 5] | `username5` | `⌛ Não Iniciado` | [Seção 2.2](#22-integracao-e-infraestrutura-distribuida) | [ ] |
| **H36c** | `T2.6` | `ATV2.2` | Desenvolvimento de Testes Automatizados (Unitários/Integração) | [Nome do Aluno 6] | `username6` | `⌛ Não Iniciado` | [Seção 4.0](#4-estrategia-e-relatorio-de-testes-automatizados) | [ ] |
| **H35c** | `T2.7` | `ATV2.1` | Construção de Dockerfile e Configuração de docker-compose | [Nome do Aluno 1] | `username1` | `⌛ Não Iniciado` | [Seção 5.1](#51-conteinerizacao-de-servicos) | [ ] |
| **H36c** | `T2.8` | `ATV2.2` | Proposta de Implantação e Pipeline de CI/CD Backend | [Nome do Aluno 5] | `username5` | `⌛ Não Iniciado` | [Seção 5.2](#52-proposta-de-infraestrutura-de-deploy-e-ambiente-em-producao) | [ ] |

---

# 1. Escopo e Objetivos do Backend

[Insira aqui uma breve introdução descrevendo o papel e os objetivos técnicos do seu ecossistema de APIs de backend. Esclareça quais microserviços ou módulos compõem a solução, a escolha de tecnologias de desenvolvimento (SGBDs, frameworks) e o que se espera em termos de volumetria e capacidade transacional.]

---

# 2. Modelagem da Aplicação e Arquitetura de Dados

*(Esta seção atende diretamente à rubrica **H35b**)*

## 2.1. Schema e Diagrama Entidade-Relacionamento

[Insira aqui o detalhamento lógico de banco de dados por meio de tabelas, relacionamentos, chaves primárias e estrangeiras. Também deve ser incluído o DER (Diagrama Entidade-Relacionamento) ou script de migração schema DDls.]

```
[Insira o Diagrama de Classes, DER ou representação lógica das entidades aqui]
```

## 2.2. Integração e Infraestrutura Distribuída

[Descreva como a sua arquitetura backend gerencia concorrência e escalabilidade física. Por exemplo: pool de conexões com banco de dados, divisão em microsserviços, tratamento de chamadas síncronas/assíncronas ou persistências distribuídas (como cache Redis, clusterização, mensageria via RabbitMQ).]

---

# 3. Especificação Avançada de Endpoints

*(Esta seção atende diretamente à rubrica **H36b**)*

Abaixo devem estar listados os contratos reais que foram ou serão implementados no diretório [src/backend/](src/backend/). Cada endpoint deve ser detalhado descrevendo métodos HTTP, URLs, payloads aceitos e possíveis status codes.

### 3.1. Relação Geral de Endpoints

| Método / Verbo | Caminho da Rota (URI) | Descrição do Recurso / Ação | Reclama Autenticação? | Responsável Técnico |
| :---: | :--- | :--- | :---: | :---: |
| `POST` | `/api/v1/users/register` | Criação de novos usuários na plataforma | Não | [Nome do Aluno] |
| `POST` | `/api/v1/auth/login` | Autenticação e geração de JWT | Não | [Nome do Aluno] |
| `GET` | `/api/v1/orders` | Listagem paginada de pedidos com filtros de busca | Sim | [Nome do Aluno] |
| `POST` | `/api/v1/orders` | Criação e despacho de um novo pedido de transporte | Sim | [Nome do Aluno] |

---

### 3.2. Detalhamento dos Payloads de Requisição e Resposta (Exemplos)

#### Endpoint: `/api/v1/orders` (Criação de Pedidos)
- **Verbo**: `POST`
- **Headers Requeridos**: `Authorization: Bearer <token_jwt>`
- **Payload de Entrada (JSON)**:
  ```json
  {
    "userId": 45,
    "itens": [
      { "produtoId": 302, "quantidade": 2 }
    ],
    "enderecoEntrega": {
      "rua": "Av. Dom José Gaspar",
      "numero": "500",
      "cidade": "Belo Horizonte"
    }
  }
  ```
- **Payload de Resposta de Sucesso (`201 Created`)**:
  ```json
  {
    "orderId": 8092,
    "status": "pending",
    "createdAt": "2026-07-28T14:32:00Z",
    "previsaoEntrega": "2026-07-28T16:00:00Z"
  }
  ```
- **Comportamento em caso de Erro (`400 Bad Request` - Parâmetro Ausente)**:
  ```json
  {
    "errorCode": "INVALID_PARAMETERS",
    "message": "O campo 'enderecoEntrega.cidade' é obrigatório."
  }
  ```

---

### 3.3. Segurança e Autorização

[Descreva como a segurança do canal é implementada estruturalmente. Como é feita a geração de token, qual algoritmo criptográfico de assinatura é empregado (ex: RS256, HS256), tempo de expiração do JWT e se há distinção baseada em perfis de acesso (RBAC - Role Based Access Control) entre usuários (por exemplo, Administrador, Entregador, Cliente).]

---

# 4. Estratégia e Relatório de Testes Automatizados

*(Esta seção atende diretamente à rubrica **H36c**)*

[Explique a estratégia adotada pela equipe para testar as rotas de backend. Detalhe como rodar os testes localmente no repositório. O processo de avaliação pedagógica identificará a implementação física destes testes no diretório de código para validar as metas da rubrica.]

1. **Ferramenta de Asserção Utilizada**: (Ex: `Jest` em Node, `pytest` em Python, `xUnit/NUnit` em .NET).
2. **Método de Execução do Comando de Teste**:
   *(Exemplo)*: `npm run test:cov` ou `dotnet test`.
3. **Cobertura Esperada/Alcançada**: (Porcentagem geral de caminhos de controle avaliados).

### Exemplo de Quadro de Cobertura de Testes:

| Módulo do Sistema | Tipo de Teste (Unitário/Integração) | Cenários Avaliados | Status da Suíte |
| :--- | :--- | :--- | :---: |
| **Módulo de Autenticação** | Unitário | Geração do JWT, senhas incorretas, usuários inexistentes | ✔️ Passou |
| **Serviço de Pedidos** | Integração (com DB mockado) | Criação de orders, validação de itens esgotados, cálculo de frete | ✔️ Passou |

---

# 5. Instruções de Implantação e DevOps

*(Esta seção atende diretamente à rubrica **H35c**)*

Abaixo detalhe como a aplicação backend é empacotada de forma portável e como seria o processo ideal de implantação/hospedagem em nuvem (proposta teórica). **Nota:** Não há cobrança de deploy prático em nuvem nesta disciplina; a avaliação consiste na demonstração teórica da arquitetura física proposta e nas automações de build/testes locais.

## 5.1. Conteinerização de Serviços

[Insira aqui a justificativa e os caminhos de arquivos das imagens Docker criadas. Demonstre como múltiplos contêineres se comunicam na mesma rede por meio de um arquivo `docker-compose.yml` que sobe a API de backend juntamente com quaisquer instâncias de banco de dados ou mensageria de forma auto-contida para execução e testes locais.]

- **Caminho do Dockerfile do Backend**: `[src/backend/Dockerfile](src/backend/Dockerfile)` *(adicione o link do arquivo se ele já existir)*
- **Caminho do Docker Compose**: `[docker-compose.yml](docker-compose.yml)` *(opcional se na raiz)*

---

## 5.2. Proposta de Infraestrutura de Deploy e Ambiente em Produção

[Descreva de forma conceitual como seria estruturado o deploy contínuo (CI/CD) para o ambiente de produção. Por exemplo, indique como seria configurado o GitHub Actions para rodar testes locais e como seria a topologia de implantação na nuvem (ex: Render, AWS, Fly.io, Azure).]

- **Modelo de CI/CD Planejado**: [Indique que ações seriam realizadas a cada push/pull request para validar o código, como testes rodando automaticamente.]
- **Arquitetura Física Proposta**: [Apresente as premissas de arquitetura de hospedagem planejadas: onde a API responderia, como seriam geridos os bancos de dados em nuvem e variáveis de ambiente secretas.]

---

# 6. Referências Acadêmicas e de Engenharia

[Registre as referências que deram suporte técnico para a modelagem lógica, banco de dados ou metodologias de automação do backend das APIs.]

1. **DATE, C. J**. *Introdução a Sistemas de Bancos de Dados*. Rio de Janeiro: Elsevier, 2004.
2. **RICHARDSON, Leonard; RUBY, Sam**. *RESTful Web Services*. O'Reilly Media, 2007.
3. [Adicione referências de documentação oficial, SGBDs ou bibliotecas utilizadas].

