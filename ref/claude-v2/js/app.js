/*
 * JJWINE 首页交互：四语言切换、导航、弹窗、六步流程、视频位、项目简报。
 */
(function () {
  "use strict";

  /* ------------------------------------------------------------
   * 正式视频接入位置：填入 MP4／WebM 地址即可启用原生播放器。
   * 例：sources: [{ src: "assets/brand-film.webm", type: "video/webm" },
   *               { src: "assets/brand-film.mp4",  type: "video/mp4"  }]
   * 留空时点击播放显示“品牌影片即将上线”，不会显示虚构时长。
   * ------------------------------------------------------------ */
  var VIDEO_CONFIG = {
    sources: [],
    poster: "assets/hero.webp"
  };

  var LANGS = ["zh", "en", "es", "fr"];
  var STORAGE_KEY = "jjwine-lang";
  var DICT = window.JJ_I18N;
  var STEP_ICONS = ["i-chat", "i-doc", "i-flask", "i-gear", "i-shield", "i-truck"];
  var PRODUCT_IMAGES = { bottle: "assets/bottles.webp", can: "assets/cans.webp", bib: "assets/bib.webp" };

  var lang = "zh";
  var currentInfo = null;   // 当前信息弹窗的键，用于语言切换时重绘
  var lastTrigger = null;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function get(path, l) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, DICT[l || lang]);
  }
  function t(path) {
    var v = get(path);
    if (v == null) { console.warn("[i18n] missing", lang, path); return get(path, "zh") || ""; }
    return v;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function icon(id, cls) { return '<svg class="ico ' + (cls || "") + '" aria-hidden="true"><use href="#' + id + '"/></svg>'; }

  /* ---------------- 语言 ---------------- */
  function initialLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && LANGS.indexOf(q) > -1) return q;
    try { var s = localStorage.getItem(STORAGE_KEY); if (s && LANGS.indexOf(s) > -1) return s; } catch (e) {}
    return "zh";
  }

  function applyLang(next, opts) {
    lang = next;
    document.documentElement.lang = t("meta.htmlLang");
    document.title = t("meta.title");
    $('meta[name="description"]').setAttribute("content", t("meta.description"));

    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":");
        el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
    $$("[data-label-for]").forEach(function (el) {
      el.setAttribute("aria-label", t("products.more") + " – " + t("products." + el.getAttribute("data-label-for") + ".title"));
    });
    $$(".lang-switch [data-lang]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
    updateMenuLabel();
    renderSteps();
    renderFormText();
    if (currentInfo && $("#info-dialog").open) renderInfo(currentInfo);

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    if (!opts || !opts.skipUrl) {
      var url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
  }

  /* ---------------- 导航 ---------------- */
  var header = $(".site-header");
  var menuBtn = $(".menu-toggle");
  function updateMenuLabel() {
    var open = header.classList.contains("is-open");
    menuBtn.setAttribute("aria-label", t(open ? "common.menuClose" : "common.menuOpen"));
  }
  function setMenu(open) {
    header.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    updateMenuLabel();
  }
  menuBtn.addEventListener("click", function () { setMenu(!header.classList.contains("is-open")); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && header.classList.contains("is-open")) { setMenu(false); menuBtn.focus(); }
  });
  document.addEventListener("click", function (e) {
    if (header.classList.contains("is-open") && !header.contains(e.target)) setMenu(false);
  });

  function setActiveNav(key) {
    $$(".main-nav a[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === key) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }
  $$("a[data-nav]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var key = a.getAttribute("data-nav");
      var target = key === "home" ? document.body : document.getElementById(key);
      if (!target) return;
      e.preventDefault();
      setMenu(false);
      setActiveNav(key);
      navLockUntil = Date.now() + 1200; // 程序滚动期间不让滚动监听覆盖所选项
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (key === "home") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      var focusEl = key === "home" ? $("#hero-title") : target.querySelector("h2");
      if (focusEl) { focusEl.setAttribute("tabindex", "-1"); focusEl.focus({ preventScroll: true }); }
    });
  });
  // 滚动时同步导航状态
  var navLockUntil = 0;
  function syncNavOnScroll() {
    if (Date.now() < navLockUntil) return;
    var y = window.scrollY + window.innerHeight * 0.35;
    var key = "home";
    ["capability", "process"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top + window.scrollY <= y) key = id;
    });
    if (window.scrollY < 40) key = "home";
    setActiveNav(key);
  }
  var scrollTick = false;
  window.addEventListener("scroll", function () {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(function () { scrollTick = false; syncNavOnScroll(); });
  }, { passive: true });

  $$(".lang-switch [data-lang]").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
  });

  /* ---------------- 六步流程 ---------------- */
  function renderSteps() {
    var html = t("process.steps").map(function (s, i) {
      var n = "0" + (i + 1);
      return '<li class="step"><button class="step-btn" type="button" data-dialog="step:' + i + '" aria-haspopup="dialog" ' +
        'aria-label="' + esc(t("process.stepLabel").replace("{n}", i + 1) + (lang === "zh" ? "：" : ": ") + s.t + " – " + t("process.viewStep")) + '">' +
        '<span class="step-num" aria-hidden="true">' + n + "</span>" +
        icon(STEP_ICONS[i], "step-icon") +
        '<span class="step-title">' + esc(s.t) + "</span>" +
        '<span class="step-desc">' + esc(s.d) + "</span>" +
        "</button></li>";
    }).join("");
    $("#steps").innerHTML = html;
  }

  /* ---------------- 信息弹窗 ---------------- */
  var infoDialog = $("#info-dialog");
  var infoContent = $("#info-content");

  function listHtml(items) { return '<ul class="modal-list">' + items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }

  function renderInfo(key) {
    var html = "";
    var parts = key.split(":");
    if (parts[0] === "product") {
      var p = t("products." + parts[1]);
      html = '<p class="eyebrow">' + esc(t("products.eyebrow")) + "</p>" +
        '<h2 id="info-title" class="modal-title">' + esc(p.title) + "</h2>" +
        '<img class="modal-figure" src="' + PRODUCT_IMAGES[parts[1]] + '" alt="' + esc(p.alt) + '" width="150" height="150">' +
        '<p class="modal-text">' + esc(p.intro) + "</p>" +
        '<p class="modal-subtitle">' + esc(p.listTitle) + "</p>" + listHtml(p.list) +
        '<p class="modal-note">' + esc(t("products.note")) + "</p>";
    } else if (parts[0] === "step") {
      var i = +parts[1], s = t("process.steps")[i];
      html = '<p class="eyebrow">' + esc(t("process.eyebrow")) + " · " + esc(t("process.stepLabel").replace("{n}", i + 1)) + "</p>" +
        '<div class="modal-kicker">' + icon(STEP_ICONS[i]) + '<h2 id="info-title" class="modal-title">' + esc("0" + (i + 1) + " " + s.t) + "</h2></div>" +
        '<p class="modal-text"><strong>' + esc(s.d) + "</strong></p>" +
        '<p class="modal-text">' + esc(s.body) + "</p>" + listHtml(s.list);
    } else if (key === "processOverview") {
      var d = t("dialogs.processOverview");
      html = '<p class="eyebrow">' + esc(t("process.eyebrow")) + "</p>" +
        '<h2 id="info-title" class="modal-title">' + esc(d.title) + "</h2>" +
        '<p class="modal-text">' + esc(d.intro) + "</p>" +
        '<ol class="process-list">' + t("process.steps").map(function (s, n) {
          return '<li><span class="step-num" aria-hidden="true">0' + (n + 1) + "</span><div><h3>" + esc(s.t) + "</h3><p>" + esc(s.body) + "</p>" +
            "<ul>" + s.list.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></li>";
        }).join("") + "</ol>";
    } else {
      var c = t("dialogs." + key);
      html = '<p class="eyebrow">JJWINE</p>' +
        '<h2 id="info-title" class="modal-title">' + esc(c.title) + "</h2>" +
        '<p class="modal-text">' + esc(c.intro) + "</p>" +
        '<p class="modal-subtitle">' + esc(c.listTitle) + "</p>" + listHtml(c.list) +
        '<p class="modal-note">' + esc(c.note) + "</p>";
    }
    infoContent.innerHTML = html;
  }

  function openDialog(dlg, trigger) {
    lastTrigger = trigger || document.activeElement;
    setMenu(false);
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    dlg.scrollTop = 0;
  }
  function openInfo(key, trigger) {
    currentInfo = key;
    renderInfo(key);
    if (infoDialog.open) { infoDialog.scrollTop = 0; return; }
    openDialog(infoDialog, trigger);
    var closeBtn = infoDialog.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }
  $$("dialog").forEach(function (dlg) {
    dlg.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]")) { dlg.close(); return; }
      if (e.target === dlg) { // 点击遮罩关闭
        var r = dlg.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dlg.close();
      }
    });
    dlg.addEventListener("close", function () {
      if (dlg === infoDialog) currentInfo = null;
      if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
    });
  });
  document.addEventListener("click", function (e) {
    var trg = e.target.closest("[data-dialog]");
    if (trg) { e.preventDefault(); openInfo(trg.getAttribute("data-dialog"), trg); }
    var brief = e.target.closest("[data-open-brief]");
    if (brief) {
      e.preventDefault();
      var from = infoDialog.open ? lastTrigger : brief;
      if (infoDialog.open) infoDialog.close();
      openBrief(from);
    }
  });

  /* ---------------- 视频位 ---------------- */
  var videoModule = $("#video-module");
  var soon = $("#video-soon");
  function mountVideo() {
    var v = document.createElement("video");
    v.controls = true;
    v.playsInline = true;
    v.setAttribute("playsinline", "");
    v.preload = "metadata";
    v.poster = VIDEO_CONFIG.poster;
    VIDEO_CONFIG.sources.forEach(function (s) {
      var src = document.createElement("source");
      src.src = s.src; src.type = s.type;
      v.appendChild(src);
    });
    v.setAttribute("aria-label", t("video.region"));
    var wrap = document.createElement("div");
    wrap.className = "video-player";
    wrap.appendChild(v);
    videoModule.appendChild(wrap);
    $("#video-cover").hidden = true;
    v.play().catch(function () {});
    v.focus();
  }
  $$("[data-video-play]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (VIDEO_CONFIG.sources.length) { mountVideo(); return; }
      soon.hidden = false;
      $("#video-soon-back").focus();
    });
  });
  $("#video-soon-back").addEventListener("click", function () {
    soon.hidden = true;
    $(".video-bigplay").focus();
  });
  soon.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { soon.hidden = true; $(".video-bigplay").focus(); }
  });

  /* ---------------- 项目简报 ---------------- */
  var briefDialog = $("#brief-dialog");
  var form = $("#brief-form");
  var statusEl = $("#form-status");
  var errors = {};       // 字段 -> 错误词条键
  var attempted = false;
  var lastStatus = null; // { key, kind }

  function fillSelect(sel, items) {
    var val = sel.value;
    sel.innerHTML = '<option value="">' + esc(t("form.choose")) + "</option>" +
      items.map(function (x, i) { return '<option value="' + i + '">' + esc(x) + "</option>"; }).join("");
    sel.value = val;
  }
  function renderFormText() {
    ["brand", "contact", "email", "quantity", "launch", "needs"].forEach(function (k) {
      form.elements[k].setAttribute("placeholder", t("form.ph." + k));
    });
    fillSelect(form.elements.category, t("form.categories"));
    fillSelect(form.elements.packaging, t("form.packagings"));
    showErrors();
    if (lastStatus) setStatus(lastStatus.key, lastStatus.kind);
    if (!$("#brief-preview").hidden && validate(true)) $("#brief-text").value = buildBrief();
  }

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function validate(silent) {
    var e = {};
    ["brand", "contact", "needs"].forEach(function (k) { if (!form.elements[k].value.trim()) e[k] = "required"; });
    var email = form.elements.email.value.trim();
    if (!email) e.email = "required"; else if (!EMAIL_RE.test(email)) e.email = "email";
    ["category", "packaging"].forEach(function (k) { if (form.elements[k].value === "") e[k] = "select"; });
    if (!silent) errors = e;
    return Object.keys(e).length === 0;
  }
  function showErrors() {
    ["brand", "contact", "email", "category", "packaging", "needs"].forEach(function (k) {
      var input = form.elements[k];
      var msg = $("#e-" + k);
      if (errors[k]) { input.setAttribute("aria-invalid", "true"); msg.textContent = t("form.err." + errors[k]); }
      else { input.removeAttribute("aria-invalid"); msg.textContent = ""; }
    });
  }
  function setStatus(key, kind) {
    lastStatus = key ? { key: key, kind: kind } : null;
    statusEl.textContent = key ? t(key) : "";
    statusEl.className = "form-status" + (kind ? " is-" + kind : "");
  }

  function buildBrief() {
    var f = form.elements;
    var empty = t("form.brief.empty");
    var v = function (x) { return x.trim() || empty; };
    var cat = f.category.value === "" ? empty : t("form.categories")[+f.category.value];
    var pack = f.packaging.value === "" ? empty : t("form.packagings")[+f.packaging.value];
    var now = new Date();
    var stamp;
    try { stamp = new Intl.DateTimeFormat(t("meta.htmlLang"), { dateStyle: "long", timeStyle: "short" }).format(now); }
    catch (e) { stamp = now.toISOString(); }
    var rows = [
      [t("form.brand"), v(f.brand.value)],
      [t("form.contact"), v(f.contact.value)],
      [t("form.email"), v(f.email.value)],
      [t("form.category"), cat],
      [t("form.packaging"), pack],
      [t("form.quantity"), v(f.quantity.value)],
      [t("form.launch"), v(f.launch.value)]
    ];
    var sep = lang === "zh" ? "：" : ": ";
    var lines = [t("form.brief.heading"), "=".repeat(32), t("form.brief.generated") + sep + stamp, ""];
    rows.forEach(function (r) { lines.push(r[0] + sep + r[1]); });
    lines.push("", t("form.needs") + sep, v(f.needs.value), "", "—", t("form.brief.footer"));
    return lines.join("\n");
  }

  function download(text) {
    var d = new Date();
    var ymd = d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0");
    var blob = new Blob(["﻿" + text], { type: "text/plain;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = t("form.brief.filename") + "-" + ymd + ".txt";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = $("#brief-text");
      ta.focus(); ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); } catch (e) { reject(e); }
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    attempted = true;
    var action = e.submitter && e.submitter.value === "copy" ? "copy" : "download";
    if (!validate()) {
      showErrors();
      setStatus("form.err.summary", "error");
      var first = form.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      return;
    }
    showErrors();
    var text = buildBrief();
    var preview = $("#brief-preview");
    $("#brief-text").value = text;
    preview.hidden = false;
    if (action === "download") { download(text); setStatus("form.status.downloaded", "ok"); }
    else {
      copy(text).then(function () { setStatus("form.status.copied", "ok"); })
        .catch(function () { setStatus("form.status.copyFail", "error"); $("#brief-text").select(); });
    }
  });
  form.addEventListener("input", function () {
    if (!attempted) return;
    validate(); showErrors();
    if (lastStatus && lastStatus.kind === "error" && Object.keys(errors).length === 0) setStatus(null);
  });
  form.addEventListener("change", function (e) {
    if (attempted) { validate(); showErrors(); }
    if (e.target.tagName === "SELECT" && !$("#brief-preview").hidden && validate(true)) $("#brief-text").value = buildBrief();
  });

  function openBrief(trigger) {
    openDialog(briefDialog, trigger);
    form.elements.brand.focus();
  }

  /* ---------------- 启动 ---------------- */
  applyLang(initialLang(), { skipUrl: !new URLSearchParams(location.search).get("lang") });
  syncNavOnScroll();
  window.JJWINE = { setLang: applyLang, VIDEO_CONFIG: VIDEO_CONFIG };
})();
