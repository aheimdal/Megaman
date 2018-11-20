// ======
// BULLET
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Bullet(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Make a noise when I am created (i.e. fired)
    this.fireSound.load();
    this.fireSound.play();

    
/*
    // Diagnostics to check inheritance stuff
    this._bulletProperty = true;
    console.dir(this);
*/

}

Bullet.prototype = new Entity();

// HACKED-IN AUDIO (no preloading)
Bullet.prototype.fireSound = new Audio(
    "sounds/luger.wav");
Bullet.prototype.shotgun = new Audio(
    "sounds/shotgun.wav");
Bullet.prototype.die = new Audio(
    "sounds/die.wav");

// Initial, inheritable, default values
Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 1;
Bullet.prototype.velY = 1;

// Convert times from milliseconds to "nominal" time units.
Bullet.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

Bullet.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

    this.lifeSpan -= du;
    if (this.lifeSpan < 0 || this.cx < 0 || this.cx > 1000) return entityManager.KILL_ME_NOW;
    

    this.cx += this.velX * du;
    this.cy += this.velY * du;
    
    // TODO? NO, ACTUALLY, I JUST DID THIS BIT FOR YOU! :-)
    //
    // Handle collisions
    //
    var hitEntity = this.findHitEntity();
    if (!hitEntity.isHp) {
        if (hitEntity) {
            var canTakeHit = hitEntity.takeBulletHit;
            if (canTakeHit) canTakeHit.call(hitEntity); 
            return entityManager.KILL_ME_NOW;
        }
    }
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
};

Bullet.prototype.getRadius = function () {
    return 4;
};

Bullet.prototype.takeBulletHit = function () {
    this.kill();
    
    // When I am killed
    this.die.load();
    this.die.play();
};

Bullet.prototype.calculateMovement = function () {
    return;
}

Bullet.prototype.render = function (ctx) {

    g_sprites.bullet.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );

    ctx.globalAlpha = 1;
};
