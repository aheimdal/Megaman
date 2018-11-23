// =========
// ASTEROIDS
// =========
/*

A sort-of-playable version of the classic arcade game.


HOMEWORK INSTRUCTIONS:

You have some "TODO"s to fill in again, particularly in:

spatialManager.js

But also, to a lesser extent, in:

Rock.js
Bullet.js
Ship.js


...Basically, you need to implement the core of the spatialManager,
and modify the Rock/Bullet/Ship to register (and unregister)
with it correctly, so that they can participate in collisions.

Be sure to test the diagnostic rendering for the spatialManager,
as toggled by the 'X' key. We rely on that for marking. My default
implementation will work for the "obvious" approach, but you might
need to tweak it if you do something "non-obvious" in yours.
*/

// ========================================
// Eslint villutékk
// ========================================
/* eslint-env browser */
/* eslint camelcase: [0] */
/* eslint-disable no-param-reassign */
/* eslint no-use-before-define: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-var: 0 */
/* eslint vars-on-top: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint object-shorthand: 0 */
/* eslint func-names: 0 */
/* eslint quotes: 0 */
/* eslint space-infix-ops: 0 */
/* eslint linebreak-style: 0 */
/* eslint no-shadow: 0 */
/* eslint no-plusplus: 0 */
/* eslint guard-for-in: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint block-scoped-var: 0 */
/* eslint no-redeclare: 0 */
/* eslint padded-blocks: 0 */
/* eslint key-spacing: 0 */
/* eslint indent: 0 */
/* eslint new-cap: 0 */
/* eslint no-continue: 0 */
/* eslint no-useless-return: 0 */
/* eslint prefer-destructuring: 0 */
/* eslint no-unused-expressions: 0 */
/* eslint brace-style: 0 */
/* eslint no-multi-spaces: 0 */
/* eslint no-lonely-if: 0 */
/* eslint no-else-return: 0 */
/* eslint no-mixed-operators: 0 */
/* eslint one-var: 0 */
/* eslint no-prototype-builtins: 0 */
// ========================================

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

var GameState = 0;

// ====================
// CREATE INITIAL CHAR
// ====================

