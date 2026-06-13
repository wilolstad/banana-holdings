"use strict";

class SceneChaos extends Phaser.Scene {
  constructor() { super({ key: "SceneChaos" }); }

  create() {
    const W = this.cameras.main.width;
    const H = this.cameras.main.height;

    this.cameras.main.setBackgroundColor(0x08060a);

    const officeG = this.add.graphics();
    officeG.fillStyle(PALETTE.cream).fillRect(0, 0, W, H * 0.6);
    officeG.fillStyle(PALETTE.creamDark).fillRect(0, 0, W, 16);
    officeG.fillStyle(PALETTE.mahogany).fillRect(0, 12, W, 4);
    officeG.fillStyle(PALETTE.mahoganyMid).fillRect(0, H * 0.6, W, H * 0.4);

    officeG.fillStyle(PALETTE.night).fillRect(W * 0.05, 30, W * 0.9, 60);
    for (let i = 0; i < 50; i++) {
      const x = W * 0.05 + Phaser.Math.Between(10, W * 0.9 - 20);
      const y = 35 + Phaser.Math.Between(0, 50);
      officeG.fillStyle(0xffdc80).fillRect(x, y, 2, 2);
    }
    this.add.text(W / 2, 60, "Manhattan, 1987", {
      fontFamily: "VT323, monospace", fontSize: "10px", color: "#d4b870",
    }).setOrigin(0.5);

    for (let i = 0; i < 6; i++) {
      this.drawDesk(W * 0.1 + i * (W * 0.13), H * 0.65);
    }

    const elevG = this.add.graphics();
    const eX = W * 0.4, eY = 0, eW = W * 0.2, eH = H * 0.6;
    elevG.fillStyle(0x2a1810).fillRect(eX - 12, eY - 4, eW + 24, eH + 8);
    elevG.fillStyle(PALETTE.brass).fillRect(eX - 8, eY, eW + 16, eH);
    elevG.fillStyle(0x3a2418).fillRect(eX, eY, eW, eH);

    this.cameras.main.fadeIn(400);

    this.time.delayedCall(400, () => {
      this.tweens.add({
        targets: { x: 0 },
        x: 1,
        duration: 800,
        ease: "Sine.easeOut",
        onUpdate: (tween) => {
          const t = tween.getValue();
          elevG.clear();
          elevG.fillStyle(0x2a1810).fillRect(eX - 12, eY - 4, eW + 24, eH + 8);
          elevG.fillStyle(PALETTE.brass).fillRect(eX - 8, eY, eW + 16, eH);
          elevG.fillStyle(0x3a2418).fillRect(eX, eY, eW, eH);
          elevG.fillStyle(0x4a3020).fillRect(
            eX, eY, eW / 2 - (eW / 2 - 4) * t, eH
          );
          elevG.fillStyle(0x4a3020).fillRect(
            eX + eW / 2 + (eW / 2 - 4) * t, eY, eW / 2 - (eW / 2 - 4) * t, eH
          );
        },
      });
    });

    this.time.delayedCall(1100, () => this.spawnChaos());

    addSkipButton(this, () => this.scene.start("SceneOffice"));

    this.time.delayedCall(4500, () => {
      this.cameras.main.fadeOut(500);
      this.time.delayedCall(550, () => this.scene.start("SceneOffice"));
    });
  }

  drawDesk(x, y) {
    const g = this.add.graphics();
    g.fillStyle(PALETTE.mahogany).fillRect(x - 50, y, 90, 50);
    g.fillStyle(0x5a3a25).fillRect(x - 50, y, 90, 8);
    g.fillStyle(0x1a1a1a).fillRect(x - 40, y + 12, 36, 28);
    g.fillStyle(0x1a3a4a).fillRect(x - 38, y + 14, 32, 24);
    g.fillStyle(PALETTE.amber).fillRect(x - 36, y + 16, 28, 3);
    g.fillStyle(PALETTE.green).fillRect(x - 36, y + 22, 20, 3);
  }

