// ======
// BossShoot
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function BossShoot(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Make a noise when I am created (i.e. fired)
    this.fireSound.load();
    this.fireSound.play();

    
/*
    // Diagnostics to check inheritance stuff
    this._BossShootProperty = true;
    console.dir(this);
*/

}

BossShoot.prototype = new Entity();

// HACKED-IN AUDIO (no preloading)
BossShoot.prototype.fireSound = new Audio(
    "sounds/rockSplit.ogg");

// Initial, inheritable, default values
BossShoot.prototype.rotation = 0;
BossShoot.prototype.cx = 200;
BossShoot.prototype.cy = 200;
BossShoot.prototype.velX = 1;
BossShoot.prototype.velY = 1;
BossShoot.prototype.health = 4;

// Convert times from milliseconds to "nominal" time units.

BossShoot.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

    this.lifeSpan -= du;
    if (this.cx < 0 || this.cx > 1000 || this.cy > 1000) return entityManager.KILL_ME_NOW;

    this.velY += 1;
    
    this.cx += this.velX * du;
    this.cy += this.velY * du;
    
    // TODO? NO, ACTUALLY, I JUST DID THIS BIT FOR YOU! :-)
    //
    // Handle collisions
    //

    if (this._isDeadNow && this.health === 0) return entityManager.KILL_ME_NOW; 
    if (this._isDeadNow) {
        this._isDeadNow = false;
        this.health--;
    }

    var maybeChar = this.findHitEntity();
    if (maybeChar === entityManager._char[0]) {
        entityManager._char[0].kill();
        return entityManager.KILL_ME_NOW;
    }
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
};

BossShoot.prototype.getRadius = function () {
    return 12;
};

BossShoot.prototype.takeBulletHit = function () {
    this.kill();
};

BossShoot.prototype.calculateMovement = function () {
    return;
}

BossShoot.prototype.render = function (ctx) {

    g_sprites.rocket.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );

    ctx.globalAlpha = 1;
};
