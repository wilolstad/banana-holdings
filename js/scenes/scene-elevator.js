"use strict";

class SceneElevator extends Phaser.Scene {
  constructor() { super({ key: "SceneElevator" }); }

  create() {
    const W = this.cameras.main.width;
    const H = this.cameras.main.height;

    this.cameras.main.setBackgroundColor(0x0a0608);

    const shaft = this.add.graphics();
    shaft.fillStyle(0x1a0e08).fillRect(W * 0.2, 0, W * 0.6, H);
    shaft.fillStyle(0x2a1a10).fillRect(W * 0.2, 0, 6, H);
    shaft.fillStyle(0x2a1a10).fillRect(W * 0.8 - 6, 0, 6, H);

    const counter = this.add.graphics();
    counter.fillStyle(0xd4b870).fillRect(W * 0.35, H * 0.2, W * 0.3, 120);
    counter.lineStyle(4, 0x4a3020).strokeRect(W * 0.35, H * 0.2, W * 0.3, 120);
    counter.fillStyle(0x0a0608).fillRect(W * 0.38, H * 0.22, W * 0.24, 80);

    const floorText = this.add.text(W / 2, H * 0.32, "1", {
      fontFamily: "VT323, monospace", fontSize: "84px",
      color: "#ff6a40", letterSpacing: 4,
    }).setOrigin(0.5);

    this.add.text(W / 2, H * 0.42, "↑ ETASJE", {
      fontFamily: "VT323, monospace", fontSize: "22px", color: "#d4b870",
    }).setOrigin(0.5);

    this.add.text(W / 2, H * 0.6, "Brass-heisen tar deg opp.", {
      fontFamily: "VT323, monospace", fontSize: "18px", color: "#7a5a3a",
    }).setOrigin(0.5);

    this.cameras.main.fadeIn(400);

    const floors = [1, 4, 8, 12, 16, 19, 21, 22, 23];
    let i = 0;
    const tickEvent = this.time.addEvent({
      delay: 220,
      repeat: floors.length - 1,
      callback: () => {
        i = Math.min(i + 1, floors.length - 1);
        floorText.setText(String(floors[i]));
        if (floors[i] === 23) {
          floorText.setColor("#3a9a3a");
          this.cameras.main.flash(220, 255, 220, 100);
          const ding = this.add.text(W / 2, H * 0.78, "DING!", {
            fontFamily: "VT323, monospace", fontSize: "56px",
            color: "#d4b870", letterSpacing: 4,
            stroke: "#1a1410", strokeThickness: 4,
          }).setOrigin(0.5).setAlpha(0).setScale(0.5).setAngle(-3);
          this.tweens.add({
            targets: ding, alpha: 1, scale: 1.1, duration: 250,
            ease: "Back.easeOut",
          });
          this.tweens.add({
            targets: ding, alpha: 0, scale: 0.9, duration: 400, delay: 600,
          });
        }
      },
    });

    this.tweens.add({
      targets: [shaft, counter, floorText],
      y: "+=4", duration: 90, yoyo: true, repeat: 22,
    });

    addSkipButton(this, () => this.scene.start("SceneOffice"));

    this.time.delayedCall(3200, () => {
      this.cameras.main.fadeOut(500);
      this.time.delayedCall(550, () => this.scene.start("SceneOffice"));
    });
  }
}
