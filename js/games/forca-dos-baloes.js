Portal.register({
  id: "forca-dos-baloes", name: "Forca dos Balões", category: "Língua Portuguesa", grade: "1º ao 4º ano",
  icon: "🎈", color: "linear-gradient(135deg,#2ab7ca,#ef476f)",
  description: "Descubra a palavra secreta com a ajuda de uma dica. Cada letra errada estoura um balão!",
  instructions: ["Leia a dica e toque nas letras para descobrir a palavra.", "Cada letra errada estoura um balão. São 5 balões por palavra.", "Descubra as 5 palavras para ganhar!"],
  mount(root, api) {
    const W = [["ELEFANTE", "Animal enorme, com tromba e orelhas grandes", "🐘"], ["BORBOLETA", "Inseto colorido que antes foi lagarta", "🦋"], ["ESCOLA", "Lugar onde aprendemos com os professores", "🏫"], ["BICICLETA", "Tem duas rodas e pedais", "🚲"], ["ABACAXI", "Fruta com coroa de folhas pontudas", "🍍"]];
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
