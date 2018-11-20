// ====
// Spikes
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Spikes(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    
    // Default sprite and scale, if not otherwise specified
    this.sprite = g_sprites.spikes;
    this.scale  = 1;

};

Spikes.prototype = new Entity();

Spikes.prototype.cx = 700;
Spikes.prototype.cy = 470;


Spikes.prototype.update = function (du) {

    spatialManager.unregister(this);

    var maybeChar = this.findHitEntity();
    if (maybeChar === entityManager._char[0]) {
        entityManager._char[0].superKill();
    }

    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    spatialManager.register(this);
};

Spikes.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

Spikes.prototype.calculateMovement = function () {
    return;
}

Spikes.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
