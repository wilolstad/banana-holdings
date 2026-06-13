"use strict";

class SceneOffice extends Phaser.Scene {
  constructor() { super({ key: "SceneOffice" }); }

  preload() {
    this.load.spritesheet("indoor", "sprites/indoor_tiles.png", {
      frameWidth: 16, frameHeight: 16, spacing: 1,
    });
    this.load.spritesheet("chars", "sprites/char_tiles.png", {
      frameWidth: 16, frameHeight: 16, spacing: 1,
    });
    this.load.image("indoor_sample", "sprites/indoor_sample.png");
  }

  create() {
    const W = this.cameras.main.width;
    const H = this.cameras.main.height;
    const TILE = 16;
    const SCALE = 3;
    const T = TILE * SCALE;

    this.cameras.main.setBackgroundColor(0x1a1410);

    const bg = this.add.image(W / 2, H / 2 + 18, "indoor_sample");
    const sampleW = 918;
    const sampleH = 516;
    const scale = Math.min((W - 280) / sampleW, (H - 70) / sampleH);
    bg.setScale(scale);
    bg.setAlpha(0.95);
    bg.x = (W - 280) / 2 + 6;
    bg.y = (H - 36) / 2 + 36;

    const overlay = this.add.graphics();
    overlay.fillStyle(0x0a0608, 0.35).fillRect(0, 36, W - 280, H - 36);

    const tbar = this.add.graphics();
    tbar.fillStyle(0x2a2218).fillRect(0, 0, W, 36);
    tbar.fillStyle(0xd4b870).fillRect(0, 36, W, 1);
    this.add.text(12, 6, "BANANA HOLDINGS · ETASJE 23", {
      fontFamily: "VT323, monospace", fontSize: "18px", color: "#d4b870",
    });
    this.clock = this.add.text(W - 12, 6, this.now(), {
      fontFamily: "VT323, monospace", fontSize: "18px", color: "#d4b870",
    }).setOrigin(1, 0);
    this.time.addEvent({
      delay: 1000, loop: true, callback: () => this.clock.setText(this.now()),
    });

    const labels = [
      { x: 0.13, y: 0.32, name: "Reidar", role: "janitor" },
      { x: 0.32, y: 0.42, name: "Espen", role: "trader" },
      { x: 0.58, y: 0.38, name: "Knut", role: "risk" },
      { x: 0.74, y: 0.52, name: "Gunnar", role: "Equinor" },
      { x: 0.45, y: 0.68, name: "Diamond", role: "WSB" },
      { x: 0.18, y: 0.62, name: "Bjarne", role: "research" },
    ];
    labels.forEach((l, i) => {
      const x = l.x * (W - 280) + 6;
      const y = l.y * (H - 36) + 36;
      const tag = this.add.container(x, y);
      const bgT = this.add.graphics();
      bgT.fillStyle(0x1a1410, 0.92).fillRoundedRect(-44, -8, 88, 16, 2);
      bgT.lineStyle(1, 0xd4b870).strokeRoundedRect(-44, -8, 88, 16, 2);
      tag.add(bgT);
      const t = this.add.text(0, -1, l.name + " · " + l.role, {
        fontFamily: "VT323, monospace", fontSize: "11px", color: "#d4b870",
      }).setOrigin(0.5);
      tag.add(t);
      tag.setAlpha(0);
      this.tweens.add({
        targets: tag, alpha: 1, duration: 300, delay: 600 + i * 120,
      });
    });

    const sideX = W - 280 + 8;
    const sideW = 268;
    const sideG = this.add.graphics();
    sideG.fillStyle(0x1a1410).fillRect(sideX, 36, sideW, H - 36);
    sideG.lineStyle(1, 0xd4b870).strokeRect(sideX, 36, sideW, H - 36);

    this.add.text(sideX + 12, 50, "DAGENS SCOOP-FEED", {
      fontFamily: "VT323, monospace", fontSize: "16px", color: "#d4b870",
    });

    const feed = [
      { t: "10:42", who: "Gunnar", msg: "Brent +1,1 %, EQNR følger", color: "#3a9a3a" },
      { t: "10:36", who: "Diamond", msg: "GME +3 %, må kjøpe mer 🚀", color: "#ff8a40" },
      { t: "10:21", who: "Knut", msg: "VaR for høy, Espen blokkeres", color: "#ff6a6a" },
      { t: "09:58", who: "Bjarne", msg: "YAR Q2 i morgen — sjekk forventninger", color: "#d4b870" },
      { t: "09:42", who: "Satoshi", msg: "BTC tester 65k motstand", color: "#aa6aff" },
      { t: "09:15", who: "Wolf", msg: "MORGENMØTE NÅ", color: "#fafaf0" },
    ];
    feed.forEach((row, i) => {
      const y = 78 + i * 56;
      this.add.text(sideX + 12, y, row.t, {
        fontFamily: "VT323, monospace", fontSize: "12px", color: "#7a5a3a",
      });
      this.add.text(sideX + 56, y, row.who, {
        fontFamily: "VT323, monospace", fontSize: "13px", color: row.color,
      });
      this.add.text(sideX + 12, y + 18, row.msg, {
        fontFamily: "VT323, monospace", fontSize: "13px",
        color: "#fafaf0", wordWrap: { width: sideW - 24 },
      });
    });

    const pnlY = H - 100;
    const pnlG = this.add.graphics();
    pnlG.fillStyle(0x2a2218).fillRect(sideX + 8, pnlY, sideW - 16, 80);
    pnlG.lineStyle(1, 0x3a9a3a).strokeRect(sideX + 8, pnlY, sideW - 16, 80);
    this.add.text(sideX + sideW / 2, pnlY + 12, "DAGENS PnL", {
      fontFamily: "VT323, monospace", fontSize: "14px", color: "#d4b870",
    }).setOrigin(0.5);
    this.add.text(sideX + sideW / 2, pnlY + 38, "+ 1 247 kr", {
      fontFamily: "VT323, monospace", fontSize: "28px", color: "#3a9a3a",
    }).setOrigin(0.5);
    this.add.text(sideX + sideW / 2, pnlY + 62, "+0,8 % · uke +3,4 %", {
      fontFamily: "VT323, monospace", fontSize: "12px", color: "#7a5a3a",
    }).setOrigin(0.5);

    const banner = this.add.container(W / 2, H / 2);
    const bbg = this.add.graphics();
    bbg.fillStyle(0x1a1410, 0.95).fillRoundedRect(-260, -50, 520, 100, 6);
    bbg.lineStyle(2, 0xd4b870).strokeRoundedRect(-260, -50, 520, 100, 6);
    banner.add(bbg);
    banner.add(this.add.text(0, -18, "BANANA HOLDINGS · ETASJE 23", {
      fontFamily: "VT323, monospace", fontSize: "22px", color: "#d4b870",
    }).setOrigin(0.5));
    banner.add(this.add.text(0, 12, "Kenney-assets · ekte pixel art · fase 1.1", {
      fontFamily: "VT323, monospace", fontSize: "14px", color: "#fafaf0",
    }).setOrigin(0.5));
    banner.setAlpha(0);
    this.tweens.add({ targets: banner, alpha: 1, duration: 600 });
    this.tweens.add({ targets: banner, alpha: 0, duration: 600, delay: 2400 });

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
