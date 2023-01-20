let imagemFundo;
let spritePassaro;
let canoBaixoSprite;
let canoAltoSprite;

// quantidade de passaros
let quantidadePassaros = 500;

// Array de passaros vivos
let passarosVivos = [];

// Array de todos os passaros
let passarosTodos = [];

// Array de canos
let canos = [];

// contador de frames
let counter = 0;

// Elementos da interface
let sliderVelocidade;
let velocidadeSpan;
let recordSpan;
let tempoSpan;

// Record do jogo
let recorde = 0;

// treinar ou rodar melhor
let RodarMelhor = false;
let RodarMelhorBotao;

function preload() {
    imagemFundo = loadImage('assets/fundo.png');
    spritePassaro = loadImage('assets/passaro1.png');
    canoBaixoSprite = loadImage('assets/cano_mario.png');
    canoAltoSprite = loadImage('assets/cano_mario.png');
}

function setup() {
    let canvas = createCanvas(700, 400);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canvas.position(x, y);
    canvas.parent('canvascontainer');

    // configurar interface
    sliderVelocidade = select('#sliderVelocidade');
    velocidadeSpan = select('#speed');
    recordSpan = select('#hs');
    tempoSpan = select('#ahs');
    RodarMelhorBotao = select('#best');
    RodarMelhorBotao.mousePressed(toggleState);

    // cria os passaros
    for (let i = 0; i < quantidadePassaros; i++) {
        let bird = new Bird();
        passarosVivos[i] = bird;
        passarosTodos[i] = bird;
    }
}

// muda o estado da simulação
function toggleState() {
    RodarMelhor = ! RodarMelhor;
    // mostra o melhor passaro
    if (RodarMelhor) {
        resetGame();
        RodarMelhorBotao.html('continue training');
        // vai treinar mais
    } else {
        nextGeneration();
        RodarMelhorBotao.html('Run Best');
    }
}


function draw() {
    background(imagemFundo);

    // aumentar a velocidade da simulação
    let cycles = sliderVelocidade.value();
    velocidadeSpan.html(cycles);


    // quanto mais rápido, mais vezes o jogo é atualizado
    for (let n = 0; n < cycles; n++) {
        for (let i = canos.length - 1; i >= 0; i--) {
            canos[i].update();
            if (canos[i].offscreen()) {
                canos.splice(i, 1);
            }
        }
        // estamos rodando com o melhor passaro
        if (RodarMelhor) {
            bestBird.think(canos);
            bestBird.update();
            for (let j = 0; j < canos.length; j++) { // começa denovo se bater
                if (canos[j].hits(bestBird)) {
                    resetGame();
                    break;
                }
            }

            if (bestBird.bottomTop()) {
                resetGame();
            }

        } else {
            for (let i = passarosVivos.length - 1; i >= 0; i--) {
                let bird = passarosVivos[i];

                bird.think(canos);
                bird.update();

                for (let j = 0; j < canos.length; j++) {
                    if (canos[j].hits(passarosVivos[i])) {
                        passarosVivos.splice(i, 1);
                        break;
                    }
                }

                if (bird.bottomTop()) {
                    passarosVivos.splice(i, 1);
                }

            }
        }

        if (counter % 75 == 0) {
            canos.push(new Pipe());
        }
        counter++;
    }

    let temprecorde = 0;
    if (! RodarMelhor) {
        let tempBestBird = null;
        for (let i = 0; i < passarosVivos.length; i++) {
            let s = passarosVivos[i].score;
            if (s > temprecorde) {
                temprecorde = s;
                tempBestBird = passarosVivos[i];
            }
        }

        if (temprecorde > recorde) {
            recorde = temprecorde;
            bestBird = tempBestBird;
        }
    } else {
        temprecorde = bestBird.score;
        if (temprecorde > recorde) {
            recorde = temprecorde;
        }
    } recordSpan.html(temprecorde);
    tempoSpan.html(recorde);

    for (let i = 0; i < canos.length; i++) {
        canos[i].show();
    }

    if (RodarMelhor) {
        bestBird.show();
    } else {
        for (let i = 0; i < passarosVivos.length; i++) {
            passarosVivos[i].show();
        }
        if (passarosVivos.length == 0) {
            nextGeneration();
        }
    }
}