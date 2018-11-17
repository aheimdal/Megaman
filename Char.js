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
  this.sprite = g_sprites.CharR[0];

  // Set normal drawing scale, and warp state off
  this._scale = 3;

};

Char.prototype = new Entity();

Char.prototype.rememberResets = function () {
  // Gudjon fix
  this.cx = 100;
  this.cy = 502;
};

Char.prototype.KEY_JUMP = 'W'.charCodeAt(0);
Char.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Char.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

Char.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values
Char.prototype.cx = 100;
Char.prototype.cy = 502;
Char.prototype.velX = 0;
Char.prototype.velY = 0;
Char.prototype.health = 3;
Char.prototype.invincibility = 200;

Char.prototype.update = function (du) {

  spatialManager.unregister(this);

  this.movement(du);

  this.calculateMovement(du);

  if (this.invincibility > 0) this.invincibility--;

  if (this._isDeadNow) {
    this._isDeadNow = false;
    if (this.invincibility <= 0) {
      this.health--;
      this.invincibility = 100;
    }
  }
  if (this.health === 0) return entityManager.KILL_ME_NOW;
  // Handle firing
  this.maybeFireBullet();

  spatialManager.register(this);
};

Char.prototype.NOMINAL_RIGHT = +1;
Char.prototype.NOMINAL_LEFT  = -1;
Char.prototype.NOMINAL_IJUMP = -10;
Char.prototype.NOMINAL_JUMP  = -2;
Char.prototype.NOMINAL_GRAVITY = +2;

Char.prototype.CHAR_FACING = 1;
Char.prototype.JUMP_INIT = true;
Char.prototype.JUMP_TIMER = 0;
Char.prototype.JUMP_TIMER_COUNT = 80;
Char.prototype.MOVING = false;

Char.prototype.movement = function (du) {

  var rx = this.sprite.width*this._scale/2;
  var ry = this.sprite.height*this._scale/2;
  var prevX = this.cx;
  var nextX = prevX+this.velX;
  var prevY = this.cy;
  var nextY = prevY+this.velY;
  var oldVelY = this.velY;

  var booltop = entityManager._pallar[0].collidesWithTop(prevX, prevY, nextX, prevY, rx, ry);
  // if (bool) {
  //     this.velY *= 1;
  //     this.JUMP_TIMER = 0;
  // }
  if (this.isFalling && booltop) {
    console.log("true that character is inside paddle");
    this.velY *= -1;
    this.JUMP_TIMER = 0;
  }
  if (this.isJumping && (entityManager._pallar[0].collidesWithBottom(prevX, prevY, nextX, prevY, rx, ry))) {
    this.velY *= -1;
    this.JUMP_TIMER = 0;
  }
  // if (nextY - ry === 450) {
  //     this.velY = 0;
  // }

  



  //Calculates if character should go right
  if (keys[this.KEY_RIGHT]) {
    // var nextX = prevX + (this.NOMINAL_RIGHT * du);
    nextX = prevX + this.velX;
    this.MOVING = true;                 //Player is moving
    if (this.cx < 970){
      if (this.velX < 0) this.velX = 0; //Resets velocity if Char was going left
      if (this.velX < 6) this.velX += this.NOMINAL_RIGHT; //Adds right velocity
      if((entityManager._pallar[0].collidesWithLR(prevX, prevY, nextX, prevY, rx, ry))){
        this.velX *= -1;
      } 
    } else {
      this.velX = 0;
    }
    this.CHAR_FACING = 1; //Says Char is facing right
  }




  //Calculates if characted should go left if he's not going right
  else if (keys[this.KEY_LEFT]) {
    this.MOVING = true;
    if (this.cx > 32){
      //   var nextX = prevX + (this.NOMINAL_LEFT * du);
      nextX = prevX + this.velX;
      if (this.velX > 0)  this.velX = 0; //Resets velocity if Char was going right
      if (this.velX > -6) this.velX += this.NOMINAL_LEFT * du; //Adds left velocity
      if((entityManager._pallar[0].collidesWithLR(prevX, prevY, nextX, prevY, rx, ry))){
        this.velX *= -1;
      }
    } else {
      this.velX = 0;
    }
    this.CHAR_FACING = -1; //Says Char is facing left
  } else {
    this.velX = 0;
    this.MOVING = false;
  }





  // =====================================================================================
  // Bæta við collision hér til að láta character hoppa upp og haus snerti á bottom pallur
  // =====================================================================================
  //Calculates if Char is jumping
  if (keys[this.KEY_JUMP]) {

    if (this.isGrounded()) {
      this.JUMP_TIMER = this.JUMP_TIMER_COUNT; //Sets for how long space can be pressed
      this.velY = this.NOMINAL_IJUMP;  //Initial velocity increasy
    } else if (this.JUMP_INIT) {
      //Dynamic y-velocity added compared to the time
      this.velY += (this.NOMINAL_JUMP*(this.JUMP_TIMER/this.JUMP_TIMER_COUNT));
      // this.velY += this.NOMINAL_JUMP;
    }


  }
  // if (this.JUMP_TIMER > 0 && !(keys[this.KEY_JUMP])) { //Checked if space was released early
  //     this.JUMP_TIMER = 0;
  //     this.JUMP_INIT = false;
  // }





};


