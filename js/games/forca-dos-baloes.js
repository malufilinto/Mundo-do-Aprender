Portal.register({
  id: "forca-dos-baloes", name: "Forca dos Balões", category: "Língua Portuguesa", grade: "2º ao 4º ano",
  icon: "🎈", color: "linear-gradient(135deg,#2ab7ca,#ef476f)",
  description: "Descubra palavras-chave de Ortografia, Geografia, Ciências e História antes que os balões estourem!",
  instructions: ["Escolha a matéria e o recorte desejado.", "Leia a dica e toque nas letras para formar a palavra.", "Cada letra errada estoura um balão (5 balões por palavra)."],
  topics: [
    {
      subject: "Língua Portuguesa", icon: "✏️", title: "Ortografia: S, Z, SS ou Ç", desc: "Treino de grafia com dicas ortográficas",
      words: [
        ["PASSARO", "Animal com penas e bico (escrito com SS)", "🐦"],
        ["CORACAO", "Órgão que bombeia o sangue (escrito com Ç)", "❤️"],
        ["AZEITONA", "Fruto pequeno usado na pizza (escrito com Z)", "🫒"],
        ["GIRASSOL", "Flor amarela que segue a luz do Sol (com SS)", "🌻"],
        ["ACUCAR", "Ingrediente doce usado nos bolos (com Ç)", "🍰"]
      ]
    },
    {
      subject: "Língua Portuguesa", icon: "🔤", title: "Dígrafos: CH, LH e NH", desc: "Palavras com encontros consonantais",
      words: [
        ["CHOCOLATE", "Doce feito com cacau (escrito com CH)", "🍫"],
        ["ABELHA", "Inseto que produz mel (escrito com LH)", "🐝"],
        ["JOANINHA", "Inseto vermelho de pintinhas pretas (com NH)", "🐞"],
        ["MOCHILA", "Usada para carregar cadernos e livros (com CH)", "🎒"],
        ["ESPELHO", "Objeto onde vemos nosso reflexo (com LH)", "🪞"]
      ]
    },
    {
      subject: "Geografia", icon: "🌎", title: "Biomas e Paisagens do Brasil", desc: "Vegetação e regiões naturais",
      words: [
        ["AMAZONIA", "Maior floresta tropical do Brasil e do mundo", "🌳"],
        ["CAATINGA", "Bioma exclusivo do Brasil com clima semiárido e cactos", "🌵"],
        ["PANTANAL", "Maior planície alagável do mundo, rica em aves e jacarés", "🐊"],
        ["CERRADO", "Bioma do centro do Brasil com árvores de troncos retorcidos", "🌾"],
        ["OCEANO", "Grande extensão de água salgada que banha o litoral", "🌊"]
      ]
    },
    {
      subject: "Ciências", icon: "🪐", title: "Sistema Solar e Universo", desc: "Astros, planetas e movimentos da Terra",
      words: [
        ["ESTRELA", "Astro que possui luz própria, como o Sol", "⭐"],
        ["PLANETA", "Astro sem luz própria que gira ao redor de uma estrela", "🪐"],
        ["ROTACAO", "Movimento que a Terra faz em torno de si mesma", "🌍"],
        ["SATELITE", "A Lua é o único natural da Terra", "🌙"],
        ["GRAVIDADE", "Força que nos mantém com os pés no chão", "🍎"]
      ]
    },
    {
      subject: "História", icon: "🏛️", title: "Cidadania e Patrimônio Cultural", desc: "Memória, cultura e convivência",
      words: [
        ["MUSEU", "Lugar que guarda objetos e memórias da história", "🏛️"],
        ["FOLCLORE", "Conjunto de lendas, festas e danças populares", "🎭"],
        ["INDIGENA", "Povos originários que já viviam no Brasil antes de 1500", "🪶"],
        ["DIREITOS", "Tudo aquilo que garante respeito e dignidade ao cidadão", "📜"],
        ["MUNICIPIO", "Divisão administrativa formada pela zona urbana e rural", "🏙️"]
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
