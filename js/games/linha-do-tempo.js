Portal.register({
  id: "linha-do-tempo", name: "Linha do Tempo", category: "História", grade: "2º ao 4º ano",
  icon: "⏳", color: "linear-gradient(135deg,#ff7a3d,#ffd23f)",
  description: "Organize acontecimentos históricos, escalas geográficas ou ciclos naturais na sequência certa.",
  instructions: ["Escolha a matéria e o tema da sequência.", "Toque em um cartão para selecioná-lo e depois toque na posição desejada.", "Quando preencher todas as posições, toque em Verificar."],
  topics: [
    {
      subject: "História", icon: "🇧🇷", title: "Marcos da História do Brasil", desc: "De 1500 até a construção de Brasília",
      rounds: [{ t: "Do mais antigo ao mais recente", e: [[1500, "Chegada dos portugueses ao Brasil"], [1822, "Independência do Brasil"], [1888, "Lei Áurea acaba com a escravidão"], [1889, "Proclamação da República"], [1960, "Inauguração de Brasília"]] }]
    },
    {
      subject: "História", icon: "📞", title: "Evolução dos Meios de Comunicação", desc: "Como as mensagens viajaram no tempo",
      rounds: [{ t: "Da escrita antiga até a internet", e: [["1º", "Pinturas nas paredes das cavernas"], ["2º", "Cartas escritas enviadas por mensageiros"], ["3º", "Invenção do telégrafo e do telefone"], ["4º", "Transmissões de rádio e televisão"], ["5º", "Mensagens instantâneas pela internet"]] }]
    },
    {
      subject: "Geografia", icon: "🗺️", title: "Escalas Geográficas (Do Local ao Global)", desc: "Da nossa casa até o planeta Terra",
      rounds: [{ t: "Organize do menor espaço para o maior", e: [["1º", "Nossa casa e nossa rua"], ["2º", "O bairro onde moramos"], ["3º", "O município (cidade e campo)"], ["4º", "O estado e o país (Brasil)"], ["5º", "O continente americano e o planeta Terra"]] }]
    },
    {
      subject: "Ciências", icon: "🦋", title: "Metamorfose da Borboleta", desc: "Fases do ciclo de vida dos insetos",
      rounds: [{ t: "Etapas do desenvolvimento", e: [["1ª fase", "A borboleta coloca pequenos ovos na folha"], ["2ª fase", "Nasce a lagarta (larva) que se alimenta de folhas"], ["3ª fase", "A lagarta forma o casulo (pupa ou crisálida)"], ["4ª fase", "O casulo se abre e sai a borboleta adulta"], ["5ª fase", "A borboleta poliniza flores e reinicia o ciclo"]] }]
    },
    {
      subject: "Matemática", icon: "⏱️", title: "Unidades de Medida de Tempo", desc: "Organize do período mais curto ao mais longo",
      rounds: [{ t: "Da menor para a maior duração", e: [["1º", "1 minuto (60 segundos)"], ["2º", "1 hora (60 minutos)"], ["3º", "1 dia (24 horas)"], ["4º", "1 semana (7 dias)"], ["5º", "1 ano (12 meses ou 365 dias)"]] }]
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
          <p class="sub">Toque no cartão e depois na posição correta</p>
          <div class="slots">${slots.map((k, s) => `<button class="slot ${k != null ? "full" : ""} ${checked && k != null ? (ev[k].order === s ? "ok" : "bad") : ""}" data-s="${s}"><i>${s + 1}º</i>${k != null ? `<span>${checked ? `<b>(${ev[k].y})</b> ` : ""}${ev[k].t}</span>` : "<em>vazio</em>"}</button>`).join("")}</div>
          <div class="pool">${pool.map(k => `<button class="tcard ${sel === k ? "sel" : ""}" data-k="${k}">${ev[k].t}</button>`).join("") || "<em>Todos os cartões foram colocados.</em>"}</div>
          <div id="fb" class="fb"></div>
          <div class="row">${checked ? `<button class="btn" id="nx">${r + 1 < R.length ? "Próxima fase →" : "Ver resultado"}</button>` : `<button class="btn" id="ck" ${slots.includes(null) ? "disabled" : ""}>Verificar</button>`}</div>`;
        if (checked) {
          const fb = root.querySelector("#fb"); fb.className = "fb good"; fb.textContent = "Ordem correta: " + items.map(x => x.y).join(" → ");
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
