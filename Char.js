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
function Char(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();

    // Default sprite, if not otherwise specified
    this.sprite = g_sprites.Char[0];

    // Set normal drawing scale, and warp state off
    this._scale = 3;

    this.count = 0;

    this._nextMap = 0;
    this.maps = ["images/bak6.png","images/bak7.png","images/bak9.png","images/bak8.png"];

};

Char.prototype = new Entity();

Char.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

Char.prototype.KEY_JUMP = 'W'.charCodeAt(0);
Char.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Char.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

Char.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values
Char.prototype.cx;
Char.prototype.cy;
Char.prototype.velX = 0;
Char.prototype.velY = 0;



// HACKED-IN AUDIO (no preloading)
Char.prototype.shootSound = new Audio(
    "sounds/gunsound.wav");



Char.prototype.update = function (du) {


    spatialManager.unregister(this);


    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.movement(du);

    this.calculateMovement(du);

    // Handle firing
    var shoot = this.maybeFireBullet();

    spatialManager.register(this);

};


Char.prototype.computeGravity = function () {
    return g_useGravity ? NOMINAL_GRAVITY : 0;
};

Char.prototype.NOMINAL_RIGHT = +6;
Char.prototype.NOMINAL_LEFT  = -6;
Char.prototype.NOMINAL_IJUMP = -10;
Char.prototype.NOMINAL_JUMP  = -2;
Char.prototype.NOMINAL_GRAVITY = +2;

Char.prototype.CHAR_FACING = 1;
Char.prototype.JUMP_INIT = true;
Char.prototype.JUMP_TIMER = 0;
Char.prototype.JUMP_TIMER_COUNT = 80;

Char.prototype.movement = function (du) {

    var rx = this.sprite.width*this._scale/2;
    var ry = this.sprite.height*this._scale/2;
    var prevX = this.cx;
    var prevY = this.cy;
    var nextY = prevY;

    //Calculates if character should go right
    if (keys[this.KEY_RIGHT]) {
        var nextX = prevX + (this.NOMINAL_RIGHT * du);
        if (this.cx < 970){
          if(!(entityManager._pallar[0].collidesWithX(prevX, prevY, nextX, prevY, rx, ry))){
            if (this.velX < 0) this.velX = 0; //Resets velocity if Char was going left
            this.velX += this.NOMINAL_RIGHT * du;
          }
        } else {
            this.velX = 0;
        }
        this.CHAR_FACING = 1; //Says Char is facing right
    }

    //Calculates if characted should go left if he's not going right
    else if (keys[this.KEY_LEFT]) {
        if (this.cx > 30){
          var nextX = prevX + (this.NOMINAL_LEFT * du);
          if(!(entityManager._pallar[0].collidesWithX(prevX, prevY, nextX, prevY, rx, ry))){
            if (this.velX > 0) this.velX = 0; //Resets velocity if Char was going right
            this.velX += this.NOMINAL_LEFT * du;
          }
        }
        this.CHAR_FACING = -1; //Says Char is facing left
    }

    //Calculates if Char is jumping
    if (keys[this.KEY_JUMP]) {
        if (this.JUMP_INIT && this.JUMP_TIMER == 0) {
            this.JUMP_TIMER = this.JUMP_TIMER_COUNT;
            this.velY = this.NOMINAL_IJUMP * du;
        } else if (this.JUMP_INIT) {
            this.velY += (this.NOMINAL_JUMP*(this.JUMP_TIMER/this.JUMP_TIMER_COUNT)) * du;
        }
    }
    if (this.JUMP_TIMER > 0 && !(keys[this.KEY_JUMP])) {
        this.JUMP_TIMER = 0;
        this.JUMP_INIT = false;
    }
    canvasSpaceGame(this.getMap());
};

Char.prototype.getMap = function () {

    return this.maps[this._nextMap];
};

Char.prototype.setMap = function () {

    this._nextMap++;
};

Char.prototype.calculateMovement = function (du) {
    var prevX = this.cx;
    var nextX = prevX + this.velX * du;
    var prevY = this.cy;
    var nextY = prevY + this.velY * du;
    var rx = this.sprite.width*this._scale/2;
    var ry = this.sprite.height*this._scale/2;



    if(!(entityManager._pallar[0].collidesWithY(prevX, prevY, nextX, prevY, rx, ry))){
      /*if((nextY + this.sprite.height/2> entityManager._pallar[0].cy - 5) && (nextY+this.sprite.height/2<entityManager._pallar[0].cy+5)){
        this.velY = 0;
      }*/
      this.cy += this.velY * du;
    }else{
      if((nextY + this.sprite.height/2 > entityManager._pallar[0].cy - 5) && (nextY+this.sprite.height/2<entityManager._pallar[0].cy+5)){
        this.velY = 0;
        //this.cy = entityManager._pallar[0].cy - 5;
      }
    }

    if (this.JUMP_TIMER > 0) this.JUMP_TIMER--;
    if (this.cy < 502) this.velY += this.NOMINAL_GRAVITY;
    if (this.cy > 502) {
        this.cy = 502;
        this.velY = 0;
    }
    if (this.JUMP_TIMER <= 0) this.JUMP_INIT = false;
    if (this.cy >= 502) this.JUMP_INIT = true;

    if(this.cx >= 965){
        if(this.count <= 2){
            this.setMap();
            this.cx = 0;
            this.count++;
        }
        else
            this.cx = 965;
        }

};

Char.prototype.maybeFireBullet = function () {

    var shoot = false;

    if (keys[this.KEY_FIRE]) {

        var shoot = true;

        entityManager.fireBullet(
            this.cx + 16*CHAR_FACING, this.cy,
            7*CHAR_FACING, 0, 0
        );

    }

    return shoot;

};

Char.prototype.calculateSprite = function () {

}

Char.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

Char.prototype.takeBulletHit = function () {
    //TODO
};

Char.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
    this.sprite.scale = origScale;
};
