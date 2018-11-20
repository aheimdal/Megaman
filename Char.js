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

    // Default sprite, if not otherwise specified
    this.sprite = g_sprites.CharR[0];

    // Set normal drawing scale, and warp state off
    this._scale = 3;

};

Char.prototype = new Entity();

Char.prototype.KEY_JUMP = 'W'.charCodeAt(0);
Char.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Char.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);
Char.prototype.KEY_FIRE   = ' '.charCodeAt(0);
Char.prototype.KEY_GOD   = 'O'.charCodeAt(0);

// Initial, inheritable, default values
Char.prototype.cx;
Char.prototype.cy;
Char.prototype.velX = 0;
Char.prototype.velY = 0;
Char.prototype.health = 5;
Char.prototype.invincibility = 0;
Char.prototype.invincibilityTimer = 90;
Char.prototype.godMode = false;

Char.prototype.update = function (du) {
    //console.log("isJumping gefur: "+this.isJumping());
    spatialManager.unregister(this);

    this.movement(du);

    this.calculateMovement(du);

    this.healthManage();

    if (this.health === 0){
        main.GameState = 3;
        return entityManager.KILL_ME_NOW;
    }

    // Handle firing
    this.maybeFireBullet();

    spatialManager.register(this);
};

Char.prototype.NOMINAL_RIGHT = +1;
Char.prototype.NOMINAL_LEFT  = -1;
Char.prototype.NOMINAL_IJUMP = -10;
Char.prototype.NOMINAL_JUMP  = -2;
Char.prototype.NOMINAL_GRAVITY = +1;

Char.prototype.CHAR_FACING = 1;
Char.prototype.JUMP_INIT = true;
Char.prototype.JUMP_TIMER = 0;
Char.prototype.JUMP_TIMER_COUNT = 15;
Char.prototype.MOVING = true;

Char.prototype.movement = function (du) {

    if (this.invincibility > this.invincibilityTimer-30) {
        this.velX = -3.5 * this.CHAR_FACING;
    } else {

    //Calculates if character should go right
    if (keys[this.KEY_RIGHT]) {
        this.MOVING = true;                 //Player is moving
        if (this.cx < 970) {
            if (this.velX < 0) this.velX = 0; //Resets velocity if Char was going left
            if (this.velX < 6) this.velX += this.NOMINAL_RIGHT * du; //Adds right velocity
        } else {
            this.velX = 0;
        }
        this.CHAR_FACING = 1; //Says Char is facing right
    }

    //Calculates if characted should go left if he's not going right
    else if (keys[this.KEY_LEFT]) {
        this.MOVING = true;
        if (this.cx > 32) {
            if (this.velX > 0)  this.velX = 0; //Resets velocity if Char was going right
            if (this.velX > -6) this.velX += this.NOMINAL_LEFT * du; //Adds left velocity
        } else {
            this.velX = 0;
        }
        this.CHAR_FACING = -1; //Says Char is facing left
    } else {
        this.velX = 0;
        this.MOVING = false;
    }

    //Calculates if Char is jumping
    if (keys[this.KEY_JUMP]) {
        if (this.isGrounded() /*&& !this.isJumping()*/) {
            this.JUMP_TIMER = this.JUMP_TIMER_COUNT; //Sets for how long space can be pressed
            this.velY = this.NOMINAL_IJUMP * du; //Initial velocity increase
        } else if (this.JUMP_INIT) {
            //Dynamic y-velocity added compared to the time
            this.velY += (this.NOMINAL_JUMP*(this.JUMP_TIMER/(this.JUMP_TIMER_COUNT))) * du;
        }
    }
    if (this.JUMP_TIMER > 0 && !(keys[this.KEY_JUMP])) { //Checked if space was released early
        this.JUMP_TIMER = 0;
        this.JUMP_INIT = false;
    }
    }
};

Char.prototype.calculateMovement = function (du) {
    this.radius=45;

    var plat = this.isColliding();
    if (plat) plat.calculateMovement(this);
    if(this.shouldFall()){
      this.fall();
    }

    this.cx += this.velX; //x-coordinates updated

    //Only works with y-axis if he's not "grounded"
    if (!this.isGrounded()) {
        this.cy += this.velY * du;

        if (this.JUMP_TIMER > 1) this.JUMP_TIMER--;
        else {
            this.JUMP_INIT = false;
            this.JUMP_TIMER = 0;
        }
        if (this.cy < 502) this.velY += this.NOMINAL_GRAVITY;
        if (this.cy >= 502) this.JUMP_INIT = true;
        if (this.cy > 502) {
            this.ground();
        }
    }

};

