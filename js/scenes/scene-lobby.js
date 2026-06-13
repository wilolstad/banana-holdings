"use strict";

class SceneLobby extends Phaser.Scene {
  constructor() { super({ key: "SceneLobby" }); }
  create() { this.scene.start("SceneElevator"); }
}
