Portal.register({
  id: "verdadeiro-ou-falso", name: "Verdadeiro ou Falso", category: "Ciências", grade: "3º ao 5º ano",
  icon: "✅", color: "linear-gradient(135deg,#22b573,#ef476f)",
  description: "Leia a afirmação e decida: é verdadeira ou falsa? Cada resposta vem com uma explicação.",
  instructions: ["Leia a afirmação na tela.", "Toque em Verdadeiro ou Falso.", "Leia a explicação e avance. Cada acerto vale 10 pontos."],
  mount(root, api) {
    const D = [
      ["O sangue circula pelo corpo dentro de veias e artérias.", 1, "O coração bombeia o sangue por esses vasos."],
      ["A Terra gira em torno do Sol.", 1, "Esse movimento é chamado de translação e dura cerca de 365 dias."],
      ["Os peixes respiram com pulmões.", 0, "Os peixes respiram por brânquias, que retiram o oxigênio da água."],
      ["A água ferve a 100 °C ao nível do mar.", 1, "Essa é a temperatura de ebulição da água ao nível do mar."],
      ["O Sol é um planeta.", 0, "O Sol é uma estrela, e a Terra é um planeta que gira ao redor dele."],
      ["As plantas produzem seu alimento por meio da fotossíntese.", 1, "Elas usam luz, água e gás carbônico."],
      ["Os morcegos são aves.", 0, "Morcegos são mamíferos: amamentam os filhotes."],
      ["A Lua tem luz própria.", 0, "A Lua apenas reflete a luz do Sol."],
      ["As costelas ajudam a proteger o coração e os pulmões.", 1, "A caixa torácica funciona como uma proteção."],
      ["Todos os metais são atraídos por ímã.", 0, "Só alguns, como o ferro e o aço. Alumínio e cobre não são."]
    ];
    const Q = Portal.shuffle(D);
    let i = 0, hits = 0, errs = 0;
    function show() {
      const [t] = Q[i];
      root.innerHTML = `<div class="hdr"><span>Afirmação ${i + 1} de ${Q.length}</span><span>⭐ ${hits * 10} pontos</span></div>
        <div class="board"><p class="big-q">${t}</p></div>
        <div class="row"><button class="btn vf ok" data-v="1">✓ Verdadeiro</button><button class="btn vf bad" data-v="0">✗ Falso</button></div>
        <div id="fb" class="fb" aria-live="polite"></div>`;
      root.querySelectorAll(".vf").forEach(b => b.onclick = () => answer(+b.dataset.v));
    }
    function answer(v) {
      const [, c, why] = Q[i], right = v === c;
      right ? hits++ : errs++;
      root.querySelectorAll(".vf").forEach(b => b.disabled = true);
      const fb = root.querySelector("#fb");
      fb.className = "fb " + (right ? "good" : "wrong");
      fb.innerHTML = `<b>${right ? "🎉 Acertou!" : "😅 Quase! A resposta era " + (c ? "Verdadeiro" : "Falso") + "."}</b><br>${why}<br><button class="btn" id="nx">${i + 1 < Q.length ? "Próxima →" : "Ver resultado"}</button>`;
      root.querySelector("#nx").onclick = () => { if (++i < Q.length) show(); else api.end({ hits, errors: errs, total: Q.length, score: hits * 10 }); };
    }
    show();
  }
});
