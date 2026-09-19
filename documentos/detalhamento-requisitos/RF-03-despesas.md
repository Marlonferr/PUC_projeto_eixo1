# RF-03 — Gerenciar despesas

> **Projeto:** Contaí — Organização Financeira Pessoal (PUC Minas)
> **Responsável:** Pedro
> **Épico:** Lançamentos
> **Prioridade:** Alta (funcionalidade central do produto)
> **Depende de:** RF-01 (usuário autenticado), **RF-11 (categorias de despesa)**
> **Alimenta:** RF-10 (painel), RF-11 (contador de lançamentos), RF-04 (limites por categoria)

---

## 1. Descrição

Permite ao usuário **registrar, listar, filtrar, editar e excluir** despesas. Cada despesa
representa uma saída de dinheiro e é classificada por uma **categoria de despesa** (RF-11).
A tela mostra o **total do período** selecionado e a lista dos lançamentos, para o usuário
entender para onde o dinheiro está indo.

---

## 2. Histórias de usuário

| ID | História | Critérios de aceite |
|---|---|---|
| US-03.1 | Como usuário, quero **registrar uma despesa** com valor, data, categoria e descrição para manter meu controle atualizado | CA-01, CA-02, CA-03, CA-04 |
| US-03.2 | Como usuário, quero **ver minhas despesas do mês** e o total gasto para saber como está meu orçamento | CA-07, CA-09 |
| US-03.3 | Como usuário, quero **filtrar despesas por categoria e por mês** para analisar um gasto específico | CA-07, CA-08 |
| US-03.4 | Como usuário, quero **editar** uma despesa lançada errada | CA-05 |
| US-03.5 | Como usuário, quero **excluir** uma despesa que não deveria estar ali | CA-06 |

---

## 3. Regras de negócio

| ID | Regra |
|---|---|
| RN-03.1 | Toda despesa tem obrigatoriamente **valor**, **data** e **categoria**. Descrição e forma de pagamento são opcionais. |
| RN-03.2 | **Valor** deve ser **maior que zero**, em Reais (BRL), com no máximo 2 casas decimais. Valor máximo aceito: R$ 1.000.000,00 (a confirmar com o grupo). |
| RN-03.3 | A **categoria** selecionada deve existir e ser do tipo **Despesa** (RF-11). Se o usuário não tiver nenhuma categoria de despesa além de "Outros", o sistema ainda permite lançar (usando "Outros") e sugere criar categorias. |
| RN-03.4 | **Data** pode ser passada ou o dia atual. Datas futuras são permitidas mas a despesa é marcada visualmente como **"agendada"** e **não entra no total do mês corrente** até a data chegar (a confirmar com o grupo — alternativa: bloquear data futura). |
| RN-03.5 | O **período padrão** exibido ao abrir a tela é o **mês atual**. O usuário navega entre meses (‹ / ›). |
| RN-03.6 | A **lista** é ordenada por **data decrescente** (mais recente primeiro); dentro do mesmo dia, por ordem de criação decrescente. |
| RN-03.7 | O **total do período** = soma dos valores de todas as despesas do período/filtro aplicados (excluindo agendadas futuras, conforme RN-03.4). |
| RN-03.8 | Excluir uma despesa **exige confirmação** e é irreversível na versão MVP (sem lixeira). |
| RN-03.9 | Se a **categoria da despesa for excluída** (RF-11 / RN-11.5), a despesa passa automaticamente para a categoria **"Outros"**. |
| RN-03.10 | Valores monetários são exibidos no formato **pt-BR** (`R$ 1.234,56`) e, na lista de despesas, prefixados com **"−"** e na cor `color/expense`. |
| RN-03.11 | Despesas são **por usuário**; um usuário nunca acessa despesas de outro. |

---

## 4. Campos e validações

| Campo | Tipo | Obrigatório | Regras / validação | Mensagem de erro |
|---|---|---|---|---|
| Valor | Monetário (R$) | Sim | > 0; ≤ 1.000.000,00; máscara pt-BR; alinhado à direita | "Informe um valor maior que zero." |
| Data | Data | Sim | Data válida; default = hoje | "Selecione uma data válida." |
| Categoria | Seleção | Sim | Categoria existente do tipo Despesa | "Selecione uma categoria." |
| Descrição | Texto | Não | Até 100 caracteres | "A descrição deve ter no máximo 100 caracteres." |
| Forma de pagamento | Seleção | Não | Um de: Dinheiro, Débito, Crédito, Pix, Boleto | — |
| _id, _dataCriacao | Sistema | — | Gerados pelo sistema | — |