  spawnChaos() {
    const W = this.cameras.main.width;
    const H = this.cameras.main.height;

    const apeColors = [
      { fur: 0x4a3020, face: 0xc89868 },
      { fur: 0x2a2a2a, face: 0x5a4a3a },
      { fur: 0xd8722a, face: 0xf4d4a4 },
      { fur: 0x4a3020, face: 0xc89868 },
      { fur: 0x5a4030, face: 0xd4a878 },
      { fur: 0x3a2418, face: 0xa07848 },
    ];

    for (let i = 0; i < 6; i++) {
      const startX = W * 0.3 + Phaser.Math.Between(-40, 40);
      const startY = H * 0.55 + Phaser.Math.Between(-30, 30);
      const endX = W * 0.08 + i * (W * 0.13);
      const endY = H * 0.6;
      const c = apeColors[i % apeColors.length];
      const ape = this.drawApe(startX, startY, c.fur, c.face);
      this.tweens.add({
        targets: ape,
        x: endX,
        y: endY,
        duration: Phaser.Math.Between(1100, 1700),
        delay: Phaser.Math.Between(0, 300),
        ease: "Power2",
      });
    }

    for (let i = 0; i < 10; i++) {
      const paperX = W * 0.4 + Phaser.Math.Between(-40, 40);
      const paperY = H * 0.3 + Phaser.Math.Between(0, 100);
      const paper = this.add.rectangle(paperX, paperY, 14, 18, 0xfafaf0);
      paper.setStrokeStyle(1, 0x1a1a1a);
      this.tweens.add({
        targets: paper,
        x: paperX + Phaser.Math.Between(-200, 200),
        y: paperY + Phaser.Math.Between(-50, 150),
        angle: Phaser.Math.Between(-360, 360),
        alpha: 0,
        duration: Phaser.Math.Between(1200, 2000),
        delay: Phaser.Math.Between(0, 400),
      });
    }

    const bubbles = [
      { x: W * 0.18, y: H * 0.4, txt: "Sjefen!!" },
      { x: W * 0.55, y: H * 0.45, txt: "Wolf er her!" },
      { x: W * 0.78, y: H * 0.5, txt: "Lock inn!!" },
    ];
    bubbles.forEach((b, i) => {
      this.time.delayedCall(600 + i * 250, () => {
        const t = this.add.text(b.x, b.y, b.txt, {
          fontFamily: "VT323, monospace", fontSize: "22px",
          color: "#1a1a1a", backgroundColor: "#fafaf0", padding: { x: 8, y: 4 },
        }).setOrigin(0.5).setScale(0.5).setAlpha(0);
        this.tweens.add({
          targets: t, scale: 1, alpha: 1, duration: 250, ease: "Back.easeOut",
        });
        this.tweens.add({
          targets: t, alpha: 0, duration: 300, delay: 1500,
        });
      });
    });
  }

  drawApe(x, y, fur, face) {
    const c = this.add.container(x, y);
    const g = this.add.graphics();
    g.fillStyle(fur).fillRect(-18, -28, 36, 32);
    g.fillStyle(face).fillRect(-12, -20, 24, 18);
    g.fillStyle(0x1a1a1a).fillRect(-10, -16, 4, 4);
    g.fillStyle(0x1a1a1a).fillRect(6, -16, 4, 4);
    g.fillStyle(0x1a1a1a).fillRect(-6, -6, 12, 2);
    g.fillStyle(0xfafaf0).fillRect(-14, 4, 28, 24);
    g.fillStyle(0x7a1a1a).fillRect(-10, 4, 4, 24);
    g.fillStyle(0x7a1a1a).fillRect(6, 4, 4, 24);
    g.fillStyle(0x1e3a5f).fillRect(-3, 4, 6, 14);
    g.fillStyle(0x1a1a2a).fillRect(-12, 28, 24, 16);
    c.add(g);
    return c;
  }
}
