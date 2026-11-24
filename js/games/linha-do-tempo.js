Portal.register({
  id: "linha-do-tempo", name: "Linha do Tempo", category: "História", grade: "4º ao 7º ano",
  icon: "⏳", color: "linear-gradient(135deg,#ff7a3d,#ffd23f)",
  description: "Coloque fatos históricos e invenções na ordem certa, do mais antigo para o mais recente.",
  instructions: ["Toque em um cartão para selecioná-lo.", "Toque em uma posição da linha do tempo para colocá-lo ali. Toque numa posição já preenchida (sem cartão selecionado) para devolver o cartão.", "Quando todas as posições estiverem preenchidas, toque em Verificar.", "São 2 fases, com 5 fatos cada."],
  mount(root, api) {
    const R = [
      { t: "Fatos do Brasil", e: [[1500, "Chegada dos portugueses ao Brasil"], [1822, "Independência do Brasil"], [1888, "Lei Áurea acaba com a escravidão"], [1889, "Proclamação da República"], [1960, "Inauguração de Brasília"]] },
      { t: "Invenções e descobertas", e: [[1450, "Prensa de tipos móveis de Gutenberg"], [1876, "Invenção do telefone"], [1903, "Primeiro voo dos irmãos Wright"], [1969, "Ser humano chega à Lua"], [1991, "Nasce a World Wide Web"]] }
    ];
    let r = 0, hits = 0, errs = 0;
    function round() {
      const ev = Portal.shuffle(R[r].e.map(([y, t]) => ({ y, t }))), sorted = R[r].e.map(x => x[0]).sort((a, b) => a - b);
      let slots = Array(ev.length).fill(null), sel = null, checked = false;
      const draw = () => {
        const pool = ev.map((_, k) => k).filter(k => !slots.includes(k));
        root.innerHTML = `<div class="hdr"><span>Fase ${r + 1} de ${R.length}: ${R[r].t}</span><span>Acertos: ${hits}</span></div>
          <p class="sub">Do mais antigo ao mais recente</p>
          <div class="slots">${slots.map((k, s) => `<button class="slot ${k != null ? "full" : ""} ${checked && k != null ? (ev[k].y === sorted[s] ? "ok" : "bad") : ""}" data-s="${s}"><i>${s + 1}º</i>${k != null ? `<span>${checked ? `<b>${ev[k].y}</b> ` : ""}${ev[k].t}</span>` : "<em>vazio</em>"}</button>`).join("")}</div>
          <div class="pool">${pool.map(k => `<button class="tcard ${sel === k ? "sel" : ""}" data-k="${k}">${ev[k].t}</button>`).join("") || "<em>Todos os cartões foram colocados.</em>"}</div>
          <div id="fb" class="fb"></div>
          <div class="row">${checked ? `<button class="btn" id="nx">${r + 1 < R.length ? "Próxima fase →" : "Ver resultado"}</button>` : `<button class="btn" id="ck" ${slots.includes(null) ? "disabled" : ""}>Verificar</button>`}</div>`;
        if (checked) {
          const fb = root.querySelector("#fb"); fb.className = "fb good"; fb.textContent = "A ordem correta é: " + sorted.join(" → ");
          root.querySelector("#nx").onclick = () => { if (++r < R.length) round(); else api.end({ hits, errors: errs, total: R.reduce((a, x) => a + x.e.length, 0) }); };
          return;
        }
        root.querySelectorAll(".tcard").forEach(b => b.onclick = () => { sel = +b.dataset.k === sel ? null : +b.dataset.k; draw(); });
        root.querySelectorAll(".slot").forEach(b => b.onclick = () => {
          const s = +b.dataset.s;
          if (sel != null) { slots[s] = sel; sel = null; } else slots[s] = null;
          draw();
        });
        root.querySelector("#ck").onclick = () => { slots.forEach((k, s) => ev[k].y === sorted[s] ? hits++ : errs++); checked = true; draw(); };
      };
      draw();
    }
    round();
  }
});