---

## 5. Critérios de aceite

**CA-01 — Registrar despesa válida**
```
Dado que estou na tela de Despesas
Quando toco em "Nova despesa", informo valor R$ 45,90, data de hoje, categoria "Alimentação",
      descrição "Almoço" e salvo
Então a despesa aparece no topo da lista do dia de hoje
E o total do mês aumenta em R$ 45,90
E vejo a confirmação "Despesa registrada"
```

**CA-02 — Valor inválido**
```
Dado que estou registrando uma despesa
Quando informo valor R$ 0,00 (ou deixo em branco) e tento salvar
Então o campo Valor fica em erro: "Informe um valor maior que zero."
E a despesa não é salva
```

**CA-03 — Categoria não selecionada**
```
Dado que estou registrando uma despesa
Quando não seleciono categoria e tento salvar
Então o campo Categoria fica em erro: "Selecione uma categoria."
```

**CA-04 — Data padrão**
```
Dado que abro o formulário de nova despesa
Então o campo Data já vem preenchido com a data de hoje
E posso alterá-la para uma data anterior
```

**CA-05 — Editar despesa**
```
Dado que existe a despesa "Almoço — R$ 45,90 — Alimentação"
Quando abro a edição, mudo o valor para R$ 52,00 e a categoria para "Lazer" e salvo
Então a lista mostra a despesa atualizada
E o total do mês é recalculado
E o contador de lançamentos das categorias "Alimentação" e "Lazer" é ajustado
```

**CA-06 — Excluir despesa**
```
Dado que existe uma despesa na lista
Quando escolho excluí-la
Então o sistema pergunta "Excluir esta despesa?"
Quando confirmo
Então a despesa some da lista e o total do mês diminui pelo valor dela
```

**CA-07 — Navegar entre meses**
```
Dado que estou vendo as despesas de Setembro/2026
Quando toco em "‹"
Então passo a ver as despesas de Agosto/2026, com o total correspondente
```

**CA-08 — Filtrar por categoria**
```
Dado que tenho despesas de várias categorias no mês
Quando seleciono o filtro de categoria "Transporte"
Então a lista mostra apenas despesas de Transporte
E o total exibido passa a ser o total gasto em Transporte no período
```

**CA-09 — Lista vazia**
```
Dado que não há despesas no período/filtro selecionado
Então vejo um estado vazio com o texto "Nenhuma despesa neste período" e um botão "Nova despesa"
E o total exibido é R$ 0,00
```

**CA-10 — Persistência**
```
Dado que registrei, editei ou excluí despesas
Quando recarrego o aplicativo
Então a lista e os totais refletem o último estado salvo
```

**CA-11 — Sem categorias de despesa criadas pelo usuário**
```
Dado que só existe a categoria "Outros"
Quando abro o formulário de nova despesa
Então consigo lançar usando "Outros"
E vejo um aviso com link "Criar categorias" que leva ao RF-11
```

**CA-12 — Tema claro/escuro (RNF-01)**
```
Dado que alterno o tema
Então a tela de Despesas, os valores e o formulário permanecem legíveis e com contraste adequado
```

---

## 6. Fluxos

### 6.1 Fluxo principal — Registrar despesa
1. Usuário abre **Despesas** (bottom navigation no mobile / sidebar no desktop).
2. Toca em **Nova despesa**.
3. Bottom sheet abre com **Valor** em foco (teclado numérico) e **Data** = hoje.
4. Informa valor, confirma/ajusta data, escolhe **Categoria**, opcionalmente **Descrição** e
   **Forma de pagamento**.
5. Toca em **Salvar**.
6. Sistema valida (Seção 4). Se ok: salva, fecha o sheet, toast "Despesa registrada", a lista
   e o total do período atualizam.

### 6.2 Alternativo — Editar
- Na lista, o usuário toca em uma despesa → sheet abre preenchido → altera → **Salvar**.

