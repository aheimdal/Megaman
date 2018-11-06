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
Char.prototype.cx = 200;
Char.prototype.cy = 200;
Char.prototype.velX = 0;
Char.prototype.velY = 0;
Char.prototype.launchVel = 2;
Char.prototype.numSubSteps = 1;



// HACKED-IN AUDIO (no preloading)
Char.prototype.shootSound = new Audio(
    "sounds/bulletFire.ogg");

    

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

var JUMP_INIT = true;
var JUMP_TIMER = 0;

Char.prototype.movement = function (du) {

    if (keys[this.KEY_RIGHT]) {
        if (this.cx < 770){ 
            this.cx += NOMINAL_RIGHT * du;
        }
    }
    if (keys[this.KEY_LEFT]) {
        if (this.cx > 30)this.cx += NOMINAL_LEFT * du;
    }
    if (keys[this.KEY_JUMP]) {
        if (JUMP_INIT && JUMP_TIMER == 0) {
            JUMP_TIMER = 24;
            this.velY = +NOMINAL_IJUMP * du;
        } else if (JUMP_INIT) {
            this.velY += (NOMINAL_JUMP*(JUMP_TIMER/20)) * du;
        }
         
    }
    if (JUMP_TIMER > 0 && !(keys[this.KEY_JUMP])) {
        JUMP_TIMER = 0;
        JUMP_INIT = false;
    }

    
    canvasSpaceGame("images/bak3.png");
};

Char.prototype.calculateMovement = function (du) {
    this.cy += this.velY * du;
    if (JUMP_TIMER > 0) JUMP_TIMER--;
    if (this.cy < 470) this.velY += NOMINAL_GRAVITY;
    if (this.cy > 470) {
        this.cy = 470;
        this.velY = 0;
    }
    if(this.cx >= 770)
    canvasSpaceGame("images/bak3.png");
    if (JUMP_TIMER <= 0) JUMP_INIT = false;
    if (this.cy >= 470) JUMP_INIT = true;
    //console.log(this.cx + " " + this.cy);

};

Char.prototype.maybeFireBullet = function () {

    if (keys[this.KEY_FIRE]) {
    
        var dX = +Math.sin(this.rotation);
        var dY = -Math.cos(this.rotation);
        var launchDist = this.getRadius() * 1.2;
        
        var relVel = this.launchVel;
        var relVelX = dX * relVel;
        var relVelY = dY * relVel;

        entityManager.fireBullet(
           this.cx + dX * launchDist, this.cy + dY * launchDist,
           this.velX + relVelX, this.velY + relVelY,
           this.rotation);
           
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




