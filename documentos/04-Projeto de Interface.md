
# Projeto de Interface

## User Flow

Isaque
<img src="img/User Flow Isaque.png" alt="User Flow Isaque">

Marlon
<img src="img/UserFlow.png" alt="UserFlow-Marlon Fernando">
Pedro
### User Flow — versão completa (com RF-10 e RF-11)

O diagrama acima não incluía as telas de **Categorias (RF-11)** e **Relatórios (RF-10)**,
que já constam em `02-Especificação do Projeto.md`. Abaixo vai a mesma jornada, completa,
em Mermaid (o GitHub renderiza automaticamente ao abrir este arquivo):

```mermaid
flowchart TD
  subgraph LOGIN["Login ou Cadastro"]
    A(["Login / Logout"]) --> B{"Tem cadastro?"}
    B -- "Não, esqueci a senha" --> C["Esqueceu a senha"]
    C --> D["Digite e-mail"]
    D --> E["Link de redefinição enviado"]
    E --> A
    B -- "Não, quero criar" --> F["Tela de cadastro"]
    F --> G["Registrar via Google / banco / Facebook"]
    G --> H["Autenticado"]
    B -- "Sim" --> H
    H --> I(["Bem-vindo ao Contaí"])
  end

  I --> J["Tela inicial"]

  subgraph SISTEMA["Contaí — Sistema"]
    J --> K["Menu de informações"]
    K --> L["Dados do usuário · RF-06"]
    K --> M["Enviar convites · RF-08"]
    K --> N["Avaliar a experiência · RF-09"]
    K --> O["Metas financeiras · RF-05"]
    K --> P["Limites de gastos · RF-04"]
    K --> Q["Categorias · RF-11"]:::novo
    K --> R["Relatórios · RF-10"]:::novo

    J --> S["Receitas e despesas · RF-02 / RF-03"]
    S --> T{"Editar?"}
    T -- "Sim" --> U(["Registrar, consultar, editar e excluir"])
    T -- "Não" --> J

    S -. "usa categoria de" .-> Q
    P -. "usa categoria de" .-> Q
    R -. "lê dados de" .-> S
    R -. "lê dados de" .-> P
    R -. "lê dados de" .-> O
  end

  classDef novo fill:#22C55E,stroke:#16A34A,color:#ffffff;
```

**O que foi adicionado** (verde no diagrama):
- **Categorias (RF-11)** — acessível pelo menu, e usada tanto por Receitas/Despesas quanto por Limites (toda despesa/receita e todo limite têm uma categoria).
- **Relatórios (RF-10)** — acessível pelo menu, e lê dados de Receitas/Despesas, Limites e Metas para gerar as visualizações.

## Protótipo

Desenvolver um protótipo emerge como uma das maneiras mais ágeis e econômicas de validar uma ideia, conceito ou funcionalidade. Isso permite a interação, avaliação, modificação e aprovação das principais características de uma interface antes de entrar na fase de desenvolvimento. [Leia o artigo [Protótipos: baixa, média ou alta fidelidade?](https://medium.com/ladies-that-ux-br/prot%C3%B3tipos-baixa-m%C3%A9dia-ou-alta-fidelidade-71d897559135).]

### Protótipo de baixa fidelidade

Protótipos de baixa fidelidade apresentam de forma simplificada o design da interface e o relacionamento entre suas páginas, permitindo evolução da proposta da solução. Neste projeto, os utilizaremos para apoiar a validação dos requisitos e efetuar mudanças dos mesmos, caso seja necessário, para menor impacto na codificação da aplicação.

[Elabore as principais interfaces gráficas da aplicação de modo que os requisitos funcionais sejam contemplados nas telas propostas.]

[Adicione aqui as telas da sua aplicação com seus devidos títulos.] 
 
> **Links Úteis**:
> - [Protótipos vs Wireframes](https://www.nngroup.com/videos/prototypes-vs-wireframes-ux-projects/)
>- Ferramentas:
>> - [Pencil](https://pencil.evolus.vn/)
>> - [MarvelApp](https://marvelapp.com/)
>> - [Figma](https://www.figma.com/)



