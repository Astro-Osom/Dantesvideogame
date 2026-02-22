// Basic Phaser 3 setup for "Dante and Coco Save the Day"

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  parent: "game-container",
  backgroundColor: "#4a90e2",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
      debug: false
    }
  },
  scene: [BootScene, PlayScene]
};

// Boot scene: preload assets
function BootScene() {
  Phaser.Scene.call(this, { key: "BootScene" });
}
BootScene.prototype = Object.create(Phaser.Scene.prototype);
BootScene.prototype.constructor = BootScene;

BootScene.prototype.preload = function () {
  // Load your hero sprites from /assets
  this.load.image("dante", "assets/Dante_32_Bit_Hero.png");
  this.load.image("coco", "assets/Coco_32_Bit_Hero.png");
};

BootScene.prototype.create = function () {
  this.scene.start("PlayScene");
};

// Main play scene
function PlayScene() {
  Phaser.Scene.call(this, { key: "PlayScene" });
}
PlayScene.prototype = Object.create(Phaser.Scene.prototype);
PlayScene.prototype.constructor = PlayScene;

PlayScene.prototype.create = function () {
  // Title text
  this.add.text(20, 20, "Dante and Coco Save the Day", {
    fontFamily: "Arial",
    fontSize: 24,
    color: "#ffffff"
  });

  // Simple ground
  const ground = this.add.rectangle(400, 430, 800, 40, 0x228b22);
  this.physics.add.existing(ground, true);

  // Dante (player 1) sprite
  this.dante = this.physics.add.sprite(100, 300, "dante");
  this.dante.setCollideWorldBounds(true);
  this.physics.add.collider(this.dante, ground);

  // Coco (player 2 placeholder) sprite – not yet controllable
  this.coco = this.physics.add.sprite(200, 300, "coco");
  this.coco.setCollideWorldBounds(true);
  this.physics.add.collider(this.coco, ground);

  // Basic keyboard controls for Dante (we'll swap to touch later)
  this.cursors = this.input.keyboard.createCursorKeys();
};

PlayScene.prototype.update = function () {
  const speed = 200;

  // Dante controls
  if (this.cursors.left.isDown) {
    this.dante.setVelocityX(-speed);
    this.dante.setFlipX(true);
  } else if (this.cursors.right.isDown) {
    this.dante.setVelocityX(speed);
    this.dante.setFlipX(false);
  } else {
    this.dante.setVelocityX(0);
  }

  if (this.cursors.up.isDown && this.dante.body.blocked.down) {
    this.dante.setVelocityY(-450);
  }
};

// Launch the game
new Phaser.Game(config);
