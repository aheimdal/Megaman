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

    this.sprite = this.sprite || g_sprites.char;

    // Set normal drawing scale, and warp state off
    this._scale = 3;
};

Platform.prototype = new Entity();

// Initial, inheritable, default values
// Char.prototype.rotation = 0;
Platform.prototype.cx = 400;
Platform.prototype.cy = 400;
Platform.prototype.radius = 25;
Platform.prototype.isPlatform = true;


Platform.prototype.update = function (du) {

    spatialManager.unregister(this);


    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }
    spatialManager.register(this);

};


Platform.prototype.getRadius = function () {
    return this.radius;
};

Platform.prototype.calculateMovement = function (entity) {
    var higherBound = this.cy - this.radius;
    var lowerBound = this.cy + this.radius;
    var leftBound = this.cx - this.radius;
    var rightBound = this.cx + this.radius;
    var radius = entity.getRadius();

    if (leftBound <= entity.cx + radius ||
        rightBound >= entity.cx - radius) {
        entity.stopX();
    }
};

Platform.prototype.render = function (ctx) {
   
    ctx.fillRect(this.cx - this.radius,
                this.cy - this.radius,
                this.radius*2,
                this.radius*2);

};



