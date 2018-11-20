// ====
// HealthPickup
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function HealthPickup(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    
    // Default sprite and scale, if not otherwise specified
    this.sprite = g_sprites.healthPickup;
    this.scale  = 1;

};

HealthPickup.prototype = new Entity();

HealthPickup.prototype.cx = 200;
HealthPickup.prototype.cy = 470;
HealthPickup.prototype.isHp = true;

HealthPickup.prototype.update = function (du) {

    spatialManager.unregister(this);

    var maybeChar = this.findHitEntity();
    if (maybeChar === entityManager._char[0]) {
        entityManager._char[0].health++;
        return entityManager.KILL_ME_NOW;
    }

    spatialManager.register(this);
};

HealthPickup.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

HealthPickup.prototype.calculateMovement = function () {
    return;
}

HealthPickup.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
