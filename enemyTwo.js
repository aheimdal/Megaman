// ====
// ENEMYONE
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function enemyTwo(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = g_sprites.CharL[0];
    this.scale  = 2;

};

enemyTwo.prototype = new Entity();

enemyTwo.prototype.update = function (du) {

    spatialManager.unregister(this);

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }
    
    this.cx += -5 * du;

    spatialManager.register(this);
};

enemyTwo.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

enemyTwo.prototype.takeBulletHit = function () {
    this.kill();
};


enemyTwo.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
