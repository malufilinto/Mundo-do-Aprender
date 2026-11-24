Portal.register({
  id: "forca-dos-baloes", name: "Forca dos Balões", category: "Língua Portuguesa", grade: "2º ao 4º ano",
  icon: "🎈", color: "linear-gradient(135deg,#2ab7ca,#ef476f)",
  description: "Descubra a palavra secreta usando apenas a dica da categoria antes que os 5 balões estourem!",
  instructions: ["Escolha a matéria e o recorte desejado.", "Leia a categoria e toque nas letras para descobrir a palavra.", "Cada letra errada estoura um balão (5 balões por palavra)."],
  topics: [
    {
      subject: "Língua Portuguesa", icon: "✏️", title: "Ortografia: S, Z, SS ou Ç", desc: "16 palavras com S, Z, SS e Ç",
      words: [
        ["PASSARO", "Animal", "🐦"],
        ["CORACAO", "Órgão do corpo", "❤️"],
        ["AZEITONA", "Comida / Fruto", "🫒"],
        ["GIRASSOL", "Flor", "🌻"],
        ["ACUCAR", "Ingrediente", "🍰"],
        ["VASSOURA", "Objeto de limpeza", "🧹"],
        ["PALHACO", "Artista de circo", "🤡"],
        ["BUZINA", "Som de veículo", "📢"],
        ["PESSEGO", "Fruta", "🍑"],
        ["COZINHA", "Cômodo da casa", "🍳"],
        ["CRIANCA", "Pessoa", "🧒"],
        ["TESOURO", "Riqueza escondida", "💎"],
        ["ALMOCO", "Refeição", "🍽️"],
        ["OSSO", "Parte do esqueleto", "🦴"],
        ["BALANCA", "Instrumento de medida", "⚖️"],
        ["RAPOSA", "Animal silvestre", "🦊"]
      ]
    },
    {
      subject: "Língua Portuguesa", icon: "🔤", title: "Dígrafos: CH, LH e NH", desc: "16 palavras com CH, LH e NH",
      words: [
        ["CHOCOLATE", "Doce", "🍫"],
        ["ABELHA", "Inseto", "🐝"],
        ["JOANINHA", "Inseto", "🐞"],
        ["MOCHILA", "Material escolar", "🎒"],
        ["ESPELHO", "Objeto", "🪞"],
        ["COELHO", "Animal", "🐰"],
        ["GALINHA", "Ave", "🐔"],
        ["CHAVEIRO", "Objeto", "🔑"],
        ["GOLFINHO", "Animal marinho", "🐬"],
        ["CHUVEIRO", "Objeto do banheiro", "🚿"],
        ["MILHO", "Alimento", "🌽"],
        ["MINHOCA", "Animal do solo", "🪱"],
        ["CACHORRO", "Animal doméstico", "🐶"],
        ["OVELHA", "Animal da fazenda", "🐑"],
        ["SANDUICHE", "Lanche", "🥪"],
        ["NINHO", "Casa de passarinho", "🪺"]
      ]
    },
    {
      subject: "Geografia", icon: "🌎", title: "Biomas e Paisagens do Brasil", desc: "16 palavras sobre natureza e geografia",
      words: [
        ["AMAZONIA", "Bioma brasileiro", "🌳"],
        ["CAATINGA", "Bioma brasileiro", "🌵"],
        ["PANTANAL", "Bioma brasileiro", "🐊"],
        ["CERRADO", "Bioma brasileiro", "🌾"],
        ["PAMPA", "Bioma brasileiro", "🐎"],
        ["OCEANO", "Água salgada", "🌊"],
        ["MONTANHA", "Relevo", "⛰️"],
        ["FLORESTA", "Vegetação", "🌲"],
        ["PLANICIE", "Tipo de relevo", "🏞️"],
        ["CASCATA", "Queda d'água", "💦"],
        ["DESERTO", "Paisagem seca", "🏜️"],
        ["ILHA", "Terra cercada de água", "🏝️"],
        ["VULCAO", "Formação geológica", "🌋"],
        ["LITORAL", "Região próxima ao mar", "🏖️"],
        ["NASCENTE", "Início de um rio", "💧"],
        ["CERRADAO", "Vegetação", "🌿"]
      ]
    },
    {
      subject: "Ciências", icon: "🪐", title: "Sistema Solar e Natureza", desc: "16 palavras de Ciências da Natureza",
      words: [
        ["ESTRELA", "Astro do céu", "⭐"],
        ["PLANETA", "Astro do Sistema Solar", "🪐"],
        ["ROTACAO", "Movimento da Terra", "🌍"],
        ["SATELITE", "Astro que gira ao redor de um planeta", "🌙"],
        ["GRAVIDADE", "Força da natureza", "🍎"],
        ["GALAXIA", "Conjunto de estrelas", "🌌"],
        ["METEORO", "Fenômeno espacial", "☄️"],
        ["ECLIPSE", "Fenômeno astronômico", "🌑"],
        ["OXIGENIO", "Gás do ar", "💨"],
        ["SEMENTE", "Parte da planta", "🌱"],
        ["CLOROFILA", "Pigmento das folhas", "🍃"],
        ["MAMIFERO", "Grupo de animais", "🐋"],
        ["ANFIBIO", "Grupo de animais", "🐸"],
        ["REPTIL", "Grupo de animais", "🐢"],
        ["ENERGIA", "Força / Recurso", "⚡"],
        ["VAPOR", "Estado da água", "☁️"]
      ]
    },
    {
      subject: "História", icon: "🏛️", title: "Cidadania e Patrimônio Cultural", desc: "16 palavras de História e sociedade",
      words: [
        ["MUSEU", "Lugar de memória", "🏛️"],
        ["FOLCLORE", "Cultura popular", "🎭"],
        ["INDIGENA", "Povos originários", "🪶"],
        ["DIREITOS", "Cidadania", "📜"],
        ["MUNICIPIO", "Divisão territorial", "🏙️"],
        ["HISTORIA", "Disciplina escolar", "📖"],
        ["CULTURA", "Costumes e tradições", "🎨"],
        ["MONUMENTO", "Patrimônio histórico", "🗿"],
        ["REPUBLICA", "Forma de governo", "🇧🇷"],
        ["IMIGRANTE", "Pessoa que muda de país", "🧳"],
        ["ARTESANATO", "Trabalho manual", "🏺"],
        ["MEMORIA", "Lembrança", "🧠"],
        ["HERANCA", "Legado cultural", "🎁"],
        ["COMUNIDADE", "Grupo social", "🤝"],
        ["FERIADO", "Data comemorativa", "📅"],
        ["DOCUMENTO", "Registro oficial", "🪪"]
      ]
    }
  ],
  mount(root, api) {
    const topic = api.topic || Portal.games.find(g => g.id === "forca-dos-baloes").topics[0];
    const W = Portal.shuffle(topic.words).slice(0, 8);
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
