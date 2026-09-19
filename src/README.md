# 📦 Repositório de Código-Fonte: Aplicação Distribuída

Este diretório centraliza o código-fonte desenvolvido pelo grupo, organizado por camadas e plataformas. Mantenha essa estrutura para garantir clareza e organização do projeto.

---

## 📂 Organização dos Diretórios do Sistema

O código do projeto foi dividido em três frentes de desenvolvimento:

### 1. [Backend (APIs & Web Services)](backend/)
* **Escopo**: API Central da aplicação desenvolvida pela equipe. É aqui que reside a lógica de negócios distribuída, regras de segurança (comunicações JWT/Auth), persistência e consulta a bancos de dados lógicos (Postgres, MongoDB, Redis).
* **Módulo do Microfundamento**: APIs e Web Services.

### 2. [Frontend (Aplicação Web)](frontend/)
* **Escopo**: Interface Web responsiva para navegação do usuário em microcomputadores e dispositivos compatíveis. Desenvolvida em linguagens dinâmicas / frameworks SPA (React, Vue, SPA puro).
* **Módulo do Microfundamento**: Recuperação de Informação na Web e Redes Sociais.

### 3. [Mobile (Aplicação Móvel)](mobile/)
* **Escopo**: Interface nativa ou híbrida para smartphones (desenvolvido em React Native via Expo, Flutter, entre outros). Contempla usabilidade touch, responsividade móvel e uso de recursos físicos locais.
* **Módulo do Microfundamento**: Desenvolvimento de Aplicações Móveis.

---

## 🛠️ Instruções para Execução Prática

Alunos, criem os documentos de instruções locais em formato README dentro de cada subpasta (`backend/`, `frontend/`, `mobile/`) detalhando:
1. Como instalar localmente as dependências (ex: `npm install`, `dotnet restore`).
2. Como configurar as variáveis de ambiente necessárias.
3. Como rodar a aplicação em ambiente de desenvolvimento.
4. Como executar a suíte de testes automatizados locais.
