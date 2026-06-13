"use strict";

class SceneElevator extends Phaser.Scene {
  constructor() { super({ key: "SceneElevator" }); }

  create() {
    const W = this.cameras.main.width;
    const H = this.cameras.main.height;

    this.cameras.main.setBackgroundColor(0x2a1a10);

    const wallG = this.add.graphics();
    wallG.fillStyle(0x3a2418).fillRect(0, 0, W, H);
    wallG.fillStyle(0x2a1810).fillRect(W * 0.25, 60, W * 0.5, H - 120);
    wallG.fillStyle(PALETTE.brass).fillRect(W * 0.25 - 6, 54, W * 0.5 + 12, 6);
    wallG.fillStyle(PALETTE.brass).fillRect(W * 0.25 - 6, H - 66, W * 0.5 + 12, 6);
    wallG.fillStyle(PALETTE.brass).fillRect(W * 0.25 - 6, 60, 6, H - 120);
    wallG.fillStyle(PALETTE.brass).fillRect(W * 0.75, 60, 6, H - 120);

    for (let i = 0; i < 4; i++) {
      const py = 80 + i * 110;
      wallG.fillStyle(0x4a3020).fillRect(W * 0.27, py, W * 0.46, 90);
      wallG.fillStyle(0x5a3a25).fillRect(W * 0.27, py, W * 0.46, 6);
      wallG.fillStyle(0x5a3a25).fillRect(W * 0.27, py + 84, W * 0.46, 6);
      wallG.fillStyle(0x3a2418).fillRect(W * 0.29, py + 12, W * 0.42, 66);
    }

    wallG.fillStyle(0x1a0a08).fillRect(0, H - 40, W, 40);
    for (let i = 0; i < 20; i++) {
      wallG.fillStyle(0x2a1408).fillRect(i * 48 + 8, H - 30, 32, 4);
    }

    const panelG = this.add.graphics();
    const pX = W * 0.83, pY = H * 0.4;
    panelG.fillStyle(PALETTE.brass).fillRect(pX, pY, 80, 200);
    panelG.fillStyle(0x9a7a30).fillRect(pX + 4, pY + 4, 72, 192);

    panelG.fillStyle(0x1a1a1a).fillRect(pX + 10, pY + 12, 60, 36);
    panelG.fillStyle(0x4a1a1a).fillRect(pX + 14, pY + 16, 52, 28);

    const floorText = this.add.text(pX + 40, pY + 30, "1", {
      fontFamily: "VT323, monospace", fontSize: "26px", color: "#ff6a40",
    }).setOrigin(0.5);

    const buttons = ["B","1","2","5","8","12","18","23"];
    for (let i = 0; i < buttons.length; i++) {
      const by = pY + 60 + i * 16;
      panelG.fillStyle(0x2a2018).fillCircle(pX + 40, by, 6);
      this.add.text(pX + 40, by, buttons[i], {
        fontFamily: "VT323, monospace", fontSize: "9px", color: "#d4b870",
      }).setOrigin(0.5);
    }

    const btn23X = pX + 40;
    const btn23Y = pY + 60 + 7 * 16;
    panelG.fillStyle(PALETTE.amber).fillCircle(btn23X, btn23Y, 6);
    this.add.text(btn23X, btn23Y, "23", {
      fontFamily: "VT323, monospace", fontSize: "9px", color: "#1a1a1a",
    }).setOrigin(0.5);

    const handG = this.add.graphics();
    handG.fillStyle(PALETTE.fur).fillRect(W * 0.45, H * 0.6, 120, 90);
    handG.fillStyle(PALETTE.skin).fillRect(W * 0.45 + 14, H * 0.6 + 14, 92, 40);
    handG.fillStyle(PALETTE.skinDark).fillRect(W * 0.45 + 32, H * 0.6 + 28, 16, 6);
    handG.fillStyle(PALETTE.skinDark).fillRect(W * 0.45 + 56, H * 0.6 + 30, 16, 6);
    handG.fillStyle(PALETTE.skinDark).fillRect(W * 0.45 + 80, H * 0.6 + 32, 16, 6);

    const cap = this.add.text(W / 2, 30, "ETASJE", {
      fontFamily: "VT323, monospace", fontSize: "18px",
      color: "#d4b870", letterSpacing: 4,
    }).setOrigin(0.5).setAlpha(0);
    this.tweens.add({ targets: cap, alpha: 1, duration: 400 });

    this.cameras.main.fadeIn(400);

    const floorTween = { v: 1 };
    const floorList = [1, 3, 5, 8, 12, 15, 18, 21, 23];
    let i = 0;
    this.time.addEvent({
      delay: 400,
      repeat: floorList.length - 1,
      callback: () => {
        i = Math.min(i + 1, floorList.length - 1);
        floorText.setText(String(floorList[i]));
        if (floorList[i] === 23) {
          floorText.setColor("#3a9a3a");
          this.cameras.main.flash(200, 255, 220, 100);
          this.add.text(W / 2, H / 2, "DING!", {
            fontFamily: "VT323, monospace", fontSize: "60px",
            color: "#d4b870", letterSpacing: 4,
          }).setOrigin(0.5).setAlpha(0).setAngle(-5);
          this.tweens.add({
            targets: this.children.list[this.children.list.length - 1],
            alpha: { from: 0, to: 1 },
            scale: { from: 0.5, to: 1.2 },
            duration: 300,
            yoyo: true,
            hold: 200,
          });
        }
      },
    });

    this.tweens.add({
      targets: [handG, panelG, wallG],
      x: "+=2",
      duration: 80,
      yoyo: true,
      repeat: 30,
    });

    addSkipButton(this, () => this.scene.start("SceneOffice"));

    this.time.delayedCall(4400, () => {
      this.cameras.main.fadeOut(500);
      this.time.delayedCall(550, () => this.scene.start("SceneChaos"));
    });
  }
}
