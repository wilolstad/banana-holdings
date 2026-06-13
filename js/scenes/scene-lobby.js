"use strict";

class SceneLobby extends Phaser.Scene {
  constructor() { super({ key: "SceneLobby" }); }

  create() {
    const W = this.cameras.main.width;
    const H = this.cameras.main.height;

    this.cameras.main.setBackgroundColor(0x2a1810);

    const wallG = this.add.graphics();
    wallG.fillStyle(0x3a2418).fillRect(0, 0, W, H);

    wallG.fillStyle(0x5a3520).fillRect(0, 0, W, H * 0.18);
    wallG.fillStyle(PALETTE.brass).fillRect(0, H * 0.18, W, 3);
    wallG.fillStyle(PALETTE.brass).fillRect(0, H * 0.82, W, 3);

    const floorG = this.add.graphics();
    floorG.fillStyle(0x1a1410).fillRect(0, H * 0.82, W, H * 0.18);
    for (let i = 0; i < 30; i++) {
      floorG.fillStyle(0x2a1a14).fillRect(
        i * 36 + (i % 2 === 0 ? 0 : 18),
        H * 0.84 + (i % 3) * 14,
        16, 6
      );
    }

    const leftElev = W * 0.32;
    const rightElev = W * 0.55;
    const eY = H * 0.25;
    const eH = H * 0.55;
    const eW = W * 0.14;

    this.drawElevator(leftElev, eY, eW, eH);
    this.drawElevator(rightElev, eY, eW, eH);

    const dmG = this.add.graphics();
    const dmX = W * 0.12, dmY = H * 0.65;
    dmG.fillStyle(0x4a3020).fillRect(dmX, dmY - 50, 40, 40);
    dmG.fillStyle(0x7a4a35).fillRect(dmX + 6, dmY - 40, 28, 20);
    dmG.fillStyle(0x1a1a1a).fillRect(dmX + 8, dmY - 36, 4, 4);
    dmG.fillStyle(0x1a1a1a).fillRect(dmX + 28, dmY - 36, 4, 4);
    dmG.fillStyle(0xfafaf0).fillRect(dmX + 14, dmY - 30, 12, 2);
    dmG.fillStyle(0x7a1a1a).fillRect(dmX - 4, dmY - 10, 48, 50);
    dmG.fillStyle(PALETTE.brass).fillRect(dmX + 8, dmY - 5, 24, 4);
    dmG.fillStyle(PALETTE.brass).fillRect(dmX + 8, dmY + 5, 24, 4);
    dmG.fillStyle(PALETTE.brass).fillRect(dmX + 8, dmY + 15, 24, 4);
    dmG.fillStyle(0x1a1a1a).fillRect(dmX + 4, dmY + 40, 16, 30);
    dmG.fillStyle(0x1a1a1a).fillRect(dmX + 24, dmY + 40, 16, 30);

    this.add.text(dmX + 20, dmY + 80, "Vincent · doorman", {
      fontFamily: "VT323, monospace", fontSize: "13px", color: "#d4b870",
    }).setOrigin(0.5);

    const deskG = this.add.graphics();
    deskG.fillStyle(0x4a3020).fillRect(W * 0.78, H * 0.6, W * 0.18, H * 0.2);
    deskG.fillStyle(0x5a3a25).fillRect(W * 0.78, H * 0.6, W * 0.18, 8);
    deskG.fillStyle(0x1a1a1a).fillRect(W * 0.81, H * 0.63, 60, 30);
    deskG.fillStyle(0x1a3a4a).fillRect(W * 0.81 + 3, H * 0.63 + 3, 54, 24);

    this.add.text(W * 0.87, H * 0.82, "resepsjonen", {
      fontFamily: "VT323, monospace", fontSize: "12px", color: "#7a5a3a",
    }).setOrigin(0.5);

    const titleT = this.add.text(W / 2, 40,
      "BANANA HOLDINGS · LOBBY", {
        fontFamily: "VT323, monospace", fontSize: "20px",
        color: "#d4b870", letterSpacing: 2,
      }).setOrigin(0.5).setAlpha(0);
    this.tweens.add({ targets: titleT, alpha: 1, duration: 400 });
    this.tweens.add({ targets: titleT, alpha: 0, duration: 400, delay: 2200 });

    const handG = this.add.graphics();
    handG.fillStyle(PALETTE.fur).fillRect(W * 0.36, H * 0.85, 100, 80);
    handG.fillStyle(PALETTE.skin).fillRect(W * 0.36 + 10, H * 0.85 + 10, 80, 40);
    handG.fillStyle(PALETTE.skinDark).fillRect(W * 0.36 + 20, H * 0.85 + 22, 14, 6);
    handG.fillStyle(PALETTE.skinDark).fillRect(W * 0.36 + 40, H * 0.85 + 26, 14, 6);
    handG.fillStyle(PALETTE.skinDark).fillRect(W * 0.36 + 60, H * 0.85 + 26, 14, 6);

    this.cameras.main.fadeIn(450);

    this.tweens.add({
      targets: handG,
      x: -W * 0.15,
      y: -H * 0.05,
      scale: 1.2,
      duration: 1800,
      delay: 1200,
      ease: "Sine.easeOut",
    });

    addSkipButton(this, () => this.scene.start("SceneOffice"));

    this.time.delayedCall(3400, () => {
      this.cameras.main.fadeOut(400);
      this.time.delayedCall(450, () => this.scene.start("SceneElevator"));
    });
  }

  drawElevator(x, y, w, h) {
    const g = this.add.graphics();
    g.fillStyle(0x2a2020).fillRect(x - 8, y - 8, w + 16, h + 16);
    g.fillStyle(PALETTE.brass).fillRect(x - 4, y - 4, w + 8, h + 8);
    g.fillStyle(0x8a6a30).fillRect(x - 2, y - 2, w + 4, h + 4);
    g.fillStyle(0x3a2418).fillRect(x, y, w, h);
    g.fillStyle(0x4a3020).fillRect(x, y, w / 2 - 1, h);
    g.fillStyle(0x4a3020).fillRect(x + w / 2 + 1, y, w / 2 - 1, h);
    g.fillStyle(PALETTE.brass).fillRect(x + w / 2 - 4, y + h / 2 - 6, 3, 12);
    g.fillStyle(PALETTE.brass).fillRect(x + w / 2 + 1, y + h / 2 - 6, 3, 12);

    g.fillStyle(0x1a1a1a).fillRect(x + w / 2 - 30, y - 28, 60, 22);
    g.fillStyle(0x4a1a1a).fillRect(x + w / 2 - 27, y - 25, 54, 16);
    this.add.text(x + w / 2, y - 17, "23", {
      fontFamily: "VT323, monospace", fontSize: "16px", color: "#ff6a40",
    }).setOrigin(0.5);

    g.fillStyle(0xfafaf0).fillStyle(PALETTE.brass).fillRect(
      x + w + 12, y + h / 2 - 8, 16, 16
    );
    g.fillStyle(0x1a1a1a).fillRect(x + w + 16, y + h / 2 - 4, 8, 8);
  }
}
