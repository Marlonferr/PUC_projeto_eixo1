# RF-11 — Criar categorias de receitas e despesas

> **Projeto:** Contaí — Organização Financeira Pessoal (PUC Minas)
> **Responsável:** Pedro
> **Épico:** Lançamentos
> **Prioridade:** Alta (é dependência do RF-02 Gerenciar receitas e do RF-03 Gerenciar despesas)
> **Depende de:** RF-01 (usuário autenticado)
> **É pré-requisito de:** RF-02, RF-03, RF-10 (painel usa categoria nos gráficos), RF-11 → RF-04 limites por categoria

---

## 1. Descrição

Permite ao usuário **criar, listar, editar e excluir** categorias usadas para classificar seus
lançamentos. Cada categoria pertence a um **tipo** (Receita ou Despesa). O sistema já traz um
conjunto de categorias padrão; o usuário pode complementar com categorias próprias.

> **Nota de escopo:** o título aprovado pelo grupo é "Criar categorias", mas a especificação
> cobre o CRUD completo (listar/criar/editar/excluir), porque editar e excluir são necessários
> para o requisito ter valor e para os critérios de aceite fecharem. Sugestão de renomear para
> **"Gerenciar categorias"** na próxima revisão do backlog.

---

## 2. Histórias de usuário

| ID | História | Critérios de aceite |
|---|---|---|
| US-11.1 | Como usuário, quero **criar** uma categoria de despesa ou receita para classificar meus lançamentos do meu jeito | CA-01, CA-02, CA-03 |
| US-11.2 | Como usuário, quero **ver minhas categorias separadas por tipo** para encontrá-las rápido | CA-08 |
| US-11.3 | Como usuário, quero **editar** o nome, o ícone e a cor de uma categoria para corrigir ou reorganizar | CA-04 |
| US-11.4 | Como usuário, quero **excluir** uma categoria que não uso mais, sem perder os lançamentos já feitos nela | CA-05, CA-06, CA-07 |

---

## 3. Regras de negócio

| ID | Regra |
|---|---|
| RN-11.1 | Toda categoria tem obrigatoriamente **nome** e **tipo** (`Receita` ou `Despesa`). |
| RN-11.2 | O **nome** é único **dentro do mesmo tipo**, ignorando maiúsculas/minúsculas e espaços nas pontas. Pode existir "Transporte" em Despesa e "Transporte" em Receita ao mesmo tempo. |
| RN-11.3 | O sistema cria **categorias padrão** no primeiro acesso do usuário:<br>• **Despesa:** Alimentação, Transporte, Moradia, Saúde, Educação, Lazer, Contas, Outros<br>• **Receita:** Salário, Freelance, Investimentos, Presente, Outros |
| RN-11.4 | A categoria **"Outros"** (de cada tipo) é do sistema: **não pode ser excluída nem ter o tipo alterado** (o nome também não muda). Serve como destino padrão de migração. |
| RN-11.5 | Ao **excluir** uma categoria que possui lançamentos vinculados, o sistema pede confirmação e **migra todos esses lançamentos para a categoria "Outros" do mesmo tipo**. A exclusão de categoria **sem** lançamentos é direta (só confirmação simples). |
| RN-11.6 | O **tipo** de uma categoria **não pode ser alterado** depois de criada se ela já tiver lançamentos vinculados (mudaria a natureza de receita/despesa dos lançamentos). Sem lançamentos, a troca é permitida. |
| RN-11.7 | Nome entre **2 e 30 caracteres**. Ícone e cor são **opcionais**; se não informados, o sistema aplica um ícone genérico e uma cor padrão do tipo (verde para receita, vermelho para despesa). |
| RN-11.8 | Categorias são **por usuário** — um usuário nunca vê nem afeta as categorias de outro (RF-01 / RNF de segurança). |
| RN-11.9 | Limite de **40 categorias por tipo** por usuário (proteção contra uso indevido; valor a confirmar com o grupo). |

---

## 4. Campos e validações

