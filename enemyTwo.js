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
    this.sprite = g_sprites.golem[0];
    this.scale  = 5;

};

enemyTwo.prototype = new Entity();

enemyTwo.prototype.cx = 700;
enemyTwo.prototype.cy = 502;
enemyTwo.prototype.velX = -2.5;
enemyTwo.prototype.turnAroundTimer = 0;
enemyTwo.prototype.health = 10;

enemyTwo.prototype.update = function (du) {

    spatialManager.unregister(this);

    var maybeChar = this.findHitEntity();
    if (maybeChar === entityManager._char[0]) {
        entityManager._char[0].kill();
    }

    if (this._isDeadNow && this.health === 0) return entityManager.KILL_ME_NOW; 
    if (this._isDeadNow) {
        this._isDeadNow = false;
        this.health--;
    }
    
    this.turnAround();

    this.turnAroundTimer--;
    if (this.turnAroundTimer <= 0) {
        this.cx += this.velX * du;
        var spriteNumber = animationHandle.cycle(0,1,1);
        if (this.velX < 0) {this.sprite = g_sprites.golem[spriteNumber];}
        else {this.sprite = g_sprites.golem[spriteNumber+2];}
    }

    spatialManager.register(this);
};

enemyTwo.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

enemyTwo.prototype.takeBulletHit = function () {
    this.kill();
};

enemyTwo.prototype.turnAround = function () {
    if (this.cx <= 30) {
        this.cx++;
        this.sprite = g_sprites.golem[5];
        this.turnAroundTimer = 30;
        this.velX = 2.5;
    }
    if (this.cx >= 970) {
        this.cx--;
        this.sprite = g_sprites.golem[4];
        this.turnAroundTimer = 30;
        this.velX = -2.5;
    }
};

enemyTwo.prototype.movement = function () {
    
};

enemyTwo.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