function createInitialChar() {

  entityManager.generateChar({
    cx : 100,
    cy : 502,
  });

}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {

  processDiagnostics();

  entityManager.update(du);

  // Prevent perpetual firing!
  eatKey(Char.prototype.KEY_FIRE);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_renderSpatialDebug = false;

var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_K = keyCode('K');

function processDiagnostics() {

  if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

  entityManager.render(ctx);

  if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

  var requiredImages = {
    // Main Character
    charR     : "./images/Sprites & Tiles/joe1.png",
    charL     : "./images/Sprites & Tiles/joe1l.png",
    charRr1   : "./images/Sprites & Tiles/joe2.png",
    charLr1   : "./images/Sprites & Tiles/joe2l.png",
    charRr2   : "./images/Sprites & Tiles/joe3.png",
    charLr2   : "./images/Sprites & Tiles/joe3l.png",
    charRr3   : "./images/Sprites & Tiles/joe4.png",
    charLr3   : "./images/Sprites & Tiles/joe4l.png",
    charRs    : "./images/Sprites & Tiles/joe5.png",
    charLs    : "./images/Sprites & Tiles/joe5l.png",
    charRsr1  : "./images/Sprites & Tiles/joe6.png",
    charLsr1  : "./images/Sprites & Tiles/joe6l.png",
    charRsr2  : "./images/Sprites & Tiles/joe7.png",
    charLsr2  : "./images/Sprites & Tiles/joe7l.png",
    charRsr3  : "./images/Sprites & Tiles/joe8.png",
    charLsr3  : "./images/Sprites & Tiles/joe8l.png",
    charRj    : "./images/Sprites & Tiles/joe9.png",
    charLj    : "./images/Sprites & Tiles/joe9l.png",
    charRsj   : "./images/Sprites & Tiles/joe10.png",
    charLsj   : "./images/Sprites & Tiles/joe10l.png",
    charRH    : "./images/Sprites & Tiles/joe12.png",
    charLH    : "./images/Sprites & Tiles/joe12l.png",
    charRHJ    : "./images/Sprites & Tiles/joe11.png",
    charLHJ    : "./images/Sprites & Tiles/joe11l.png",

    // Golem
    golemR1   : "./images/Sprites & Tiles/golem1.png",
    golemL1   : "./images/Sprites & Tiles/golem1l.png",
    golemR2   : "./images/Sprites & Tiles/golem2.png",
    golemL2   : "./images/Sprites & Tiles/golem2l.png",
    golemTR   : "./images/Sprites & Tiles/golem3.png",
    golemTL   : "./images/Sprites & Tiles/golem3l.png",
    // Golem hurt
    golemHR   : "./images/Sprites & Tiles/golem4.png",
    golemHL   : "./images/Sprites & Tiles/golem4l.png",
    golemD    : "./images/Sprites & Tiles/golem5.png",

    // Goblin
    goblinStR  : "./images/Sprites & Tiles/goblin1.png",
    goblinStL  : "./images/Sprites & Tiles/goblin1l.png",
    goblinSR   : "./images/Sprites & Tiles/goblin2.png",
    goblinSL   : "./images/Sprites & Tiles/goblin2l.png",
    goblinJR   : "./images/Sprites & Tiles/goblin3.png",
    goblinJL   : "./images/Sprites & Tiles/goblin3l.png",
    // Goblin hurt
    goblinRH   : "./images/Sprites & Tiles/goblin4.png",
    goblinLH   : "./images/Sprites & Tiles/goblin4l.png",

    // Boss
    bossR     : "./images/Sprites & Tiles/hugrun01.png",
    bossL     : "./images/Sprites & Tiles/hugrun01l.png",
    bossRr1   : "./images/Sprites & Tiles/hugrun03.png",
    bossLr1   : "./images/Sprites & Tiles/hugrun03l.png",
    bossRr2   : "./images/Sprites & Tiles/hugrun04.png",
    bossLr2   : "./images/Sprites & Tiles/hugrun04l.png",
    bossRr3   : "./images/Sprites & Tiles/hugrun05.png",
    bossLr3   : "./images/Sprites & Tiles/hugrun05l.png",
    bossRs    : "./images/Sprites & Tiles/hugrun02.png",
    bossLs    : "./images/Sprites & Tiles/hugrun02l.png",
    bossRsr1  : "./images/Sprites & Tiles/hugrun07.png",
    bossLsr1  : "./images/Sprites & Tiles/hugrun07l.png",
    bossRsr2  : "./images/Sprites & Tiles/hugrun08.png",
    bossLsr2  : "./images/Sprites & Tiles/hugrun08l.png",
    bossRsr3  : "./images/Sprites & Tiles/hugrun09.png",
    bossLsr3  : "./images/Sprites & Tiles/hugrun09l.png",
    bossRj    : "./images/Sprites & Tiles/hugrun06.png",
    bossLj    : "./images/Sprites & Tiles/hugrun06l.png",
    bossRsj   : "./images/Sprites & Tiles/hugrun10.png",
    bossLsj   : "./images/Sprites & Tiles/hugrun10l.png",

    // Various sprites
    healthPickup: "./images/Sprites & Tiles/healthPickup.png",
    spikes      : "./images/Sprites & Tiles/spike.png",
    gunshot     : "./images/Sprites & Tiles/gunshot.png",
    rocket      : "./images/Sprites & Tiles/rock.png",
    bottleboli  : "./images/Sprites & Tiles/bottleboli.png",
    coin        : "./images/Sprites & Tiles/goldcoin.png",

    // Dark tiles
    tiles      : "./images/Sprites & Tiles/kubbur2.png",

  };

  imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

  g_sprites.CharR = [
    g_sprites.stand     = new Sprite(g_images.charR),
    g_sprites.run1      = new Sprite(g_images.charRr1),
    g_sprites.run2      = new Sprite(g_images.charRr2),
    g_sprites.run3      = new Sprite(g_images.charRr3),
    g_sprites.shoot     = new Sprite(g_images.charRs),
    g_sprites.runshoot1 = new Sprite(g_images.charRsr1),
    g_sprites.runshoot2 = new Sprite(g_images.charRsr2),
    g_sprites.runshoot3 = new Sprite(g_images.charRsr3),
    g_sprites.jump      = new Sprite(g_images.charRj),
    g_sprites.jumpshoot = new Sprite(g_images.charRsj),
    g_sprites.hurt      = new Sprite(g_images.charRH),
    g_sprites.hurtjump  = new Sprite(g_images.charRHJ),
  ];
  g_sprites.CharL = [
    g_sprites.stand     = new Sprite(g_images.charL),
    g_sprites.run1      = new Sprite(g_images.charLr1),
    g_sprites.run2      = new Sprite(g_images.charLr2),
    g_sprites.run3      = new Sprite(g_images.charLr3),
    g_sprites.shoot     = new Sprite(g_images.charLs),
    g_sprites.runshoot1 = new Sprite(g_images.charLsr1),
    g_sprites.runshoot2 = new Sprite(g_images.charLsr2),
    g_sprites.runshoot3 = new Sprite(g_images.charLsr3),
    g_sprites.jump      = new Sprite(g_images.charLj),
    g_sprites.jumpshoot = new Sprite(g_images.charLsj),
    g_sprites.hurt      = new Sprite(g_images.charLH),
    g_sprites.hurtjump  = new Sprite(g_images.charLHJ),
  ];

  g_sprites.BossR = [
    g_sprites.stand     = new Sprite(g_images.bossR),
    g_sprites.run1      = new Sprite(g_images.bossRr1),
    g_sprites.run2      = new Sprite(g_images.bossRr2),
    g_sprites.run3      = new Sprite(g_images.bossRr3),
    g_sprites.shoot     = new Sprite(g_images.bossRs),
    g_sprites.runshoot1 = new Sprite(g_images.bossRsr1),
    g_sprites.runshoot2 = new Sprite(g_images.bossRsr2),
    g_sprites.runshoot3 = new Sprite(g_images.bossRsr3),
    g_sprites.jump      = new Sprite(g_images.bossRj),
    g_sprites.jumpshoot = new Sprite(g_images.bossRsj),
  ];
  g_sprites.BossL = [
    g_sprites.stand     = new Sprite(g_images.bossL),
    g_sprites.run1      = new Sprite(g_images.bossLr1),
    g_sprites.run2      = new Sprite(g_images.bossLr2),
    g_sprites.run3      = new Sprite(g_images.bossLr3),
    g_sprites.shoot     = new Sprite(g_images.bossLs),
    g_sprites.runshoot1 = new Sprite(g_images.bossLsr1),
    g_sprites.runshoot2 = new Sprite(g_images.bossLsr2),
    g_sprites.runshoot3 = new Sprite(g_images.bossLsr3),
    g_sprites.jump      = new Sprite(g_images.bossLj),
    g_sprites.jumpshoot = new Sprite(g_images.bossLsj),
  ];

  g_sprites.golem = [
    g_sprites.run1R = new Sprite(g_images.golemR1),
    g_sprites.run2R = new Sprite(g_images.golemR2),
    g_sprites.run1L = new Sprite(g_images.golemL1),
    g_sprites.run2L = new Sprite(g_images.golemL2),
    g_sprites.runTR = new Sprite(g_images.golemTR),
    g_sprites.runTL = new Sprite(g_images.golemTL),
    // Added hurt sprite
    g_sprites.hurtR = new Sprite(g_images.golemHR),
    g_sprites.hurtL = new Sprite(g_images.golemHL),
    g_sprites.death = new Sprite(g_images.golemD),
  ];

  g_sprites.goblin = [
    g_sprites.standR = new Sprite(g_images.goblinStR),
    g_sprites.standL = new Sprite(g_images.goblinStL),
    g_sprites.shootR = new Sprite(g_images.goblinSR),
    g_sprites.shootL = new Sprite(g_images.goblinSL),
    g_sprites.jumpR = new Sprite(g_images.goblinJR),
    g_sprites.JumpL = new Sprite(g_images.goblinJL),
    // Added hurt sprite
    g_sprites.hurtR = new Sprite(g_images.goblinRH),
    g_sprites.hurtL = new Sprite(g_images.goblinLH),
  ];

  g_sprites.spikes = new Sprite(g_images.spikes);
  g_sprites.healthPickup = new Sprite(g_images.healthPickup);

  g_sprites.bullet = new Sprite(g_images.gunshot);
  g_sprites.bullet.scale = 2;
  g_sprites.rocket = new Sprite(g_images.rocket);
  g_sprites.bottleboli = new Sprite(g_images.bottleboli);
  g_sprites.bottleboli.scale = 4;

  // Tiles
  g_sprites.tiles = new Sprite(g_images.tiles);

  createInitialChar();

  main.init();

}

// Kick it off
requestPreloads();
