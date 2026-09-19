/* ============================================================
   Contaí — RF-03: Gerenciar despesas
   Tela (total do mês + lista) e formulário (bottom sheet).
   Depende de store.js, ui.js e categorias.js (abrirFormCategoria).
   ============================================================ */
(function () {
  "use strict";

  var Contai = window.Contai;
  var Store = Contai.Store;
  var Datas = Contai.Datas;
  var Money = Contai.Money;
  var el = Contai.el;
  var icon = Contai.icon;
  var esc = Contai.escapar;

  var mesAtivo = Datas.chaveMes(Datas.hojeISO());
  var filtroCategoria = null; // id ou null (= todas)
  var refs = {};

  /* ---------------- Render ---------------- */

  function render() {
    refs.mesLabel.textContent = Datas.rotuloMes(mesAtivo);

    var filtro = { mes: mesAtivo, categoriaId: filtroCategoria };
    var despesas = Store.Despesas.listar(filtro);
    var total = Store.Despesas.total(filtro);

    refs.total.textContent = "− " + Money.format(total);
    var n = despesas.length;
    refs.totalCaption.textContent =
      (filtroCategoria ? nomeCategoria(filtroCategoria) + " · " : "") +
      (n === 0 ? "nenhuma despesa" : n === 1 ? "1 despesa" : n + " despesas") +
      " neste mês";

    renderChips();
    renderLista(despesas);
  }

  function nomeCategoria(id) {
    var c = Store.Categorias.obter(id);
    return c ? c.nome : "—";
  }

  function renderChips() {
    // categorias de despesa que já têm algum lançamento
    var comUso = Store.Categorias.listar("despesa").filter(function (c) {
      return Store.Categorias.contarLancamentos(c.id) > 0;
    });
    refs.chips.innerHTML = "";

    var todas = el("button", {
      class: "chip", type: "button",
      "aria-pressed": filtroCategoria == null ? "true" : "false",
      text: "Todas",
    });
    todas.addEventListener("click", function () { filtroCategoria = null; render(); });
    refs.chips.appendChild(todas);

    comUso.forEach(function (c) {
      var b = el("button", {
        class: "chip", type: "button",
        "aria-pressed": filtroCategoria === c.id ? "true" : "false",
        text: c.nome,
      });
      b.addEventListener("click", function () {
        filtroCategoria = filtroCategoria === c.id ? null : c.id;
        render();
      });
      refs.chips.appendChild(b);
    });
  }

  function renderLista(despesas) {
    refs.lista.innerHTML = "";

    if (despesas.length === 0) {
      refs.lista.appendChild(
        el("div", { class: "empty-state" },
          '<div class="empty-state__icon">' + icon("wallet", 28) + "</div>" +
          '<h2 class="empty-state__title t-h3">' +
            (filtroCategoria ? "Nenhuma despesa de " + esc(nomeCategoria(filtroCategoria)) : "Nenhuma despesa neste período") +
          "</h2>" +
          '<p class="empty-state__text t-small">Toque em “Nova despesa” para registrar o primeiro gasto.</p>'
        )
      );
      return;
    }

    var grupos = {};
    despesas.forEach(function (d) {
      (grupos[d.data] = grupos[d.data] || []).push(d);
    });

    Object.keys(grupos).sort().reverse().forEach(function (data) {
      var head = el("div", { class: "day-header" });
      head.textContent = data === Datas.hojeISO() ? "Hoje" : Datas.rotuloDiaLongo(data);
      refs.lista.appendChild(head);

      var card = el("div", { class: "card" });
      grupos[data].forEach(function (d) { card.appendChild(linhaDespesa(d)); });
      refs.lista.appendChild(card);
    });
  }

  function linhaDespesa(d) {
    var cat = Store.Categorias.obter(d.categoriaId) || { nome: "—", cor: "#64748B", icone: "tag" };
    var futura = Datas.ehFutura(d.data);
    var meta = [cat.nome, d.formaPagamento].filter(Boolean).join(" · ");

    var row = el("button", {
      class: "list-row", type: "button",
      "aria-label": "Editar despesa " + (d.descricao || cat.nome),
    });
    row.innerHTML =
      '<span class="cat-dot cat-dot--sm" style="background:' + esc(cat.cor) + '">' + icon(cat.icone, 15) + "</span>" +
      '<span class="list-row__body">' +
        '<span class="list-row__title">' + esc(d.descricao || cat.nome) +
          (futura ? ' <span class="badge">Agendada</span>' : "") + "</span>" +
        '<span class="list-row__meta">' + esc(meta) + "</span>" +
      "</span>" +
      '<span class="list-row__value text-expense">− ' + Money.format(d.valor) + "</span>";
    row.addEventListener("click", function () {
      abrirFormDespesa({ modo: "editar", despesa: d });
    });
    return row;
  }

  /* ---------------- Formulário ---------------- */

  function campoErro(campoEl, mensagem) {
    campoEl.classList.add("is-invalid");
    var box = campoEl.querySelector(".field__error");
    if (box) box.innerHTML = icon("alert-circle", 14) + "<span>" + esc(mensagem) + "</span>";
  }
  function limpar(campoEl) { campoEl.classList.remove("is-invalid"); }

  function opcoesCategoria(selecionadaId) {
    var cats = Store.Categorias.listar("despesa");
    var html = '<option value="" ' + (selecionadaId ? "" : "selected") + ' disabled>Selecione…</option>';
    cats.forEach(function (c) {
      html += '<option value="' + c.id + '"' + (c.id === selecionadaId ? " selected" : "") + ">" + esc(c.nome) + "</option>";
    });
    html += '<option value="__nova">＋ Nova categoria…</option>';
    return html;
  }

  function abrirFormDespesa(opcoes) {
    opcoes = opcoes || {};
    var editando = opcoes.modo === "editar";
    var d = opcoes.despesa || {};

    var valorCentavos = editando ? d.valor : 0;
    var categoriaId = editando ? d.categoriaId : "";
    var ultimaCategoriaValida = categoriaId;

    var form = el("form", { novalidate: "novalidate" });

    /* Aviso: usuário só tem a categoria "Outros" (CA-11) */
    var soOutros = Store.Categorias.listar("despesa").every(function (c) { return c.protegida; });
    if (soOutros) {
      var aviso = el("div", { class: "notice" },
        icon("info", 16) +
        "<span>Você ainda não criou categorias. Os lançamentos irão para “Outros”. " +
        '<a href="#" data-acao="criar-cat">Criar categorias</a>.</span>');
      form.appendChild(aviso);
    }

    /* Valor (campo herói) */
    var campoValor = el("div", { class: "field" });
    campoValor.innerHTML =
      '<label class="field__label" for="d-valor">Valor</label>' +
      '<div class="amount-hero-wrap">' +
        '<input class="input input--amount-hero" id="d-valor" type="text" inputmode="decimal" ' +
        'autocomplete="off" aria-describedby="d-valor-err" value="' + Money.format(valorCentavos) + '">' +
      "</div>" +
      '<div class="field__error" id="d-valor-err" role="alert"></div>';
    form.appendChild(campoValor);
    var inputValor = campoValor.querySelector("input");
    inputValor.addEventListener("focus", function () {
      // ao focar, se for zero, limpa para facilitar a digitação
      if (valorCentavos === 0) inputValor.value = "";
    });
    inputValor.addEventListener("input", function () {
      valorCentavos = Money.parseDigits(inputValor.value);
      inputValor.value = valorCentavos === 0 ? "" : Money.format(valorCentavos);
      limpar(campoValor);
    });
    inputValor.addEventListener("blur", function () {
      inputValor.value = Money.format(valorCentavos);
    });

    /* Categoria */
    var campoCat = el("div", { class: "field" });
    campoCat.innerHTML =
      '<label class="field__label" for="d-cat">Categoria</label>' +
      '<select class="select" id="d-cat">' + opcoesCategoria(categoriaId) + "</select>" +
      '<div class="field__error" role="alert"></div>';
    form.appendChild(campoCat);
    var selectCat = campoCat.querySelector("select");
    selectCat.addEventListener("change", function () {
      if (selectCat.value === "__nova") {
        // atalho para o RF-11, com o tipo travado em "despesa"
        Contai.abrirFormCategoria({
          modo: "criar",
          tipo: "despesa",
          tipoTravado: true,
          aoConcluir: function (novaCat) {
            selectCat.innerHTML = opcoesCategoria(novaCat.id);
            categoriaId = novaCat.id;
            ultimaCategoriaValida = novaCat.id;
          },
        });
        // enquanto o sheet de categoria abre, volta a seleção anterior
        selectCat.value = ultimaCategoriaValida || "";
      } else {
        categoriaId = selectCat.value;
        ultimaCategoriaValida = categoriaId;
        limpar(campoCat);
      }
    });

    /* Data + Forma de pagamento */
    var linha = el("div", { class: "field-grid" });

    var campoData = el("div", { class: "field" });
    campoData.innerHTML =
      '<label class="field__label" for="d-data">Data</label>' +
      '<input class="input" id="d-data" type="date" max="2100-12-31" value="' +
        esc(editando ? d.data : Datas.hojeISO()) + '">' +
      '<div class="field__error" role="alert"></div>';
    linha.appendChild(campoData);
    var inputData = campoData.querySelector("input");
    inputData.addEventListener("input", function () { limpar(campoData); });

    var campoFP = el("div", { class: "field" });
    var fpAtual = editando ? d.formaPagamento : "";
    var fpOpts = '<option value="">—</option>' + Store.FORMAS_PAGAMENTO.map(function (f) {
      return '<option value="' + f + '"' + (f === fpAtual ? " selected" : "") + ">" + f + "</option>";
    }).join("");
    campoFP.innerHTML =
      '<label class="field__label" for="d-fp">Forma de pagamento</label>' +
      '<select class="select" id="d-fp">' + fpOpts + "</select>";
    linha.appendChild(campoFP);
    var selectFP = campoFP.querySelector("select");

    form.appendChild(linha);

    /* Descrição */
    var campoDesc = el("div", { class: "field" });
    campoDesc.innerHTML =
      '<label class="field__label" for="d-desc">Descrição <span class="text-secondary">(opcional)</span></label>' +
      '<input class="input" id="d-desc" type="text" maxlength="100" autocomplete="off" ' +
        'placeholder="Ex.: Almoço no restaurante" value="' + esc(editando ? d.descricao : "") + '">' +
      '<div class="char-counter"><span>0</span>/100</div>' +
      '<div class="field__error" role="alert"></div>';
    form.appendChild(campoDesc);
    var inputDesc = campoDesc.querySelector("input");
    var contador = campoDesc.querySelector(".char-counter span");
    function attContador() { contador.textContent = inputDesc.value.length; }
    inputDesc.addEventListener("input", function () { attContador(); limpar(campoDesc); });
    attContador();

    /* Ações */
    var acoes = el("div", { class: "btn-row" });
    acoes.style.marginTop = "24px";
    var btnCancelar = el("button", { type: "button", class: "btn btn--secondary", text: "Cancelar" });
    var btnSalvar = el("button", { type: "submit", class: "btn btn--primary", text: "Salvar" });
    acoes.appendChild(btnCancelar);
    acoes.appendChild(btnSalvar);
    form.appendChild(acoes);

    if (editando) {
      var btnExcluir = el("button", {
        type: "button", class: "btn btn--ghost-danger btn--block",
      }, icon("trash", 16) + "<span>Excluir despesa</span>");
      btnExcluir.style.marginTop = "8px";
      btnExcluir.addEventListener("click", function () { excluirDespesa(d, sheet); });
      form.appendChild(btnExcluir);
    }

    var sheet = Contai.abrirSheet({
      titulo: editando ? "Editar despesa" : "Nova despesa",
      conteudo: form,
    });
    inputValor.focus();

    btnCancelar.addEventListener("click", sheet.fechar);

    var linkCriar = form.querySelector('[data-acao="criar-cat"]');
    if (linkCriar) {
      linkCriar.addEventListener("click", function (e) {
        e.preventDefault();
        Contai.abrirFormCategoria({
          modo: "criar", tipo: "despesa", tipoTravado: true,
          aoConcluir: function (novaCat) {
            selectCat.innerHTML = opcoesCategoria(novaCat.id);
            categoriaId = novaCat.id;
            ultimaCategoriaValida = novaCat.id;
            form.querySelector(".notice") && form.querySelector(".notice").remove();
          },
        });
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      [campoValor, campoCat, campoData, campoDesc].forEach(limpar);

      var dto = {
        valor: valorCentavos,
        data: inputData.value,
        categoriaId: categoriaId,
        descricao: inputDesc.value,
        formaPagamento: selectFP.value,
      };
      var res = editando
        ? Store.Despesas.editar(d.id, dto)
        : Store.Despesas.criar(dto);

      if (!res.ok) {
        var mapa = { valor: campoValor, categoria: campoCat, data: campoData, descricao: campoDesc };
        campoErro(mapa[res.campo] || campoValor, res.erro);
        return;
      }

      Contai.toast(editando ? "Despesa atualizada." : "Despesa registrada.");
      sheet.fechar();
      // leva o usuário ao mês da despesa salva
      mesAtivo = Datas.chaveMes(res.despesa.data);
      render();
    });
  }

  function excluirDespesa(d, sheet) {
    Contai.confirmar({
      titulo: "Excluir esta despesa?",
      texto: "Esta ação não pode ser desfeita.",
      rotuloConfirmar: "Excluir",
      perigo: true,
    }).then(function (ok) {
      if (!ok) return;
      Store.Despesas.excluir(d.id);
      Contai.toast("Despesa excluída.");
      sheet.fechar();
      render();
    });
  }

  /* ---------------- Bootstrap ---------------- */

  function montar() {
    Contai.Tema.init();
    Store.init();

    refs.mesLabel = document.getElementById("mes-label");
    refs.total = document.getElementById("total-valor");
    refs.totalCaption = document.getElementById("total-caption");
    refs.chips = document.getElementById("chips-categoria");
    refs.lista = document.getElementById("lista-despesas");

    document.getElementById("mes-anterior").addEventListener("click", function () {
      mesAtivo = Datas.mesAnterior(mesAtivo);
      render();
    });
    document.getElementById("mes-seguinte").addEventListener("click", function () {
      mesAtivo = Datas.mesSeguinte(mesAtivo);
      render();
    });
    document.getElementById("btn-nova").addEventListener("click", function () {
      abrirFormDespesa({ modo: "criar" });
    });

    Contai.montarBotaoTema();
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", montar);
  } else {
    montar();
  }
})();
