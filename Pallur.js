// ==========
// Char STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Pallur(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();

    // Default sprite, if not otherwise specified
    //this.sprite = this.sprite || g_sprites.char;

    // Set normal drawing scale, and warp state off
    //this._scale = 3;
};

Pallur.prototype = new Entity();

Pallur.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};


// Initial, inheritable, default values
// Char.prototype.rotation = 0;
Pallur.prototype.cx = 200;
Pallur.prototype.cy = 100;
Pallur.prototype.velX = 0;
Pallur.prototype.velY = 0;
Pallur.prototype.launchVel = 2;
Pallur.prototype.numSubSteps = 1;


Pallur.prototype.update = function (du) {


    spatialManager.unregister(this);


    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }
    spatialManager.register(this);

};

/*
Pallur.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

Pallur.prototype.takeBulletHit = function () {
    //TODO
};*/

Pallur.prototype.render = function (ctx) {
    //var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    //this.sprite.scale = this._scale;
    /*this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
);*/

ctx.fillRect(this.cx - 25,
             this.cy - 5,
             50,
             10);
    //this.sprite.scale = origScale;
};

Pallur.prototype.collidesWithX = function (prevX, prevY,
                                          nextX, nextY,
                                          r) {

    if (((nextX + r > this.cx - 25) && (nextX+r<this.cx+25))||
        ((nextX - r < this.cx + 25)&&(nextX-r>this.cx-25))){
      if(((prevY+r>= this.cy-5)&&(prevY-r<=this.cy+5))){
            return true;// a hit
      }
    }
    // It's a miss!
    return false;
};

Pallur.prototype.collidesWithY = function (prevX, prevY,
                                          nextX, nextY,
                                          r) {
    console.log("bamm1");
    if (((nextY + r > this.cy - 15) && (nextY+r<this.cY+15))||
        ((nextY - r < this.cy + 15)&&(nextY-r>this.cy-15))){
          console.log("bamm2");
      if(((prevX+r> this.cx-25)&&(prevX-r<this.cx+25))){
            return true;// a hit
      }
    }
    // It's a miss!
    return false;
};

// Remember my previous position
    //var prevX = this.cx;
    //var prevY = this.cy;

    // Compute my provisional new position (barring collisions)
    //var nextX = prevX + this.xVel * du;
    //var nextY = prevY + this.yVel * du;
