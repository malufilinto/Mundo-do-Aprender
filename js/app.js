/* Núcleo do portal: registro de jogos, página inicial e seleção hierárquica de matérias/recortes. */
(() => {
  const CATS = ["Língua Portuguesa","Matemática","Ciências","História","Geografia","Conhecimentos Gerais"];
  const app = () => document.getElementById("app");
  const P = window.Portal = {
    games: [],
    register(g) { P.games.push(g); },
    shuffle(a) { return a.map(x => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(x => x[1]); },
    norm(s) { return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase(); },
    start() { addEventListener("hashchange", route); document.addEventListener("click", nav); route(); }
  };

  function nav(e) {
    const b = e.target.closest("[data-scroll]"); if (!b) return;
    const go = () => document.getElementById(b.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
    if (location.hash.startsWith("#/jogo")) { location.hash = "#/"; setTimeout(go, 50); } else go();
  }

  function route() {
    const m = location.hash.match(/^#\/jogo\/([\w-]+)/);
    window.scrollTo(0, 0);
    m ? gameView(m[1]) : home();
  }

  let cat = "Todas", q = "";
  function home() {
    app().innerHTML = `
    <section class="hero">
      <div><h1>Aprender é um jogo!</h1>
      <p>Jogos pedagógicos gratuitos para o 2º ao 4º ano do Ensino Fundamental. Escolha a mecânica, filtre pela matéria e selecione o conteúdo exato da sua aula.</p>
      <button class="btn big" data-scroll="jogos">Escolher um jogo</button></div>
      <div class="mascot" aria-hidden="true"><span>🦉</span><i>📚</i><i>⭐</i><i>🎈</i></div>
    </section>
    <section id="jogos" class="wrap">
      <div class="tools">
        <input id="q" type="search" placeholder="Pesquisar jogos ou conteúdos…" aria-label="Pesquisar jogos" value="${q}">
        <div id="chips" class="chips"></div>
      </div>
      <div id="grid" class="cards"></div>
    </section>
    <section id="sobre" class="wrap about">
      <h2>Para professores</h2>
      <p>Cada jogo funciona como um motor de atividade com baralhos organizados por matéria e habilidade específica (2º ao 4º ano). Sem cadastro, sem anúncios e sem coleta de dados.</p>
    </section>`;
    document.getElementById("q").oninput = e => { q = e.target.value; grid(); };
    chips(); grid();
  }

  function chips() {
    const c = document.getElementById("chips");
    c.innerHTML = ["Todas", ...CATS].map(x => `<button class="chip ${x === cat ? "on" : ""}">${x}</button>`).join("");
    c.querySelectorAll("button").forEach(b => b.onclick = () => { cat = b.textContent; chips(); grid(); });
  }

  function grid() {
    const n = P.norm(q);
    const list = P.games.filter(g => {
      const topicsText = (g.topics || []).map(t => `${t.subject || ""} ${t.title} ${t.desc}`).join(" ");
      const matchCat = cat === "Todas" || g.category === cat || (g.topics || []).some(t => t.subject === cat);
      return matchCat && P.norm(`${g.name} ${g.description} ${g.category} ${topicsText}`).includes(n);
    });
    document.getElementById("grid").innerHTML = list.length ? list.map(g => `
      <a class="card" href="#/jogo/${g.id}">
        <div class="art" style="background:${g.color}"><span>${g.icon}</span></div>
        <div class="cb"><span class="tag">${g.topics ? g.topics.length + " conteúdos" : g.category}</span><h3>${g.name}</h3><p>${g.description}</p><small>📚 ${g.grade}</small></div>
      </a>`).join("") : `<p class="empty">Nenhum jogo encontrado com esse filtro.</p>`;
  }

  function gameView(id) {
    const g = P.games.find(x => x.id === id);
    if (!g) { location.hash = "#/"; return; }
    let currentTopic = null, selSub = "Todas", topicSearch = "";

    app().innerHTML = `<section class="gv">
      <div class="bar">
        <a class="btn ghost" href="#/">← Início</a>
        <strong id="gtitle">${g.name}</strong>
        <div style="display:flex;gap:6px">
          ${g.topics ? `<button class="btn ghost" id="tp" style="display:none">📚 Conteúdos</button>` : ""}
          <button class="btn ghost" id="rs">↻ Reiniciar</button>
        </div>
      </div>
      <div id="st" class="stage"></div></section>`;

    const st = document.getElementById("st");
    const tpBtn = document.getElementById("tp");
    document.getElementById("rs").onclick = () => currentTopic ? start(currentTopic) : intro();
    if (tpBtn) tpBtn.onclick = () => pickTopic();
    intro();

    function intro() {
      currentTopic = null;
      if (tpBtn) tpBtn.style.display = "none";
      document.getElementById("gtitle").textContent = g.name;
      st.innerHTML = `<div class="intro"><div class="big-ico" style="background:${g.color}">${g.icon}</div>
        <h1>${g.name}</h1><p>${g.description}</p>
        <div class="how"><h3>Como jogar</h3><ol>${g.instructions.map(i => `<li>${i}</li>`).join("")}</ol></div>
        <p class="meta">${g.grade} · ${g.topics ? g.topics.length + " recortes temáticos disponíveis" : g.category}</p>
        <button class="btn big" id="go">▶ Escolher matéria e assunto</button></div>`;
      document.getElementById("go").onclick = () => g.topics ? pickTopic() : start(null);
    }

    function pickTopic() {
      if (tpBtn) tpBtn.style.display = "none";
      document.getElementById("gtitle").textContent = g.name;
      const subjects = ["Todas", ...new Set(g.topics.map(t => t.subject || g.category))];
      if (!subjects.includes(selSub)) selSub = "Todas";

      const renderTopics = () => {
        const normQ = P.norm(topicSearch);
        const filtered = g.topics.map((t, idx) => ({ ...t, idx })).filter(t => {
          const sub = t.subject || g.category;
          const okSub = selSub === "Todas" || sub === selSub;
          const okQ = P.norm(`${sub} ${t.title} ${t.desc}`).includes(normQ);
          return okSub && okQ;
        });

        st.querySelector("#tlist").innerHTML = filtered.length ? filtered.map(t => `
          <button class="tbtn" data-idx="${t.idx}">
            <div class="ttop"><span>${t.icon || "📘"}</span><span class="tsub">${t.subject || g.category}</span></div>
            <strong>${t.title}</strong>
            <small>${t.desc}</small>
          </button>`).join("") : `<p class="empty">Nenhum conteúdo encontrado para esse filtro.</p>`;

        st.querySelectorAll(".tbtn").forEach(b => b.onclick = () => start(g.topics[+b.dataset.idx]));
      };

      st.innerHTML = `<div class="intro">
        <h2>O que vamos trabalhar hoje?</h2>
        <p class="meta">Selecione a matéria e o recorte específico (${g.grade})</p>
        <div class="subject-tabs" id="stabs">${subjects.map(s => `<button class="stab ${s === selSub ? "on" : ""}">${s}</button>`).join("")}</div>
        <input class="tsearch" id="tsearch" type="search" placeholder="Buscar recorte (ex: SS, Ç, Biomas, Tabuada…)" value="${topicSearch}">
        <div class="topics" id="tlist"></div>
      </div>`;

      st.querySelectorAll(".stab").forEach(b => b.onclick = () => { selSub = b.textContent; pickTopic(); });
      st.querySelector("#tsearch").oninput = e => { topicSearch = e.target.value; renderTopics(); };
      renderTopics();
    }

    function start(topic) {
      currentTopic = topic;
      if (tpBtn && g.topics) tpBtn.style.display = "inline-block";
      document.getElementById("gtitle").textContent = topic ? `${g.name} · ${topic.title}` : g.name;
      st.innerHTML = "";
      g.mount(st, { end, topic });
    }

    function end(r) {
      const pct = r.total ? r.hits / r.total : 0, stars = pct >= .9 ? 3 : pct >= .6 ? 2 : pct > 0 ? 1 : 0;
      st.innerHTML = `<div class="intro result"><div class="stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
        <h1>${pct >= .6 ? "Muito bem!" : "Boa tentativa!"}</h1>
        <div class="stats"><div><b>${r.hits}</b>acertos</div><div><b>${r.errors}</b>erros</div>${r.score != null ? `<div><b>${r.score}</b>pontos</div>` : ""}</div>
        ${r.msg ? `<p>${r.msg}</p>` : ""}
        <div class="row">
          <button class="btn big" id="again">↻ Jogar de novo</button>
          ${g.topics ? `<button class="btn ghost big" id="other">📚 Outro conteúdo</button>` : ""}
          <a class="btn ghost big" href="#/">Voltar ao início</a>
        </div></div>`;
      document.getElementById("again").onclick = () => start(currentTopic);
      if (g.topics) document.getElementById("other").onclick = pickTopic;
    }
  }
})();
