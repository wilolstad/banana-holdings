"use strict";

class SceneTaxi extends Phaser.Scene {
  constructor() { super({ key: "SceneTaxi" }); }

  create() {
    const W = this.cameras.main.width;
    const H = this.cameras.main.height;

    this.cameras.main.setBackgroundColor(PALETTE.night);

    const skyG = this.add.graphics();
    skyG.fillStyle(PALETTE.night).fillRect(0, 0, W, H * 0.55);
    skyG.fillStyle(PALETTE.nightLight).fillRect(0, 0, W, 80);
    for (let i = 0; i < 70; i++) {
      const x = Phaser.Math.Between(0, W);
      const y = Phaser.Math.Between(0, H * 0.45);
      skyG.fillStyle(0xffdc80).fillRect(x, y, 2, 2);
    }

    const bldG = this.add.graphics();
    bldG.fillStyle(0x0a0810).fillRect(W * 0.05, 60, W * 0.55, H * 0.55);
    for (let row = 0; row < 18; row++) {
      for (let col = 0; col < 16; col++) {
        if (Math.random() < 0.45) {
          bldG.fillStyle(0xffdc80).fillRect(
            W * 0.07 + col * 32, 80 + row * 18, 8, 6
          );
        }
      }
    }

    const facadeG = this.add.graphics();
    const fY = H * 0.45;
    facadeG.fillStyle(0x1a1410).fillRect(W * 0.05, fY, W * 0.55, H * 0.5);
    facadeG.fillStyle(0x2a1810).fillRect(W * 0.05, fY, W * 0.55, 12);
    facadeG.fillStyle(PALETTE.brass).fillRect(W * 0.18, fY + 18, W * 0.3, 18);
    facadeG.lineStyle(2, 0x4a3a10).strokeRect(W * 0.18, fY + 18, W * 0.3, 18);

    this.add.text(W * 0.18 + (W * 0.3) / 2, fY + 27, "BANANA HOLDINGS", {
      fontFamily: "VT323, monospace", fontSize: "18px", color: "#1a1a1a",
    }).setOrigin(0.5);

    for (let i = 0; i < 6; i++) {
      facadeG.fillStyle(PALETTE.cream).fillRect(
        W * 0.08 + i * (W * 0.08), fY + 50, 20, H * 0.4
      );
      facadeG.fillStyle(PALETTE.creamDark).fillRect(
        W * 0.08 + i * (W * 0.08), fY + 50, 4, H * 0.4
      );
      facadeG.fillStyle(PALETTE.mahogany).fillRect(
        W * 0.08 + i * (W * 0.08) - 2, fY + 46, 24, 6
      );
      facadeG.fillStyle(PALETTE.mahogany).fillRect(
        W * 0.08 + i * (W * 0.08) - 2, fY + H * 0.4 + 44, 24, 8
      );
    }

    facadeG.fillStyle(PALETTE.mahoganyDark).fillRect(W * 0.27, fY + 60, W * 0.12, H * 0.4);
    facadeG.fillStyle(PALETTE.brass).fillRect(W * 0.27 + W * 0.05, fY + 60, 3, H * 0.4);

    this.drawLion(facadeG, W * 0.21, H * 0.85);
    this.drawLion(facadeG, W * 0.42, H * 0.85);

    const groundG = this.add.graphics();
    groundG.fillStyle(0x1a1410).fillRect(0, H * 0.85, W, H * 0.15);
    groundG.fillStyle(0x0a0608).fillRect(0, H * 0.85, W, 4);
    for (let i = 0; i < 20; i++) {
      groundG.fillStyle(0x2a2018).fillRect(i * 48, H * 0.88, 24, 2);
    }

    this.drawTaxi(W * 0.78, H * 0.78);

    const handG = this.add.graphics();
    this.handG = handG;
    handG.fillStyle(PALETTE.fur).fillRect(W - 280, H - 60, 240, 60);
    handG.fillStyle(PALETTE.fur).fillRect(W - 200, H - 130, 160, 80);
    handG.fillStyle(PALETTE.skin).fillRect(W - 180, H - 110, 130, 50);
    handG.fillStyle(PALETTE.skinDark).fillRect(W - 175, H - 95, 20, 8);
    handG.fillStyle(PALETTE.skinDark).fillRect(W - 145, H - 90, 18, 8);
    handG.fillStyle(PALETTE.skinDark).fillRect(W - 115, H - 88, 18, 8);
    handG.fillStyle(PALETTE.skinDark).fillRect(W - 85, H - 90, 18, 8);

    const cap = this.add.text(W / 2, 30,
      "MANHATTAN · 09:02 · DET ER MANDAG", {
        fontFamily: "VT323, monospace", fontSize: "20px",
        color: "#d4b870", letterSpacing: 2,
      }).setOrigin(0.5);
    cap.setAlpha(0);
    this.tweens.add({ targets: cap, alpha: 1, duration: 600, delay: 200 });
    this.tweens.add({ targets: cap, alpha: 0, duration: 500, delay: 2400 });

    this.cameras.main.fadeIn(500);
    this.tweens.add({
      targets: handG,
      x: -100,
      duration: 1500,
      delay: 1200,
      ease: "Sine.easeIn",
    });

    addSkipButton(this, () => this.scene.start("SceneOffice"));

    this.time.delayedCall(3200, () => {
      this.cameras.main.fadeOut(400);
      this.time.delayedCall(450, () => this.scene.start("SceneLobby"));
    });
  }

