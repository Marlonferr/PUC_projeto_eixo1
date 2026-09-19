/* ============================================================
   Contaí — RF-11: Criar/gerenciar categorias
   Tela + formulário (bottom sheet). JavaScript puro.
   Expõe Contai.abrirFormCategoria() para reuso no RF-03.
   ============================================================ */
(function () {
  "use strict";

  var Contai = window.Contai;
  var Store = Contai.Store;
  var el = Contai.el;
  var icon = Contai.icon;
  var esc = Contai.escapar;

  var tipoAtivo = "despesa";
  var refs = {};

  /* ---------------- Lista ---------------- */

  function linhaCategoria(cat) {
    var qtd = Store.Categorias.contarLancamentos(cat.id);
    var row = el("button", {
      class: "list-row",
      type: "button",
      "aria-label": "Editar categoria " + cat.nome,
    });
    row.innerHTML =
      '<span class="cat-dot" style="background:' + esc(cat.cor) + '">' + icon(cat.icone, 18) + "</span>" +
      '<span class="list-row__body">' +
        '<span class="list-row__title">' + esc(cat.nome) +
          (cat.protegida ? ' <span class="text-secondary t-caption">· sistema</span>' : "") +
        "</span>" +
        '<span class="list-row__meta">' + qtd + (qtd === 1 ? " lançamento" : " lançamentos") + "</span>" +
      "</span>" +
      '<span class="list-row__chevron">' + icon("chevron-right", 20) + "</span>";
    row.addEventListener("click", function () {
      abrirFormCategoria({ modo: "editar", categoria: cat, aoConcluir: render });
    });
    return row;
  }

  function render() {
    // segmented
    refs.seg.querySelectorAll("button").forEach(function (b) {
      var on = b.dataset.tipo === tipoAtivo;
      b.setAttribute("aria-selected", on ? "true" : "false");
    });

    var lista = Store.Categorias.listar(tipoAtivo);
    refs.lista.innerHTML = "";

    if (lista.length === 0) {
      refs.lista.appendChild(
        el("div", { class: "empty-state" },
          '<div class="empty-state__icon">' + icon("folder", 28) + "</div>" +
          '<h2 class="empty-state__title t-h3">Nenhuma categoria de ' +
            (tipoAtivo === "despesa" ? "despesa" : "receita") + "</h2>" +
          '<p class="empty-state__text t-small">Crie categorias para classificar seus lançamentos.</p>'
        )
      );
      return;
    }

    var card = el("div", { class: "card" });
    lista.forEach(function (c) { card.appendChild(linhaCategoria(c)); });
    refs.lista.appendChild(card);
  }

  /* ---------------- Formulário (bottom sheet) ---------------- */

  function campoErro(campoEl, mensagem) {
    campoEl.classList.add("is-invalid");
    var box = campoEl.querySelector(".field__error");
    if (box) box.innerHTML = icon("alert-circle", 14) + "<span>" + esc(mensagem) + "</span>";
    var input = campoEl.querySelector("input, select");
    if (input) input.focus();
  }
  function limparErro(campoEl) {
    campoEl.classList.remove("is-invalid");
  }

  function abrirFormCategoria(opcoes) {
    // opcoes: { modo:'criar'|'editar', tipo?, categoria?, tipoTravado?, aoConcluir? }
    opcoes = opcoes || {};
    var editando = opcoes.modo === "editar";
    var cat = opcoes.categoria || {};
    var tipoInicial = editando ? cat.tipo : (opcoes.tipo || "despesa");
    var temLancamentos = editando ? Store.Categorias.contarLancamentos(cat.id) > 0 : false;
    var tipoTravado = opcoes.tipoTravado || (editando && (cat.protegida || temLancamentos));

    var iconeSel = cat.icone || "tag";
    var corSel = cat.cor || Contai.CORES[0];
    var tipoSel = tipoInicial;

    var form = el("form", { novalidate: "novalidate" });

    /* Tipo */
    var campoTipo = el("div", { class: "field" });
    campoTipo.innerHTML = '<label class="field__label">Tipo</label>';
    var segTipo = el("div", { class: "segmented", role: "tablist" });
    ["despesa", "receita"].forEach(function (t) {
      var b = el("button", {
        type: "button",
        "data-tipo": t,
        "aria-selected": t === tipoSel ? "true" : "false",
        text: t === "despesa" ? "Despesa" : "Receita",
      });
      if (tipoTravado) b.disabled = true;
      b.addEventListener("click", function () {
        tipoSel = t;
        segTipo.querySelectorAll("button").forEach(function (x) {
          x.setAttribute("aria-selected", x.dataset.tipo === t ? "true" : "false");
        });
      });
      segTipo.appendChild(b);
    });
    campoTipo.appendChild(segTipo);
    if (tipoTravado) {
      campoTipo.appendChild(
        el("p", { class: "field__hint", text:
          cat.protegida ? "Categoria do sistema: tipo fixo."
                        : "Existem lançamentos nesta categoria — o tipo não pode mudar." })
      );
    }
    form.appendChild(campoTipo);

    /* Nome */
    var campoNome = el("div", { class: "field" });
    campoNome.innerHTML =
      '<label class="field__label" for="cat-nome">Nome</label>' +
      '<input class="input" id="cat-nome" type="text" maxlength="30" autocomplete="off" ' +
        'placeholder="Ex.: Academia" value="' + esc(cat.nome || "") + '"' +
        (cat.protegida ? " disabled" : "") + ">" +
      '<div class="field__error" role="alert"></div>';
    form.appendChild(campoNome);
    var inputNome = campoNome.querySelector("input");
    inputNome.addEventListener("input", function () { limparErro(campoNome); });

    /* Ícone */
    var campoIcone = el("div", { class: "field" });
    campoIcone.innerHTML = '<label class="field__label">Ícone</label>';
    var gridIcone = el("div", { class: "picker-grid picker-grid--icons" });
    Contai.ICON_ESCOLHAS.forEach(function (nome) {
      var b = el("button", {
        type: "button",
        class: "picker-item",
        "aria-pressed": nome === iconeSel ? "true" : "false",
        "aria-label": "Ícone " + nome,
      }, icon(nome, 18));
      b.addEventListener("click", function () {
        iconeSel = nome;
        gridIcone.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
      });
      gridIcone.appendChild(b);
    });
    campoIcone.appendChild(gridIcone);
    form.appendChild(campoIcone);

    /* Cor */
    var campoCor = el("div", { class: "field" });
    campoCor.innerHTML = '<label class="field__label">Cor</label>';
    var gridCor = el("div", { class: "picker-grid" });
    Contai.CORES.forEach(function (cor) {
      var b = el("button", {
        type: "button",
        class: "picker-item picker-item--color",
        "aria-pressed": cor === corSel ? "true" : "false",
        "aria-label": "Cor " + cor,
      }, '<span style="background:' + cor + '"></span>');
      b.addEventListener("click", function () {
        corSel = cor;
        gridCor.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
      });
      gridCor.appendChild(b);
    });
    campoCor.appendChild(gridCor);
    form.appendChild(campoCor);

    /* Ações */
    var acoes = el("div", { class: "btn-row" });
    acoes.style.marginTop = "24px";
    var btnCancelar = el("button", { type: "button", class: "btn btn--secondary", text: "Cancelar" });
    var btnSalvar = el("button", { type: "submit", class: "btn btn--primary", text: "Salvar" });
    acoes.appendChild(btnCancelar);
    acoes.appendChild(btnSalvar);
    form.appendChild(acoes);

    /* Excluir (só edição, não protegida) */
    if (editando && !cat.protegida) {
      var btnExcluir = el("button", {
        type: "button",
        class: "btn btn--ghost-danger btn--block",
      }, icon("trash", 16) + "<span>Excluir categoria</span>");
      btnExcluir.style.marginTop = "8px";
      btnExcluir.addEventListener("click", function () { excluir(cat, sheet); });
      form.appendChild(btnExcluir);
    }

    var sheet = Contai.abrirSheet({
      titulo: editando ? "Editar categoria" : "Nova categoria",
      conteudo: form,
    });

    btnCancelar.addEventListener("click", sheet.fechar);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      limparErro(campoNome);
      limparErro(campoTipo);

      var dto = { nome: inputNome.value, tipo: tipoSel, icone: iconeSel, cor: corSel };
      var res = editando
        ? Store.Categorias.editar(cat.id, dto)
        : Store.Categorias.criar(dto);

      if (!res.ok) {
        if (res.campo === "tipo") campoErro(campoTipo, res.erro);
        else campoErro(campoNome, res.erro);
        return;
      }
      Contai.toast(editando ? "Categoria atualizada." : "Categoria criada.");
      sheet.fechar();
      if (opcoes.aoConcluir) opcoes.aoConcluir(res.categoria);
    });
  }

  function excluir(cat, sheet) {
    var qtd = Store.Categorias.contarLancamentos(cat.id);
    var texto = qtd > 0
      ? qtd + (qtd === 1 ? " lançamento será movido" : " lançamentos serão movidos") +
        " para “Outros”. Deseja continuar?"
      : "Esta ação não pode ser desfeita.";

    Contai.confirmar({
      titulo: "Excluir a categoria “" + cat.nome + "”?",
      texto: texto,
      rotuloConfirmar: "Excluir",
      perigo: true,
    }).then(function (ok) {
      if (!ok) return;
      var res = Store.Categorias.excluir(cat.id);
      if (!res.ok) {
        Contai.toast(res.erro || "Não foi possível excluir.", "error");
        return;
      }
      Contai.toast(
        res.migrados > 0
          ? "Categoria excluída. " + res.migrados + " lançamento(s) movido(s) para “Outros”."
          : "Categoria excluída."
      );
      sheet.fechar();
      render();
    });
  }

  Contai.abrirFormCategoria = abrirFormCategoria;

  /* ---------------- Bootstrap ---------------- */

  function montar() {
    Contai.Tema.init();
    Store.init();

    refs.seg = document.getElementById("seg-tipo");
    refs.lista = document.getElementById("lista-categorias");

    // Este arquivo também é carregado no RF-03 só para expor
    // Contai.abrirFormCategoria — se a tela de categorias não está
    // presente, não há o que montar.
    if (!refs.lista || !refs.seg) return;

    refs.seg.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () {
        tipoAtivo = b.dataset.tipo;
        render();
      });
    });

    document.getElementById("btn-nova").addEventListener("click", function () {
      abrirFormCategoria({ modo: "criar", tipo: tipoAtivo, aoConcluir: render });
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
