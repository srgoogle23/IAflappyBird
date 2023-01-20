class Cano {
    constructor() {
  
      /**
       * Tamanho do espaço vazio entre os canos
       */
      let tamanho = 125;
  
      /**
       * Centro do espaço vazio entre os canos
       */
      let centro = random(tamanho, altura - tamanho);
  
      /**
       * Altura do topo do cano
       */
      this.topo = centro - tamanho / 2;
  
      /**
       * Altura do fundo do cano
       */
      this.baixo = altura - (centro + tamanho / 2);
  
      /**
       * Posição do cano
       */
      this.x = largura;
  
      /**
       * Largura do cano
       */
      this.w = 80;
  
      /**
       * Velocidade do cano
       */
      this.velocidade = 6;
    }
  
    /**
     * Verifica se o passáro bateu no cano
     * 
     * @param {*} passaro 
     * @returns 
     */
    bateu(passaro) {
      if ((passaro.y - passaro.r) < this.topo || (passaro.y + passaro.r) > (altura - this.baixo)) {
        if (passaro.x > this.x && passaro.x < this.x + this.w) {
          return true;
        }
      }
      return false;
    }
  
    /**
     * Mostra o cano
     */
    mostrar() {
      image(pipeBodySprite, this.x, 0, this.w, this.topo);
      image(pipePeakSprite, this.x, altura - this.baixo, this.w, this.baixo);
    }
  
    /**
     * Atualiza o cano
     */
    atualizar() {
      this.x -= this.velocidade;
    }
  
    /**
     * Se o cano saiu da tela, retorna true, senão, retorna false
     * 
     * @returns boolean
     */
    saiuDaTela() {
      if (this.x < -this.w) {
        return true;
      } else {
        return false;
      }
    }
  }
  