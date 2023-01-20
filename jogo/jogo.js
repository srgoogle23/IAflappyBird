function reiniciar() {
    counter = 0;
    if (melhorPassaro) {
        melhorPassaro.pontuacao = 0;
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
        let passaro = selecionarFIla(oldPassaros);
        newPassaros[i] = passaro;
    }
    return newPassaros;
}


function normalizar(passaros) {

    for (let i = 0; i < passaros.length; i++) {
        passaros[i].pontuacao = pow(passaros[i].pontuacao, 2);
    }

    let sum = 0;
    for (let i = 0; i < passaros.length; i++) {
        sum += passaros[i].pontuacao;
    }

    for (let i = 0; i < passaros.length; i++) {
        passaros[i].fit = passaros[i].pontuacao / sum;
    }
}


function selecionarFIla(passaros) {

    let index = 0;

    let r = random(1);

    while (r > 0) {
        r -= passaros[index].fit;
        index += 1;
    }

    index -= 1;

    return passaros[index].copiar();
}
