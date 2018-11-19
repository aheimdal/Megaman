// ======
// Rocket
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Rocket(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Make a noise when I am created (i.e. fired)
    this.fireSound.load();
    this.fireSound.play();

    
/*
    // Diagnostics to check inheritance stuff
    this._RocketProperty = true;
    console.dir(this);
*/

}

Rocket.prototype = new Entity();

// HACKED-IN AUDIO (no preloading)
Rocket.prototype.fireSound = new Audio(
    "sounds/rockEvaporate.ogg");

// Initial, inheritable, default values
Rocket.prototype.rotation = 0;
Rocket.prototype.cx = 200;
Rocket.prototype.cy = 200;
Rocket.prototype.velX = 1;
Rocket.prototype.velY = 1;
Rocket.prototype.health = 4;

// Convert times from milliseconds to "nominal" time units.
Rocket.prototype.lifeSpan = 1000 / NOMINAL_UPDATE_INTERVAL;

Rocket.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

    this.lifeSpan -= du;
    if (this.cx < 0 || this.cx > 1000 || this.cy > 1000) return entityManager.KILL_ME_NOW;
    

    this.cx += this.velX * du;
    if (this.lifeSpan < 0) {
        this.velY += 1;
        this.cy += this.velY * du;
    }
    
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

Rocket.prototype.getRadius = function () {
    return 12;
};

Rocket.prototype.takeBulletHit = function () {
    this.kill();
};

Rocket.prototype.calculateMovement = function () {
    return;
}

Rocket.prototype.render = function (ctx) {

    g_sprites.rocket.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );

    ctx.globalAlpha = 1;
};
