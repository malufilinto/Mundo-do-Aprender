/* Núcleo do portal: registro de jogos, matérias/recortes, modo Solo/Equipes e memes finais. */
(() => {
  const CATS = ["Língua Portuguesa","Matemática","Ciências","História","Geografia","Conhecimentos Gerais"];
  const TEAM_COLORS = ["#4f46e5", "#ef476f", "#22b573", "#ff7a3d"];
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
      <p>Jogos pedagógicos gratuitos para o 2º ao 4º ano do Ensino Fundamental. Jogue no modo Solo ou divida a turma em até 4 equipes!</p>
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
      <p>Cada jogo permite escolher a matéria, o recorte específico (2º ao 4º ano) e o modo de disputa (Solo ou 2 a 4 Equipes com nomes personalizados). Sem cadastro e sem anúncios.</p>
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

  function getMeme(pct) {
    if (pct >= .9) return { emoji: "🕺🎉💃", cls: "meme-dance", title: "Dancinha da Vitória!", text: "Mandou muito bem! Nível mestre desbloqueado!" };
    if (pct >= .6) return { emoji: "👏😎⭐", cls: "meme-clap", title: "Arrasou!", text: "Ótimo desempenho! Continue nesse ritmo!" };
    if (pct >= .3) return { emoji: "🤔📚💡", cls: "meme-clap", title: "Quase lá!", text: "Você está no caminho certo, bora revisar mais um pouco?" };
    return { emoji: "🥲🫠📉", cls: "meme-sad", title: "Deu ruim dessa vez...", text: "Não desanima! Até os gênios erram antes de acertar." };
  }

  function gameView(id) {
    const g = P.games.find(x => x.id === id);
    if (!g) { location.hash = "#/"; return; }
    let currentTopic = null, selSub = "Todas", topicSearch = "";
    let teamCount = 1; // 1 = Solo, 2..4 = Equipes
    let teamNames = ["Equipe Azul", "Equipe Vermelha", "Equipe Verde", "Equipe Laranja"];
    let teams = [], turn = 0, observer = null;

    app().innerHTML = `<section class="gv">
      <div class="bar">
        <a class="btn ghost" href="#/">← Início</a>
        <strong id="gtitle">${g.name}</strong>
        <div style="display:flex;gap:6px">
          ${g.topics ? `<button class="btn ghost" id="tp" style="display:none">📚 Conteúdos</button>` : ""}
          <button class="btn ghost" id="rs">↻ Reiniciar</button>
        </div>
      </div>
      <div id="sb-wrap"></div>
      <div id="st" class="stage"></div></section>`;

    const st = document.getElementById("st");
    const sbWrap = document.getElementById("sb-wrap");
    const tpBtn = document.getElementById("tp");
    document.getElementById("rs").onclick = () => currentTopic ? start(currentTopic) : intro();
    if (tpBtn) tpBtn.onclick = () => pickTopic();
    intro();

    function intro() {
      currentTopic = null;
      if (observer) { observer.disconnect(); observer = null; }
      sbWrap.innerHTML = "";
      if (tpBtn) tpBtn.style.display = "none";
      document.getElementById("gtitle").textContent = g.name;

      const renderTeamSetup = () => {
        const box = st.querySelector("#team-setup");
        box.innerHTML = `
          <strong>👥 Modo de jogo:</strong>
          <div class="team-modes">
            ${[1, 2, 3, 4].map(n => `<button type="button" class="tmode ${teamCount === n ? "on" : ""}" data-n="${n}">${n === 1 ? "🧑 Solo" : `🏆 ${n} Equipes`}</button>`).join("")}
          </div>
          ${teamCount > 1 ? `<div class="team-inputs">
            ${Array.from({ length: teamCount }, (_, i) => `<input type="text" maxlength="20" data-ti="${i}" value="${teamNames[i]}" placeholder="Nome da Equipe ${i + 1}" style="border-color:${TEAM_COLORS[i]}">`).join("")}
          </div>` : `<small class="meta">Jogue individualmente e acompanhe sua pontuação final.</small>`}`;

        box.querySelectorAll(".tmode").forEach(b => b.onclick = () => { teamCount = +b.dataset.n; renderTeamSetup(); });
        box.querySelectorAll("input").forEach(inp => inp.oninput = e => { teamNames[+e.target.dataset.ti] = e.target.value || `Equipe ${+e.target.dataset.ti + 1}`; });
      };

      st.innerHTML = `<div class="intro"><div class="big-ico" style="background:${g.color}">${g.icon}</div>
        <h1>${g.name}</h1><p>${g.description}</p>
        <div class="how"><h3>Como jogar</h3><ol>${g.instructions.map(i => `<li>${i}</li>`).join("")}</ol></div>
        <div class="team-box" id="team-setup"></div>
        <p class="meta">${g.grade} · ${g.topics ? g.topics.length + " recortes temáticos disponíveis" : g.category}</p>
        <button class="btn big" id="go">▶ Escolher matéria e assunto</button></div>`;

      renderTeamSetup();
      document.getElementById("go").onclick = () => g.topics ? pickTopic() : start(null);
    }

    function pickTopic() {
      if (observer) { observer.disconnect(); observer = null; }
      sbWrap.innerHTML = "";
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

    function renderScoreboard() {
      if (teamCount <= 1) { sbWrap.innerHTML = ""; return; }
      sbWrap.innerHTML = `
        <div class="scoreboard">
          ${teams.map((t, idx) => `
            <button type="button" class="tbadge ${idx === turn ? "turn" : ""}" data-t="${idx}" title="Clique para passar a vez para ${t.name}">
              <span class="dot" style="background:${t.color}"></span>
              <span>${t.name}:</span>
              <b>${t.score} pts</b>
            </button>`).join("")}
        </div>
        <div class="turn-banner">🎯 Vez de: <u>${teams[turn].name}</u> (clique em uma equipe para trocar a vez manualmente)</div>`;
      sbWrap.querySelectorAll(".tbadge").forEach(b => b.onclick = () => { turn = +b.dataset.t; renderScoreboard(); });
    }

    function start(topic) {
      currentTopic = topic;
      if (observer) { observer.disconnect(); observer = null; }
      teams = Array.from({ length: teamCount }, (_, i) => ({
        name: (teamNames[i] || `Equipe ${i + 1}`).trim(),
        score: 0,
        color: TEAM_COLORS[i]
      }));
      turn = 0;
      renderScoreboard();

      if (tpBtn && g.topics) tpBtn.style.display = "inline-block";
      document.getElementById("gtitle").textContent = topic ? `${g.name} · ${topic.title}` : g.name;
      st.innerHTML = "";

      if (teamCount > 1) {
        let lastCounted = null;
        observer = new MutationObserver(() => {
          const goodFb = st.querySelector(".fb.good");
          const wrongFb = st.querySelector(".fb.wrong");
          const target = goodFb || wrongFb;
          if (target && target !== lastCounted) {
            lastCounted = target;
            if (goodFb) teams[turn].score += 10;
            turn = (turn + 1) % teams.length;
            renderScoreboard();
          }
        });
        observer.observe(st, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
      }

      g.mount(st, { end, topic });
    }

    function end(r) {
      if (observer) { observer.disconnect(); observer = null; }
      sbWrap.innerHTML = "";
      const pct = r.total ? r.hits / r.total : 0;
      const stars = pct >= .9 ? 3 : pct >= .6 ? 2 : pct > 0 ? 1 : 0;
      const meme = getMeme(pct);

      let podiumHtml = "";
      if (teamCount > 1) {
        const sorted = [...teams].sort((a, b) => b.score - a.score);
        const topScore = sorted[0].score;
        podiumHtml = `<div class="podium">
          ${sorted.map((t, idx) => `
            <div class="podium-row ${t.score === topScore && topScore > 0 ? "win" : ""}">
              <span>${idx === 0 && topScore > 0 ? "🏆 " : ""}<i style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${t.color};margin-right:6px"></i>${t.name}</span>
              <span>${t.score} pts</span>
            </div>`).join("")}
        </div>`;
      }

      st.innerHTML = `<div class="intro result">
        <div class="stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
        <div class="meme-card">
          <div class="meme-anim ${meme.cls}">${meme.emoji}</div>
          <div class="meme-caption">${meme.title}</div>
          <small>${meme.text}</small>
        </div>
        ${podiumHtml}
        <div class="stats"><div><b>${r.hits}</b>acertos</div><div><b>${r.errors}</b>erros</div>${r.score != null && teamCount === 1 ? `<div><b>${r.score}</b>pontos</div>` : ""}</div>
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
