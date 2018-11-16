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

    this.radius = 25;
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
ctx.fillStyle="white";
ctx.fillRect(this.cx - 25,
             this.cy - 25,
             50,
             50);
ctx.fillStyle="black";
ctx.beginPath();
ctx.arc(this.cx,this.cy,25,0,2*Math.PI);
ctx.stroke();


    //this.sprite.scale = origScale;
};

Pallur.prototype.collidesWithX = function (prevX, prevY,
                                          nextX, nextY,
                                          rx,ry) {
    /*console.log("prevX er: "+prevX);
    console.log("prevY er: "+prevY);
    console.log("nextX er: "+nextX);
    console.log("nextY er: "+nextY);
    console.log("rx er: "+rx);
    console.log("ry er: "+ry);*/
    //console.log("bamm");
    if (((nextX + rx >= this.cx - 25) && ((nextX+rx<=this.cx+25)&&(nextX-rx<=this.cx+25)))||
        ((nextX - rx <= this.cx + 25)&&((nextX-rx>=this.cx-25)&&(nextX+rx>=this.cx-25)))){
        //  console.log("bamm1");
      if(((prevY+ry>= this.cy-5)&&(prevY-ry<=this.cy+5))){
          //  console.log("bamm2");
            return true;// a hit

      }
    }
    // It's a miss!
    return false;
};

Pallur.prototype.collidesWithY = function (prevX, prevY,
                                          nextX, nextY,
                                          rx,ry) {
    //console.log("bamm1");
    if (((nextY + ry >= this.cy - 15) && (nextY+ry<=this.cy+15))||
        ((nextY - ry <= this.cy + 15)&&(nextY-ry>=this.cy-15))){
          //console.log("bamm2");
      if(((prevX+rx>= this.cx-25)&&(prevX-rx<=this.cx+25))){
            return true;// a hit
      }
    }
    // It's a miss!
    return false;
};

// Remember my previous da
    //var prevX = this.cx;
    //var prevY = this.cy;

    // Compute my provisional new position (barring collisions)
    //var nextX = prevX + this.xVel * du;
    //var nextY = prevY + this.yVel * du;



/*
if(entityManager._char[0].isColliding()){
  entityManager._char[0].ground();
}
*/
