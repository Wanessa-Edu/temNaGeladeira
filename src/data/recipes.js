// data/recipes.js
// Decisão de produto: receitas hardcoded no MVP para validar o fluxo
// sem depender de API externa. Quando validarmos que usuários completam
// o fluxo, integramos IA real (fase 2).
//
// Critério de seleção: < 30 min, ≤ 6 ingredientes, ingredientes comuns.
// Isso reduz o "custo cognitivo" de decidir — o usuário vê opções reais,
// não receitas mirabolantes.

export const RECIPE_BANK = [
  {
    id: 'ovo-mexido',
    nome: 'Ovo mexido cremoso',
    tempo: '8 min',
    nivel: 'Fácil',
    emoji: '🍳',
    ingredientes: ['ovo', 'manteiga', 'sal', 'pimenta'],
    opcionais: ['queijo', 'cebolinha', 'tomate'],
    passos: [
      'Quebre 2 ovos numa tigela e misture com um garfo.',
      'Leve uma frigideira em fogo baixo e adicione manteiga.',
      'Despeje os ovos. Mexa devagar com espátula sem pressa.',
      'Tire do fogo enquanto ainda parecer levemente cru — o calor da frigideira termina o cozimento.',
      'Tempere com sal, pimenta e sirva imediatamente.',
    ],
  },
  {
    id: 'arroz-ovo',
    nome: 'Arroz com ovo frito',
    tempo: '15 min',
    nivel: 'Fácil',
    emoji: '🍚',
    ingredientes: ['arroz', 'ovo', 'alho', 'óleo', 'sal'],
    opcionais: ['cebola', 'pimenta', 'molho de soja'],
    passos: [
      'Cozinhe o arroz normalmente (ou use sobra de arroz — ainda melhor).',
      'Frite alho picado no óleo até dourar.',
      'Se for arroz cozido na hora, espere esfriar 5 minutos.',
      'Em outra frigideira, frite o ovo no ponto que preferir.',
      'Sirva o arroz com o ovo por cima. Simples e perfeito.',
    ],
  },
  {
    id: 'macarrao-alho',
    nome: 'Macarrão alho e óleo',
    tempo: '20 min',
    nivel: 'Fácil',
    emoji: '🍝',
    ingredientes: ['macarrão', 'alho', 'azeite', 'sal'],
    opcionais: ['parmesão', 'pimenta vermelha', 'salsinha'],
    passos: [
      'Cozinhe o macarrão em água com sal até ficar al dente. Reserve 1 xícara da água do cozimento.',
      'Enquanto isso, fatie fino 4-5 dentes de alho.',
      'No azeite em fogo médio-baixo, doure o alho devagar. Não queime.',
      'Escorra a massa e junte direto na frigideira com o alho.',
      'Adicione um pouco da água do macarrão e misture bem. Pronto.',
    ],
  },
  {
    id: 'tomate-ovo',
    nome: 'Ovo com tomate refogado',
    tempo: '12 min',
    nivel: 'Fácil',
    emoji: '🍅',
    ingredientes: ['ovo', 'tomate', 'alho', 'azeite', 'sal'],
    opcionais: ['cebola', 'pão para acompanhar'],
    passos: [
      'Corte o tomate em cubos. Pique o alho.',
      'Refogue o alho no azeite por 1 minuto.',
      'Adicione o tomate, sal, e cozinhe até amolecer (5 min).',
      'Quebre os ovos diretamente sobre o tomate.',
      'Tampa a frigideira e cozinhe até a clara firmar. Gema pode ficar mole.',
    ],
  },
  {
    id: 'frango-limao',
    nome: 'Frango grelhado com limão',
    tempo: '25 min',
    nivel: 'Fácil',
    emoji: '🍗',
    ingredientes: ['frango', 'limão', 'alho', 'sal', 'azeite'],
    opcionais: ['pimenta', 'alecrim', 'mel'],
    passos: [
      'Tempere o frango com sal, alho picado e suco de limão. Deixe 5 min.',
      'Aqueça uma frigideira com azeite em fogo médio-alto.',
      'Grelhe o frango por 6-7 min de cada lado sem mexer.',
      'Quando dourar e não soltar líquido rosado, está pronto.',
      'Deixe descansar 2 minutos antes de cortar.',
    ],
  },
  {
    id: 'batata-forno',
    nome: 'Batata assada simples',
    tempo: '30 min',
    nivel: 'Fácil',
    emoji: '🥔',
    ingredientes: ['batata', 'azeite', 'sal', 'pimenta'],
    opcionais: ['alecrim', 'alho', 'páprica'],
    passos: [
      'Pré-aqueça o forno a 220°C.',
      'Corte as batatas em gomos ou cubos médios.',
      'Misture com azeite, sal e pimenta numa tigela.',
      'Espalhe numa assadeira sem sobrepor as batatas.',
      'Asse por 25-30 min, virando na metade do tempo.',
    ],
  },
  {
    id: 'feijao-tempero',
    nome: 'Feijão temperado rápido',
    tempo: '15 min',
    nivel: 'Fácil',
    emoji: '🫘',
    ingredientes: ['feijão cozido', 'alho', 'cebola', 'azeite', 'sal'],
    opcionais: ['bacon', 'louro', 'coentro'],
    passos: [
      'Use feijão já cozido (lata ou sobra). Se for lata, escorra e lave.',
      'Refogue cebola e alho no azeite até dourar.',
      'Adicione o feijão e amasse levemente alguns grãos com o garfo.',
      'Coloque água suficiente para dar caldo. Tempere com sal.',
      'Cozinhe 8-10 min em fogo médio. Finalize com azeite.',
    ],
  },
  {
    id: 'vitamina-banana',
    nome: 'Vitamina de banana',
    tempo: '5 min',
    nivel: 'Fácil',
    emoji: '🍌',
    ingredientes: ['banana', 'leite', 'mel'],
    opcionais: ['aveia', 'canela', 'cacau em pó'],
    passos: [
      'Descasque 1-2 bananas (maduras ficam mais doces).',
      'Coloque no liquidificador com 1 copo de leite.',
      'Adicione mel a gosto.',
      'Bata por 30 segundos. Sirva imediatamente.',
      'Dica: use banana congelada para ficar mais cremoso.',
    ],
  },
  {
    id: 'queijo-derretido',
    nome: 'Pão com queijo derretido',
    tempo: '8 min',
    nivel: 'Fácil',
    emoji: '🧀',
    ingredientes: ['pão', 'queijo', 'manteiga'],
    opcionais: ['tomate', 'presunto', 'orégano'],
    passos: [
      'Passe manteiga em ambos os lados do pão.',
      'Coloque queijo fatiado ou ralado sobre o pão.',
      'Leve à frigideira em fogo médio com a tampa.',
      'Quando o queijo derreter (2-3 min), está pronto.',
      'Sirva imediatamente enquanto está crocante.',
    ],
  },
  {
    id: 'omelete',
    nome: 'Omelete rápida',
    tempo: '10 min',
    nivel: 'Fácil',
    emoji: '🥚',
    ingredientes: ['ovo', 'sal', 'manteiga'],
    opcionais: ['queijo', 'presunto', 'tomate', 'cebola'],
    passos: [
      'Bata 2-3 ovos com uma pitada de sal.',
      'Aqueça manteiga numa frigideira em fogo médio.',
      'Despeje os ovos e não mexa por 30 segundos.',
      'Quando as bordas firmarem, adicione recheio no centro.',
      'Dobre ao meio com uma espátula e sirva.',
    ],
  },
]

// Chips de sugestão rápida na tela principal
// Decisão de produto: chips pré-definidos com ingredientes mais comuns
// reduzem atrito — usuário pode montar o input sem digitar nada.
export const QUICK_CHIPS = [
  'ovo', 'arroz', 'macarrão', 'frango', 'batata',
  'tomate', 'alho', 'cebola', 'queijo', 'pão',
  'feijão', 'leite', 'banana', 'manteiga', 'azeite',
]
