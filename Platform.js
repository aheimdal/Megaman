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
Platform.prototype.cy = 456;
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
    var radius = 45;//entity.getRadius();

    //console.log(this.radius);
    //console.log(radius);

    /*if (leftBound <= entity.cx + radius ||
        (rightBound >= entity.cx - radius)) {
        entity.stopX();// setur velocity í 0
    }*/
    console.log("hit");
    if(entity.cx<leftBound-28){
      entity.stopX();
      entity.cx = leftBound-radius;//leftBound - radius - 1;
    }else if(entity.cx>rightBound+28){
      entity.stopX();
      entity.cx = rightBound + radius;
    }else if (entity.isFalling()) {
        //if (higherBound > entity.cy - radius) {
      entity.ground()
      entity.cy = higherBound - radius-1;
        //}
    }else if(entity.isJumping()/*&& !entity.isFalling()*/){
        //if (lowerBound < entity.cy + radius) {
      entity.fall();
      entity.cy = lowerBound + radius;
        //}
    }else if(entity.cx<leftBound){
      entity.stopX();
      entity.cx = leftBound-radius+8;//leftBound - radius - 1;
    }else if(entity.cx>rightBound){
      entity.stopX();
      entity.cx = rightBound + radius-8;
    }
};

Platform.prototype.render = function (ctx) {
  /*  ctx.fillRect(this.cx - this.radius,
                this.cy - this.radius,
                this.radius*2,
                this.radius*2);
*/


ctx.fillStyle="white";
ctx.fillRect(this.cx - this.radius,
            this.cy - this.radius,
            this.radius*2,
            this.radius*2);
ctx.fillStyle="black";
ctx.beginPath();
ctx.arc(this.cx,this.cy,25,0,2*Math.PI);
ctx.stroke();

};