| Campo | Tipo | Obrigatório | Regras / validação | Mensagem de erro |
|---|---|---|---|---|
| Nome | Texto | Sim | 2–30 caracteres; único no tipo (RN-11.2) | "Informe um nome entre 2 e 30 caracteres." / "Já existe uma categoria de {tipo} com esse nome." |
| Tipo | Seleção (Receita / Despesa) | Sim | Um dos dois valores; bloqueado na edição se houver lançamentos (RN-11.6) | "Selecione o tipo da categoria." / "Não é possível mudar o tipo: existem lançamentos nesta categoria." |
| Ícone | Seleção (lista fixa) | Não | Deve ser um dos ícones disponíveis | — |
| Cor | Seleção (paleta fixa) | Não | Deve ser uma das cores da paleta | — |
| _id, _dataCriacao, _origem (sistema/usuario) | Sistema | — | Gerados pelo sistema | — |

---

## 5. Critérios de aceite

**CA-01 — Criar categoria válida**
```
Dado que estou na tela de Categorias, na aba "Despesas"
Quando eu toco em "Nova categoria", preencho o nome "Academia", escolho um ícone e uma cor e confirmo
Então a categoria "Academia" passa a aparecer na lista de despesas
E vejo uma confirmação "Categoria criada"
```

**CA-02 — Nome ausente ou fora do tamanho**
```
Dado que estou criando uma categoria
Quando deixo o nome em branco (ou com 1 caractere) e tento salvar
Então o campo Nome fica em estado de erro com a mensagem "Informe um nome entre 2 e 30 caracteres."
E a categoria não é criada
```

**CA-03 — Nome duplicado no mesmo tipo**
```
Dado que já existe a categoria de despesa "Transporte"
Quando tento criar outra categoria de despesa chamada "transporte " (com espaço/caixa diferente)
Então recebo o erro "Já existe uma categoria de Despesa com esse nome."
E a categoria não é criada
```

**CA-04 — Editar categoria**
```
Dado que a categoria "Lazer" existe
Quando abro a edição, troco o nome para "Lazer e hobbies" e a cor, e salvo
Então a lista passa a mostrar "Lazer e hobbies" com a nova cor
E os lançamentos que estavam em "Lazer" continuam vinculados à mesma categoria
```

**CA-05 — Excluir categoria sem lançamentos**
```
Dado que a categoria "Academia" não tem nenhum lançamento
Quando escolho excluí-la e confirmo
Então "Academia" some da lista
E vejo a confirmação "Categoria excluída"
```

**CA-06 — Excluir categoria com lançamentos (migração)**
```
Dado que a categoria "Uber" tem 7 despesas vinculadas
Quando escolho excluí-la
Então o sistema me avisa "7 lançamentos serão movidos para 'Outros'. Deseja continuar?"
Quando confirmo
Então "Uber" é excluída
E as 7 despesas passam a ter a categoria "Outros"
```

**CA-07 — Categoria "Outros" é protegida**
```
Dado que estou vendo a categoria "Outros"
Então a ação de excluir não está disponível
E o campo Tipo aparece bloqueado na edição
```

**CA-08 — Listagem separada por tipo**
```
Dado que tenho categorias de receita e de despesa
Quando abro a tela de Categorias
Então vejo um seletor "Despesas | Receitas"
E cada aba mostra apenas as categorias do seu tipo, em ordem alfabética, com contador de lançamentos
```

**CA-09 — Persistência (apoia RNF de disponibilidade dos dados)**
```
Dado que criei/editei/excluí categorias
Quando recarrego o aplicativo
Então as categorias refletem exatamente o último estado salvo
```

**CA-10 — Tema claro/escuro (RNF-01)**
```
Dado que alterno o tema entre claro e escuro
Então a tela de Categorias e o formulário permanecem legíveis e com contraste adequado em ambos
```

---

## 6. Fluxos

### 6.1 Fluxo principal — Criar categoria
1. Usuário abre **Categorias** (menu → Mais → Categorias).
2. Seleciona a aba do tipo desejado (**Despesas** ou **Receitas**).
3. Toca em **Nova categoria**.
4. Abre o formulário (bottom sheet): informa **Nome**, opcionalmente escolhe **Ícone** e **Cor**; o **Tipo** já vem selecionado conforme a aba.
5. Toca em **Salvar**.
6. Sistema valida (Seção 4). Se ok: cria, fecha o formulário, mostra toast "Categoria criada" e a lista atualiza.

