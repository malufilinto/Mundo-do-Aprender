/* Núcleo do portal: registro de jogos, página inicial e "moldura" dos jogos. */
(() => {
  const CATS = ["Matemática","Língua Portuguesa","Ciências","História","Geografia","Raciocínio Lógico","Conhecimentos Gerais"];
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
      <p>Jogos pedagógicos gratuitos para jogar em sala de aula ou em casa. Sem cadastro, sem anúncios e direto no navegador.</p>
      <button class="btn big" data-scroll="jogos">Escolher um jogo</button></div>
      <div class="mascot" aria-hidden="true"><span>🦉</span><i>📚</i><i>⭐</i><i>🎈</i></div>
    </section>
    <section id="jogos" class="wrap">
      <div class="tools">
        <input id="q" type="search" placeholder="Pesquisar jogos…" aria-label="Pesquisar jogos" value="${q}">
        <div id="chips" class="chips"></div>
      </div>
      <div id="grid" class="cards"></div>
    </section>
    <section id="sobre" class="wrap about">
      <h2>Para professores</h2>
      <p>Cada jogo tem instruções, feedback imediato, pontuação e tela de resultado. Os jogos funcionam em computador, tablet e celular, e os alunos podem jogar quantas vezes quiserem. Nenhum dado pessoal é coletado.</p>
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
    const list = P.games.filter(g => (cat === "Todas" || g.category === cat) && P.norm(g.name + g.description + g.category).includes(n));
    document.getElementById("grid").innerHTML = list.length ? list.map(g => `
      <a class="card" href="#/jogo/${g.id}">
        <div class="art" style="background:${g.color}"><span>${g.icon}</span></div>
        <div class="cb"><span class="tag">${g.category}</span><h3>${g.name}</h3><p>${g.description}</p><small>📚 ${g.grade}</small></div>
      </a>`).join("") : `<p class="empty">Nenhum jogo encontrado${cat !== "Todas" ? " nesta categoria ainda" : ""}. Novos jogos chegam em breve!</p>`;
  }

  function gameView(id) {
    const g = P.games.find(x => x.id === id);
    if (!g) { location.hash = "#/"; return; }
    app().innerHTML = `<section class="gv">
      <div class="bar"><a class="btn ghost" href="#/">← Início</a><strong>${g.name}</strong><button class="btn ghost" id="rs">↻ Reiniciar</button></div>
      <div id="st" class="stage"></div></section>`;
    const st = document.getElementById("st");
    document.getElementById("rs").onclick = () => start();
    intro();

    function intro() {
      st.innerHTML = `<div class="intro"><div class="big-ico" style="background:${g.color}">${g.icon}</div>
        <h1>${g.name}</h1><p>${g.description}</p>
        <div class="how"><h3>Como jogar</h3><ol>${g.instructions.map(i => `<li>${i}</li>`).join("")}</ol></div>
        <p class="meta">${g.category} · ${g.grade}</p>
        <button class="btn big" id="go">▶ Iniciar</button></div>`;
      document.getElementById("go").onclick = start;
    }
    function start() { st.innerHTML = ""; g.mount(st, { end }); }
    function end(r) {
      const pct = r.total ? r.hits / r.total : 0, stars = pct >= .9 ? 3 : pct >= .6 ? 2 : pct > 0 ? 1 : 0;
      st.innerHTML = `<div class="intro result"><div class="stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
        <h1>${pct >= .6 ? "Muito bem!" : "Boa tentativa!"}</h1>
        <div class="stats"><div><b>${r.hits}</b>acertos</div><div><b>${r.errors}</b>erros</div>${r.score != null ? `<div><b>${r.score}</b>pontos</div>` : ""}</div>
        ${r.msg ? `<p>${r.msg}</p>` : ""}
        <div class="row"><button class="btn big" id="again">↻ Jogar de novo</button><a class="btn ghost big" href="#/">Voltar ao início</a></div></div>`;
      document.getElementById("again").onclick = start;
    }
  }
})();
