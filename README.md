# Mundo do Aprender

Portal de jogos pedagógicos em HTML, CSS e JavaScript puros. Sem backend, sem cadastro, sem anúncios.

## Publicar no GitHub Pages
1. Crie um repositório público e envie todos os arquivos (o `index.html` fica na raiz).
2. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
3. Acesse o endereço que o GitHub mostrar.

## Estrutura
- `index.html`: página única (as telas trocam por `#/` e `#/jogo/id`)
- `css/style.css`: estilos
- `js/app.js`: página inicial, busca, categorias e moldura dos jogos (instruções, resultado, reiniciar)
- `js/games/*.js`: um arquivo por jogo
- `img/`: imagens futuras (use caminhos relativos)

## Adicionar um jogo novo
1. Copie um arquivo de `js/games/` e renomeie.
2. Preencha `id`, `name`, `category`, `grade`, `icon`, `color`, `description`, `instructions`.
3. Programe a mecânica em `mount(root, api)` e, ao terminar, chame
   `api.end({ hits, errors, total, score, msg })` (`score` e `msg` são opcionais).
4. Inclua `<script src="js/games/seu-jogo.js"></script>` no `index.html`, antes de `Portal.start()`.
