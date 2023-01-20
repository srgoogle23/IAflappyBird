class Cano {
    constructor() {

        let espaco = 125;
        let centro = random(espaco, height - espaco);

        this.top = centro - espaco / 2;
        this.bottom = height -(centro + espaco / 2);
        this.x = width;
        this.w = 80;
        this.velocidade = 6;
    }

    bateu(passaro) {
        if ((passaro.y - passaro.r) < this.top || (passaro.y + passaro.r) > (height - this.bottom)) {
            if (passaro.x > this.x && passaro.x < this.x + this.w) {
                return true;
            }
        }
        return false;
    }

    mostrar() {
        image(canoBaixoSprite, this.x, 0, this.w, this.top);
        image(canoAltoSprite, this.x, height - this.bottom, this.w, this.bottom);
    }

    atualizar() {
        this.x -= this.velocidade;
    }

    saiuDaTela() {
        if (this.x < -this.w) {
            return true;
        } else {
            return false;
        }
    }
}
