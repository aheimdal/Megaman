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
function enemyThree(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    


    // Default sprite and scale, if not otherwise specified
    this.sprite = g_sprites.goblin[0];
    this.scale  = 3;

};

enemyThree.prototype = new Entity();

enemyThree.prototype.cx = 700;
enemyThree.prototype.cy = 502;
enemyThree.prototype.floor = 502;
enemyThree.prototype.velX;
enemyThree.prototype.velY = 0;
enemyThree.prototype.health = 10;
enemyThree.prototype.shootTimer = 150;
enemyThree.prototype.goblinFacing = 1;

enemyThree.prototype.update = function (du) {

    spatialManager.unregister(this);

    if (this._isDeadNow && this.health === 0) return entityManager.KILL_ME_NOW; 
    if (this._isDeadNow) {
        this._isDeadNow = false;
        this.health--;
    }

    this.movement(du);

    this.maybeShoot();

    this.spriteChange();

    var maybeChar = this.findHitEntity();
    if (maybeChar === entityManager._char[0]) {
        entityManager._char[0].kill();
    }

    spatialManager.register(this);
};

enemyThree.prototype.movement = function(du) {
    if (this.cx < 30) {this.velX = 3.5;}
    if (this.cx > 970) {this.velX = -3.5;}

    if (this.goblinFacing === 1) this.velX = -3.5;
    else this.velX = 3.5;

    if (this.cy < this.floor) {
        this.velY += 1;
    } else {
        this.velY = 0;
        this.cy = this.floor;
    }

    if (this.cy >= this.floor && this.shootTimer <= 0) {
        this.velY = -20;
        this.shootTimer = 150;
    }

    this.cy += this.velY * du;
};

enemyThree.prototype.maybeShoot = function () {
    if (this.shootTimer) {
        if (this.shootTimer == 75) {
            entityManager.fireRocket(
                this.cx+this.velX*16,
                this.cy-10,
                this.velX*2, 0, 0
            );
        }
    this.shootTimer--;
    }
};

enemyThree.prototype.spriteChange = function () {
    if (this.goblinFacing === 1) var face = 1;
    else var face = 0;
    if (this.shootTimer < 75 && this.shootTimer > 0) this.sprite = g_sprites.goblin[2+face];
    else if (this.cy < this.floor) this.sprite = g_sprites.goblin[4+face];
    else this.sprite = g_sprites.goblin[0+face];
}

enemyThree.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

enemyThree.prototype.takeBulletHit = function() {
    this.kill();
};


enemyThree.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
