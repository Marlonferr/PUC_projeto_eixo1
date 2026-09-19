/* ============================================================
   Contaí — Utilitários de UI (protótipo, JavaScript puro)
   Formatação, ícones, tema, toast, diálogos e bottom sheet.
   ============================================================ */
(function () {
  "use strict";

  var Contai = (window.Contai = window.Contai || {});

  /* ---------- Dinheiro (valores em centavos, inteiros) ---------- */
  var Money = {
    format: function (centavos) {
      return (Number(centavos || 0) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    // Extrai apenas dígitos e interpreta os 2 últimos como centavos
    parseDigits: function (str) {
      var digits = String(str || "").replace(/\D/g, "");
      return digits ? parseInt(digits, 10) : 0;
    },
  };
  Contai.Money = Money;

  /* ---------- Datas ---------- */
  var MESES = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
  ];

  var Datas = {
    hojeISO: function () {
      var d = new Date();
      return Datas.toISO(d);
    },
    toISO: function (d) {
      var m = String(d.getMonth() + 1).padStart(2, "0");
      var dia = String(d.getDate()).padStart(2, "0");
      return d.getFullYear() + "-" + m + "-" + dia;
    },
    // "2026-09" a partir de um ISO "2026-09-09"
    chaveMes: function (iso) {
      return iso.slice(0, 7);
    },
    rotuloMes: function (chave) {
      var p = chave.split("-");
      var mes = MESES[parseInt(p[1], 10) - 1];
      return mes.charAt(0).toUpperCase() + mes.slice(1) + " de " + p[0];
    },
    rotuloDiaLongo: function (iso) {
      var p = iso.split("-");
      return parseInt(p[2], 10) + " de " + MESES[parseInt(p[1], 10) - 1];
    },
    mesAnterior: function (chave) {
      var p = chave.split("-").map(Number);
      var d = new Date(p[0], p[1] - 2, 1);
      return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
    },
    mesSeguinte: function (chave) {
      var p = chave.split("-").map(Number);
      var d = new Date(p[0], p[1], 1);
      return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
    },
    ehFutura: function (iso) {
      return iso > Datas.hojeISO();
    },
  };
  Contai.Datas = Datas;

  /* ---------- Ícones (estilo Lucide, traço 1.5px) ---------- */
  var PATHS = {
    "bar-chart": '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
    "arrow-left": '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    "chevron-left": '<polyline points="15 18 9 12 15 6"/>',
    "chevron-right": '<polyline points="9 18 15 12 9 6"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    "check-circle": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
    "alert-circle": '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
    folder: '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2z"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
    car: '<path d="M19 17h2l.64-2.54a6 6 0 0 0-.38-3.7l-1.14-2.66A2 2 0 0 0 17.92 7H6.08a2 2 0 0 0-1.8 1.1L3.14 10.76a6 6 0 0 0-.38 3.7L3.4 17H5"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    "heart-pulse": '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    gamepad: '<line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.59c-.09.72-.7 5.87-.7 7.41a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.41-1.41A2 2 0 0 1 9.83 16h4.34a2 2 0 0 1 1.42.59L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.54-.61-6.69-.7-7.41A4 4 0 0 0 17.32 5z"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
    gift: '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    "trending-up": '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    "more-horizontal": '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    "credit-card": '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
    "shopping-bag": '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  };

  function icon(name, size) {
    var body = PATHS[name] || PATHS["tag"];
    var s = size || 24;
    return (
      '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s +
      '" fill="none" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      body + "</svg>"
    );
  }
  Contai.icon = icon;
  Contai.ICON_NAMES = Object.keys(PATHS);

  /* Ícones oferecidos ao usuário ao criar categoria */
  Contai.ICON_ESCOLHAS = [
    "tag", "utensils", "car", "home", "heart-pulse", "book", "gamepad",
    "receipt", "gift", "briefcase", "trending-up", "credit-card",
    "shopping-bag", "folder",
  ];

  /* Paleta de cores para categorias (Seção 7.5 das specs) */
  Contai.CORES = [
    "#22C55E", "#EF4444", "#F59E0B", "#3B82F6",
    "#8B5CF6", "#EC4899", "#06B6D4", "#64748B",
  ];

  /* ---------- Tema (RNF-01) ---------- */
  var Tema = {
    KEY: "contai.proto.tema",
    atual: function () {
      try {
        return localStorage.getItem(Tema.KEY) || "light";
      } catch (e) {
        return "light";
      }
    },
    aplicar: function (valor) {
      document.documentElement.setAttribute("data-theme", valor);
      try {
        localStorage.setItem(Tema.KEY, valor);
      } catch (e) {}
      atualizarBotoesTema(valor);
    },
    alternar: function () {
      Tema.aplicar(Tema.atual() === "dark" ? "light" : "dark");
    },
    init: function () {
      document.documentElement.setAttribute("data-theme", Tema.atual());
    },
  };
  Contai.Tema = Tema;

  function atualizarBotoesTema(valor) {
    var botoes = document.querySelectorAll("[data-acao='alternar-tema']");
    botoes.forEach(function (b) {
      b.innerHTML = icon(valor === "dark" ? "sun" : "moon", 20);
      b.setAttribute(
        "aria-label",
        valor === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
      );
    });
  }
  Contai.montarBotaoTema = function () {
    atualizarBotoesTema(Tema.atual());
    document.querySelectorAll("[data-acao='alternar-tema']").forEach(function (b) {
      b.addEventListener("click", Tema.alternar);
    });
  };

  /* ---------- Toast ---------- */
  function garantirStack() {
    var s = document.querySelector(".toast-stack");
    if (!s) {
      s = document.createElement("div");
      s.className = "toast-stack";
      document.body.appendChild(s);
    }
    return s;
  }
  Contai.toast = function (mensagem, tipo) {
    tipo = tipo || "success";
    var stack = garantirStack();
    var el = document.createElement("div");
    el.className = "toast toast--" + tipo;
    el.setAttribute("role", "status");
    el.innerHTML =
      icon(tipo === "error" ? "alert-circle" : "check-circle", 18) +
      "<span>" + mensagem + "</span>";
    stack.appendChild(el);
    setTimeout(function () {
      el.style.transition = "opacity .2s ease";
      el.style.opacity = "0";
      setTimeout(function () {
        el.remove();
      }, 220);
    }, 2600);
  };

  /* ---------- Overlay genérico ---------- */
  function criarOverlay(centro) {
    var ov = document.createElement("div");
    ov.className = "overlay" + (centro ? " overlay--center" : "");
    document.body.appendChild(ov);
    requestAnimationFrame(function () {
      ov.classList.add("is-open");
    });
    return ov;
  }
  function fecharOverlay(ov) {
    ov.classList.remove("is-open");
    setTimeout(function () {
      ov.remove();
    }, 220);
  }

  /* ---------- Bottom sheet ---------- */
  Contai.abrirSheet = function (opcoes) {
    // opcoes: { titulo, conteudo (HTMLElement), aoFechar }
    var ov = criarOverlay(false);
    var sheet = document.createElement("div");
    sheet.className = "sheet";
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-modal", "true");
    sheet.setAttribute("aria-label", opcoes.titulo || "");

    var handle = document.createElement("div");
    handle.className = "sheet__handle";
    sheet.appendChild(handle);

    if (opcoes.titulo) {
      var h = document.createElement("h2");
      h.className = "sheet__title t-h2";
      h.textContent = opcoes.titulo;
      sheet.appendChild(h);
    }
    sheet.appendChild(opcoes.conteudo);
    ov.appendChild(sheet);

    function fechar() {
      fecharOverlay(ov);
      document.removeEventListener("keydown", onKey);
      if (opcoes.aoFechar) opcoes.aoFechar();
    }
    function onKey(e) {
      if (e.key === "Escape") fechar();
    }
    ov.addEventListener("mousedown", function (e) {
      if (e.target === ov) fechar();
    });
    document.addEventListener("keydown", onKey);

    var foco = sheet.querySelector("input, select, textarea, button");
    if (foco) setTimeout(function () { foco.focus(); }, 60);

    return { fechar: fechar, sheet: sheet };
  };

  /* ---------- Diálogo de confirmação ---------- */
  Contai.confirmar = function (opcoes) {
    // opcoes: { titulo, texto, rotuloConfirmar, perigo }
    return new Promise(function (resolve) {
      var ov = criarOverlay(true);
      var dlg = document.createElement("div");
      dlg.className = "dialog";
      dlg.setAttribute("role", "alertdialog");
      dlg.setAttribute("aria-modal", "true");
      dlg.innerHTML =
        '<h3 class="dialog__title t-h3">' + (opcoes.titulo || "Confirmar") + "</h3>" +
        '<p class="dialog__text t-small">' + (opcoes.texto || "") + "</p>" +
        '<div class="btn-row">' +
          '<button class="btn btn--secondary" data-r="0">Cancelar</button>' +
          '<button class="btn ' + (opcoes.perigo ? "btn--destructive" : "btn--primary") +
            '" data-r="1">' + (opcoes.rotuloConfirmar || "Confirmar") + "</button>" +
        "</div>";
      ov.appendChild(dlg);

      function finalizar(v) {
        fecharOverlay(ov);
        document.removeEventListener("keydown", onKey);
        resolve(v);
      }
      function onKey(e) {
        if (e.key === "Escape") finalizar(false);
      }
      dlg.querySelector('[data-r="0"]').addEventListener("click", function () { finalizar(false); });
      dlg.querySelector('[data-r="1"]').addEventListener("click", function () { finalizar(true); });
      ov.addEventListener("mousedown", function (e) { if (e.target === ov) finalizar(false); });
      document.addEventListener("keydown", onKey);
      setTimeout(function () { dlg.querySelector('[data-r="1"]').focus(); }, 60);
    });
  };

  /* ---------- Helpers de DOM ---------- */
  Contai.el = function (tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") e.className = attrs[k];
        else if (k === "text") e.textContent = attrs[k];
        else e.setAttribute(k, attrs[k]);
      });
    }
    if (html != null) e.innerHTML = html;
    return e;
  };

  Contai.escapar = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
})();
