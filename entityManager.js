/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/

var entityManager = {

// "PRIVATE" DATA

_rocks   : [],
_bullets : [],
_char   : [],
_platforms : [],
_enemyTwo : [],
_enemyThree : [],
_enemyFour : [],
_rockets : [],
_boss : [],
_bossshoots : [],
_spikes : [],
_healthP : [],


// "PRIVATE" METHODS

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._bullets,
        this._platforms, this._boss, this._bossshoots,
        this._spikes, this._healthP,
        this._enemyTwo, this._enemyThree, this._enemyFour, this._rockets,
        this._char];
},


fireBullet: function(cx, cy, velX, velY, rotation) {
    if (this._bullets[2] == null) {
        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy,
            velX : velX,
            velY : velY,
            rotation : rotation
        }));
    }
},

fireRocket: function(cx, cy, velX, velY, rotation) {
    this._rockets.push(new Rocket({
        cx : cx,
        cy : cy,
        velX : velX,
        velY : velY,
        rotation : rotation
    }));
},

fireBossShoot: function(cx, cy, velX, velY, rotation) {
    this._bossshoots.push(new BossShoot({
        cx   : cx,
        cy   : cy,
        velX : velX,
        velY : velY,
        rotation : rotation
    }));
},

generateChar : function(descr) {
    this._char.push(new Char(descr));
},

generatePlatform : function(descr) {
    this._platforms.push(new Platform(descr));
},

generateEnemyTwo : function(descr) {
    this._enemyTwo.push(new enemyTwo(descr));
},

generateEnemyThree : function(descr) {
    this._enemyThree.push(new enemyThree(descr));
},

generateEnemyFour : function(descr) {
    this._enemyFour.push(new enemyFour(descr));
},

generateSpikes : function(descr) {
    this._spikes.push(new Spikes(descr));
},

generateHealthPickup : function(descr) {
    if (!this._healthP[0]) this._healthP.push(new HealthPickup(descr));
},

generateBoss : function(descr) {
    this._boss.push(new Boss(descr));
},

resetChar: function() {
    this._forEachOf(this._char, Char.prototype.reset);
},

haltChar: function() {
    this._forEachOf(this._char, Char.prototype.halt);
},


update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {

            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }

    }

    if (this.isClear()) levelTransition.changeLevel();

    if (this._char[0] != null) {
        animationHandle.update(this._char[0]);
        //We go to "background.js" and get the map
        background.canvasSpaceGame(background.getMap());
        background.imgHeart(this._char[0].health);

    }

},

render: function(ctx) {

    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        if (!this._bShowRocks &&
            aCategory == this._rocks)
            continue;

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);

        }
        debugY += 10;
    }
},


clearLevel: function() {
    for (var c = 0; c < this._categories.length-1; ++c) {

        var aCategory = this._categories[c];

        while (aCategory[0]) {
            spatialManager.unregister(aCategory[0]);
            aCategory.splice(0,1);
        }
    }
},


isClear: function() {
    if (!this._boss[0] &&
        !this._enemyThree[0] &&
        !this._enemyTwo[0] &&
        !this._enemyFour[0]) {
            return true;
    }
    return false;
}

}
// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
