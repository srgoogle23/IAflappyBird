function reiniciar() {
    counter = 0;
    if (bestPassaro) {
        bestPassaro.pontuacao = 0;
    }
    canos = [];
}


function reGerarPassaros() {
    reiniciar();

    normalizar(passarosTodos);

    passarosVivos = gerar(passarosTodos);

    passarosTodos = passarosVivos.slice();
}

function gerar(oldPassaros) {
    let newPassaros = [];
    for (let i = 0; i < oldPassaros.length; i++) {
        let bird = selecionarFIla(oldPassaros);
        newPassaros[i] = bird;
    }
    return newPassaros;
}


function normalizar(birds) {

    for (let i = 0; i < birds.length; i++) {
        birds[i].pontuacao = pow(birds[i].pontuacao, 2);
    }


    let sum = 0;
    for (let i = 0; i < birds.length; i++) {
        sum += birds[i].pontuacao;
    }

    for (let i = 0; i < birds.length; i++) {
        birds[i].fit = birds[i].pontuacao / sum;
    }
}


function selecionarFIla(birds) {

    let index = 0;

    let r = random(1);

    while (r > 0) {
        r -= birds[index].fit;
        index += 1;
    }

    index -= 1;

    return birds[index].copiar();
}