Char.prototype.calculateMovement = function (du) {
  var prevX = this.cx;
  var nextX = prevX + this.velX;
  var prevY = this.cy;
  var nextY = prevY + this.velY;
  var rx = this.sprite.width*this._scale/2;
  var ry = this.sprite.height*this._scale/2;

  this.cx += this.velX; //x-coordinates updated
  
  //Only works with y-axis if he's not "grounded"
  if (!this.isGrounded()) {

    if (this.JUMP_TIMER > 0) this.JUMP_TIMER--;
    if (this.cy < 502) this.velY += this.NOMINAL_GRAVITY;
    if (this.JUMP_TIMER <= 0) this.JUMP_INIT = false;
    if (this.cy >= 502) this.JUMP_INIT = true;
    
    // Ef character er fyrir ofan pallur þá tekur character cy sem cy af pallur og Y velocity er þá 0
    // if(entityManager._pallar[0].collidesWithTop(prevX, prevY, nextX, prevY, rx, ry)) {
    //     this.cy = entityManager._pallar[0].cy;
    // }
    // else this.cy += this.velY;

    this.cy += this.velY;
    if (this.cy > 502) {
      this.ground();
    }
  }

};

Char.prototype.CHAR_SHOOT = false;
Char.prototype.CHAR_SHOOT_TIMER = 0;

Char.prototype.maybeFireBullet = function () {



  if (keys[this.KEY_FIRE]) {
    if (this.CHAR_FACING === 1) {var constant = 55}
    else {var constant = -55}
    this.CHAR_SHOOT = true;
    this.CHAR_SHOOT_TIMER = 45;

    entityManager.fireBullet(
      this.cx+constant + 16*this.CHAR_FACING, this.cy-17,
      12*this.CHAR_FACING, 0, 0);
    
  } else if (this.CHAR_SHOOT_TIMER <= 0) {
    this.CHAR_SHOOT = false;
  }

  if (this.CHAR_SHOOT_TIMER > 0) this.CHAR_SHOOT_TIMER--;

};

Char.prototype.isGrounded = function () {
  if (this.JUMP_TIMER === 0 && this.JUMP_INIT === true) return true;
  return false; 
};

Char.prototype.isFalling = function () {
  if (this.JUMP_TIMER <= 0 && this.JUMP_INIT === false) return true;
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

Char.prototype.getRadius = function () {
  return (this.sprite.width / 2) * 0.9 *this._scale;
};


Char.prototype.status = function () {
  return  [this.CHAR_FACING,    //positive number for right, negative for left
           this.MOVING,          //True if moving, else false
           this.CHAR_SHOOT,      //True if shooting, else false
           this.isGrounded()];   //True if on grounds, else jumping/falling
};

Char.prototype.changeSprite = function(varImage) {
  this.sprite = varImage;
};

Char.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;
  // pass my scale into the sprite, for drawing
  this.sprite.scale = this._scale;

  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);

  this.sprite.scale = origScale;
};

