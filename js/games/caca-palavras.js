Portal.register({
  id: "caca-palavras", name: "Caça-Palavras", category: "Língua Portuguesa", grade: "2º ao 4º ano",
  icon: "🔍", color: "linear-gradient(135deg,#4f46e5,#2ab7ca)",
  description: "Encontre as palavras escondidas na grade escolhendo um tema pedagógico ou criando sua própria lista.",
  instructions: ["Escolha o tema desejado antes de começar.", "Toque na primeira letra da palavra e depois na última (horizontal, vertical ou diagonal).", "Professor: use o campo abaixo da grade para digitar palavras personalizadas."],
  topics: [
    { icon: "✏️", title: "Ortografia: R/RR, S/SS e NH/LH", desc: "Palavras com dígrafos e encontros", words: ["CARRO", "PASSARO", "COELHO", "GALINHA", "CHUVA", "TERRA", "GIRASSOL", "FOLHA"] },
    { icon: "🌿", title: "Animais e Natureza", desc: "Fauna, flora e meio ambiente", words: ["FLORESTA", "BORBOLETA", "TARTARUGA", "CACHORRO", "ARVORE", "OCEANO", "PASSARO", "PLANETA"] },
    { icon: "🍎", title: "Corpo Humano e Saúde", desc: "Hábitos saudáveis e partes do corpo", words: ["CORACAO", "PULMAO", "HIGIENE", "VITAMINA", "ESQUELETO", "DENTES", "ENERGIA", "SAUDE"] }
  ],
  mount(root, api) {
    const N = 10, DIRS = [[0, 1], [1, 0], [1, 1]], COLS = ["#ffd23f", "#9be7a6", "#ffb3c1", "#a5d8ff", "#d0bfff", "#ffc78f", "#b2f2bb", "#fcc2d7"];
    const baseWords = api.topic ? api.topic.words : Portal.games.find(g => g.id === "caca-palavras").topics[0].words;
    let words = baseWords.slice(), grid, found, start, errs;
    function build() {
      grid = Array.from({ length: N }, () => Array(N).fill(""));
      const placed = [];
      [...words].sort((a, b) => b.length - a.length).forEach(w => {
        for (let t = 0; t < 300; t++) {
          const [dr, dc] = DIRS[Math.floor(Math.random() * 3)], r = Math.floor(Math.random() * N), c = Math.floor(Math.random() * N);
          if (r + dr * (w.length - 1) >= N || c + dc * (w.length - 1) >= N) continue;
          if ([...w].every((l, k) => !grid[r + dr * k][c + dc * k] || grid[r + dr * k][c + dc * k] === l)) {
            [...w].forEach((l, k) => grid[r + dr * k][c + dc * k] = l); placed.push(w); return;
          }
        }
      });
      words = placed.sort();
      const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      grid = grid.map(row => row.map(x => x || A[Math.floor(Math.random() * 26)]));
      found = {}; start = null; errs = 0;
    }
    function draw() {
      const colorOf = {};
      Object.values(found).forEach((cells, k) => cells.forEach(([r, c]) => colorOf[r + "," + c] = COLS[k % COLS.length]));
      root.innerHTML = `<div class="hdr"><span>Encontradas: ${Object.keys(found).length} de ${words.length}</span><span>Erros: ${errs}</span></div>
        <div class="cw"><div class="cwgrid" style="grid-template-columns:repeat(${N},1fr)">${grid.map((row, r) => row.map((l, c) => `<button class="cell ${start && start[0] === r && start[1] === c ? "sel" : ""}" style="${colorOf[r + "," + c] ? "background:" + colorOf[r + "," + c] : ""}" data-r="${r}" data-c="${c}">${l}</button>`).join("")).join("")}</div>
        <ul class="wlist">${words.map(w => `<li class="${found[w] ? "got" : ""}">${w}</li>`).join("")}</ul></div>
        <form class="custom" id="cf"><input id="ci" placeholder="Suas palavras, separadas por vírgula" aria-label="Suas palavras"><button class="btn ghost">Usar minhas palavras</button></form>`;
      root.querySelectorAll(".cell").forEach(b => b.onclick = () => pick(+b.dataset.r, +b.dataset.c));
      root.querySelector("#cf").onsubmit = e => {
        e.preventDefault();
        const l = root.querySelector("#ci").value.split(/[,;\n]+/).map(s => Portal.norm(s).replace(/[^A-Z]/g, "")).filter(s => s.length >= 3 && s.length <= N).slice(0, 8);
        if (l.length < 2) { root.querySelector("#ci").placeholder = "Digite ao menos 2 palavras (3 a 10 letras)"; root.querySelector("#ci").value = ""; return; }
        words = l; build(); draw();
      };
    }
    function pick(r, c) {
      if (!start) { start = [r, c]; return draw(); }
      const [r0, c0] = start, dr = r - r0, dc = c - c0; start = null;
      if ((dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) && (dr || dc)) {
        const len = Math.max(Math.abs(dr), Math.abs(dc)) + 1, sr = Math.sign(dr), sc = Math.sign(dc);
        const cells = Array.from({ length: len }, (_, k) => [r0 + sr * k, c0 + sc * k]), s = cells.map(([a, b]) => grid[a][b]).join("");
        const w = words.find(x => !found[x] && (x === s || x === [...s].reverse().join("")));
        if (w) {
          found[w] = cells; draw();
          if (Object.keys(found).length === words.length) setTimeout(() => api.end({ hits: words.length, errors: errs, total: words.length }), 700);
          return;
        }
        errs++;
      }
      draw();
    }
    build(); draw();
  }
});
