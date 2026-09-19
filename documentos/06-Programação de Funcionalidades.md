# Programação de Funcionalidades

Implementação da aplicação descritas por meio dos requisitos codificados.

[Utilize a estrutura abaixo para cada funcionalidade entregue na etapa]

### Gerenciar despesas

<img width="574" height="594" alt="image" src="https://github.com/user-attachments/assets/19abfa32-dff3-4f62-93cf-c2c2dd193280" />


#### Requisito atendido

RF-03: Como usuário, quero registrar, consultar, editar e excluir minhas despesas, para
acompanhar meus gastos e entender para onde meu dinheiro está indo.

#### Artefatos da funcionalidade

- `codigo-fonte/despesas/despesas.html`
- `codigo-fonte/despesas/despesas.js`
- `codigo-fonte/compartilhado/store.js` (regras de negócio e persistência)
- `codigo-fonte/compartilhado/ui.js` e `design-system.css` (compartilhados — ver RF-11)
- Especificação detalhada (histórias, regras de negócio, critérios de aceite, spec de tela):
  [`documentos/detalhamento-requisitos/RF-03-despesas.md`](detalhamento-requisitos/RF-03-despesas.md)

#### Estrutura de Dados

Cada despesa é um objeto salvo em `localStorage` (chave `contai.proto.dados.v1`, lista `despesas`):

```json
{
  "id": "desp_abc123",
  "valor": 4590,
  "data": "2026-09-10",
  "categoriaId": "cat_xyz789",
  "descricao": "Almoço",
  "formaPagamento": "Pix",
  "dataCriacao": "2026-09-10T12:00:00.000Z"
}
```

`valor` é armazenado em **centavos** (inteiro) para evitar erro de ponto flutuante ao somar.
`categoriaId` referencia uma categoria do RF-11 (tipo `despesa`); se a categoria for excluída,
os lançamentos são migrados para a categoria padrão "Outros" (regra do RF-11).

#### Instruções de acesso

https://pedrohomaia.github.io/ads-contai/despesas.html

Abra `codigo-fonte/despesas/despesas.html` no navegador (ou pelo GitHub Pages, quando publicado).
Não requer login nesta etapa: os dados ficam salvos no `localStorage` do próprio navegador.

#### Responsável

Pedro

---

### Criar categorias de receitas e despesas

<img width="550" height="593" alt="image" src="https://github.com/user-attachments/assets/07129ea7-beef-46bb-a0cc-6abae0e19837" />




#### Requisito atendido

RF-11: Como usuário, quero criar categorias para organizar minhas receitas e despesas, para
identificar melhor a origem das receitas e a destinação dos meus gastos. A especificação também
cobre editar e excluir, necessários para o requisito ter valor de uso completo.

#### Artefatos da funcionalidade

- `codigo-fonte/categorias/categorias.html`
- `codigo-fonte/categorias/categorias.js` (expõe `Contai.abrirFormCategoria`, reaproveitado
  pelo formulário de Despesas para criar categoria sem sair da tela)
- `codigo-fonte/compartilhado/store.js`, `ui.js`, `design-system.css`
- Especificação detalhada:
  [`documentos/detalhamento-requisitos/RF-11-categorias.md`](detalhamento-requisitos/RF-11-categorias.md)

#### Estrutura de Dados

Cada categoria é um objeto salvo em `localStorage` (mesma chave, lista `categorias`):

```json
{
  "id": "cat_xyz789",
  "nome": "Alimentação",
  "tipo": "despesa",
  "icone": "utensils",
  "cor": "#F59E0B",
  "origem": "sistema",
  "protegida": false,
  "dataCriacao": "2026-09-10T12:00:00.000Z"
}
```

`tipo` é `"despesa"` ou `"receita"`. A categoria `"Outros"` de cada tipo é criada automaticamente
(`protegida: true`) e não pode ser excluída nem ter tipo/nome alterados: é o destino de
migração quando o usuário exclui uma categoria que já tem lançamentos.

#### Instruções de acesso

https://pedrohomaia.github.io/ads-contai/categorias.html

Abra `codigo-fonte/categorias/categorias.html` no navegador. Também é possível criar uma
categoria de despesa sem sair da tela de Despesas, pelo atalho "＋ Nova categoria…" no campo
Categoria do formulário de nova despesa.

#### Responsável

Pedro

---

[Adicione aqui a próxima funcionalidade, seguindo a mesma estrutura.]

> **Links Úteis**:
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)
