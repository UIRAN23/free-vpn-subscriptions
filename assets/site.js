(() => {
  "use strict";

  const root = new URL(".", window.location.href);
  const gatewayRoot = new URL("https://uran-vpn-subscriptions.guiltless-swift.workers.dev/");
  let subscriptionRoot = root;
  const state = {
    client: "xray-json",
    mode: "all",
    catalog: "xray-json",
    summary: null,
  };

  const modes = {
    all: {
      label: "Все",
      title: "URAN VPN • Все",
      icon: "layers-3",
      description: "Умный выбор, обычные локации и резерв для белых списков.",
    },
    normal: {
      label: "Обычный",
      title: "URAN VPN • Обычный",
      icon: "shield",
      description: "Российские домены и IP идут напрямую, остальное через VPN.",
    },
    bwl: {
      label: "Белые списки",
      title: "URAN VPN • Белые списки",
      icon: "radio-tower",
      description: "Прямой доступ только к разрешённым доменам, остальное через VPN.",
    },
  };

  const clients = {
    "xray-json": {
      label: "Xray JSON",
      shortLabel: "JSON",
      icon: "braces",
      format: "JSON",
      note: "Incy и Xray-клиенты: правила и авто-выбор уже внутри.",
      paths: {
        all: "sub/uran-vpn-xray-json-all.json",
        normal: "sub/uran-vpn-xray-json-normal.json",
        bwl: "sub/uran-vpn-xray-json-bwl.json",
      },
      importScheme: "hiddify",
    },
    "xray-uri": {
      label: "Xray URI",
      shortLabel: "URI",
      icon: "link-2",
      format: "TXT",
      note: "Happ, Hiddify и другие клиенты стандартных ссылок.",
      paths: {
        all: "sub/uran-vpn-xray-uri-all.txt",
        normal: "sub/uran-vpn-xray-uri-normal.txt",
        bwl: "sub/uran-vpn-xray-uri-bwl.txt",
      },
      importScheme: "hiddify",
    },
    mihomo: {
      label: "Mihomo",
      shortLabel: "Mihomo",
      icon: "gauge",
      format: "YAML",
      note: "FlClashX и Clash Meta: селекторы, страны и маршрутизация.",
      paths: {
        all: "sub/uran-vpn-mihomo-all.yaml",
        normal: "sub/uran-vpn-mihomo-normal.yaml",
        bwl: "sub/uran-vpn-mihomo-bwl.yaml",
      },
      importScheme: "flclashx",
    },
    singbox: {
      label: "sing-box",
      shortLabel: "sing-box",
      icon: "box",
      format: "JSON",
      note: "Готовый удалённый профиль sing-box с группами и правилами.",
      paths: {
        all: "sub/uran-vpn-sing-box-all.json",
        normal: "sub/uran-vpn-sing-box-normal.json",
        bwl: "sub/uran-vpn-sing-box-bwl.json",
      },
      importScheme: "singbox",
    },
  };

  const modeOrder = ["all", "normal", "bwl"];
  const clientOrder = ["xray-json", "xray-uri", "mihomo", "singbox"];
  const countryFallback = {
    AT: ["🇦🇹", "Австрия"], BE: ["🇧🇪", "Бельгия"], BG: ["🇧🇬", "Болгария"],
    CA: ["🇨🇦", "Канада"], CH: ["🇨🇭", "Швейцария"], CN: ["🇨🇳", "Китай"],
    CZ: ["🇨🇿", "Чехия"], DE: ["🇩🇪", "Германия"], EE: ["🇪🇪", "Эстония"],
    ES: ["🇪🇸", "Испания"], FI: ["🇫🇮", "Финляндия"], FR: ["🇫🇷", "Франция"],
    GB: ["🇬🇧", "Великобритания"], HK: ["🇭🇰", "Гонконг"], HU: ["🇭🇺", "Венгрия"],
    IN: ["🇮🇳", "Индия"], IT: ["🇮🇹", "Италия"], JP: ["🇯🇵", "Япония"],
    KR: ["🇰🇷", "Южная Корея"], KZ: ["🇰🇿", "Казахстан"], LT: ["🇱🇹", "Литва"],
    LV: ["🇱🇻", "Латвия"], NL: ["🇳🇱", "Нидерланды"], NO: ["🇳🇴", "Норвегия"],
    PL: ["🇵🇱", "Польша"], RO: ["🇷🇴", "Румыния"], RU: ["🇷🇺", "Россия"],
    SE: ["🇸🇪", "Швеция"], SG: ["🇸🇬", "Сингапур"], TR: ["🇹🇷", "Турция"],
    UA: ["🇺🇦", "Украина"], US: ["🇺🇸", "США"], XX: ["🏳️", "Неизвестно"],
  };

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function refreshIcons() {
    if (window.lucide?.createIcons) window.lucide.createIcons();
  }

  function canonicalUrl(clientKey, modeKey, withTitle = true) {
    const path = clients[clientKey].paths[modeKey];
    const url = new URL(path, subscriptionRoot);
    if (withTitle) url.hash = encodeURIComponent(modes[modeKey].title);
    return url.href;
  }

  async function activateMetadataGateway() {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 2500);
    try {
      const response = await fetch(new URL("health", gatewayRoot), {
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) return;
      const health = await response.json();
      if (health?.ok !== true || Number(health?.endpoints) !== 12) return;
      subscriptionRoot = gatewayRoot;
      renderSelection();
      renderCatalog();
    } catch {
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function importUrl(clientKey, modeKey) {
    const plain = canonicalUrl(clientKey, modeKey, false);
    const titled = canonicalUrl(clientKey, modeKey, true);
    const title = encodeURIComponent(modes[modeKey].title);
    switch (clients[clientKey].importScheme) {
      case "hiddify":
        return `hiddify://import/${plain}#${title}`;
      case "flclashx":
        return `flclashx://install-config?url=${encodeURIComponent(titled)}`;
      case "singbox":
        return `sing-box://import-remote-profile?url=${encodeURIComponent(plain)}#${title}`;
      default:
        return titled;
    }
  }

  function nodeCount(modeKey, clientKey = state.client) {
    let nodes = state.summary?.mihomo_nodes || {};
    if (clientKey === "xray-json") nodes = state.summary?.xray_json || {};
    if (clientKey === "singbox") nodes = state.summary?.sing_box_nodes || {};
    return Number(nodes[modeKey] ?? 0);
  }

  function countLabel(clientKey, count, compact = false) {
    if (!count) return "";
    if (clientKey === "xray-json") return `${count} ${compact ? "проф." : "профилей"}`;
    return `${count} ${compact ? "узл." : "локаций"}`;
  }

  function renderSwitches() {
    $("#client-switch").innerHTML = clientOrder.map((key) => `
      <button type="button" role="tab" data-client="${key}" aria-selected="${state.client === key}" class="${state.client === key ? "active" : ""}">
        ${escapeHtml(clients[key].shortLabel)}
      </button>
    `).join("");

    $("#mode-switch").innerHTML = modeOrder.map((key) => `
      <button type="button" role="tab" data-mode="${key}" aria-selected="${state.mode === key}" class="${state.mode === key ? "active" : ""}">
        ${escapeHtml(modes[key].label)}
      </button>
    `).join("");
  }

  function renderSelection() {
    const client = clients[state.client];
    const mode = modes[state.mode];
    const path = client.paths[state.mode];
    const count = nodeCount(state.mode, state.client);
    $("#selection-output").innerHTML = `
      <div class="selection-meta">
        <div class="selection-title">
          <h3>${escapeHtml(mode.title)}</h3>
          <p>${escapeHtml(client.note)}${count ? ` Внутри: ${countLabel(state.client, count)}.` : ""}</p>
        </div>
        <span class="format-tag">${escapeHtml(client.format)}</span>
      </div>
      <code class="selected-url" title="${escapeHtml(canonicalUrl(state.client, state.mode))}">${escapeHtml(path)}</code>
      <div class="action-row">
        <button class="action-button primary" type="button" data-copy-client="${state.client}" data-copy-mode="${state.mode}">
          <i data-lucide="copy"></i><span>Копировать ссылку</span>
        </button>
        <a class="action-button" href="${escapeHtml(importUrl(state.client, state.mode))}" title="Импортировать в совместимый клиент">
          <i data-lucide="download"></i><span>Импорт</span>
        </a>
        <a class="action-button" href="${escapeHtml(canonicalUrl(state.client, state.mode))}" title="Открыть файл подписки">
          <i data-lucide="external-link"></i><span>Открыть</span>
        </a>
      </div>
    `;
    refreshIcons();
  }

  function renderCatalogTabs() {
    $("#catalog-tabs").innerHTML = clientOrder.map((key) => `
      <button type="button" role="tab" class="catalog-tab ${state.catalog === key ? "active" : ""}" data-catalog="${key}" aria-selected="${state.catalog === key}">
        <i data-lucide="${clients[key].icon}"></i><span>${escapeHtml(clients[key].label)}</span>
      </button>
    `).join("");
    refreshIcons();
  }

  function renderCatalog() {
    const client = clients[state.catalog];
    $("#subscription-grid").innerHTML = modeOrder.map((modeKey, index) => {
      const mode = modes[modeKey];
      const path = client.paths[modeKey];
      const count = nodeCount(modeKey, state.catalog);
      return `
        <article class="subscription-card" data-mode="${modeKey}">
          <div class="card-head">
            <div>
              <span class="card-mode"><i data-lucide="${mode.icon}"></i>${escapeHtml(mode.label)}</span>
              <h3>${escapeHtml(mode.title)}</h3>
            </div>
            <span class="node-count">${count ? countLabel(state.catalog, count, true) : String(index + 1).padStart(2, "0")}</span>
          </div>
          <p class="card-description">${escapeHtml(mode.description)}</p>
          <code class="card-path" title="${escapeHtml(canonicalUrl(state.catalog, modeKey))}">${escapeHtml(path.replace("sub/", ""))}</code>
          <div class="card-actions">
            <button class="action-button primary" type="button" data-copy-client="${state.catalog}" data-copy-mode="${modeKey}">
              <i data-lucide="copy"></i><span>Копировать</span>
            </button>
            <a class="icon-button" href="${escapeHtml(importUrl(state.catalog, modeKey))}" title="Импортировать">
              <i data-lucide="download"></i>
            </a>
            <a class="icon-button" href="${escapeHtml(canonicalUrl(state.catalog, modeKey))}" title="Открыть файл">
              <i data-lucide="external-link"></i>
            </a>
          </div>
        </article>
      `;
    }).join("");
    refreshIcons();
  }

  function countryItems(summary) {
    const detailed = summary?.countries?.all;
    if (Array.isArray(detailed) && detailed.length) {
      return detailed
        .map((item) => ({
          code: String(item.code || "XX").toUpperCase(),
          flag: item.flag || countryFallback[item.code]?.[0] || "🏳️",
          country: item.country || countryFallback[item.code]?.[1] || item.code || "Неизвестно",
          count: Number(item.count || 0),
        }))
        .sort((a, b) => b.count - a.count || a.country.localeCompare(b.country, "ru"));
    }

    const totals = {};
    [
      summary?.dedupe?.normal?.top_locations_after || {},
      summary?.dedupe?.bwl?.top_locations_after || {},
    ].forEach((locations) => {
      Object.entries(locations).forEach(([location, count]) => {
        const code = String(location).split(":", 1)[0].toUpperCase();
        totals[code] = (totals[code] || 0) + Number(count || 0);
      });
    });
    return Object.entries(totals)
      .map(([code, count]) => ({
        code,
        flag: countryFallback[code]?.[0] || "🏳️",
        country: countryFallback[code]?.[1] || code,
        count,
      }))
      .sort((a, b) => b.count - a.count || a.country.localeCompare(b.country, "ru"));
  }

  function renderCountries(summary) {
    const items = countryItems(summary);
    const visible = items.slice(0, 16);
    const max = Math.max(1, ...visible.map((item) => item.count));
    $("#coverage-caption").textContent = items.length
      ? `${items.length} стран в текущей сборке`
      : "Страны появятся после следующей сборки";
    $("#coverage-list").innerHTML = visible.map((item) => `
      <div class="country-row">
        <div class="country-label">
          <span class="country-flag" aria-hidden="true">${escapeHtml(item.flag)}</span>
          <span class="country-name">${escapeHtml(item.country)}</span>
        </div>
        <span class="country-bar" aria-hidden="true"><span style="width:${Math.max(7, Math.round(item.count / max * 100))}%"></span></span>
        <span class="country-count">${item.count}</span>
      </div>
    `).join("") || '<p class="card-description">Нет данных о странах.</p>';
  }

  function renderMetrics(summary) {
    const nodes = summary?.mihomo_nodes || summary?.sing_box_nodes || {};
    const countries = countryItems(summary).length;
    const valid = summary?.validation?.ok === true;
    const values = [
      ["Обычные", nodes.normal ?? "...", "локаций"],
      ["Белые списки", nodes.bwl ?? "...", "локаций"],
      ["Страны", countries || "...", "по выходному IP"],
      ["Gemini", summary?.gemini_nodes?.all ?? "...", "регион доступен"],
      ["Проверка", valid ? "OK" : "...", valid ? "валидные файлы" : "ожидание"],
    ];
    $("#metrics-grid").innerHTML = values.map(([label, value, note]) => `
      <div class="metric"><span>${escapeHtml(label)}</span><strong data-count="${escapeHtml(value)}">${escapeHtml(value)}</strong><small>${escapeHtml(note)}</small></div>
    `).join("");
  }

  function renderDiagnostics(summary) {
    const filter = summary?.service_probe?.filter || {};
    const dedupeNormal = summary?.dedupe?.normal || {};
    const dedupeBwl = summary?.dedupe?.bwl || {};
    const pipeline = [
      ["database", "Проверено выходов", "Запуск через реальные прокси", summary?.exit_probe?.tested ?? "..."],
      ["route", "Выходной IP получен", "Геолокация по фактическому выходу", summary?.exit_probe?.ok ?? "..."],
      ["scan-search", "Сервисы доступны", "Прошёл минимум один целевой сервис", (Number(filter.kept_normal || 0) + Number(filter.kept_bwl || 0)) || "..."],
      ["fingerprint", "Уникальные IP", "Повторы удалены перед публикацией", (Number(dedupeNormal.after || 0) + Number(dedupeBwl.after || 0)) || "..."],
    ];
    $("#pipeline").innerHTML = pipeline.map(([icon, title, note, value]) => `
      <div class="pipeline-row">
        <span class="step-icon"><i data-lucide="${icon}"></i></span>
        <span class="pipeline-copy"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(note)}</small></span>
        <span class="pipeline-value">${escapeHtml(value)}</span>
      </div>
    `).join("");

    const normalServices = summary?.service_probe?.summary?.normal || {};
    const serviceKeys = ["telegram", "discord", "youtube", "github", "gemini"];
    $("#services").innerHTML = serviceKeys.map((key) => {
      const item = normalServices[key] || {};
      const region = key === "gemini" ? Number(item.region_ok || 0) : Number(item.ok || 0);
      const tested = Number(item.tested || 0);
      const percent = tested ? Math.round(region / tested * 100) : 0;
      return `
        <div class="service-row">
          <span class="service-copy"><strong>${escapeHtml(item.name || key)}</strong><small>${key === "gemini" ? "проверка региона" : "HTTP через узлы"}</small></span>
          <span class="service-score">${region}/${tested || "–"}</span>
          <span class="service-state">${percent ? `${percent}%` : "—"}</span>
        </div>
      `;
    }).join("");
    refreshIcons();
  }

  function renderCompatibility() {
    const rows = [
      ["braces", "Incy / Xray JSON", "profile-title + remarks", "2 часа", true],
      ["link-2", "Happ", "profile-title + имя файла", "2 часа", true],
      ["waypoints", "Hiddify", "HTTP-заголовок + URL", "2 часа", true],
      ["gauge", "Mihomo / FlClashX", "Content-Disposition", "2 часа", true],
      ["box", "sing-box", "tag + имя в deep-link", "в интерфейсе клиента", false],
    ];
    $("#compat-table").innerHTML = `
      <div class="compat-row header"><span>Клиент</span><span>Название</span><span>Автообновление</span><span>Статус</span></div>
      ${rows.map(([icon, client, title, update, full]) => `
        <div class="compat-row">
          <span class="compat-client"><i data-lucide="${icon}"></i>${escapeHtml(client)}</span>
          <span class="compat-cell">${escapeHtml(title)}</span>
          <span class="compat-cell">${escapeHtml(update)}</span>
          <span class="compat-status ${full ? "" : "partial"}"><i data-lucide="${full ? "circle-check" : "circle-dot"}"></i>${full ? "готово" : "частично"}</span>
        </div>
      `).join("")}
    `;
    refreshIcons();
  }

  function formatBuildTime(value) {
    const text = String(value || "").trim();
    if (!text) return "время неизвестно";
    const parsed = new Date(text.includes("T") ? text : text.replace(" ", "T") + "Z");
    if (Number.isNaN(parsed.getTime())) return text;
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(parsed);
  }

  function renderSummary(summary) {
    state.summary = summary || {};
    $("#header-time").textContent = `обновлено ${formatBuildTime(summary?.generated_at)}`;
    renderMetrics(summary);
    renderCountries(summary);
    renderDiagnostics(summary);
    renderSelection();
    renderCatalog();
  }

  function showToast(message) {
    const toast = $("#toast");
    $("span", toast).textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 1600);
  }

  function legacyCopy(value) {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    area.style.top = "0";
    area.style.width = "1px";
    area.style.height = "1px";
    document.body.appendChild(area);
    area.focus();
    area.select();
    area.setSelectionRange(0, area.value.length);
    const copied = document.execCommand("copy");
    area.remove();
    return copied;
  }

  function copyText(value) {
    try {
      legacyCopy(value);
    } catch {
    }
    if (navigator.clipboard?.writeText) {
      try {
        navigator.clipboard.writeText(value).catch(() => {});
      } catch {
      }
    }
    showToast("Ссылка скопирована");
  }

  async function loadSummary() {
    try {
      const response = await fetch(`sub/summary.json?v=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error(String(response.status));
      renderSummary(await response.json());
      return;
    } catch {
      if (window.__VPN_SUMMARY__) {
        renderSummary(window.__VPN_SUMMARY__);
        return;
      }
    }

    const script = document.createElement("script");
    script.src = `sub/summary.js?v=${Date.now()}`;
    script.onload = () => renderSummary(window.__VPN_SUMMARY__ || {});
    script.onerror = () => renderSummary({});
    document.head.appendChild(script);
  }

  function installRevealObserver() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    items.forEach((item) => observer.observe(item));
  }

  document.addEventListener("click", (event) => {
    const clientButton = event.target.closest("[data-client]");
    if (clientButton) {
      state.client = clientButton.dataset.client;
      renderSwitches();
      renderSelection();
      return;
    }

    const modeButton = event.target.closest("[data-mode]");
    if (modeButton && modeButton.closest("#mode-switch")) {
      state.mode = modeButton.dataset.mode;
      renderSwitches();
      renderSelection();
      return;
    }

    const catalogButton = event.target.closest("[data-catalog]");
    if (catalogButton) {
      state.catalog = catalogButton.dataset.catalog;
      renderCatalogTabs();
      renderCatalog();
      return;
    }

    const copyButton = event.target.closest("[data-copy-client]");
    if (copyButton) {
      copyText(canonicalUrl(copyButton.dataset.copyClient, copyButton.dataset.copyMode));
    }
  });

  renderSwitches();
  renderSelection();
  renderCatalogTabs();
  renderCatalog();
  renderCompatibility();
  installRevealObserver();
  refreshIcons();
  loadSummary();
  activateMetadataGateway();
})();
