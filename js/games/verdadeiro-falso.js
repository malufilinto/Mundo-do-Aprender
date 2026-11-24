Portal.register({
  id: "verdadeiro-ou-falso", name: "Verdadeiro ou Falso", category: "Ciências", grade: "2º ao 4º ano",
  icon: "✅", color: "linear-gradient(135deg,#22b573,#ef476f)",
  description: "Analise afirmações específicas de Ciências, Geografia, Português ou Matemática com explicação imediata.",
  instructions: ["Escolha a matéria e o recorte do conteúdo.", "Leia a afirmação e decida se é Verdadeira ou Falsa.", "Leia a explicação e avance (10 pontos por acerto)."],
  topics: [
    {
      subject: "Ciências", icon: "🦋", title: "Animais Vertebrados e Invertebrados", desc: "16 afirmações sobre reino animal",
      questions: [
        ["Os peixes respiram debaixo d'água usando brânquias.", 1, "As brânquias retiram o oxigênio dissolvido na água."],
        ["Os morcegos são aves porque sabem voar.", 0, "Morcegos são mamíferos: têm pelos e mamam quando filhotes."],
        ["As aranhas e as formigas são animais invertebrados.", 1, "Elas não possuem crânio nem coluna vertebral."],
        ["Sapos e rãs são anfíbios que vivem na água quando filhotes.", 1, "Os girinos vivem na água e depois passam por metamorfose."],
        ["As cobras são animais invertebrados porque não têm patas.", 0, "As cobras são répteis vertebrados: possuem coluna vertebral."],
        ["As aves têm o corpo coberto de penas e nascem de ovos.", 1, "São animais vertebrados ovíparos."],
        ["A baleia-azul é um peixe gigante que vive nos oceanos.", 0, "A baleia é um mamífero aquático que respira por pulmões."],
        ["As minhocas ajudam a deixar a terra mais fofa e fértil para as plantas.", 1, "Elas cavam túneis no solo que facilitam a entrada de ar e água."],
        ["Todos os insetos possuem 6 patas.", 1, "Formigas, abelhas, besouros e borboletas têm 3 pares de patas (6 no total)."],
        ["As aranhas são insetos porque são pequenas.", 0, "Aranhas são aracnídeos e possuem 8 patas."],
        ["Os jacarés e tartarugas pertencem ao grupo dos répteis.", 1, "Eles têm o corpo coberto por placas duras ou carapaça."],
        ["Animais herbívoros se alimentam apenas de carne.", 0, "Herbívoros comem plantas; carnívoros comem carne."],
        ["A borboleta passa pela fase de lagarta e casulo antes de voar.", 1, "Esse processo de transformação chama-se metamorfose."],
        ["Os pinguins são aves que usam suas asas para nadar.", 1, "Mesmo sem voar no ar, são excelentes nadadores."],
        ["O esqueleto interno é uma característica dos animais vertebrados.", 1, "Peixes, anfíbios, répteis, aves e mamíferos têm coluna vertebral."],
        ["As estrelas-do-mar e águas-vivas possuem ossos.", 0, "São animais invertebrados marinhos."]
      ]
    },
    {
      subject: "Ciências", icon: "🌍", title: "Terra, Sol, Lua e Estados da Água", desc: "16 afirmações sobre astronomia e água",
      questions: [
        ["A Terra gira em torno do Sol, movimento chamado de translação.", 1, "Esse movimento dura cerca de 365 dias e origina o ano."],
        ["A Lua tem luz própria igual ao Sol.", 0, "A Lua apenas reflete a luz do Sol."],
        ["O Sol é uma estrela.", 1, "É a estrela central do nosso Sistema Solar."],
        ["O movimento de rotação da Terra causa os dias e as noites.", 1, "A Terra gira em torno de si mesma em 24 horas."],
        ["Quando o gelo derrete, a água passa do estado líquido para o sólido.", 0, "Ela passa do estado sólido (gelo) para o líquido (fusão)."],
        ["As plantas produzem seu alimento por meio da fotossíntese.", 1, "Elas usam luz solar, água e gás carbônico."],
        ["A água das nuvens volta para a Terra em forma de chuva, neve ou granizo.", 1, "Essa etapa do ciclo da água chama-se precipitação."],
        ["O planeta Terra tem formato perfeitamente quadrado.", 0, "A Terra tem formato arredondado (geoide), levemente achatado nos polos."],
        ["A água pura não tem cor, nem cheiro, nem sabor.", 1, "Dizemos que ela é incolor, inodora e insípida."],
        ["Júpiter é o maior planeta do Sistema Solar.", 1, "Ele é um gigante gasoso muito maior que a Terra."],
        ["A água ferve e vira vapor a 100 °C ao nível do mar.", 1, "Essa passagem do líquido para o gasoso é a ebulição."],
        ["As estações do ano existem por causa da inclinação da Terra ao girar em torno do Sol.", 1, "Primavera, verão, outono e inverno se alternam ao longo do ano."],
        ["Podemos beber água diretamente de qualquer rio poluído sem filtrar.", 0, "A água precisa ser tratada ou filtrada para evitar doenças."],
        ["O solo arenoso deixa a água passar com muita facilidade.", 1, "Por ter grãos maiores, a areia não retém muita água."],
        ["O arco-íris aparece quando a luz do Sol atravessa gotículas de água no ar.", 1, "A luz branca se divide nas 7 cores do arco-íris."],
        ["A Lua leva cerca de 28 dias para dar uma volta completa ao redor da Terra.", 1, "Por isso vemos as diferentes fases da Lua a cada semana."]
      ]
    },
    {
      subject: "Geografia", icon: "🗺️", title: "Paisagem Natural, Cultural e Biomas", desc: "16 afirmações sobre espaço geográfico",
      questions: [
        ["Uma floresta que nunca foi derrubada é exemplo de paisagem natural.", 1, "Paisagens naturais não sofreram modificações humanas."],
        ["Pontes, prédios e ruas asfaltadas fazem parte da paisagem cultural (modificada).", 1, "Foram construídos pelo trabalho humano."],
        ["A Caatinga é um bioma brasileiro com muita neve durante o inverno.", 0, "A Caatinga tem clima semiárido quente e seco, no Nordeste."],
        ["O Brasil está localizado no continente chamado América do Sul.", 1, "É o maior país da América do Sul."],
        ["O Sol nasce sempre no ponto cardeal Oeste.", 0, "O Sol nasce no Leste (nascente) e se põe no Oeste (poente)."],
        ["Os rios são importantes para o abastecimento de água, energia e transporte.", 1, "Por isso devemos preservar as matas ciliares nas margens."],
        ["A zona rural é formada principalmente por sítios, chácaras e fazendas.", 1, "É onde se desenvolvem a agricultura e a pecuária."],
        ["O Pantanal é a maior planície alagável do mundo.", 1, "Fica nos estados de Mato Grosso e Mato Grosso do Sul."],
        ["A bússola aponta sempre para a direção Norte.", 1, "Sua agulha imantada ajuda na orientação geográfica."],
        ["O extrativismo vegetal é a coleta de frutos, madeira ou látex diretamente da natureza.", 1, "A coleta da castanha-do-pará é um exemplo."],
        ["Em uma cidade, todos os bairros têm exatamente a mesma função.", 0, "Existem bairros residenciais, comerciais e industriais."],
        ["O mapa precisa de legenda para explicar o significado das cores e símbolos.", 1, "A legenda ajuda a ler corretamente as informações do mapa."],
        ["A Amazônia fica exclusivamente no sul do Brasil.", 0, "A Amazônia ocupa principalmente a Região Norte do Brasil."],
        ["Reciclar papel, plástico e vidro ajuda a diminuir a poluição das cidades.", 1, "A coleta seletiva reaproveita materiais e poupa recursos naturais."],
        ["O município é dividido entre área urbana (cidade) e área rural (campo).", 1, "Ambas fazem parte do mesmo município."],
        ["O Cerrado é conhecido como o 'berço das águas' por abrigar nascentes de grandes rios.", 1, "Muitos rios importantes nascem no Cerrado brasileiro."]
      ]
    },
    {
      subject: "Língua Portuguesa", icon: "📝", title: "Regras de Ortografia e Pontuação", desc: "16 afirmações sobre escrita e gramática",
      questions: [
        ["Antes das letras P e B devemos usar sempre a letra M.", 1, "Exemplos: campo, tambor, limpeza, bombeiro."],
        ["Podemos começar uma palavra usando RR, como em 'rrato'.", 0, "Nenhuma palavra em português começa com RR ou SS."],
        ["O ponto de interrogação (?) é usado no final de perguntas.", 1, "Exemplo: 'Qual é o seu nome?'."],
        ["A palavra 'passarinho' se escreve com apenas um S.", 0, "Entre vogais, para ter som forte, escrevemos 'passarinho' com SS."],
        ["Substantivos próprios, como nomes de pessoas e cidades, começam com letra maiúscula.", 1, "Exemplos: Maria, Dante, Brasil, São Paulo."],
        ["A palavra 'árvore' tem acento agudo na primeira sílaba.", 1, "É uma palavra proparoxítona (ár-vo-re)."],
        ["O ponto de exclamação (!) expressa surpresa, alegria ou susto.", 1, "Exemplo: 'Que dia lindo!'."],
        ["A palavra 'casa' tem som de Z, mas escreve-se com S.", 1, "Um S entre duas vogais tem som de Z."],
        ["Todas as palavras proparoxítonas são acentuadas.", 1, "Exemplos: médico, lâmpada, música, pássaro."],
        ["O travessão (—) é usado para indicar a fala de um personagem no texto.", 1, "Muito comum em contos e fábulas."],
        ["A palavra 'enchergar' está escrita corretamente com CH.", 0, "O correto é 'enxergar', com X."],
        ["Na separação silábica de 'carro', os dois R ficam na mesma sílaba (ca-rro).", 0, "Dígrafos RR e SS se separam: car-ro e pas-so."],
        ["Adjetivos são palavras que dão características ou qualidades aos substantivos.", 1, "Exemplo: 'bolo gostoso' (gostoso é adjetivo)."],
        ["A palavra 'pão' no plural fica 'pãos'.", 0, "O plural correto de pão é 'pães'."],
        ["A vírgula (,) serve para fazer pequenas pausas e separar itens em uma lista.", 1, "Exemplo: 'Comprei maçã, banana, uva e pera.'."],
        ["Palavras oxítonas têm a última sílaba mais forte, como 'café' e 'sofá'.", 1, "A sílaba tônica é a última."]
      ]
    },
    {
      subject: "Matemática", icon: "🔢", title: "Números, Dobro, Metade e Geometria", desc: "16 afirmações matemáticas",
      questions: [
        ["O dobro de 15 é 30.", 1, "Dobro significa multiplicar por 2 (15 + 15 = 30)."],
        ["Um quadrado tem 4 lados iguais.", 1, "O quadrado possui 4 lados de mesma medida e 4 cantos retos."],
        ["O número 245 é formado por 2 centenas, 4 dezenas e 5 unidades.", 1, "200 + 40 + 5 = 245."],
        ["A metade de 50 é 30.", 0, "A metade de 50 é 25 (25 + 25 = 50)."],
        ["Todo número terminado em 0, 2, 4, 6 ou 8 é um número par.", 1, "Os números terminados em 1, 3, 5, 7 ou 9 são ímpares."],
        ["Um triângulo possui 5 lados.", 0, "O triângulo possui 3 lados e 3 vértices."],
        ["O cubo é um sólido geométrico que tem 6 faces quadradas.", 1, "Um dado comum tem o formato de um cubo."],
        ["O resultado de 100 - 45 é 65.", 0, "100 - 45 é igual a 55."],
        ["Uma dúzia corresponde a 12 unidades.", 1, "Meia dúzia corresponde a 6 unidades."],
        ["O número 1.000 representa uma unidade de milhar.", 1, "1.000 unidades equivalem a 10 centenas."],
        ["A esfera tem formato arredondado, parecido com uma bola de futebol.", 1, "Ela não possui faces planas nem pontas."],
        ["O triplo de 10 é 30.", 1, "Triplo significa multiplicar por 3 (3 × 10 = 30)."],
        ["Um retângulo tem todos os 4 lados sempre do mesmo tamanho.", 0, "O retângulo tem lados opostos iguais (dois maiores e dois menores)."],
        ["O número 399 vem imediatamente antes do 400.", 1, "399 é o antecessor de 400."],
        ["Dividir 20 balas igualmente entre 5 crianças dá 4 balas para cada uma.", 1, "20 ÷ 5 = 4."],
        ["O cilindro tem duas bases circulares e corpo arredondado, como uma lata.", 1, "Latas de tinta e rolos de papel têm formato cilíndrico."]
      ]
    }
  ],
  mount(root, api) {
    const topic = api.topic || Portal.games.find(g => g.id === "verdadeiro-ou-falso").topics[0];
    const Q = Portal.shuffle(topic.questions).slice(0, 10);
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
