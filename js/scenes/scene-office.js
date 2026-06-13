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
  }

  create() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "1") return this.debug();

    const W = this.cameras.main.width;
    const H = this.cameras.main.height;
    const SCALE = 3;
    const T = 16 * SCALE;

    this.cameras.main.setBackgroundColor(0x0a0608);

    const sideW = 260;
    const roomW = W - sideW;
    const roomTilesX = Math.ceil(roomW / T);
    const roomTilesY = Math.ceil((H - 36) / T);

    const FLOOR = 286;
    const WALL_TOP = 28;
    const WALL_VERT = 53;
    const WALL_CORNER_L = 27;
    const WALL_CORNER_R = 29;
    const RUG = 295;
    const DESK = 220;
    const COMPUTER = 80;
    const PLANT = 99;
    const CHAIR = 155;
    const PAINTING = 4;
    const DOOR = 211;

    for (let y = 1; y < roomTilesY; y++) {
      for (let x = 0; x < roomTilesX; x++) {
        this.add.image(x * T + T / 2, 36 + y * T + T / 2, "indoor", FLOOR)
          .setScale(SCALE);
      }
    }

    for (let x = 0; x < roomTilesX; x++) {
      this.add.image(x * T + T / 2, 36 + T / 2, "indoor", WALL_TOP)
        .setScale(SCALE);
    }
    this.add.image(T / 2, 36 + T / 2, "indoor", WALL_CORNER_L).setScale(SCALE);
    this.add.image((roomTilesX - 1) * T + T / 2, 36 + T / 2, "indoor", WALL_CORNER_R)
      .setScale(SCALE);

    const deskPositions = [
      { tx: 2, ty: 3, name: "Bjarne", role: "research", charFrame: 25 },
      { tx: 6, ty: 3, name: "Espen", role: "trader", charFrame: 27 },
      { tx: 10, ty: 3, name: "Knut", role: "risk", charFrame: 29 },
      { tx: 2, ty: 6, name: "Gunnar", role: "Equinor", charFrame: 31 },
      { tx: 6, ty: 6, name: "Diamond", role: "WSB", charFrame: 35 },
      { tx: 10, ty: 6, name: "Wolf", role: "CEO", charFrame: 19 },
    ];

    deskPositions.forEach((d) => {
      const x = d.tx * T + T / 2;
      const y = 36 + d.ty * T + T / 2;
      this.add.image(x, y, "indoor", DESK).setScale(SCALE);
      this.add.image(x, y - T * 0.4, "indoor", COMPUTER).setScale(SCALE);
      this.add.image(x, y + T * 0.9, "chars", d.charFrame).setScale(SCALE);

      const tag = this.add.container(x, y + T * 1.7);
      const tagBg = this.add.graphics();
      tagBg.fillStyle(0x1a1410, 0.95).fillRoundedRect(-36, -8, 72, 16, 2);
      tagBg.lineStyle(1, 0xd4b870).strokeRoundedRect(-36, -8, 72, 16, 2);
      tag.add(tagBg);
      tag.add(this.add.text(0, -1, d.name, {
        fontFamily: "VT323, monospace", fontSize: "11px", color: "#d4b870",
      }).setOrigin(0.5));
      tag.setAlpha(0);
      this.tweens.add({ targets: tag, alpha: 1, duration: 300, delay: 400 });
    });

    this.add.image(1.5 * T, 36 + 1.5 * T, "indoor", PAINTING).setScale(SCALE);
    this.add.image(5.5 * T, 36 + 1.5 * T, "indoor", PAINTING).setScale(SCALE);
    this.add.image(9.5 * T, 36 + 1.5 * T, "indoor", PAINTING).setScale(SCALE);
    this.add.image(0.5 * T, 36 + 9 * T, "indoor", PLANT).setScale(SCALE);
    this.add.image((roomTilesX - 1.5) * T, 36 + 9 * T, "indoor", PLANT).setScale(SCALE);

    const tbar = this.add.graphics();
    tbar.fillStyle(0x2a2218).fillRect(0, 0, W, 36);
    tbar.fillStyle(0xd4b870).fillRect(0, 36, W, 1);
    this.add.text(12, 6, "BANANA HOLDINGS · ETASJE 23", {
      fontFamily: "VT323, monospace", fontSize: "18px", color: "#d4b870",
    });
    this.clock = this.add.text(W - 12, 6, this.now(), {
      fontFamily: "VT323, monospace", fontSize: "18px", color: "#d4b870",
    }).setOrigin(1, 0);
    this.time.addEvent({ delay: 1000, loop: true,
      callback: () => this.clock.setText(this.now()) });

    const sideX = W - sideW;
    const sideG = this.add.graphics();
    sideG.fillStyle(0x1a1410).fillRect(sideX, 36, sideW, H - 36);
    sideG.lineStyle(1, 0xd4b870).strokeRect(sideX, 36, sideW, H - 36);

    this.add.text(sideX + 12, 50, "DAGENS SCOOP-FEED", {
      fontFamily: "VT323, monospace", fontSize: "16px", color: "#d4b870",
    });
    const feed = [
      { t: "10:42", who: "Gunnar", msg: "Brent +1,1 %, EQNR følger", c: "#3a9a3a" },
      { t: "10:36", who: "Diamond", msg: "GME +3 %, må kjøpe mer", c: "#ff8a40" },
      { t: "10:21", who: "Knut", msg: "VaR for høy, Espen blokkeres", c: "#ff6a6a" },
      { t: "09:58", who: "Bjarne", msg: "YAR Q2 i morgen", c: "#d4b870" },
      { t: "09:15", who: "Wolf", msg: "MORGENMØTE NÅ", c: "#fafaf0" },
    ];
    feed.forEach((row, i) => {
      const y = 78 + i * 50;
      this.add.text(sideX + 12, y, row.t, {
        fontFamily: "VT323, monospace", fontSize: "12px", color: "#7a5a3a",
      });
      this.add.text(sideX + 56, y, row.who, {
        fontFamily: "VT323, monospace", fontSize: "13px", color: row.c,
      });
      this.add.text(sideX + 12, y + 18, row.msg, {
        fontFamily: "VT323, monospace", fontSize: "13px", color: "#fafaf0",
        wordWrap: { width: sideW - 24 },
      });
    });

    const pnlY = H - 110;
    this.add.graphics()
      .fillStyle(0x2a2218).fillRect(sideX + 8, pnlY, sideW - 16, 90)
      .lineStyle(1, 0x3a9a3a).strokeRect(sideX + 8, pnlY, sideW - 16, 90);
    this.add.text(sideX + sideW / 2, pnlY + 14, "DAGENS PnL", {
      fontFamily: "VT323, monospace", fontSize: "14px", color: "#d4b870",
    }).setOrigin(0.5);
    this.add.text(sideX + sideW / 2, pnlY + 44, "+ 1 247 kr", {
      fontFamily: "VT323, monospace", fontSize: "30px", color: "#3a9a3a",
    }).setOrigin(0.5);
    this.add.text(sideX + sideW / 2, pnlY + 72, "+0,8 % · uke +3,4 %", {
      fontFamily: "VT323, monospace", fontSize: "12px", color: "#7a5a3a",
    }).setOrigin(0.5);

    this.add.text(12, H - 18, "?debug=1 = tile-picker", {
      fontFamily: "VT323, monospace", fontSize: "10px", color: "#5a4a3a",
    });

    addSkipButton(this, () => {
      const btn = document.getElementById("skip-intro");
      if (btn) btn.remove();
    });
  }

  debug() {
    const W = this.cameras.main.width;
    const H = this.cameras.main.height;
    const SCALE = 2;
    const T = 16 * SCALE;
    const COLS = 26;
    const ROWS = 17;

    this.cameras.main.setBackgroundColor(0x1a1410);
    this.add.text(8, 4, "INDOOR TILES (26x17 = 442 frames)", {
      fontFamily: "VT323, monospace", fontSize: "14px", color: "#d4b870",
    });

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = r * COLS + c;
        const x = c * (T + 8) + 20;
        const y = r * (T + 12) + 30;
        if (x > W - 30 || y > H - 30) continue;
        this.add.image(x + T / 2, y + T / 2, "indoor", idx).setScale(SCALE);
        this.add.text(x + T / 2, y + T + 1, String(idx), {
          fontFamily: "VT323, monospace", fontSize: "8px", color: "#7a5a3a",
        }).setOrigin(0.5, 0);
      }
    }
  }

  now() {
    const d = new Date();
    return d.toLocaleTimeString("nb-NO", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }
}
