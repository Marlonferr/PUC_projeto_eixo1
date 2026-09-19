# Compartilhado

Arquivos de base usados por mais de uma tela, para não duplicar código entre pastas:

| Arquivo | O que é |
|---|---|
| `design-system.css` | Tokens (cores, tipografia, espaçamento, raio, sombra) e componentes do Design System do Contaí. Suporta tema claro/escuro via `data-theme` (RNF-01). |
| `store.js` | Camada de dados (persistência em `localStorage`) e regras de negócio de Categorias e Despesas. |
| `ui.js` | Formatação (moeda, datas), ícones, alternância de tema, toast, diálogo de confirmação e bottom sheet. |

Criado a partir do RF-11 (Categorias) e RF-03 (Despesas), mas
pensado para qualquer tela reaproveitar — evita que cada pessoa reimplemente formatação de
moeda, tema claro/escuro, toast etc. do zero.

**Como usar em uma nova tela** (ex.: `codigo-fonte/receitas/receitas.html`):

```html
<link rel="stylesheet" href="../compartilhado/design-system.css" />
...
<script src="../compartilhado/ui.js"></script>
<script src="../compartilhado/store.js"></script>
<script src="sua-tela.js"></script>
```

Se o `store.js` atual não cobrir os dados da sua tela (ex.: metas, limites), adicione seu
próprio módulo de dados na pasta da sua tela em vez de editar este arquivo 
