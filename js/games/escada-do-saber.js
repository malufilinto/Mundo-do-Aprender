Portal.register({
  id: "escada-do-saber", name: "Escada do Saber", category: "Matemática", grade: "2º ao 4º ano",
  icon: "🪜", color: "linear-gradient(135deg,#7c3aed,#ff7a3d)",
  description: "Suba a escada de 10 perguntas escolhendo o conteúdo específico de Português, Matemática ou Geografia.",
  instructions: ["Escolha a matéria e o tema específico.", "Responda cada pergunta escolhendo uma das 4 alternativas.", "Use as ajudas (Pular ou Eliminar duas) quando precisar.", "A estrela marca o ponto seguro de 1000 moedas."],
  topics: [
    {
      subject: "Língua Portuguesa", icon: "✍️", title: "Ortografia: S, Z, SS ou Ç", desc: "Quando usar cada letra corretamente",
      questions: [
        ["Qual palavra está escrita corretamente com Ç?", ["Coração", "Corassão", "Corazão", "Corasão"]],
        ["Qual palavra se escreve com Z no final?", ["Feliz", "Felis", "Feliç", "Feliss"]],
        ["Entre duas vogais, para ter som forte de S, usamos:", ["SS (como em pássaro)", "Z (como em pazaro)", "Ç (como em paçaro)", "X (como em paxaro)"]],
        ["Qual palavra está escrita de forma correta?", ["Cebola", "Çebola", "Sebola", "Zebola"]],
        ["No início das palavras, NUNCA usamos:", ["Ç ou SS", "S ou C", "Z ou S", "C ou Z"]],
        ["Como se escreve o nome da flor amarela que gira para o Sol?", ["Girassol", "Girasol", "Giraçol", "Girazol"]],
        ["Qual palavra está escrita corretamente com Z?", ["Azeitona", "Aseitona", "Açeitona", "Asseitona"]],
        ["Qual palavra completa a frase: 'Comi uma deliciosa ______ de morango'?", ["Taça", "Tassa", "Taza", "Tasa"]],
        ["Qual palavra tem o som de Z, mas é escrita com S?", ["Casa", "Caza", "Caça", "Cassa"]],
        ["Qual palavra está escrita corretamente?", ["Açúcar", "Assúcar", "Asúcar", "Azúcar"]]
      ],
      reserve: [["Qual palavra se escreve com SS?", ["Vassoura", "Vasoura", "Vaçoura", "Vazoura"]]]
    },
    {
      subject: "Língua Portuguesa", icon: "📚", title: "Gramática: Substantivos, Adjetivos e Verbos", desc: "Classes de palavras e concordância",
      questions: [
        ["Qual palavra é um substantivo próprio?", ["São Paulo", "cidade", "menino", "caderno"]],
        ["Na frase 'A menina estudiosa leu o livro', qual palavra é um adjetivo?", ["estudiosa", "menina", "leu", "livro"]],
        ["Qual palavra indica uma ação (verbo)?", ["Correr", "Bonito", "Escola", "Mesa"]],
        ["Qual é o plural correto de 'cidadão'?", ["Cidadãos", "Cidadões", "Cidadães", "Cidadãozes"]],
        ["Qual palavra é um substantivo coletivo de peixes?", ["Cardume", "Alcateia", "Enxame", "Rebanho"]],
        ["Na frase 'Os cachorros latiram alto', o verbo 'latiram' está no:", ["Passado", "Presente", "Futuro", "Infinitivo"]],
        ["Qual é o antônimo (contrário) de 'generoso'?", ["Egoísta", "Bondoso", "Carinhoso", "Gentil"]],
        ["Qual palavra é um substantivo derivado de 'pedra'?", ["Pedreiro", "Paredão", "Tijolo", "Areia"]],
        ["Em 'O dia está ensolarado', a palavra 'ensolarado' dá qualidade ao:", ["Dia", "Está", "O", "Sol"]],
        ["Qual conjunto tem apenas verbos?", ["Pular, cantar, dormir", "Casa, bola, gato", "Azul, feliz, alto", "Eu, tu, ele"]]
      ],
      reserve: [["Qual é o feminino de 'bode'?", ["Cabra", "Ovelha", "Égua", "Vaca"]]]
    },
    {
      subject: "Matemática", icon: "✖️", title: "Tabuada e Multiplicação (2 ao 9)", desc: "Cálculo mental e situações-problema",
      questions: [
        ["Quanto é 3 × 4?", ["12", "7", "14", "16"]],
        ["Quanto é 5 × 6?", ["30", "25", "35", "20"]],
        ["Se 1 caixa tem 4 lápis, quantos lápis há em 7 caixas?", ["28 lápis", "24 lápis", "32 lápis", "21 lápis"]],
        ["Quanto é 6 × 6?", ["36", "30", "42", "32"]],
        ["Quanto é o triplo de 9?", ["27", "18", "36", "24"]],
        ["Quanto é 7 × 8?", ["56", "54", "49", "63"]],
        ["Em 8 pacotes com 5 figurinhas cada, temos:", ["40 figurinhas", "35 figurinhas", "45 figurinhas", "30 figurinhas"]],
        ["Quanto é 9 × 4?", ["36", "32", "40", "27"]],
        ["Qual multiplicação tem como resultado o número 48?", ["6 × 8", "7 × 6", "9 × 5", "8 × 5"]],
        ["Quanto é 9 × 9?", ["81", "72", "90", "79"]]
      ],
      reserve: [["Quanto é 4 × 8?", ["32", "28", "36", "24"]]]
    },
    {
      subject: "Matemática", icon: "💰", title: "Sistema Monetário e Medidas", desc: "Reais, centavos, horas, metros e litros",
      questions: [
        ["Quantas moedas de 50 centavos formam 1 real?", ["2 moedas", "4 moedas", "5 moedas", "10 moedas"]],
        ["Quantos minutos tem meia hora?", ["30 minutos", "15 minutos", "60 minutos", "45 minutos"]],
        ["Se um caderno custa R$ 12,00 e pago com R$ 20,00, quanto recebo de troco?", ["R$ 8,00", "R$ 6,00", "R$ 10,00", "R$ 7,00"]],
        ["Qual unidade usamos para medir o leite da garrafa?", ["Litro (L)", "Quilograma (kg)", "Metro (m)", "Grau (°C)"]],
        ["Quantos centímetros há em 2 metros?", ["200 cm", "20 cm", "100 cm", "2000 cm"]],
        ["Uma aula começa às 13h00 e termina às 14h30. Quanto tempo ela durou?", ["1 hora e 30 minutos", "2 horas", "1 hora", "45 minutos"]],
        ["Quantos gramas tem meio quilo (0,5 kg)?", ["500 g", "100 g", "250 g", "1000 g"]],
        ["Juntando 1 nota de R$ 10, 1 nota de R$ 5 e 3 moedas de R$ 1, temos:", ["R$ 18,00", "R$ 15,00", "R$ 17,00", "R$ 19,00"]],
        ["Quantos dias tem um ano comum (não bissexto)?", ["365 dias", "360 dias", "366 dias", "356 dias"]],
        ["Um filme tem 120 minutos. Isso corresponde a:", ["2 horas", "1 hora e meia", "3 horas", "1 hora"]]
      ],
      reserve: [["Quantas moedas de 25 centavos formam 1 real?", ["4 moedas", "2 moedas", "5 moedas", "10 moedas"]]]
    },
    {
      subject: "Geografia", icon: "🐆", title: "Biomas Brasileiros", desc: "Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal e Pampa",
      questions: [
        ["Qual é o maior bioma do Brasil, famoso pela floresta equatorial e grandes rios?", ["Amazônia", "Pampa", "Caatinga", "Pantanal"]],
        ["Qual bioma é exclusivo do Brasil e possui clima semiárido com cactos como o mandacaru?", ["Caatinga", "Mata Atlântica", "Pampa", "Amazônia"]],
        ["Qual bioma ocupa a região central do Brasil e tem árvores de troncos retorcidos?", ["Cerrado", "Pampa", "Pantanal", "Mata Atlântica"]],
        ["Qual bioma é conhecido por ser a maior planície alagável do planeta?", ["Pantanal", "Caatinga", "Pampa", "Cerrado"]],
        ["Qual bioma fica no extremo sul do Brasil (Rio Grande do Sul) com campos limpos?", ["Pampa", "Amazônia", "Caatinga", "Pantanal"]],
        ["Qual floresta acompanha grande parte do litoral brasileiro e abriga o mico-leão-dourado?", ["Mata Atlântica", "Cerrado", "Pampa", "Caatinga"]],
        ["O tuiuiú é uma ave símbolo de qual bioma brasileiro?", ["Pantanal", "Pampa", "Caatinga", "Mata Atlântica"]],
        ["O lobo-guará e o pequi são muito característicos de qual bioma?", ["Cerrado", "Amazônia", "Pampa", "Mata Atlântica"]],
        ["O boto-cor-de-rosa e a vitória-régia vivem nos rios de qual bioma?", ["Amazônia", "Caatinga", "Pampa", "Cerrado"]],
        ["Por que preservar os biomas brasileiros é importante?", ["Para proteger os animais, as plantas, os rios e o clima", "Apenas para construir estradas", "Porque não existem animais neles", "Para acabar com as chuvas"]]
      ],
      reserve: [["Quantos biomas continentais principais existem no Brasil?", ["6 biomas", "3 biomas", "10 biomas", "2 biomas"]]]
    },
    {
      subject: "Geografia", icon: "🧭", title: "Brasil: Regiões, Estados e Orientação", desc: "Mapa do Brasil e pontos cardeais",
      questions: [
        ["Em quantas grandes regiões o Brasil é dividido pelo IBGE?", ["5 regiões", "4 regiões", "6 regiões", "7 regiões"]],
        ["Qual é a capital do Brasil?", ["Brasília", "São Paulo", "Rio de Janeiro", "Belo Horizonte"]],
        ["Em qual região do Brasil fica o estado de São Paulo?", ["Região Sudeste", "Região Sul", "Região Nordeste", "Região Norte"]],
        ["Qual ponto cardeal indica a direção onde o Sol nasce (nascente)?", ["Leste", "Oeste", "Norte", "Sul"]],
        ["Qual região brasileira possui o maior número de estados (9 estados)?", ["Região Nordeste", "Região Sul", "Região Centro-Oeste", "Região Sudeste"]],
        ["Qual é o menor estado brasileiro em extensão territorial?", ["Sergipe", "Amazonas", "Bahia", "Minas Gerais"]],
        ["Qual é o maior estado brasileiro em extensão territorial?", ["Amazonas", "São Paulo", "Rio de Janeiro", "Paraná"]],
        ["Paraná, Santa Catarina e Rio Grande do Sul formam qual região?", ["Região Sul", "Região Norte", "Região Sudeste", "Região Centro-Oeste"]],
        ["Se você abrir o braço direito para onde o Sol nasce (Leste), à sua frente estará o:", ["Norte", "Sul", "Oeste", "Sudeste"]],
        ["Qual oceano banha o litoral do Brasil?", ["Oceano Atlântico", "Oceano Pacífico", "Oceano Índico", "Oceano Ártico"]]
      ],
      reserve: [["Qual é o ponto cardeal oposto ao Norte?", ["Sul", "Leste", "Oeste", "Nordeste"]]]
    }
  ],
  mount(root, api) {
    const topic = api.topic || Portal.games.find(g => g.id === "escada-do-saber").topics[0];
    const D = topic.questions, RES = topic.reserve.slice();
    const PR = [100, 200, 300, 500, 1000, 2000, 3000, 5000, 7500, 10000];
    let i = 0, skip = 1, elim = 1, errs = 0, cur = D[0];
    const done = (prize, msg) => api.end({ hits: i, errors: errs, total: D.length, score: prize, msg });
    function show() {
      const opts = Portal.shuffle(cur[1].map((t, k) => ({ t, ok: k === 0 })));
      root.innerHTML = `<div class="mil"><div>
        <div class="hdr"><span>Pergunta ${i + 1} de 10</span><span>Vale ${PR[i]} moedas</span></div>
        <div class="board"><p class="big-q">${cur[0]}</p></div>
        <div id="o" class="opts"></div>
        <div class="row"><button class="btn ghost" id="sk" ${skip && RES.length ? "" : "disabled"}>⏭ Pular (${skip})</button>
        <button class="btn ghost" id="el" ${elim ? "" : "disabled"}>✂ Eliminar duas (${elim})</button>
        <button class="btn ghost" id="st">✋ Parar com ${i ? PR[i - 1] : 0}</button></div>
        <div id="fb" class="fb" aria-live="polite"></div></div>
        <ol class="ladder" aria-label="Escada de prêmios">${PR.map((p, k) => `<li class="${k === i ? "now" : k < i ? "done" : ""}">${p}${k === 4 ? " ⭐" : ""}</li>`).reverse().join("")}</ol></div>`;
      const o = root.querySelector("#o"), btns = opts.map((x, k) => {
        const b = document.createElement("button"); b.className = "opt"; b.textContent = "ABCD"[k] + ") " + x.t;
        b.onclick = () => pick(x, b); o.appendChild(b); return b;
      });
      root.querySelector("#sk").onclick = () => { skip--; cur = RES.shift(); show(); };
      root.querySelector("#el").onclick = () => {
        elim--; Portal.shuffle(btns.filter((b, k) => !opts[k].ok)).slice(0, 2).forEach(b => b.disabled = true);
        root.querySelector("#el").disabled = true; root.querySelector("#el").textContent = "✂ Eliminar duas (0)";
      };
      root.querySelector("#st").onclick = () => done(i ? PR[i - 1] : 0, `Você parou e levou ${i ? PR[i - 1] : 0} moedas!`);
      function pick(x, b) {
        btns.forEach(z => z.disabled = true); root.querySelectorAll("#sk,#el,#st").forEach(z => z.disabled = true);
        btns.forEach((z, k) => { if (opts[k].ok) z.classList.add("ok"); });
        const fb = root.querySelector("#fb");
        if (x.ok) {
          fb.className = "fb good"; fb.innerHTML = `<b>🎉 Resposta certa! +${PR[i]} moedas</b><br><button class="btn" id="nx">${i === 9 ? "Ver resultado" : "Próxima →"}</button>`;
          fb.querySelector("#nx").onclick = () => { i++; if (i === 10) done(10000, "Você chegou ao topo da escada: 10000 moedas!"); else { cur = D[i]; show(); } };
        } else {
          errs = 1; b.classList.add("bad"); const prize = i >= 5 ? 1000 : 0;
          fb.className = "fb wrong"; fb.innerHTML = `<b>😅 Não foi dessa vez.</b><br>Você leva ${prize} moedas.<br><button class="btn" id="nx">Ver resultado</button>`;
          fb.querySelector("#nx").onclick = () => done(prize, `Você levou ${prize} moedas.`);
        }
      }
    }
    show();
  }
});
