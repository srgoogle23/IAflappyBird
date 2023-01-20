let imagemFundo;
let spritePassaro;
let canoBaixoSprite;
let canoAltoSprite;
let quantidadePassaros = 100;
let passarosVivos = [];
let passarosTodos = [];
let canos = [];
let counter = 0;
let sliderVelocidade;
let velocidadeSpan;
let recordSpan;
let tempoSpan;
let recorde = 0;
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

    sliderVelocidade = select('#sliderVelocidade');
    velocidadeSpan = select('#speed');
    recordSpan = select('#hs');
    tempoSpan = select('#ahs');
    RodarMelhorBotao = select('#best');
    RodarMelhorBotao.mousePressed(toggleState);

    for (let i = 0; i < quantidadePassaros; i++) {
        let passaro = new Passaro();
        passarosVivos[i] = passaro;
        passarosTodos[i] = passaro;
    }
}

function toggleState() {
    RodarMelhor = ! RodarMelhor;
    if (RodarMelhor) {
        reiniciar();
        RodarMelhorBotao.html('Continuar Treinando');
    } else {
        reGerarPassaros();
        RodarMelhorBotao.html('Parar Treinamento');
    }
}


function draw() {
    background(imagemFundo);

    let cycles = sliderVelocidade.value();
    velocidadeSpan.html(cycles);

    for (let n = 0; n < cycles; n++) {
        for (let i = canos.length - 1; i >= 0; i--) {
            canos[i].atualizar();
            if (canos[i].saiuDaTela()) {
                canos.splice(i, 1);
            }
        }

        if (RodarMelhor) {
            melhorPassaro.pensar(canos);
            melhorPassaro.atualizar();
            for (let j = 0; j < canos.length; j++) {
                if (canos[j].bateu(melhorPassaro)) {
                    reiniciar();
                    break;
                }
            }

            if (melhorPassaro.bottomTop()) {
                reiniciar();
            }

        } else {
            for (let i = passarosVivos.length - 1; i >= 0; i--) {
                let passaro = passarosVivos[i];

                passaro.pensar(canos);
                passaro.atualizar();

                for (let j = 0; j < canos.length; j++) {
                    if (canos[j].bateu(passarosVivos[i])) {
                        passarosVivos.splice(i, 1);
                        break;
                    }
                }

                if (passaro.bottomTop()) {
                    passarosVivos.splice(i, 1);
                }

            }
        }

        if (counter % 75 == 0) {
            canos.push(new Cano());
        }
        counter++;
    }

    let temprecorde = 0;
    if (! RodarMelhor) {
        let tempBestPassaro = null;
        for (let i = 0; i < passarosVivos.length; i++) {
            let s = passarosVivos[i].pontuacao;
            if (s > temprecorde) {
                temprecorde = s;
                tempBestPassaro = passarosVivos[i];
            }
        }

        if (temprecorde > recorde) {
            recorde = temprecorde;
            melhorPassaro = tempBestPassaro;
        }
    } else {
        temprecorde = melhorPassaro.pontuacao;
        if (temprecorde > recorde) {
            recorde = temprecorde;
        }
    } recordSpan.html(temprecorde);
    tempoSpan.html(recorde);

    for (let i = 0; i < canos.length; i++) {
        canos[i].mostrar();
    }

    if (RodarMelhor) {
        melhorPassaro.mostrar();
    } else {
        for (let i = 0; i < passarosVivos.length; i++) {
            passarosVivos[i].mostrar();
        }
        if (passarosVivos.length == 0) {
            reGerarPassaros();
        }
    }
}
