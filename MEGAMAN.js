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

var GameState = 0;

// ====================
// CREATE INITIAL CHAR
// ====================

function createInitialChar() {

    entityManager.generateChar({
        cx : 100,
        cy : 502
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

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;

var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

function processDiagnostics() {

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
        charRH    : "./images/new/joe12.png",
        charLH    : "./images/new/joe12l.png",
        charRHJ    : "./images/new/joe11.png",
        charLHJ    : "./images/new/joe11l.png",

        golemR1   : "./images/new/golem1.png",
        golemL1   : "./images/new/golem1l.png",
        golemR2   : "./images/new/golem2.png",
        golemL2   : "./images/new/golem2l.png",
        golemTR   : "./images/new/golem3.png",
        golemTL   : "./images/new/golem3l.png",

        goblinStR  : "./images/new/goblin1.png",
        goblinStL  : "./images/new/goblin1l.png",
        goblinSR   : "./images/new/goblin2.png",
        goblinSL   : "./images/new/goblin2l.png",
        goblinJR   : "./images/new/goblin3.png",
        goblinJL   : "./images/new/goblin3l.png",

        bossR     : "./images/new/hugrun01.png",
        bossL     : "./images/new/hugrun01l.png",
        bossRr1   : "./images/new/hugrun03.png",
        bossLr1   : "./images/new/hugrun03l.png",
        bossRr2   : "./images/new/hugrun04.png",
        bossLr2   : "./images/new/hugrun04l.png",
        bossRr3   : "./images/new/hugrun05.png",
        bossLr3   : "./images/new/hugrun05l.png",
        bossRs    : "./images/new/hugrun02.png",
        bossLs    : "./images/new/hugrun02l.png",
        bossRsr1  : "./images/new/hugrun07.png",
        bossLsr1  : "./images/new/hugrun07l.png",
        bossRsr2  : "./images/new/hugrun08.png",
        bossLsr2  : "./images/new/hugrun08l.png",
        bossRsr3  : "./images/new/hugrun09.png",
        bossLsr3  : "./images/new/hugrun09l.png",
        bossRj    : "./images/new/hugrun06.png",
        bossLj    : "./images/new/hugrun06l.png",
        bossRsj   : "./images/new/hugrun10.png",
        bossLsj   : "./images/new/hugrun10l.png",

        healthPickup: "./images/new/healthPickup.png",
        spikes      : "./images/new/spike.png",
        gunshot     : "./images/gunshot.png",
        rocket      : "./images/new/rock.png",
        bottleboli  : "./images/bottleboli.png",
        coin        : "./images/goldcoin.png",

        tiles       : "./images/kubbur.jpg",
        tiles2      : "./images/kubbur2.jpg"


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
        g_sprites.hurtjump  = new Sprite(g_images.charRHJ)
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
        g_sprites.hurtjump  = new Sprite(g_images.charLHJ)
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
        g_sprites.jumpshoot = new Sprite(g_images.bossRsj)
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
        g_sprites.jumpshoot = new Sprite(g_images.bossLsj)
    ];

    g_sprites.golem = [
        g_sprites.run1R = new Sprite(g_images.golemR1),
        g_sprites.run2R = new Sprite(g_images.golemR2),
        g_sprites.run1L = new Sprite(g_images.golemL1),
        g_sprites.run2L = new Sprite(g_images.golemL2),
        g_sprites.runTR = new Sprite(g_images.golemTR),
        g_sprites.runTL = new Sprite(g_images.golemTL)
    ];

    g_sprites.goblin = [
        g_sprites.standR = new Sprite(g_images.goblinStR),
        g_sprites.standL = new Sprite(g_images.goblinStL),
        g_sprites.shootR = new Sprite(g_images.goblinSR),
        g_sprites.shootL = new Sprite(g_images.goblinSL),
        g_sprites.jumpR = new Sprite(g_images.goblinJR),
        g_sprites.JumpL = new Sprite(g_images.goblinJL)
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
    g_sprites.tiles2 = new Sprite(g_images.tiles2);

    createInitialChar();

    /*
    AudioBank.songOne.loop = true;
    AudioBank.songTwo.loop = true;
    AudioBank.songThree.loop = true;
    AudioBank.songFour.loop = true;
    */

    main.init();

    //levelTransition.changeLevel();

}

// Kick it off
requestPreloads();
