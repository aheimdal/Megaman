// ====
// ENEMYONE
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function enemyFour(descr) {

  // Common inherited setup logic from Entity
  this.setup(descr);

  // Default sprite and scale, if not otherwise specified
  this.sprite = g_sprites.goblin[0];
  this.scale  = 3;
}

enemyFour.prototype = new Entity();

enemyFour.prototype.cx = 700;
enemyFour.prototype.cy = 502;
enemyFour.prototype.floor = 502;
enemyFour.prototype.velX;
enemyFour.prototype.velY = 0;
enemyFour.prototype.health = 5;
enemyFour.prototype.shootTimer = 150;
enemyFour.prototype.goblinFacing = 1;

enemyFour.prototype.update = function (du) {

  spatialManager.unregister(this);

  if (this._isDeadNow && this.health === 0) {
    if (util.randRange(0, 10) < 3.5) {
      entityManager.generateHealthPickup({
        cx:this.cx,
        cy:this.cy-5,
      });
    }
    return entityManager.KILL_ME_NOW;
  }
  if (this._isDeadNow) {
    this._isDeadNow = false;
    this.health--;
  }

  this.movement(du);

  this.maybeShoot();

  this.spriteChange();

  var maybeChar = this.findHitEntity();
  if (maybeChar === entityManager._char[0]) {
    entityManager._char[0].kill();
  }

  return spatialManager.register(this);
};

enemyFour.prototype.movement = function (du) {
  if (this.cx - entityManager._char[0].cx > 0) {
    this.goblinFacing = 1;
  } else this.goblinFacing = 0;

  if (this.goblinFacing === 1) this.velX = -3.5;
  else this.velX = 3.5;

  if (this.cy < this.floor) {
    this.velY += 1;
  } else {
    this.velY = 0;
    this.cy = this.floor;
  }

  if (this.cy >= this.floor && this.shootTimer <= 0) {
    this.shootTimer = 150;
  }

  this.cy += this.velY * du;
};

enemyFour.prototype.maybeShoot = function () {
  if (this.shootTimer) {
    if (this.shootTimer === 75) {
      var rand = util.randRange(0, 3);
      if (rand < 1) AudioBank.playSound(AudioBank.gobGrunt1);
      else if (rand < 2) AudioBank.playSound(AudioBank.gobGrunt2);
      else AudioBank.playSound(AudioBank.gobGrunt3);
      entityManager.fireRocket(
        this.cx+this.velX*16,
        this.cy-10,
        this.velX*2, 0, 0,
      );
    }
    this.shootTimer--;
  }
};

enemyFour.prototype.spriteChange = function () {
  var face;
  if (this.goblinFacing === 1) face = 1;
  else face = 0;
  if (this.shootTimer < 75 && this.shootTimer > 0) this.sprite = g_sprites.goblin[2+face];
  else if (this.cy < this.floor) this.sprite = g_sprites.goblin[4+face];
  else this.sprite = g_sprites.goblin[0+face];
};

enemyFour.prototype.calculateMovement = function () {
  return;
};

enemyFour.prototype.getRadius = function () {
  return this.scale * (this.sprite.width / 2) * 0.9;
};

enemyFour.prototype.takeBulletHit = function () {
  this.kill();
};


enemyFour.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;
  // pass my scale into the sprite, for drawing
  this.sprite.scale = this.scale;
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
};
