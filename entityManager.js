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

var count = 0;

var entityManager = {

// "PRIVATE" DATA

_rocks   : [],
_bullets : [],
_char   : [],
_pallar : [],
_enemyTwo : [],


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
    this._categories = [this._bullets, this._char, this._pallar, this._enemyTwo];
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


generateChar : function(descr) {
    this._char.push(new Char(descr));
},

generatePallur : function(descr){
    this._pallar.push(new Pallur(descr));
},

generateEnemyTwo : function(descr){
    this._enemyTwo.push(new enemyTwo(descr));
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

    if (this._char[0] != null){ animationHandle.update(this._char[0]);
        //We go to "background.js" and get the map
        background.canvasSpaceGame(background.getMap());

        if(this._char[0].cx >= 965 && count <= 2){
            background.canvasSpaceGame(background.setMap());
            this._char[0].cx = 0;
            count++;
        }
    }
        else
            main.gameOver();

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
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
