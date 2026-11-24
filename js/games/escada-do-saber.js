Portal.register({
  id: "escada-do-saber", name: "Escada do Saber", category: "Matemática", grade: "2º ao 4º ano",
  icon: "🪜", color: "linear-gradient(135deg,#7c3aed,#ff7a3d)",
  description: "Suba a escada de moedas respondendo desafios de Matemática, Português ou Conhecimentos Gerais.",
  instructions: ["Escolha a matéria que deseja praticar.", "Responda cada pergunta escolhendo uma das 4 alternativas.", "Você tem 1 ajuda para pular e 1 para eliminar duas erradas.", "A estrela marca um ponto seguro de 1000 moedas."],
  topics: [
    {
      icon: "🔢", title: "Matemática (2º ao 4º ano)", desc: "Operações, medidas, horas e geometria",
      questions: [
        ["Quanto é 15 + 14?", ["29", "28", "30", "25"]],
        ["Quantos minutos tem 1 hora?", ["60 minutos", "30 minutos", "100 minutos", "45 minutos"]],
        ["Qual é o dobro de 12?", ["24", "14", "22", "36"]],
        ["Quantos lados tem um triângulo?", ["3 lados", "4 lados", "5 lados", "6 lados"]],
        ["Quanto é 6 × 4?", ["24", "20", "28", "18"]],
        ["Se uma pizza tem 8 fatias e comemos 3, quantas sobram?", ["5 fatias", "4 fatias", "6 fatias", "3 fatias"]],
        ["Quantos centímetros tem 1 metro?", ["100 cm", "10 cm", "50 cm", "1000 cm"]],
        ["Qual número representa uma centena e meia?", ["150", "105", "510", "1500"]],
        ["Quanto é 7 × 8?", ["56", "54", "49", "63"]],
        ["Dividindo 36 balas igualmente entre 4 crianças, cada uma ganha:", ["9 balas", "8 balas", "6 balas", "12 balas"]]
      ],
      reserve: [["Quanto é 100 - 35?", ["65", "75", "55", "60"]]]
    },
    {
      icon: "📖", title: "Língua Portuguesa", desc: "Sílabas, classes de palavras e ortografia",
      questions: [
        ["Qual palavra é um substantivo próprio?", ["Brasil", "cidade", "cachorro", "menina"]],
        ["Quantas sílabas tem a palavra BOR-BO-LE-TA?", ["4 sílabas", "3 sílabas", "5 sílabas", "2 sílabas"]],
        ["Qual é o antônimo (contrário) de ALEGRE?", ["Triste", "Feliz", "Contente", "Rápido"]],
        ["Qual palavra está escrita corretamente?", ["Passarinho", "Pasarinho", "Passarrinho", "Paçarinho"]],
        ["Na frase 'O gato dormiu no sofá', qual palavra indica uma ação (verbo)?", ["dormiu", "gato", "sofá", "no"]],
        ["Qual é o plural correto de PÃO?", ["Pães", "Pãos", "Pãoses", "Pãezinhos"]],
        ["Qual palavra é um adjetivo (qualidade)?", ["Carinhoso", "Caderno", "Correr", "Janela"]],
        ["Antes de P e B usamos sempre a letra:", ["M", "N", "R", "S"]],
        ["Qual palavra é proparoxítona (sílaba forte na antepenúltima)?", ["Médico", "Café", "Caderno", "Abacaxi"]],
        ["Qual sinal de pontuação usamos ao final de uma pergunta?", ["Ponto de interrogação (?)", "Ponto final (.)", "Vírgula (,)", "Dois-pontos (:)"]]
      ],
      reserve: [["Qual é o feminino de CAVALO?", ["Égua", "Cavala", "Vaca", "Ovelha"]]]
    },
    {
      icon: "🌎", title: "Conhecimentos Gerais", desc: "Brasil, cultura e curiosidades",
      questions: [
        ["Quantos dias tem uma semana?", ["7 dias", "5 dias", "6 dias", "8 dias"]],
        ["Qual é a capital do Brasil?", ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"]],
        ["Quem criou a Turma da Mônica?", ["Mauricio de Sousa", "Monteiro Lobato", "Ziraldo", "Ruth Rocha"]],
        ["Quantos meses tem um ano?", ["12 meses", "10 meses", "11 meses", "13 meses"]],
        ["Qual é o maior oceano da Terra?", ["Oceano Pacífico", "Oceano Atlântico", "Oceano Índico", "Oceano Ártico"]],
        ["Em qual continente fica o Brasil?", ["América do Sul", "Europa", "África", "Ásia"]],
        ["Qual instrumento usamos para verificar os pontos cardeais?", ["Bússola", "Termômetro", "Balança", "Régua"]],
        ["Quais são as cores da bandeira do Brasil?", ["Verde, amarelo, azul e branco", "Verde, vermelho e branco", "Azul, branco e vermelho", "Amarelo, preto e branco"]],
        ["Qual é o maior mamífero do mundo?", ["Baleia-azul", "Elefante", "Girafa", "Hipopótamo"]],
        ["Quem pintou o quadro famoso 'Mona Lisa'?", ["Leonardo da Vinci", "Tarsila do Amaral", "Pablo Picasso", "Vincent van Gogh"]]
      ],
      reserve: [["Qual cor obtemos misturando azul e amarelo?", ["Verde", "Roxo", "Laranja", "Rosa"]]]
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