### 6.2 Alternativo — Editar
- No passo 3, o usuário toca em uma categoria existente → formulário abre preenchido → altera → **Salvar**.
- Se a categoria tiver lançamentos, o campo **Tipo** vem bloqueado (RN-11.6).

### 6.3 Alternativo — Excluir
- Na edição, o usuário toca em **Excluir categoria**.
- Sem lançamentos: diálogo "Excluir a categoria '{nome}'?" → confirma → remove.
- Com lançamentos: diálogo "{n} lançamentos serão movidos para 'Outros'. Deseja continuar?" → confirma → migra + remove.
- "Outros" não apresenta a ação de excluir.

### 6.4 Exceção — Validação falha
- Campo inválido recebe borda de erro (`color/expense`) + mensagem em Caption abaixo do campo (alinha com RNF-06 do documento de requisitos).
- O foco vai para o primeiro campo inválido. O formulário não fecha.

### 6.5 Exceção — Sem conexão / falha ao salvar (versão com back-end)
- Mostra toast de erro "Não foi possível salvar. Tente novamente." e mantém os dados digitados no formulário.

---

## 7. Especificação da tela (design)

> Base: `design-system-organizacao-financeira.md`. Todos os valores abaixo referenciam **tokens**,
> não cores fixas. Tela desenhada **mobile-first** (375px); no desktop, ocupa a coluna de conteúdo
> ao lado da sidebar fixa (RNF-02).

### 7.1 Rota e navegação
- **Rota:** `Mais / Categorias` (no mobile, dentro do drawer "Mais"; no desktop, item da sidebar).
- Profundidade: Painel → Mais → Categorias = **2 cliques** (dentro do limite do RNF-02).
- Criar categoria: Categorias → Nova categoria → Salvar = 2 cliques a partir da tela.

### 7.2 Estrutura (wireframe textual)

```
┌───────────────────────────────────────┐
│  ←   Categorias              [ tema ]  │  Header: H1 "Categorias", botão voltar (ghost),
│                                       │  toggle de tema à direita (ícone sol/lua)
│  ┌─────────────┬─────────────┐        │
│  │  Despesas   │  Receitas   │        │  Segmented control (h 40, radius/sm)
│  └─────────────┴─────────────┘        │  ativo: color/primary | inativo: color/background
│                                       │
│  ●  Alimentação            12 lanç. › │  Linha de categoria:
│  ●  Transporte              8 lanç. › │   - bolinha 32px com a cor da categoria + ícone (branco, 18px)
│  ●  Moradia                 3 lanç. › │   - nome (Body, text-primary)
│  ●  Lazer                   0 lanç. › │   - contador (Body Small, text-secondary)
│  ●  Outros  (sistema)      21 lanç. › │   - chevron (ghost)
│                                       │  divisor: color/border 1px (discreto)
│                                       │
│                                       │
│  ┌───────────────────────────────┐    │
│  │        + Nova categoria       │    │  Botão primário (h 56, radius/md, color/primary)
│  └───────────────────────────────┘    │  fixo na base, com padding 16
└───────────────────────────────────────┘
```

**Bottom sheet — Criar / Editar categoria** (`radius/lg` no topo, `shadow/lg`, fundo `color/surface`):

```
┌───────────────────────────────────────┐
│            Nova categoria             │  H2, centralizado
│                                       │
│  Tipo                                 │  Caption, text-secondary
│  ┌─────────────┬─────────────┐        │  Segmented control (bloqueado se houver lançamentos)
│  │  Despesa    │  Receita    │        │
│  └─────────────┴─────────────┘        │
│                                       │
│  Nome                                 │  Caption
│  ┌───────────────────────────────┐    │  Input (radius/sm, borda color/border)
│  │ Academia                      │    │  foco: borda color/primary
│  └───────────────────────────────┘    │  erro: borda color/expense + caption abaixo
│                                       │
│  Ícone                                │
│  [🍔][🚗][🏠][➕][🎬][💊][📚][•••]     │  grid de ícones Lucide, seleção única
│                                       │
│  Cor                                  │
│  ( ● ● ● ● ● ● ● ● )                  │  paleta fixa (8 cores), seleção única
│                                       │
│  ┌───────────┐  ┌──────────────────┐  │
│  │ Cancelar  │  │      Salvar      │  │  Secundário | Primário
│  └───────────┘  └──────────────────┘  │
│                                       │
│  ─────────  Excluir categoria  ────── │  só na edição; Ghost em color/expense;
└───────────────────────────────────────┘  escondido para "Outros"
```

