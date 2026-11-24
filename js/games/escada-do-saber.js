Portal.register({
  id: "escada-do-saber", name: "Escada do Saber", category: "Conhecimentos Gerais", grade: "3º ao 6º ano",
  icon: "🪜", color: "linear-gradient(135deg,#7c3aed,#ff7a3d)",
  description: "Suba a escada de moedas respondendo perguntas de dificuldade crescente. Use as ajudas na hora do aperto!",
  instructions: ["Responda cada pergunta escolhendo uma das 4 alternativas.", "Você tem 1 ajuda para pular e 1 para eliminar duas alternativas erradas.", "A estrela marca um ponto seguro: se errar depois dela, você leva 1000 moedas.", "Você pode parar a qualquer momento e guardar o que ganhou."],
  mount(root, api) {
    const D = [
      ["Qual animal é conhecido como o rei da selva?", ["Leão", "Tigre", "Elefante", "Urso"]],
      ["Quantos dias tem uma semana?", ["7", "5", "6", "8"]],
      ["Qual é a capital do Brasil?", ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"]],
      ["Quanto é 7 × 8?", ["56", "54", "49", "63"]],
      ["Qual planeta é chamado de Planeta Vermelho?", ["Marte", "Vênus", "Júpiter", "Saturno"]],
      ["Qual é o maior oceano da Terra?", ["Pacífico", "Atlântico", "Índico", "Ártico"]],
      ["Quem criou o Sítio do Picapau Amarelo?", ["Monteiro Lobato", "Machado de Assis", "Ziraldo", "Cecília Meireles"]],
      ["Qual é o maior mamífero do mundo?", ["Baleia-azul", "Elefante", "Girafa", "Tubarão-branco"]],
      ["Quantos lados tem um hexágono?", ["6", "5", "7", "8"]],
      ["Em qual continente fica o Egito?", ["África", "Ásia", "Europa", "Oceania"]]
    ];
    const RES = [["Qual cor se obtém misturando azul e amarelo?", ["Verde", "Roxo", "Laranja", "Rosa"]], ["Quantos meses tem um ano?", ["12", "10", "11", "13"]]];
    const PR = [100, 200, 300, 500, 1000, 2000, 3000, 5000, 7500, 10000];
    let i = 0, skip = 1, elim = 1, errs = 0, cur = D[0];
    const done = (prize, msg) => api.end({ hits: i, errors: errs, total: D.length, score: prize, msg });
    function show() {
      const opts = Portal.shuffle(cur[1].map((t, k) => ({ t, ok: k === 0 })));
      root.innerHTML = `<div class="mil"><div>
        <div class="hdr"><span>Pergunta ${i + 1} de 10</span><span>Vale ${PR[i]} moedas</span></div>
        <div class="board"><p class="big-q">${cur[0]}</p></div>
        <div id="o" class="opts"></div>
        <div class="row"><button class="btn ghost" id="sk" ${skip ? "" : "disabled"}>⏭ Pular (${skip})</button>
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
