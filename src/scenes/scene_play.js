import Palas from "../gameObjects/palas.js";

export default class Scene_play extends Phaser.Scene {
  constructor() {
    super({ key: "Scene_play" });
  }

  create() {
    let center_width = this.sys.game.config.width / 2;
    let center_height = this.sys.game.config.height / 2;

    // Separador
    this.add.image(center_width, center_height, "separator");

    // Palas
    //this.left = this.add.image(30, center_height, "left");
    //this.right = this.add.image(center_width * 2 - 30, center_height, "right");
    this.left = new Palas(this, 30, center_height, "left");
    this.right = new Palas(this, center_width * 2 - 30, center_height, "right");

    // Bola
    // Configurar con que paredes colisiona la bola
    this.physics.world.setBoundsCollision(false, false, true, true);
    this.ball = this.physics.add.image(center_width, center_height, "ball");
    // Rebota cuando choca con las paredes
    this.ball.setCollideWorldBounds(true);
    // Rebota a la misma intensitad con la que choco
    this.ball.setBounce(1);
    this.ball.setVelocityX(-180);

    // Fisicas
    this.physics.add.collider(this.ball, this.left, this.chocaPala, null, this);
    this.physics.add.collider(
      this.ball,
      this.right,
      this.chocaPala,
      null,
      this
    );

    // Controles
    // Crea por defecto los controles de las flechitas
    // Pala derecha
    this.cursor = this.input.keyboard.createCursorKeys();

    // Pala izquierda
    this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

  }

  update() {
    let center_width = this.sys.game.config.width / 2;
    let center_height = this.sys.game.config.height / 2;

    if (this.ball.x < 0 || this.ball.x > center_width * 2) {
        this.ball.setPosition(center_width, center_height);
    }

    // Control de las palas
    // pala derecha
    if(this.cursor.down.isDown) {
        this.right.body.setVelocityY(300);
    } else if(this.cursor.up.isDown) {
        this.right.body.setVelocityY(-300);
    } else {
        this.right.body.setVelocityY(0);
    }

    // pala izquierda
    // pala derecha
    if(this.cursor_S.isDown) {
        this.left.body.setVelocityY(300);
    } else if(this.cursor_W.isDown) {
        this.left.body.setVelocityY(-300);
    } else {
        this.left.body.setVelocityY(0);
    }
  }

  chocaPala() {
    this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
  }
}
