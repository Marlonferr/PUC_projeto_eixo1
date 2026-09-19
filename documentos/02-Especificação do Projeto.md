# Especificação do Projeto

## Perfis de Usuários

<table>
<tbody>
<tr align=center>
<th colspan="2">Perfil 1: Usuário

 </th>

</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">Pessoa que administra a própria renda, fixa ou variável, e precisa organizar um orçamento com diferentes compromissos, como contas recorrentes, parcelas, despesas familiares e faturas de cartão de crédito. Pode ainda não possuir o hábito consistente de registrar e acompanhar seus gastos, enfrentando dificuldades para prever os recursos disponíveis para despesas e compromissos futuros.

</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>Registrar e acompanhar receitas, despesas, contas e cartões de forma simples e centralizada; categorizar gastos; acompanhar faturas e despesas recorrentes e futuras; visualizar a destinação do dinheiro e os valores já comprometidos; compreender o saldo disponível e projetado; e estabelecer limites de gastos e metas financeiras.

</td>
</tr>
</tbody>
</table>


## Requisitos e Histórias

<table>
<thead>
<tr>
<th>ID</th>
<th>Descrição do Requisito</th>
<th>EU COMO...</th>
<th>QUERO/PRECISO...</th>
<th>PARA...</th>
<th>Responsável</th>
<th>Página</th>
<th>Prioridade</th>
</tr>
</thead>

<tbody>

<tr>
<td>RF-01</td>
<td>Centralizar informações financeiras</td>
<td>usuário</td>
<td>visualizar minhas principais informações financeiras em um único ambiente</td>
<td>compreender melhor minha situação financeira e reduzir a necessidade de consultar diferentes locais</td>
<td>Isaque</td>
<td>Painel inicial</td>
<td>ALTA</td>
</tr>

<tr>
<td>RF-02</td>
<td>Gerenciar receitas</td>
<td>usuário</td>
<td>registrar, consultar, editar e excluir minhas receitas</td>
<td>acompanhar minhas entradas de dinheiro e entender como elas afetam minha situação financeira</td>
<td>Marlon</td>
<td>Receitas</td>
<td>ALTA</td>
</tr>

<tr>
<td>RF-03</td>
<td>Gerenciar despesas</td>
<td>usuário</td>
<td>registrar, consultar, editar e excluir minhas despesas</td>
<td>acompanhar meus gastos e entender para onde meu dinheiro está indo</td>
<td>Pedro</td>
<td>Despesas</td>
<td>ALTA</td>
</tr>

<tr>
<td>RF-04</td>
<td>Definir limite de gastos</td>
<td>usuário</td>
<td>definir limites de gastos por categoria</td>
<td>acompanhar meu consumo e evitar ultrapassar os valores que estabeleci</td>
<td>Rainan</td>
<td>Limites</td>
<td>MÉDIA</td>
</tr>

<tr>
<td>RF-05</td>
<td>Definir metas financeiras</td>
<td>usuário</td>
<td>criar e acompanhar metas financeiras</td>
<td>acompanhar meu progresso e me organizar para atingir objetivos de economia</td>
<td>Estevão</td>
<td>Metas</td>
<td>MÉDIA</td>
</tr>

<tr>
<td>RF-06</td>
<td>Gerenciar dados do usuário</td>
<td>usuário</td>
<td>cadastrar e atualizar meus dados de usuário</td>
<td>manter minhas informações de acesso e perfil atualizadas</td>
<td>Rainan</td>
<td>Perfil</td>
<td>MÉDIA</td>
</tr>

<tr>
<td>RF-07</td>
<td>Realizar login no sistema</td>
<td>usuário</td>
<td>acessar o sistema por meio de autenticação</td>
<td>consultar e gerenciar minhas informações financeiras com acesso identificado</td>
<td>Isaque</td>
<td>Login</td>
<td>ALTA</td>
</tr>

<tr>
<td>RF-08</td>
<td>Enviar convite para a aplicação</td>
<td>usuário</td>
<td>enviar um convite para outra pessoa conhecer ou acessar a aplicação</td>
<td>compartilhar o acesso à ferramenta com outra pessoa</td>
<td>Marlon</td>
<td>Convites</td>
<td>BAIXA</td>
</tr>

<tr>
<td>RF-09</td>
<td>Avaliar a satisfação</td>
<td>usuário</td>
<td>avaliar minha experiência com a aplicação</td>
<td>informar meu nível de satisfação e contribuir para a melhoria da ferramenta</td>
<td>Lucas</td>
<td>Avaliação</td>
<td>BAIXA</td>
</tr>

<tr>
<td>RF-10</td>
<td>Gerar relatórios</td>
<td>usuário</td>
<td>gerar um relatório das minhas informações financeiras</td>
<td>visualizar e analisar meus dados financeiros de forma organizada</td>
<td>Lucas</td>
<td>Relatórios</td>
<td>MÉDIA</td>
</tr>

<tr>
<td>RF-11</td>
<td>Permitir criar categorias de receitas e despesas</td>
<td>usuário</td>
<td>criar categorias para organizar minhas receitas e despesas</td>
<td>identificar melhor a origem das receitas e a destinação dos meus gastos</td>
<td>Pedro</td>
<td>Categorias</td>
<td>ALTA</td>
</tr>

<tr>
<td>RF-12</td>
<td>Recuperar senha</td>
<td>usuário</td>
<td>recuperar minha senha caso eu esqueça</td>
<td>voltar a acessar minha conta sem precisar criar um novo cadastro</td>
<td>Estevão</td>
<td>Recuperação de senha</td>
<td>MÉDIA</td>
</tr>

</tbody>
</table>

**Prioridade: Alta / Média / Baixa. 

### Requisitos não Funcionais


|ID      | Descrição               |Prioridade |
|--------|-------------------------|----|
| RNF-01 |  A aplicação deve disponibilizar modo claro e modo escuro, permitindo que o usuário escolha o tema de sua preferência.| ALTA   | 
| RNF-02 |  As telas de Receitas, Despesas, Metas e Limites devem estar acessíveis a partir da tela inicial em no máximo 3 interações.| MÉDIA   | 
| RNF-03 |  A interface deve se adaptar adequadamente a telas de computador, tablet e smartphone, sem perda de conteúdo ou funcionalidade.| ALTA   |
| RNF-04 |  As principais telas da aplicação devem ser exibidas em até 3 segundos em condições normais de uso.| BAIXA   |
| RNF-05 |  A aplicação deve funcionar corretamente nos navegadores Google Chrome, Microsoft Edge e Mozilla Firefox, sem perda de conteúdo ou funcionalidade.| ALTA   |

**Prioridade: Alta / Média / Baixa. 

