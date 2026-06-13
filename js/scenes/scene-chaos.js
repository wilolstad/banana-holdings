"use strict";

class SceneChaos extends Phaser.Scene {
  constructor() { super({ key: "SceneChaos" }); }
  create() { this.scene.start("SceneOffice"); }
}