### 6.3 Alternativo — Excluir
- Na edição (ou por ação rápida na lista), toca em **Excluir** → diálogo "Excluir esta despesa?"
  → confirma → remove + recalcula total.

### 6.4 Alternativo — Filtrar / navegar período
- Botões ‹ / › trocam o mês. O seletor de categoria filtra a lista e o total.
- Filtros são combináveis (mês + categoria).

### 6.5 Exceção — Validação falha
- Campo inválido: borda `color/expense` + Caption com a mensagem; foco no primeiro inválido;
  o sheet não fecha.

### 6.6 Exceção — Sem categorias de despesa do usuário
- Formulário mostra faixa informativa (`color/info`) "Você ainda não criou categorias. Lançamentos
  irão para 'Outros'." + link "Criar categorias" (abre RF-11).

---

## 7. Especificação da tela (design)

> Base: `design-system-organizacao-financeira.md`. Mobile-first (375px). No desktop, conteúdo ao
> lado da sidebar fixa.

### 7.1 Rota e navegação
- **Rota:** item **Despesas** na navegação principal (bottom nav no mobile, sidebar no desktop).
- Painel → Despesas = **1 clique**. Registrar despesa = Despesas → Nova despesa → Salvar.
- Atende ao RNF-02 (máx. 3 cliques para qualquer função).

### 7.2 Estrutura (wireframe textual)

```
┌───────────────────────────────────────┐
│  Despesas                     [ tema ] │  H1
│                                       │
│        ‹   Setembro 2026   ›          │  Seletor de mês (Ghost + H3)
│                                       │
│            − R$ 2.550,00              │  Total do período — Display, color/expense
│         12 despesas neste mês         │  Body Small, text-secondary
│                                       │
│  [ Todas ][ Alimentação ][ Transp… ]  │  Chips de filtro por categoria (scroll horizontal)
│                                       │
│  ── 09 de setembro ─────────────────  │  Cabeçalho de dia (Caption, text-secondary)
│  🍔  Almoço                −R$ 45,90 │  Linha: ícone categoria (bolinha), descrição/categoria,
│      Alimentação                      │        valor (Numeric/Valor, color/expense)
│  🚗  Uber                  −R$ 18,30 │
│      Transporte · Pix                 │
│  ── 08 de setembro ─────────────────  │
│  🏠  Aluguel            −R$ 1.500,00 │
│      Moradia · Boleto                 │
│                                       │
│  ┌───────────────────────────────┐    │
│  │        + Nova despesa         │    │  Botão primário (h 56, radius/md)
│  └───────────────────────────────┘    │
└───────────────────────────────────────┘
```

**Bottom sheet — Nova / Editar despesa** (`radius/lg`, `shadow/lg`, `color/surface`):

```
┌───────────────────────────────────────┐
│             Nova despesa              │  H2
│                                       │
│               R$ 0,00                 │  Valor — campo grande, centralizado, Display,
│                                       │  teclado numérico; erro em color/expense
│                                       │
│  Categoria                            │  Caption
│  ┌───────────────────────────────┐    │  Select com ícone+cor da categoria
│  │ 🍔  Alimentação            ▾  │    │  (apenas categorias tipo Despesa)
│  └───────────────────────────────┘    │  + item fixo "＋ Nova categoria" (abre RF-11)
│                                       │
│  Data                 Forma de pgto.  │
│  ┌────────────┐       ┌────────────┐  │  Date input (default hoje) | Select opcional
│  │ 09/09/2026 │       │ Pix      ▾ │  │
│  └────────────┘       └────────────┘  │
│                                       │
│  Descrição (opcional)                 │
│  ┌───────────────────────────────┐    │  Input, até 100 chars, contador
│  │ Almoço no restaurante         │    │
│  └───────────────────────────────┘    │
│                                       │
│  ┌───────────┐  ┌──────────────────┐  │
│  │ Cancelar  │  │      Salvar      │  │
│  └───────────┘  └──────────────────┘  │
│                                       │
│  ─────────  Excluir despesa  ──────── │  só na edição; Ghost em color/expense
└───────────────────────────────────────┘
```

### 7.3 Componentes do Design System utilizados