### 7.3 Componentes do Design System utilizados

| Componente | Uso nesta tela | Tokens principais |
|---|---|---|
| Segmented control | Alternar Despesas/Receitas; escolher Tipo no form | `color/primary` (ativo), `color/background` (inativo), h 40, `radius/sm` |
| Button / Primary | "Nova categoria", "Salvar" | `color/primary`, texto branco, h 56, `radius/md` |
| Button / Secondary | "Cancelar" | borda `color/border`, texto `color/text-primary` |
| Button / Ghost (destrutivo) | "Excluir categoria" | texto `color/expense` |
| Input | Campo Nome | `radius/sm`, borda `color/border` → `color/primary` no foco; erro `color/expense` |
| Card / linha de lista | Cada categoria | `color/surface`, divisor `color/border`, `shadow/sm` no container |
| Bottom sheet | Formulário criar/editar | `radius/lg` topo, `shadow/lg`, `color/surface` |
| Dialog de confirmação | Exclusão / migração | `radius/lg`, `shadow/lg` |
| Toast | "Categoria criada/atualizada/excluída" | borda esquerda `color/income` (sucesso) / `color/expense` (erro) |
| Ícones | Ícones de categoria e de ação | Lucide, traço 1.5px, 18–24px |

### 7.4 Estados da tela

| Estado | Descrição |
|---|---|
| **Padrão** | Lista com categorias padrão + do usuário, ordenadas por nome. |
| **Vazio (por tipo)** | Só aparece se o usuário excluir tudo menos "Outros": ilustração leve + texto "Você ainda não criou categorias de {tipo}" + botão "Nova categoria". |
| **Carregando** | Skeleton de 4–5 linhas (retângulos `color/border` com `radius/sm`). |
| **Erro de validação** | Campo do form com borda `color/expense` + Caption com a mensagem; foco no primeiro campo inválido. |
| **Salvando** | Botão "Salvar" em estado Loading (spinner no lugar do texto); campos desabilitados. |

### 7.5 Paleta de cores da categoria (seleção pelo usuário)

Verde `#22C55E` · Vermelho `#EF4444` · Laranja `#F59E0B` · Azul `#3B82F6` ·
Roxo `#8B5CF6` · Rosa `#EC4899` · Ciano `#06B6D4` · Cinza `#64748B`

---

## 8. Mensagens do sistema (padronização — apoia RNF-06)

| Situação | Mensagem |
|---|---|
| Criada com sucesso | "Categoria criada." |
| Atualizada com sucesso | "Categoria atualizada." |
| Excluída com sucesso | "Categoria excluída." |
| Nome inválido | "Informe um nome entre 2 e 30 caracteres." |
| Nome duplicado | "Já existe uma categoria de {Receita/Despesa} com esse nome." |
| Tipo não selecionado | "Selecione o tipo da categoria." |
| Tipo bloqueado | "Não é possível mudar o tipo: existem lançamentos nesta categoria." |
| Confirmar exclusão simples | "Excluir a categoria '{nome}'?" |
| Confirmar exclusão com migração | "{n} lançamento(s) serão movidos para 'Outros'. Deseja continuar?" |
| Falha ao salvar (back-end) | "Não foi possível salvar. Tente novamente." |

---

## 9. Rastreabilidade e pendências para o grupo

- **Colisão de tela conhecida:** categorias também são criadas *inline* dentro do formulário de
  Receita/Despesa (RF-02 / RF-03) via atalho "+ Nova categoria". Esse atalho reaproveita o mesmo
  bottom sheet especificado aqui (Seção 7.2), já com o Tipo travado no tipo do lançamento.
- **A confirmar com o grupo:** limite de 40 categorias por tipo (RN-11.9); lista final de
  categorias padrão (RN-11.3); se "cor" e "ícone" entram no MVP ou ficam para depois.
- **Vínculo com RF-04 (Limites):** limites de gasto são definidos por categoria de despesa —
  a exclusão/migração de categoria (RN-11.5) precisa, na integração, tratar o limite associado
  (mover para "Outros" ou remover). Fora do escopo deste RF, registrado para o refinamento.
