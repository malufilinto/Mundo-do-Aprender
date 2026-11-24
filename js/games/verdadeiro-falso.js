Portal.register({
  id: "verdadeiro-ou-falso", name: "Verdadeiro ou Falso", category: "Ciências", grade: "2º ao 4º ano",
  icon: "✅", color: "linear-gradient(135deg,#22b573,#ef476f)",
  description: "Escolha um tema de Ciências e descubra se as afirmações são verdadeiras ou falsas com explicações educativas.",
  instructions: ["Escolha o assunto de Ciências.", "Leia a afirmação na tela e toque em Verdadeiro ou Falso.", "Leia a explicação e avance. Cada acerto vale 10 pontos."],
  topics: [
    {
      icon: "🦋", title: "Seres Vivos e Plantas", desc: "Animais vertebrados, invertebrados e botânica",
      questions: [
        ["Os peixes respiram debaixo d'água usando brânquias.", 1, "As brânquias retiram o oxigênio dissolvido na água."],
        ["Os morcegos são aves porque sabem voar.", 0, "Morcegos são mamíferos: têm pelos e mamam quando filhotes."],
        ["As plantas produzem seu próprio alimento por meio da fotossíntese.", 1, "Elas usam luz do Sol, água e gás carbônico."],
        ["As aranhas e as formigas são animais vertebrados.", 0, "Elas são invertebradas, pois não possuem coluna vertebral."],
        ["As raízes ajudam a fixar a planta no solo e absorver água.", 1, "Além de prender a planta, absorvem água e sais minerais."],
        ["Sapos e rãs são anfíbios que vivem na água e na terra.", 1, "Quando filhotes (girinos), vivem na água; adultos, também na terra."]
      ]
    },
    {
      icon: "🌍", title: "Terra, Universo e Água", desc: "Movimentos da Terra, Sol, Lua e estados da água",
      questions: [
        ["A Terra gira em torno do Sol, movimento chamado de translação.", 1, "Esse movimento dura cerca de 365 dias e origina o ano."],
        ["A Lua tem luz própria igual ao Sol.", 0, "A Lua não tem luz própria; ela reflete a luz do Sol."],
        ["O Sol é uma estrela.", 1, "O Sol é a estrela central do nosso Sistema Solar."],
        ["A água ferve e vira vapor a 100 °C ao nível do mar.", 1, "Essa mudança do estado líquido para o gasoso chama-se vaporização."],
        ["O movimento de rotação da Terra causa os dias e as noites.", 1, "A Terra gira em torno de si mesma em aproximadamente 24 horas."],
        ["Toda a água dos oceanos é doce e própria para beber.", 0, "A água dos oceanos é salgada; a maior parte da água doce está nas geleiras e rios."]
      ]
    },
    {
      icon: "🫀", title: "Corpo Humano e Saúde", desc: "Órgãos, sentidos e alimentação saudável",
      questions: [
        ["O coração bombeia o sangue para todo o corpo.", 1, "O sangue leva oxigênio e nutrientes por meio das artérias e veias."],
        ["As costelas ajudam a proteger o coração e os pulmões.", 1, "Os ossos da caixa torácica protegem esses órgãos vitais."],
        ["Temos 5 sentidos principais: visão, audição, olfato, paladar e tato.", 1, "Eles nos ajudam a perceber o ambiente ao nosso redor."],
        ["Comer apenas doces e frituras todos os dias faz bem para o crescimento.", 0, "Precisamos de frutas, legumes, grãos e proteínas para crescer com saúde."],
        ["Os dentes de leite são substituídos pelos dentes permanentes.", 1, "Isso acontece geralmente entre os 6 e 12 anos de idade."],
        ["Beber água todos os dias ajuda o corpo a funcionar bem.", 1, "A água hidrata o corpo e regula nossa temperatura."]
      ]
    }
  ],
  mount(root, api) {
    const topic = api.topic || Portal.games.find(g => g.id === "verdadeiro-ou-falso").topics[0];
    const Q = Portal.shuffle(topic.questions);
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
      fb.querySelector("#nx").onclick = () => { if (++i < Q.length) show(); else api.end({ hits, errors: errs, total: Q.length, score: hits * 10 }); };
    }
    show();
  }
});
