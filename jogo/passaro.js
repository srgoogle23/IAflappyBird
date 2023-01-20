/**
 * Função de mutação para ser passada para para o cérebro do pássaro
 * 
 * @param {*} x 
 * @returns 
 */
function mutate(x) {
    if (random(1) < 0.1) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}

class Passaro {
    constructor(cerebro) { /**
		 * Posição e tamanho do pássaro
		 */
        this.x = 64;
        this.y = largura / 2;
        this.r = 12;

        /**
		 * Gravidade, pulo e velocidade do pássaro
		 */
        this.gravidade = 0.8;
        this.pulo = -12;
        this.velocidade = 0;

        /**
		 * Cérebro do pássaro, verificando se é uma cópia ou um novo
		 */
        if (cerebro instanceof NeuralNetwork) {
            this.cerebro = cerebro.copy();
            this.cerebro.mutate(mutate);
        } else {
            this.cerebro = new NeuralNetwork(5, 8, 2);
        }

        /**
		 * Pontuação do pássaro
		 */
        this.pontuacao = 0;

        /**
		 * Pontuação normalizada do pássaro
		 */
        this.normalizacao = 0;
    }

    /**
	 * Cria uma cópia do pássaro
	 * 
	 * @returns new Passaro
	 */
    copiar() {
        return new Passaro(this.cerebro);
    }

    /**
	 * Mostra o pássaro na tela
	 */
    mostrar() {
        image(passaroSprite, this.x, this.y, this.r * 2, this.r * 2);
    }

    /**
	 * Função que faz o pássaro pensar se deve pular ou não
	 * 
	 * @param {*} canos 
	 */
    pensar(canos) { /**
		 * Verifica qual o cano mais próximo do pássaro
		 */
        let maisPerto = null;
        let lembrar = Infinity;
        for (let i = 0; i < canos.length; i++) {
            let diff = canos[i].x - this.x;
            if (diff > 0 && diff < lembrar) {
                lembrar = diff;
                maisPerto = canos[i];
            }
        }

        if (maisPerto != null) { /**
			 * Cria os inputs para o cérebro do pássaro (rede neural)
			 */
            let inputs = [];

            /**
			 * posição x do cano mais próximo
			 * topo do cano mais próximo
			 * base do cano mais próximo
			 * posição y do pássaro
			 * velocidade do pássaro
			 */
            inputs[0] = map(maisPerto.x, this.x, width, 0, 1);
            inputs[1] = map(maisPerto.topo, 0, largura, 0, 1);
            inputs[2] = map(maisPerto.baixo, 0, largura, 0, 1);
            inputs[3] = map(this.y, 0, largura, 0, 1);
            inputs[4] = map(this.velocidade, -5, 5, 0, 1);

            /**
			 * Recebe a ação da rede neural e decide se vai pular ou não
			 * 
			 */
            let action = this.cerebro.predict(inputs);
            if (action[1] > action[0]) {
                this.up();
            }
        }
    }

    /**
	 * Função que faz o pássaro pular
	 */
    pular() {
        this.velocidade += this.pulo;
    }

    /**
	 * @returns true se o pássaro bateu no chão
	 */
    bateuNoChao() {
        return(this.y > largura || this.y < 0);
    }

    /**
	 * Atualiza a posição do pássaro baseado na velocidade, gravidade, etc.
	 */
    atualizar() {
        this.velocidade += this.gravidade;
        this.y += this.velocidade;
        this.pontuacao ++;
    }
}
