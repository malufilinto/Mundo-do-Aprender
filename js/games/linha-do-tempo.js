Portal.register({
  id: "linha-do-tempo", name: "Linha do Tempo", category: "História", grade: "2º ao 4º ano",
  icon: "⏳", color: "linear-gradient(135deg,#ff7a3d,#ffd23f)",
  description: "Organize acontecimentos históricos, invenções ou etapas da natureza na ordem cronológica correta.",
  instructions: ["Escolha o assunto da atividade.", "Toque em um cartão para selecioná-lo e depois toque na posição desejada.", "Quando preencher todas as posições, toque em Verificar."],
  topics: [
    {
      icon: "🇧🇷", title: "História do Brasil", desc: "Da chegada dos portugueses até Brasília",
      rounds: [
        { t: "Acontecimentos do Brasil", e: [[1500, "Chegada dos portugueses ao Brasil"], [1822, "Independência do Brasil"], [1888, "Lei Áurea acaba com a escravidão"], [1889, "Proclamação da República"], [1960, "Inauguração de Brasília"]] }
      ]
    },
    {
      icon: "💡", title: "História das Invenções", desc: "Como a tecnologia evoluiu no tempo",
      rounds: [
        { t: "Grandes invenções", e: [[1450, "Invenção da imprensa de livros"], [1876, "Invenção do telefone"], [1903, "Primeiro voo de avião"], [1969, "Chegada do ser humano à Lua"], [1991, "Criação da internet (World Wide Web)"]] }
      ]
    },
    {
      icon: "🌱", title: "Ciclos da Natureza e Tempo", desc: "Crescimento das plantas e fases da vida",
      rounds: [
        { t: "Do plantio até a colheita", e: [["1ª etapa", "Plantar a semente na terra úmida"], ["2ª etapa", "A semente germina e cria raízes"], ["3ª etapa", "Cresce o caule e nascem as folhas"], ["4ª etapa", "A planta dá flores"], ["5ª etapa", "Nascem os frutos com novas sementes"]] }
      ]
    }
  ],
  mount(root, api) {
    const topic = api.topic || Portal.games.find(g => g.id === "linha-do-tempo").topics[0];
    const R = topic.rounds;
    let r = 0, hits = 0, errs = 0;
    function round() {
      const items = R[r].e.map(([y, t], idx) => ({ y, t, order: idx }));
      const ev = Portal.shuffle(items);
      let slots = Array(ev.length).fill(null), sel = null, checked = false;
      const draw = () => {
        const pool = ev.map((_, k) => k).filter(k => !slots.includes(k));
        root.innerHTML = `<div class="hdr"><span>${R[r].t}</span><span>Acertos: ${hits}</span></div>
          <p class="sub">Organize do primeiro ao último acontecimento</p>
          <div class="slots">${slots.map((k, s) => `<button class="slot ${k != null ? "full" : ""} ${checked && k != null ? (ev[k].order === s ? "ok" : "bad") : ""}" data-s="${s}"><i>${s + 1}º</i>${k != null ? `<span>${checked ? `<b>(${ev[k].y})</b> ` : ""}${ev[k].t}</span>` : "<em>vazio</em>"}</button>`).join("")}</div>
          <div class="pool">${pool.map(k => `<button class="tcard ${sel === k ? "sel" : ""}" data-k="${k}">${ev[k].t}</button>`).join("") || "<em>Todos os cartões foram colocados.</em>"}</div>
          <div id="fb" class="fb"></div>
          <div class="row">${checked ? `<button class="btn" id="nx">${r + 1 < R.length ? "Próxima fase →" : "Ver resultado"}</button>` : `<button class="btn" id="ck" ${slots.includes(null) ? "disabled" : ""}>Verificar</button>`}</div>`;
        if (checked) {
          const fb = root.querySelector("#fb"); fb.className = "fb good"; fb.textContent = "Sequência correta: " + items.map(x => x.y).join(" → ");
          root.querySelector("#nx").onclick = () => { if (++r < R.length) round(); else api.end({ hits, errors: errs, total: R.reduce((a, x) => a + x.e.length, 0) }); };
          return;
        }
        root.querySelectorAll(".tcard").forEach(b => b.onclick = () => { sel = +b.dataset.k === sel ? null : +b.dataset.k; draw(); });
        root.querySelectorAll(".slot").forEach(b => b.onclick = () => {
          const s = +b.dataset.s;
          if (sel != null) { slots[s] = sel; sel = null; } else slots[s] = null;
          draw();
        });
        root.querySelector("#ck").onclick = () => { slots.forEach((k, s) => ev[k].order === s ? hits++ : errs++); checked = true; draw(); };
      };
      draw();
    }
    round();
  }
});
