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

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// ====================
// CREATE INITIAL SHIPS
// ====================

function createInitialChar() {

    entityManager.generateChar({
        cx : 100,
        cy : 502
    });

    entityManager.generatePallur({
        cx : 300,
        cy : 420
    });
}

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
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

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_MIXED   = keyCode('M');;
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_HALT)) entityManager.haltShips();

    if (eatKey(KEY_RESET)) entityManager.resetShips();

    if (eatKey(KEY_0)) entityManager.toggleRocks();

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
        charR     : "./images/new/joe1.png",
        charL     : "./images/new/joe1l.png",
        charRr1   : "./images/new/joe2.png",
        charLr1   : "./images/new/joe2l.png",
        charRr2   : "./images/new/joe3.png",
        charLr2   : "./images/new/joe3l.png",
        charRr3   : "./images/new/joe4.png",
        charLr3   : "./images/new/joe4l.png",
        charRs    : "./images/new/joe5.png",
        charLs    : "./images/new/joe5l.png",
        charRsr1  : "./images/new/joe6.png",
        charLsr1  : "./images/new/joe6l.png",
        charRsr2  : "./images/new/joe7.png",
        charLsr2  : "./images/new/joe7l.png",
        charRsr3  : "./images/new/joe8.png",
        charLsr3  : "./images/new/joe8l.png",
        charRj    : "./images/new/joe9.png",
        charLj    : "./images/new/joe9l.png",
        charRsj   : "./images/new/joe10.png",
        charLsj   : "./images/new/joe10l.png",

        gunshot: "./images/gunshot.png"
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
        g_sprites.jumpshoot = new Sprite(g_images.charRsj)
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
        g_sprites.jumpshoot = new Sprite(g_images.charLsj)
    ];

    g_sprites.bullet = new Sprite(g_images.gunshot);
    g_sprites.bullet.scale = 2;

    createInitialChar();

    main.init();
}

// Kick it off
requestPreloads();