  drawLion(g, x, y) {
    g.fillStyle(0x8a7a6a);
    g.fillRect(x - 18, y - 24, 36, 6);
    g.fillRect(x - 22, y - 18, 44, 14);
    g.fillRect(x - 16, y - 4, 32, 26);
    g.fillRect(x - 26, y - 12, 8, 18);
    g.fillRect(x + 18, y - 12, 8, 18);
    g.fillStyle(0x6a5a4a);
    g.fillRect(x - 14, y - 16, 3, 3);
    g.fillRect(x + 11, y - 16, 3, 3);
    g.fillRect(x - 6, y - 10, 12, 4);
    g.fillStyle(0x4a3a2a);
    g.fillRect(x - 28, y + 22, 56, 6);
  }

  drawTaxi(x, y) {
    const g = this.add.graphics();
    g.fillStyle(PALETTE.taxi).fillRect(x, y, 200, 60);
    g.fillStyle(PALETTE.taxiDark).fillRect(x, y, 200, 8);
    g.fillStyle(PALETTE.taxiDark).fillRect(x, y + 52, 200, 8);
    g.fillStyle(0x1a1a1a).fillRect(x + 20, y + 12, 60, 36);
    g.fillStyle(0x88aaff).fillRect(x + 24, y + 16, 52, 28);
    g.fillStyle(0x1a1a1a).fillRect(x + 100, y + 12, 60, 36);
    g.fillStyle(0x88aaff).fillRect(x + 104, y + 16, 52, 28);
    g.fillStyle(0x1a1a1a).fillRect(x + 10, y + 56, 30, 18);
    g.fillStyle(0x4a4a4a).fillRect(x + 14, y + 60, 22, 10);
    g.fillStyle(0x1a1a1a).fillRect(x + 160, y + 56, 30, 18);
    g.fillStyle(0x4a4a4a).fillRect(x + 164, y + 60, 22, 10);
    g.fillStyle(0x1a1a1a).fillRect(x + 30, y - 14, 140, 16);
    g.fillStyle(PALETTE.taxi).fillRect(x + 40, y - 10, 120, 8);
    this.add.text(x + 100, y - 8, "TAXI", {
      fontFamily: "VT323, monospace", fontSize: "10px", color: "#1a1a1a",
    }).setOrigin(0.5);
    g.fillStyle(0x1a1a1a).fillRect(x + 70, y + 26, 60, 8);
    this.add.text(x + 100, y + 28, "NYC 1Y23", {
      fontFamily: "VT323, monospace", fontSize: "9px", color: "#ffc820",
    }).setOrigin(0.5);
  }
}