Char.prototype.healthManage = function () {
    if (eatKey(this.KEY_GOD)) {
        this.godMode = !this.godMode;
        this.invincibility++;
        console.log(this.godMode);
    }
    if (!this.godMode) {
        if (this.health > 5) this.health = 5;
        if (this.invincibility > 0) this.invincibility--;

        if (this._isDeadNow) {
            this._isDeadNow = false;
            if (this.invincibility <= 0) {
                this.health--;
                background.mapLol(this.health);
                this.invincibility = this.invincibilityTimer;
            }
        }
    }
};

Char.prototype.CHAR_SHOOT = false;
Char.prototype.CHAR_SHOOT_TIMER = 0;
Char.prototype.shoot = true;

Char.prototype.maybeFireBullet = function () {

    if (!(this.invincibility > this.invincibilityTimer-30)) {

    if (keys[this.KEY_FIRE] && this.shoot === true) {
        this.shoot = false;
        if (this.CHAR_FACING === 1) {var constant = 55}
        else {var constant = -55}
        this.CHAR_SHOOT = true;
        this.CHAR_SHOOT_TIMER = 45;

        entityManager.fireBullet(
            this.cx+constant + 16*this.CHAR_FACING, this.cy-17,
            12*this.CHAR_FACING, 0, 0); 
    } else this.shoot = true;

    if (this.CHAR_SHOOT_TIMER > 0) this.CHAR_SHOOT_TIMER--;
    if (this.CHAR_SHOOT_TIMER <= 0) {
        this.CHAR_SHOOT = false;
    }
    }
};

Char.prototype.isGrounded = function () {
    if (this.JUMP_TIMER === 0 && this.JUMP_INIT === true) return true;
    return false;
};

Char.prototype.isFalling = function () {
    if (this.velY > 0) return true;
    return false;
};

Char.prototype.isJumping = function () {
    if (this.JUMP_TIMER > 0) return true;
    return false;
};

Char.prototype.ground = function () {
    this.JUMP_TIMER = 0;
    this.JUMP_INIT = true;
    this.velY = 0;
    if (this.cy > 502) this.cy = 502;
};

Char.prototype.fall = function () {
    this.JUMP_TIMER = 0;
    this.JUMP_INIT = false;
    this.velY = 0;
};

Char.prototype.stopX = function () {
    this.velX = 0;
};

Char.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9 *this._scale;
};

Char.prototype.superKill = function () {
    if (!this.godMode) this.health = 0;
}


Char.prototype.status = function () {
    return  [this.CHAR_FACING,    //positive number for right, negative for left
            this.MOVING,          //True if moving, else false
            this.CHAR_SHOOT,      //True if shooting, else false
            this.isGrounded(),    //True if on grounds, else jumping/falling
            (this.invincibility > //True if hurt, else false
                this.invincibilityTimer - 30)];  
};

Char.prototype.changeSprite = function(varImage) {
    this.sprite = varImage;
};

Char.prototype.shouldFall = function () {
    if(this.cy === 502) return false; // Ef á jörðinni false
    // Ef hann er ekki 1px fyrir ofan(sem sagt grounded) kassa og fyrir ofan hann
    for (var i = 0; i <entityManager._platforms.length; i++) {
      // Ef 1px fyrir ofan
      if(this.cy==(entityManager._platforms[i].cy - entityManager._platforms[i].radius -46)){
        // Ef beint fyrir ofan, eki ská fyrir ofan
        if((this.cx + 45>entityManager._platforms[i].cx - entityManager._platforms[i].radius)&&
        (this.cx-45<entityManager._platforms[i].cx + entityManager._platforms[i].radius)){
          return false;
        }
      }
    }
    if(this.isJumping()||this.isFalling()) return false;
    if (!this.velY) return true;
};

Char.prototype.render = function (ctx) {
    if (this.invincibility) {ctx.globalAlpha = 0.5;}
    else {ctx.globalAlpha = 1;}


    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;

    this.sprite.drawCentredAt(
	    ctx, this.cx, this.cy, this.rotation
    );

    this.sprite.scale = origScale;
    ctx.globalAlpha = 1;

    /*ctx.fillStyle="black";
    ctx.beginPath();
    ctx.arc(this.cx,this.cy,45,0,2*Math.PI);
    ctx.stroke();*/
};
