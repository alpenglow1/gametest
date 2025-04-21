import { UnitScaler } from "./utils/UnitScaler.js";

// Create a global UnitScaler instance to be used by other classes, set reference size to 1000x750
window.scaler = new UnitScaler(1000, 750);
// window.scaler.resize(windowHeight * 4 / 3, windowHeight);

import { Game } from "./core/Game.js";
import { GameMode } from "./config/GameMode.js";
import { AssetManager } from "./ui/AssetManager.js";

// Main game instance
let game;
let assetManager;

function preload() {
  assetManager = new AssetManager();
  window.assetManager = assetManager;
  assetManager.preload();
}
// Set current game mode - change to NORMAL for regular play
window.currentGameMode = GameMode.NORMAL;

// p5.js setup function - increase canvas size to fill 80% of the window
function setup() {
  const canvasHeight = Math.max(window.innerHeight, 600);
  const canvasWidth = Math.max(canvasHeight * 4 / 3, 800); // 4:3 aspect ratio
  
  // p5.js createCanvas function, set canvas size, auto add two global var: width, height
  createCanvas(canvasWidth, canvasHeight);

  // initialize the UnitScaler instance
  window.scaler.resize(canvasWidth, canvasHeight);

  game = new Game();
}

// p5.js window resize function
function windowResized() {
  const canvasHeight = Math.max(window.innerHeight, 600);
  const canvasWidth = Math.max(canvasHeight * 4 / 3, 800);
  resizeCanvas(canvasWidth, canvasHeight);

  // update the UnitScaler instance
  window.scaler.resize(canvasWidth, canvasHeight);

  // update game dimensions
  if (game) {
    game.updateGameDimensions();
  }
}

// p5.js draw function
function draw() {
  game.draw();
}

// p5.js event handlers
function mouseClicked() {
  game.handleMouseClicked();
}

function keyPressed() {
  game.handleKeyPressed(keyCode);
}

function keyReleased() {
  game.handleKeyReleased(keyCode);
}

window.preload = preload;
window.setup = setup;
window.windowResized = windowResized;
window.draw = draw;
window.mouseClicked = mouseClicked;
window.keyPressed = keyPressed;
window.keyReleased = keyReleased;