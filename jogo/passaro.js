function mutacionar(x) {
    if (random(1) < 0.1) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}

class Passaro {
    constructor(cerebro) {

        this.x = 64;
        this.y = height / 2;
        this.r = 12;

        this.gravidade = 0.8;
        this.peso = -12;
        this.velocidade = 0;

        if (cerebro instanceof NeuralNetwork) {
            this.cerebro = cerebro.copy();
            this.cerebro.mutate(mutacionar);
        } else {
            this.cerebro = new NeuralNetwork(5, 8, 2);
        }

        this.pontuacao = 0;

        this.fit = 0;
    }

    copiar() {
        return new Passaro(this.cerebro);
    }

    mostrar() {
        image(spritePassaro, this.x, this.y, this.r * 2, this.r * 2);
    }

    pensar(canos) {

        let maisPerto = null;
        let record = Infinity;
        for (let i = 0; i < canos.length; i++) {
            let diff = canos[i].x - this.x;
            if (diff > 0 && diff < record) {
                record = diff;
                maisPerto = canos[i];
            }
        }

        if (maisPerto != null) {

            let inputs = [];
            inputs[0] = map(maisPerto.x, this.x, width, 0, 1);
            inputs[1] = map(maisPerto.top, 0, height, 0, 1);
            inputs[2] = map(maisPerto.bottom, 0, height, 0, 1);
            inputs[3] = map(this.y, 0, height, 0, 1);
            inputs[4] = map(this.velocidade, -5, 5, 0, 1);

            let action = this.cerebro.predict(inputs);
            if (action[1] > action[0]) {
                this.up();
            }
        }
    }

    up() {
        this.velocidade += this.peso;
    }

    bottomTop() {
        return(this.y > height || this.y < 0);
    }

    atualizar() {
        this.velocidade += this.gravidade;
        this.y += this.velocidade;
        this.pontuacao ++;
    }
}
