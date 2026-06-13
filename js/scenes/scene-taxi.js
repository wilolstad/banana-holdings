"use strict";

class SceneTaxi extends Phaser.Scene {
  constructor() { super({ key: "SceneTaxi" }); }

  preload() {
    this.load.image("city_sample", "sprites/city_sample.png");
  }

  create() {
    const W = this.cameras.main.width;
    const H = this.cameras.main.height;

    this.cameras.main.setBackgroundColor(0x1a1410);

    const bg = this.add.image(W / 2, H / 2, "city_sample");
    const scale = Math.max(W / 918, H / 516);
    bg.setScale(scale);

    const dim = this.add.graphics();
    dim.fillStyle(0x000000, 0.45).fillRect(0, 0, W, H);

    const sign = this.add.container(W / 2, H * 0.28);
    const signBg = this.add.graphics();
    signBg.fillStyle(0xd4b870).fillRect(-220, -28, 440, 56);
    signBg.lineStyle(3, 0x4a3020).strokeRect(-220, -28, 440, 56);
    signBg.fillStyle(0x4a3020).fillRect(-220, -28, 440, 5);
    signBg.fillStyle(0x4a3020).fillRect(-220, 23, 440, 5);
    sign.add(signBg);
    sign.add(this.add.text(0, -6, "BANANA HOLDINGS", {
      fontFamily: "VT323, monospace", fontSize: "30px",
      color: "#1a1410", letterSpacing: 4,
    }).setOrigin(0.5));
    sign.add(this.add.text(0, 14, "EST. 1984 · MANHATTAN", {
      fontFamily: "VT323, monospace", fontSize: "12px",
      color: "#4a3020", letterSpacing: 2,
    }).setOrigin(0.5));
    sign.setScale(0.5).setAlpha(0);

    const cap = this.add.text(W / 2, H * 0.85,
      "MANDAG · 09:02 · DET REGNET I NATT", {
        fontFamily: "VT323, monospace", fontSize: "20px",
        color: "#d4b870", letterSpacing: 3,
        backgroundColor: "#1a1410", padding: { x: 12, y: 6 },
      }).setOrigin(0.5).setAlpha(0);

    this.cameras.main.fadeIn(600);

    this.tweens.add({
      targets: sign, alpha: 1, scale: 1, duration: 700, delay: 400,
      ease: "Back.easeOut",
    });
    this.tweens.add({
      targets: cap, alpha: 1, duration: 400, delay: 1100,
    });

    addSkipButton(this, () => this.scene.start("SceneOffice"));

    this.time.delayedCall(3400, () => {
      this.cameras.main.fadeOut(500);
      this.time.delayedCall(550, () => this.scene.start("SceneElevator"));
    });
  }
}
