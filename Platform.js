// ==========
// Platform
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Platform(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.sprite = g_sprites.tiles;
}

Platform.prototype = new Entity();

// Initial, inheritable, default values
Platform.prototype.cx = 170;
Platform.prototype.cy = 450;
Platform.prototype.radius = 25;
Platform.prototype.oneTime = 0;
Platform.prototype.scale = 0;


Platform.prototype.update = function (du) {

    spatialManager.unregister(this);

    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }

    return spatialManager.register(this);
};


Platform.prototype.getRadius = function () {
    return this.radius;
};

Platform.prototype.calculateMovement = function (entity) {
    var higherBound = this.cy - this.radius;
    var lowerBound = this.cy + this.radius;
    var leftBound = this.cx - this.radius;
    var rightBound = this.cx + this.radius;
    var radius = 45;

    // Hit
    if (entity.cx<leftBound-28) {
      entity.stopX();
      entity.cx = leftBound-radius;
    } else if (entity.cx>rightBound+28) {
      entity.stopX();
      entity.cx = rightBound + radius;
    } else if (entity.isFalling()) {
      entity.ground();
      entity.cy = higherBound - radius-1;
    } else if (entity.isJumping()&&(entity.cy<502)) {
      entity.fall();
      entity.cy = lowerBound + radius;
    } else if (entity.cx < this.cx) {
      entity.stopX();
      entity.cx = leftBound-radius+8;
    } else if (entity.cx > this.cx) {
      entity.stopX();
      entity.cx = rightBound + radius-8;
    }
};


Platform.prototype.render = function (ctx) {
              var origScale = this.sprite.scale;
              // pass my scale into the sprite, for drawing
              this.sprite.scale = this.scale;
              this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
};
