/* ============================================================
   Contaí — Camada de dados (protótipo, JavaScript puro)
   Persistência em localStorage. Implementa as regras de
   negócio de RF-11 (categorias) e RF-03 (despesas).

   Modelo:
   categoria = { id, nome, tipo:'despesa'|'receita', icone, cor,
                 origem:'sistema'|'usuario', dataCriacao }
   despesa   = { id, valor (centavos, inteiro), data (ISO),
                 categoriaId, descricao, formaPagamento, dataCriacao }
   ============================================================ */
(function () {
  "use strict";

  var Contai = (window.Contai = window.Contai || {});
  var KEY = "contai.proto.dados.v1";

  /* ---------- Categorias padrão (RN-11.3) ---------- */
  var SEED = [
    // Despesas
    { nome: "Alimentação", tipo: "despesa", icone: "utensils", cor: "#F59E0B" },
    { nome: "Transporte", tipo: "despesa", icone: "car", cor: "#3B82F6" },
    { nome: "Moradia", tipo: "despesa", icone: "home", cor: "#8B5CF6" },
    { nome: "Saúde", tipo: "despesa", icone: "heart-pulse", cor: "#EF4444" },
    { nome: "Educação", tipo: "despesa", icone: "book", cor: "#06B6D4" },
    { nome: "Lazer", tipo: "despesa", icone: "gamepad", cor: "#EC4899" },
    { nome: "Contas", tipo: "despesa", icone: "receipt", cor: "#64748B" },
    { nome: "Outros", tipo: "despesa", icone: "tag", cor: "#64748B", protegida: true },
    // Receitas
    { nome: "Salário", tipo: "receita", icone: "briefcase", cor: "#22C55E" },
    { nome: "Freelance", tipo: "receita", icone: "trending-up", cor: "#06B6D4" },
    { nome: "Investimentos", tipo: "receita", icone: "trending-up", cor: "#8B5CF6" },
    { nome: "Presente", tipo: "receita", icone: "gift", cor: "#EC4899" },
    { nome: "Outros", tipo: "receita", icone: "tag", cor: "#22C55E", protegida: true },
  ];

  /* ---------- Estado ---------- */
  var dados = { categorias: [], despesas: [], receitas: [] };

  function uid(prefixo) {
    return (
      prefixo + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
    );
  }

  function salvar() {
    try {
      localStorage.setItem(KEY, JSON.stringify(dados));
    } catch (e) {
      console.warn("Não foi possível salvar em localStorage.", e);
    }
  }

  function carregar() {
    var bruto = null;
    try {
      bruto = localStorage.getItem(KEY);
    } catch (e) {}
    if (bruto) {
      try {
        dados = JSON.parse(bruto);
        dados.categorias = dados.categorias || [];
        dados.despesas = dados.despesas || [];
        dados.receitas = dados.receitas || [];
        return;
      } catch (e) {}
    }
    semear();
  }

  function semear() {
    dados = { categorias: [], despesas: [], receitas: [] };
    SEED.forEach(function (c) {
      dados.categorias.push({
        id: uid("cat"),
        nome: c.nome,
        tipo: c.tipo,
        icone: c.icone,
        cor: c.cor,
        origem: "sistema",
        protegida: !!c.protegida,
        dataCriacao: new Date().toISOString(),
      });
    });
    // Alguns lançamentos de exemplo para a tela não abrir vazia
    var hoje = new Date();
    function diasAtras(n) {
      var d = new Date(hoje);
      d.setDate(d.getDate() - n);
      return Contai.Datas.toISO(d);
    }
    var exemplos = [
      { valor: 4590, data: diasAtras(0), cat: "Alimentação", desc: "Almoço", fp: "Pix" },
      { valor: 1830, data: diasAtras(0), cat: "Transporte", desc: "Corrida por app", fp: "Crédito" },
      { valor: 8990, data: diasAtras(1), cat: "Lazer", desc: "Cinema", fp: "Débito" },
      { valor: 150000, data: diasAtras(3), cat: "Moradia", desc: "Aluguel", fp: "Boleto" },
      { valor: 32700, data: diasAtras(4), cat: "Alimentação", desc: "Mercado", fp: "Débito" },
      { valor: 6000, data: diasAtras(6), cat: "Saúde", desc: "Farmácia", fp: "Pix" },
    ];
    exemplos.forEach(function (e) {
      var cat = dados.categorias.find(function (c) {
        return c.tipo === "despesa" && c.nome === e.cat;
      });
      dados.despesas.push({
        id: uid("desp"),
        valor: e.valor,
        data: e.data,
        categoriaId: cat.id,
        descricao: e.desc,
        formaPagamento: e.fp,
        dataCriacao: new Date().toISOString(),
      });
    });
    salvar();
  }

  /* ============================================================
     API — Categorias (RF-11)
     ============================================================ */

  function normalizar(txt) {
    return String(txt || "").trim().toLowerCase();
  }

  var Categorias = {
    listar: function (tipo) {
      return dados.categorias
        .filter(function (c) {
          return !tipo || c.tipo === tipo;
        })
        .slice()
        .sort(function (a, b) {
          // "Outros" sempre por último; resto em ordem alfabética
          if (a.protegida !== b.protegida) return a.protegida ? 1 : -1;
          return a.nome.localeCompare(b.nome, "pt-BR");
        });
    },

    obter: function (id) {
      return dados.categorias.find(function (c) {
        return c.id === id;
      }) || null;
    },

    outrosDoTipo: function (tipo) {
      return dados.categorias.find(function (c) {
        return c.tipo === tipo && c.protegida;
      });
    },

    // Quantos lançamentos (despesas + receitas) usam a categoria
    contarLancamentos: function (id) {
      var d = dados.despesas.filter(function (x) { return x.categoriaId === id; }).length;
      var r = dados.receitas.filter(function (x) { return x.categoriaId === id; }).length;
      return d + r;
    },

    // Retorna { ok:true, categoria } ou { ok:false, campo, erro }
    criar: function (dto) {
      var nome = String(dto.nome || "").trim();
      var tipo = dto.tipo;

      if (nome.length < 2 || nome.length > 30) {
        return { ok: false, campo: "nome", erro: "Informe um nome entre 2 e 30 caracteres." };
      }
      if (tipo !== "despesa" && tipo !== "receita") {
        return { ok: false, campo: "tipo", erro: "Selecione o tipo da categoria." };
      }
      var duplicada = dados.categorias.some(function (c) {
        return c.tipo === tipo && normalizar(c.nome) === normalizar(nome);
      });
      if (duplicada) {
        return {
          ok: false,
          campo: "nome",
          erro: "Já existe uma categoria de " + (tipo === "despesa" ? "Despesa" : "Receita") + " com esse nome.",
        };
      }
      var qtd = dados.categorias.filter(function (c) { return c.tipo === tipo; }).length;
      if (qtd >= 40) {
        return { ok: false, campo: "nome", erro: "Limite de 40 categorias por tipo atingido." };
      }

      var nova = {
        id: uid("cat"),
        nome: nome,
        tipo: tipo,
        icone: dto.icone || "tag",
        cor: dto.cor || (tipo === "despesa" ? "#EF4444" : "#22C55E"),
        origem: "usuario",
        protegida: false,
        dataCriacao: new Date().toISOString(),
      };
      dados.categorias.push(nova);
      salvar();
      return { ok: true, categoria: nova };
    },

    editar: function (id, dto) {
      var cat = Categorias.obter(id);
      if (!cat) return { ok: false, erro: "Categoria não encontrada." };

      var nome = String(dto.nome != null ? dto.nome : cat.nome).trim();
      var tipo = dto.tipo != null ? dto.tipo : cat.tipo;

      if (nome.length < 2 || nome.length > 30) {
        return { ok: false, campo: "nome", erro: "Informe um nome entre 2 e 30 caracteres." };
      }

      // "Outros": nome e tipo travados (RN-11.4)
      if (cat.protegida) {
        nome = cat.nome;
        tipo = cat.tipo;
      }

      // Troca de tipo bloqueada se houver lançamentos (RN-11.6)
      if (tipo !== cat.tipo && Categorias.contarLancamentos(id) > 0) {
        return {
          ok: false,
          campo: "tipo",
          erro: "Não é possível mudar o tipo: existem lançamentos nesta categoria.",
        };
      }

      var duplicada = dados.categorias.some(function (c) {
        return c.id !== id && c.tipo === tipo && normalizar(c.nome) === normalizar(nome);
      });
      if (duplicada) {
        return {
          ok: false,
          campo: "nome",
          erro: "Já existe uma categoria de " + (tipo === "despesa" ? "Despesa" : "Receita") + " com esse nome.",
        };
      }

      cat.nome = nome;
      cat.tipo = tipo;
      if (dto.icone != null) cat.icone = dto.icone;
      if (dto.cor != null) cat.cor = dto.cor;
      salvar();
      return { ok: true, categoria: cat };
    },

    // Retorna { ok:true, migrados:n } ou { ok:false, erro }
    excluir: function (id) {
      var cat = Categorias.obter(id);
      if (!cat) return { ok: false, erro: "Categoria não encontrada." };
      if (cat.protegida) return { ok: false, erro: "A categoria 'Outros' não pode ser excluída." };

      var outros = Categorias.outrosDoTipo(cat.tipo);
      var migrados = 0;
      dados.despesas.forEach(function (d) {
        if (d.categoriaId === id) { d.categoriaId = outros.id; migrados++; }
      });
      dados.receitas.forEach(function (r) {
        if (r.categoriaId === id) { r.categoriaId = outros.id; migrados++; }
      });
      dados.categorias = dados.categorias.filter(function (c) { return c.id !== id; });
      salvar();
      return { ok: true, migrados: migrados };
    },
  };

  /* ============================================================
     API — Despesas (RF-03)
     ============================================================ */

  var LIMITE_VALOR = 100000000; // R$ 1.000.000,00 em centavos

  var Despesas = {
    // filtro: { mes:'2026-09', categoriaId, incluirFuturas:false }
    listar: function (filtro) {
      filtro = filtro || {};
      return dados.despesas
        .filter(function (d) {
          if (filtro.mes && Contai.Datas.chaveMes(d.data) !== filtro.mes) return false;
          if (filtro.categoriaId && d.categoriaId !== filtro.categoriaId) return false;
          return true;
        })
        .slice()
        .sort(function (a, b) {
          if (a.data !== b.data) return a.data < b.data ? 1 : -1;
          return a.dataCriacao < b.dataCriacao ? 1 : -1;
        });
    },

    obter: function (id) {
      return dados.despesas.find(function (d) { return d.id === id; }) || null;
    },

    // Soma dos valores do período/filtro, excluindo despesas agendadas (data futura) — RN-03.4/RN-03.7
    total: function (filtro) {
      return Despesas.listar(filtro).reduce(function (soma, d) {
        return Contai.Datas.ehFutura(d.data) ? soma : soma + d.valor;
      }, 0);
    },

    _validar: function (dto) {
      if (!dto.valor || dto.valor <= 0) {
        return { campo: "valor", erro: "Informe um valor maior que zero." };
      }
      if (dto.valor > LIMITE_VALOR) {
        return { campo: "valor", erro: "Valor acima do limite permitido." };
      }
      if (!dto.data || !/^\d{4}-\d{2}-\d{2}$/.test(dto.data) || isNaN(new Date(dto.data).getTime())) {
        return { campo: "data", erro: "Selecione uma data válida." };
      }
      var cat = Categorias.obter(dto.categoriaId);
      if (!cat || cat.tipo !== "despesa") {
        return { campo: "categoria", erro: "Selecione uma categoria." };
      }
      if (dto.descricao && dto.descricao.length > 100) {
        return { campo: "descricao", erro: "A descrição deve ter no máximo 100 caracteres." };
      }
      return null;
    },

    criar: function (dto) {
      var erro = Despesas._validar(dto);
      if (erro) return { ok: false, campo: erro.campo, erro: erro.erro };

      var nova = {
        id: uid("desp"),
        valor: dto.valor,
        data: dto.data,
        categoriaId: dto.categoriaId,
        descricao: String(dto.descricao || "").trim(),
        formaPagamento: dto.formaPagamento || "",
        dataCriacao: new Date().toISOString(),
      };
      dados.despesas.push(nova);
      salvar();
      return { ok: true, despesa: nova };
    },

    editar: function (id, dto) {
      var d = Despesas.obter(id);
      if (!d) return { ok: false, erro: "Despesa não encontrada." };
      var alvo = {
        valor: dto.valor != null ? dto.valor : d.valor,
        data: dto.data != null ? dto.data : d.data,
        categoriaId: dto.categoriaId != null ? dto.categoriaId : d.categoriaId,
        descricao: dto.descricao != null ? dto.descricao : d.descricao,
        formaPagamento: dto.formaPagamento != null ? dto.formaPagamento : d.formaPagamento,
      };
      var erro = Despesas._validar(alvo);
      if (erro) return { ok: false, campo: erro.campo, erro: erro.erro };

      d.valor = alvo.valor;
      d.data = alvo.data;
      d.categoriaId = alvo.categoriaId;
      d.descricao = String(alvo.descricao || "").trim();
      d.formaPagamento = alvo.formaPagamento || "";
      salvar();
      return { ok: true, despesa: d };
    },

    excluir: function (id) {
      var antes = dados.despesas.length;
      dados.despesas = dados.despesas.filter(function (d) { return d.id !== id; });
      salvar();
      return { ok: dados.despesas.length < antes };
    },

    // Meses que possuem despesas (para navegação), sempre incluindo o mês atual
    mesesComDados: function () {
      var set = {};
      set[Contai.Datas.chaveMes(Contai.Datas.hojeISO())] = true;
      dados.despesas.forEach(function (d) {
        set[Contai.Datas.chaveMes(d.data)] = true;
      });
      return Object.keys(set).sort();
    },
  };

  /* ---------- Utilidades do protótipo ---------- */
  var Store = {
    init: carregar,
    resetar: function () {
      semear();
    },
    Categorias: Categorias,
    Despesas: Despesas,
    FORMAS_PAGAMENTO: ["Dinheiro", "Débito", "Crédito", "Pix", "Boleto"],
  };

  Contai.Store = Store;
})();
