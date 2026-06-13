"use strict";

const PALETTE = {
  bg: 0x08060a,
  cream: 0xf3ebd9,
  creamDark: 0xe8dfc4,
  mahogany: 0x4a3020,
  mahoganyDark: 0x2a1810,
  mahoganyMid: 0x5a3520,
  brass: 0xd4b870,
  burgundy: 0x7a1a1a,
  burgundyLight: 0x9a2a2a,
  green: 0x3a9a3a,
  red: 0xcc3030,
  amber: 0xffa040,
  cyan: 0x88ddff,
  night: 0x1a1240,
  nightLight: 0x2a1f60,
  taxi: 0xffc820,
  taxiDark: 0xc89818,
  skin: 0xc89868,
  skinDark: 0xa07848,
  fur: 0x4a3020,
};

const CFG = {
  width: 960,
  height: 540,
};

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: CFG.width,
  height: CFG.height,
  backgroundColor: PALETTE.bg,
  pixelArt: true,
  roundPixels: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [SceneTaxi, SceneLobby, SceneElevator, SceneChaos, SceneOffice],
  callbacks: {
    postBoot: () => {
      const boot = document.getElementById("boot");
      if (boot) {
        boot.classList.add("hidden");
        setTimeout(() => boot.remove(), 600);
      }
    },
  },
};

window.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("boot-status");
  if (status) status.textContent = "Initializing Phaser…";
  new Phaser.Game(config);
});

window.addPixelLabel = (scene, x, y, text, size = 18, color = "#d4b870") =>
  scene.add.text(x, y, text, {
    fontFamily: "VT323, monospace",
    fontSize: `${size}px`,
    color: color,
  }).setOrigin(0.5);

window.addSkipButton = (scene, onSkip) => {
  const btn = document.createElement("button");
  btn.id = "skip-intro";
  btn.textContent = "HOPP OVER INTRO →";
  btn.onclick = () => {
    btn.remove();
    onSkip();
  };
  document.body.appendChild(btn);
  scene.events.once("shutdown", () => btn.remove());
};
