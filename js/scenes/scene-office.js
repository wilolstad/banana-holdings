"use strict";

class SceneOffice extends Phaser.Scene {
  constructor() { super({ key: "SceneOffice" }); }

  create() {
    const W = this.cameras.main.width;
    const H = this.cameras.main.height;

    this.cameras.main.setBackgroundColor(0x1a1410);

    const tbar = this.add.graphics();
    tbar.fillStyle(0x2a2218).fillRect(0, 0, W, 36);
    tbar.fillStyle(PALETTE.brass).fillRect(0, 36, W, 1);

    this.clock = this.add.text(12, 6,
      this.now(), {
        fontFamily: "VT323, monospace", fontSize: "20px", color: "#d4b870",
      });
    this.add.text(120, 6, "OSLO 10:42 · NYSE 04:42 · TOKYO 17:42", {
      fontFamily: "VT323, monospace", fontSize: "16px", color: "#7a5a3a",
    });
    this.add.text(W - 12, 6, "[?]  [SETTINGS]  [BORTSE]", {
      fontFamily: "VT323, monospace", fontSize: "16px", color: "#d4b870",
    }).setOrigin(1, 0);

    this.time.addEvent({
      delay: 1000, loop: true,
      callback: () => this.clock.setText(this.now()),
    });

    const floorG = this.add.graphics();
    floorG.fillStyle(0x8a5a30).fillRect(20, 50, W * 0.72, H - 70);
    for (let i = 0; i < 20; i++) {
      floorG.lineStyle(1, 0x6a4520).strokeLineShape(
        new Phaser.Geom.Line(20, 50 + i * 24, 20 + W * 0.72, 50 + i * 24)
      );
    }

    floorG.fillStyle(PALETTE.night).fillRect(20, 50, W * 0.72, 30);
    for (let i = 0; i < 60; i++) {
      floorG.fillStyle(0xffdc80).fillRect(
        20 + Phaser.Math.Between(0, W * 0.72), 50 + Phaser.Math.Between(0, 26), 2, 2
      );
    }

    floorG.fillStyle(PALETTE.cream).fillRect(20, 84, W * 0.72, 6);
    floorG.fillStyle(PALETTE.cream).fillRect(20, 84, 6, H - 110);
    floorG.fillStyle(PALETTE.cream).fillRect(W * 0.72 + 14, 84, 6, H - 110);
    floorG.fillStyle(PALETTE.cream).fillRect(20, H - 26, W * 0.72, 6);

    const wallRoomY = 100;
    const wallRoomH = 110;
    const officeW = (W * 0.72 - 32) / 7;
    const officeNames = ["WOLF", "KNUT", "HALVOR", "SIGURD", "MAGNE", "STEIN", "SATOSHI"];

    for (let i = 0; i < 7; i++) {
      const ox = 26 + i * officeW;
      floorG.fillStyle(PALETTE.cream).fillRect(ox, wallRoomY, officeW - 2, wallRoomH);
      floorG.fillStyle(PALETTE.mahogany).fillRect(ox, wallRoomY, officeW - 2, 4);
      floorG.fillStyle(PALETTE.mahoganyDark).fillRect(ox + officeW - 10, wallRoomY + wallRoomH - 24, 8, 20);
      floorG.fillStyle(PALETTE.brass).fillRect(ox + officeW - 5, wallRoomY + wallRoomH - 14, 2, 2);
      this.add.text(ox + officeW / 2 - 1, wallRoomY + 12, officeNames[i], {
        fontFamily: "VT323, monospace", fontSize: "13px", color: "#7a1a1a",
      }).setOrigin(0.5);
    }

    const mtY = wallRoomY + wallRoomH + 14;
    const mtH = 100;
    const mtW = W * 0.32;
    const mtX = (W * 0.72 - mtW) / 2 + 20;
    floorG.fillStyle(PALETTE.cream).fillRect(mtX, mtY, mtW, mtH);
    floorG.lineStyle(3, PALETTE.brass).strokeRect(mtX, mtY, mtW, mtH);
    this.add.text(mtX + mtW / 2, mtY + 16, "MØTEROMMET", {
      fontFamily: "VT323, monospace", fontSize: "16px", color: "#7a1a1a",
    }).setOrigin(0.5);
    floorG.fillStyle(PALETTE.mahoganyMid).fillEllipse(mtX + mtW / 2, mtY + mtH / 2 + 16, mtW * 0.6, 32);
    floorG.fillStyle(0x7a4a2a).fillEllipse(mtX + mtW / 2, mtY + mtH / 2 + 12, mtW * 0.58, 28);
    floorG.fillStyle(0xfafaf0).fillRect(mtX + 30, mtY + mtH - 18, mtW - 60, 12);
    this.add.text(mtX + mtW / 2, mtY + mtH - 12, "OSEAX FULLY VALUED · INNSIDEKJØP = NEI", {
      fontFamily: "VT323, monospace", fontSize: "9px", color: "#1a1a1a",
    }).setOrigin(0.5);

    const tfY = mtY + mtH + 10;
    const tfH = H - tfY - 50;
    floorG.fillStyle(0x6a4520).fillRect(30, tfY, W * 0.72 - 20, tfH);
    floorG.fillStyle(0x5a3520).fillRect(30, tfY, W * 0.72 - 20, 4);

    const tfNames = ["BJARNE", "ESPEN", "BÅRD", "PER", "GUNNAR", "OLA", "TRYGVE", "DIAMOND"];
    const tfDeskW = (W * 0.72 - 60) / 8;
    for (let i = 0; i < 8; i++) {
      const dx = 38 + i * tfDeskW;
      floorG.fillStyle(PALETTE.mahogany).fillRect(dx, tfY + 14, tfDeskW - 4, 36);
      floorG.fillStyle(0x1a1a1a).fillRect(dx + 6, tfY + 18, tfDeskW - 16, 14);
      floorG.fillStyle(0x1a3a4a).fillRect(dx + 8, tfY + 20, tfDeskW - 20, 10);
      this.add.text(dx + (tfDeskW - 4) / 2, tfY + 60, tfNames[i], {
        fontFamily: "VT323, monospace", fontSize: "10px", color: "#d4b870",
      }).setOrigin(0.5);
    }

    const sideX = W * 0.72 + 30;
    const sideW = W - sideX - 14;
    const sideG = this.add.graphics();
    sideG.fillStyle(0x2a2218).fillRect(sideX, 50, sideW, H - 70);
    sideG.lineStyle(1, PALETTE.brass).strokeRect(sideX, 50, sideW, H - 70);

    this.add.text(sideX + sideW / 2, 70, "DAGENS PnL", {
      fontFamily: "VT323, monospace", fontSize: "16px", color: "#d4b870",
    }).setOrigin(0.5);
    this.add.text(sideX + sideW / 2, 100, "+ 1 247 kr", {
      fontFamily: "VT323, monospace", fontSize: "28px", color: "#3a9a3a",
    }).setOrigin(0.5);
    this.add.text(sideX + sideW / 2, 130, "+0,8 % på dagen", {
      fontFamily: "VT323, monospace", fontSize: "13px", color: "#7a5a3a",
    }).setOrigin(0.5);

    this.add.text(sideX + 10, 170, "SISTE SCOOP:", {
      fontFamily: "VT323, monospace", fontSize: "14px", color: "#d4b870",
    });
    this.add.text(sideX + 10, 190, "Gunnar · Brent +1,1 %", {
      fontFamily: "VT323, monospace", fontSize: "13px", color: "#fafaf0",
    });
    this.add.text(sideX + 10, 210, "→ MØTE OM 12 MIN", {
      fontFamily: "VT323, monospace", fontSize: "12px", color: "#7a5a3a",
    });

    this.add.text(sideX + 10, 250, "AKTIVE APER:", {
      fontFamily: "VT323, monospace", fontSize: "14px", color: "#d4b870",
    });
    const live = [
      ["Espen", "trader", "#3a9a3a"],
      ["Bjarne", "researcher", "#d4b870"],
      ["Gunnar", "Equinor", "#ff8a40"],
      ["Diamond", "WSB", "#ff6a6a"],
    ];
    live.forEach((row, i) => {
      this.add.text(sideX + 14, 272 + i * 18, "● " + row[0] + " — " + row[1], {
        fontFamily: "VT323, monospace", fontSize: "13px", color: row[2],
      });
    });

    this.add.text(sideX + 10, H - 70, "Klikk en pult for drilldown", {
      fontFamily: "VT323, monospace", fontSize: "11px", color: "#5a4a3a",
    });

    const intro = this.add.text(W / 2, H / 2, "VELKOMMEN, WOLF.", {
      fontFamily: "VT323, monospace", fontSize: "48px",
      color: "#d4b870", letterSpacing: 4, stroke: "#1a1a1a", strokeThickness: 4,
    }).setOrigin(0.5).setAlpha(0);

    this.cameras.main.fadeIn(800);

    this.tweens.add({
      targets: intro, alpha: 1, duration: 600, delay: 600,
    });
    this.tweens.add({
      targets: intro, alpha: 0, duration: 600, delay: 2400,
    });

    addSkipButton(this, () => {
      const btn = document.getElementById("skip-intro");
      if (btn) btn.remove();
    });
  }

  now() {
    const d = new Date();
    return d.toLocaleTimeString("nb-NO", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }
}
