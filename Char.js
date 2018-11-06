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
    this.sprite = this.sprite || g_sprites.char;
    
    // Set normal drawing scale, and warp state off
    this._scale = 3;

    this._nextMap = 0;
    this.maps = ["images/bak1.jpg","images/bak2.png","images/bak3.png"];


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
// Char.prototype.rotation = 0;
Char.prototype.cx = 30;
Char.prototype.cy = 555;
Char.prototype.velX = 0;
Char.prototype.velY = 0;
Char.prototype.launchVel = 2;
Char.prototype.numSubSteps = 1;



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
    this.maybeFireBullet();

    
    spatialManager.register(this);

};


var NOMINAL_GRAVITY = 0.12;

Char.prototype.computeGravity = function () {
    return g_useGravity ? NOMINAL_GRAVITY : 0;
};

var NOMINAL_RIGHT = +6;
var NOMINAL_LEFT  = -6;
var NOMINAL_IJUMP = -10;
var NOMINAL_JUMP  = -2;
var NOMINAL_GRAVITY = +2;

var CHAR_FACING = 1;

var JUMP_INIT = true;
var JUMP_TIMER = 0;
var JUMP_TIMER_COUNT = 24;

Char.prototype.movement = function (du) {
    if (keys[this.KEY_RIGHT]) {
        if (this.cx < 770) this.cx += NOMINAL_RIGHT * du;
        CHAR_FACING = 1;
    }
    if (keys[this.KEY_LEFT]) {
        if (this.cx > 30)this.cx += NOMINAL_LEFT * du;
        CHAR_FACING = -1;
    }
    if (keys[this.KEY_JUMP]) {
        if (JUMP_INIT && JUMP_TIMER == 0) {
            JUMP_TIMER = JUMP_TIMER_COUNT;
            this.velY = NOMINAL_IJUMP * du;
        } else if (JUMP_INIT) {
            this.velY += (NOMINAL_JUMP*(JUMP_TIMER/JUMP_TIMER_COUNT)) * du;
        } 
    }
    if (JUMP_TIMER > 0 && !(keys[this.KEY_JUMP])) {
        JUMP_TIMER = 0;
        JUMP_INIT = false;
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
    this.cy += this.velY * du;
    if (JUMP_TIMER > 0) JUMP_TIMER--;
    if (this.cy < 502) this.velY += NOMINAL_GRAVITY;
    if (this.cy > 502) {
        this.cy = 502;
        this.velY = 0;
    }
    if (JUMP_TIMER <= 0) JUMP_INIT = false;
    if (this.cy >= 502) JUMP_INIT = true;

    if(this.cx >= 760){
        this.setMap();
        this.cx = 100;}
    //console.log(util.randRange(100,500));
};

Char.prototype.maybeFireBullet = function () {

    if (keys[this.KEY_FIRE]) {

        entityManager.fireBullet(
            this.cx + 16*CHAR_FACING, this.cy,
            5*CHAR_FACING, 0, 0
        );
           
    }
    
};

Char.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

Char.prototype.takeBulletHit = function () {
    //TODO
};

Char.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    
    this.halt();
};

Char.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
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