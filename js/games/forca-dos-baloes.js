Portal.register({
  id: "forca-dos-baloes", name: "Forca dos Balões", category: "Língua Portuguesa", grade: "2º ao 4º ano",
  icon: "🎈", color: "linear-gradient(135deg,#2ab7ca,#ef476f)",
  description: "Escolha o tema e descubra as palavras secretas com a ajuda das dicas antes que os balões estourem!",
  instructions: ["Escolha o assunto das palavras.", "Leia a dica e toque nas letras para formar a palavra.", "Cada letra errada estoura um balão. São 5 balões por palavra."],
  topics: [
    {
      icon: "🔤", title: "Dígrafos e Encontros Consonantais", desc: "CH, LH, NH, RR, BR, TR, PL",
      words: [
        ["CHOCOLATE", "Doce feito com cacau (escrito com CH)", "🍫"],
        ["ABELHA", "Inseto que produz mel (escrito com LH)", "🐝"],
        ["JOANINHA", "Pequeno inseto vermelho com pintinhas pretas (com NH)", "🐞"],
        ["BICICLETA", "Meio de transporte com duas rodas e pedais (com CL)", "🚲"],
        ["ESTRELA", "Ponto brilhante que vemos no céu à noite (com TR)", "⭐"]
      ]
    },
    {
      icon: "👩‍⚕️", title: "Profissões e Trabalho", desc: "Quem cuida, ensina e constrói",
      words: [
        ["PROFESSORA", "Ensina os alunos na escola", "👩‍🏫"],
        ["DENTISTA", "Cuida da saúde dos nossos dentes", "🦷"],
        ["BOMBEIRO", "Apaga incêndios e faz resgates", "🚒"],
        ["VETERINARIO", "Médico que cuida dos animais", "🐾"],
        ["CARTEIRO", "Entrega cartas e encomendas nas casas", "✉️"]
      ]
    },
    {
      icon: "🚀", title: "Transportes e Comunicação", desc: "Como nos locomovemos e conversamos",
      words: [
        ["HELICOPTERO", "Voa usando hélices no topo", "🚁"],
        ["SUBMARINO", "Navega embaixo da água do mar", "🌊"],
        ["TELEFONE", "Aparelho usado para conversar à distância", "📞"],
        ["AMBULANCIA", "Veículo que leva pacientes ao hospital", "🚑"],
        ["COMPUTADOR", "Máquina usada para estudar, escrever e pesquisar", "💻"]
      ]
    }
  ],
  mount(root, api) {
    const topic = api.topic || Portal.games.find(g => g.id === "forca-dos-baloes").topics[0];
    const W = topic.words;
    const COL = ["#ef476f", "#ffd23f", "#2ab7ca", "#22b573", "#7c3aed"];
    let n = 0, hits = 0, errs = 0;
    function round() {
      const [w, hint, emo] = W[n], got = new Set(); let bal = 5;
      root.innerHTML = `<div class="hdr"><span>Palavra ${n + 1} de ${W.length}</span><span>Acertos: ${hits} · Erros: ${errs}</span></div>
        <div class="hint"><span class="emo">${emo}</span> Dica: ${hint}</div>
        <div id="bl" class="balloons"></div><div id="wd" class="word"></div><div id="kb" class="kb"></div><div id="fb" class="fb" aria-live="polite"></div>`;
      const bl = root.querySelector("#bl"), wd = root.querySelector("#wd"), kb = root.querySelector("#kb"), fb = root.querySelector("#fb");
      const draw = () => {
        bl.innerHTML = COL.map((c, k) => k < bal ? `<span class="bal" style="background:${c}"></span>` : `<span class="boom">💥</span>`).join("");
        wd.innerHTML = [...w].map(l => `<span>${got.has(l) ? l : ""}</span>`).join("");
      };
      const finish = won => {
        kb.querySelectorAll("button").forEach(b => b.disabled = true);
        if (won) hits++;
        fb.className = "fb " + (won ? "good" : "wrong");
        fb.innerHTML = `<b>${won ? "🎉 Parabéns!" : "😅 Os balões acabaram."}</b> A palavra era <b>${w}</b>.<br><button class="btn" id="nx">${n + 1 < W.length ? "Próxima palavra →" : "Ver resultado"}</button>`;
        fb.querySelector("#nx").onclick = () => { if (++n < W.length) round(); else api.end({ hits, errors: errs, total: W.length }); };
      };
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(l => {
        const b = document.createElement("button"); b.className = "key"; b.textContent = l;
        b.onclick = () => {
          b.disabled = true;
          if (w.includes(l)) { got.add(l); b.classList.add("ok"); } else { bal--; errs++; b.classList.add("bad"); }
          draw();
          if ([...w].every(x => got.has(x))) finish(true); else if (bal === 0) { [...w].forEach(x => got.add(x)); draw(); finish(false); }
        };
        kb.appendChild(b);
      });
      draw();
    }
    round();
  }
});
