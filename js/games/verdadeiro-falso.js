Portal.register({
  id: "verdadeiro-ou-falso", name: "Verdadeiro ou Falso", category: "Ciências", grade: "2º ao 4º ano",
  icon: "✅", color: "linear-gradient(135deg,#22b573,#ef476f)",
  description: "Analise afirmações específicas de Ciências, Geografia, Português ou Matemática com explicação imediata.",
  instructions: ["Escolha a matéria e o recorte do conteúdo.", "Leia a afirmação e decida se é Verdadeira ou Falsa.", "Leia a explicação e avance (10 pontos por acerto)."],
  topics: [
    {
      subject: "Ciências", icon: "🦋", title: "Animais Vertebrados e Invertebrados", desc: "Classificação, habitat e respiração",
      questions: [
        ["Os peixes respiram debaixo d'água usando brânquias.", 1, "As brânquias retiram o oxigênio dissolvido na água."],
        ["Os morcegos são aves porque sabem voar.", 0, "Morcegos são mamíferos: têm pelos e mamam quando filhotes."],
        ["As aranhas e as formigas são animais invertebrados.", 1, "Elas não possuem crânio nem coluna vertebral."],
        ["Sapos e rãs são anfíbios que vivem na água quando filhotes.", 1, "Os girinos vivem na água e depois passam por metamorfose."],
        ["As cobras são animais invertebrados porque não têm patas.", 0, "As cobras são répteis vertebrados: possuem coluna vertebral."],
        ["As aves têm o corpo coberto de penas e nascem de ovos.", 1, "São animais vertebrados ovíparos."]
      ]
    },
    {
      subject: "Ciências", icon: "🌍", title: "Terra, Sol, Lua e Estados da Água", desc: "Astronomia básica e ciclo hidrológico",
      questions: [
        ["A Terra gira em torno do Sol, movimento chamado de translação.", 1, "Esse movimento dura cerca de 365 dias e origina o ano."],
        ["A Lua tem luz própria igual ao Sol.", 0, "A Lua apenas reflete a luz do Sol."],
        ["O Sol é uma estrela.", 1, "É a estrela central do nosso Sistema Solar."],
        ["O movimento de rotação da Terra causa os dias e as noites.", 1, "A Terra gira em torno de si mesma em 24 horas."],
        ["Quando o gelo derrete, a água passa do estado líquido para o sólido.", 0, "Ela passa do estado sólido (gelo) para o líquido (fusão)."],
        ["As plantas produzem seu alimento por meio da fotossíntese.", 1, "Elas usam luz solar, água e gás carbônico."]
      ]
    },
    {
      subject: "Geografia", icon: "🗺️", title: "Paisagem Natural, Cultural e Biomas", desc: "Transformação do espaço e natureza",
      questions: [
        ["Uma floresta que nunca foi derrubada é exemplo de paisagem natural.", 1, "Paisagens naturais não sofreram modificações humanas."],
        ["Pontes, prédios e ruas asfaltadas fazem parte da paisagem cultural (modificada).", 1, "Foram construídos pelo trabalho humano."],
        ["A Caatinga é um bioma brasileiro com muita neve durante o inverno.", 0, "A Caatinga tem clima semiárido quente e seco, no Nordeste."],
        ["O Brasil está localizado no continente chamado América do Sul.", 1, "É o maior país da América do Sul."],
        ["O Sol nasce sempre no ponto cardeal Oeste.", 0, "O Sol nasce no Leste (nascente) e se põe no Oeste (poente)."],
        ["Os rios são importantes para o abastecimento de água, energia e transporte.", 1, "Por isso devemos evitar jogar lixo e esgoto nos rios."]
      ]
    },
    {
      subject: "Língua Portuguesa", icon: "📝", title: "Regras de Ortografia e Pontuação", desc: "Uso de M/N, R/RR, S/SS e sinais",
      questions: [
        ["Antes das letras P e B devemos usar sempre a letra M.", 1, "Exemplos: campo, tambor, limpeza, bombeiro."],
        ["Podemos começar uma palavra usando RR, como em 'rrato'.", 0, "Nenhuma palavra em português começa com RR ou SS."],
        ["O ponto de interrogação (?) é usado no final de perguntas.", 1, "Exemplo: 'Qual é o seu nome?'."],
        ["A palavra 'passarinho' se escreve com apenas um S.", 0, "Entre vogais, para ter som forte, escrevemos 'passarinho' com SS."],
        ["Substantivos próprios, como nomes de pessoas e cidades, começam com letra maiúscula.", 1, "Exemplos: Maria, Dante, Brasil, São Paulo."],
        ["A palavra 'árvore' tem acento agudo na primeira sílaba.", 1, "É uma palavra proparoxítona (ár-vo-re)."]
      ]
    },
    {
      subject: "Matemática", icon: "🔢", title: "Números, Dobro, Metade e Geometria", desc: "Verdadeiro ou falso matemático",
      questions: [
        ["O dobro de 15 é 30.", 1, "Dobro significa multiplicar por 2 (15 + 15 = 30)."],
        ["Um quadrado tem 4 lados iguais.", 1, "O quadrado possui 4 lados de mesma medida e 4 cantos retos."],
        ["O número 245 é formado por 2 centenas, 4 dezenas e 5 unidades.", 1, "200 + 40 + 5 = 245."],
        ["A metade de 50 é 30.", 0, "A metade de 50 é 25 (25 + 25 = 50)."],
        ["Todo número terminado em 0, 2, 4, 6 ou 8 é um número par.", 1, "Os números terminados em 1, 3, 5, 7 ou 9 são ímpares."],
        ["Um triângulo possui 5 lados.", 0, "O triângulo possui 3 lados e 3 vértices."]
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