| Componente | Uso | Tokens principais |
|---|---|---|
| Título de valor | Total do período; campo Valor no form | `Display` (40/700), `color/expense` |
| Chips de filtro | Filtro por categoria | `color/background` (inativo) / `color/primary` (ativo), `radius/sm` |
| Botão Ghost (‹ ›) | Navegação de mês | ícone Lucide 1.5px |
| Card / linha de lista | Cada despesa | `color/surface`, divisor `color/border`, valor em `Numeric/Valor` |
| Botão Primary | "Nova despesa", "Salvar" | `color/primary`, h 56, `radius/md` |
| Botão Secondary | "Cancelar" | borda `color/border` |
| Botão Ghost destrutivo | "Excluir despesa" | `color/expense` |
| Input | Valor, Descrição | `radius/sm`; foco `color/primary`; erro `color/expense` |
| Select | Categoria, Data, Forma de pagamento | `radius/sm`, borda `color/border` |
| Bottom sheet | Formulário | `radius/lg` topo, `shadow/lg` |
| Dialog | Confirmar exclusão | `radius/lg`, `shadow/lg` |
| Toast | "Despesa registrada / atualizada / excluída" | borda esquerda `color/income` (sucesso) |
| Faixa informativa | Aviso "sem categorias" | `color/info` |

### 7.4 Estados da tela

| Estado | Descrição |
|---|---|
| **Padrão** | Total do mês + lista agrupada por dia. |
| **Vazio** | "Nenhuma despesa neste período" + ilustração leve + botão "Nova despesa". Total = R$ 0,00. |
| **Filtrado sem resultado** | "Nenhuma despesa de {categoria} em {mês}". |
| **Carregando** | Skeleton: bloco do total + 3–4 linhas. |
| **Erro de validação** | Campo com borda `color/expense` + Caption; foco no primeiro inválido. |
| **Salvando** | Botão "Salvar" em Loading; campos desabilitados. |
| **Despesa agendada (data futura)** | Linha com badge "Agendada" (`color/warning`), não somada ao total do mês corrente. |

### 7.5 Acessibilidade / usabilidade
- Área de toque mínima 44×44px nas linhas e botões.
- Contraste texto/fundo ≥ 4.5:1 em ambos os temas (valores de token já atendem).
- Campo Valor abre teclado numérico no mobile (`inputmode="decimal"`).
- Erros anunciados junto ao campo (não só por cor) — texto + ícone.

---

## 8. Mensagens do sistema (padronização — apoia RNF-06)

| Situação | Mensagem |
|---|---|
| Registrada com sucesso | "Despesa registrada." |
| Atualizada com sucesso | "Despesa atualizada." |
| Excluída com sucesso | "Despesa excluída." |
| Valor inválido | "Informe um valor maior que zero." |
| Data inválida | "Selecione uma data válida." |
| Categoria não selecionada | "Selecione uma categoria." |
| Descrição longa | "A descrição deve ter no máximo 100 caracteres." |
| Confirmar exclusão | "Excluir esta despesa?" |
| Sem categorias do usuário | "Você ainda não criou categorias. Lançamentos irão para 'Outros'." |
| Falha ao salvar (back-end) | "Não foi possível salvar. Tente novamente." |

---

## 9. Rastreabilidade e pendências para o grupo

- **Dependência forte de RF-11:** a lista de categorias do formulário vem do RF-11; o atalho
  "＋ Nova categoria" reabre o bottom sheet do RF-11 com o Tipo travado em "Despesa".
- **Integração com RF-10 (Painel):** o total de despesas do mês e a distribuição por categoria
  exibidos no painel são calculados a partir das despesas deste RF (mesma fonte de dados).
- **Integração com RF-04 (Limites):** ao salvar uma despesa que faz a categoria ultrapassar (ou
  chegar perto de) o limite, o RF-04 dispara o alerta. Fora do escopo deste RF; registrado.
- **A confirmar com o grupo:** tratamento de data futura (RN-03.4 — marcar como agendada *ou*
  bloquear); valor máximo (RN-03.2); se "forma de pagamento" entra no MVP.
- **Colisão de tela (registrada no backlog):** RF-02 (Receitas) usa esta mesma estrutura de tela
  e o mesmo componente de formulário, trocando apenas o tipo e a cor (`color/income`). Sugestão
  futura: unificar em "Lançamentos" com alternância.
