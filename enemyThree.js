// ===========
// ENEMY THREE
// ===========

// ========================================
// Eslint villutékk
// ========================================
/* eslint-env browser */
/* eslint camelcase: [0] */
/* eslint-disable no-param-reassign */
/* eslint no-use-before-define: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-var: 0 */
/* eslint vars-on-top: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint object-shorthand: 0 */
/* eslint func-names: 0 */
/* eslint quotes: 0 */
/* eslint space-infix-ops: 0 */
/* eslint linebreak-style: 0 */
/* eslint no-shadow: 0 */
/* eslint no-plusplus: 0 */
/* eslint guard-for-in: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint block-scoped-var: 0 */
/* eslint no-redeclare: 0 */
/* eslint padded-blocks: 0 */
/* eslint key-spacing: 0 */
/* eslint indent: 0 */
/* eslint new-cap: 0 */
/* eslint no-continue: 0 */
/* eslint no-useless-return: 0 */
/* eslint prefer-destructuring: 0 */
/* eslint no-unused-expressions: 0 */
/* eslint brace-style: 0 */
/* eslint no-multi-spaces: 0 */
/* eslint no-lonely-if: 0 */
/* eslint no-else-return: 0 */
/* eslint consistent-return: 0 */
// ========================================


// A generic contructor which accepts an arbitrary descriptor object
function enemyThree(descr) {

  // Common inherited setup logic from Entity
  this.setup(descr);

  // Default sprite and scale, if not otherwise specified
  this.sprite = g_sprites.goblin[0];
  this.scale  = 3;

}

enemyThree.prototype = new Entity();

enemyThree.prototype.cx = 700;
enemyThree.prototype.cy = 502;
enemyThree.prototype.floor = 502;
enemyThree.prototype.velX;
enemyThree.prototype.velY = 0;
enemyThree.prototype.health = 5;
enemyThree.prototype.shootTimer = 150; // time inbetween shots
enemyThree.prototype.goblinFacing = 1;
enemyThree.prototype.deathTimer;

enemyThree.prototype.update = function (du) {

  spatialManager.unregister(this);

  var dead = this.deathHandler();

  if (dead === 1) return 1;
  if (dead === 2) return entityManager.KILL_ME_NOW;

  this.movement(du);

  this.maybeShoot();

  this.spriteChange();

  // Player collision
  var maybeChar = this.findHitEntity();
  if (maybeChar === entityManager._char[0]) {
    entityManager._char[0].kill();
  }

  return spatialManager.register(this);
};

// Where he should be facing and jump parameters
// Also updates cx and cy coordinates
enemyThree.prototype.movement = function (du) {
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
    this.velY = -20;
    this.shootTimer = 150;
  }

  this.cy += this.velY * du;
};

// If a goblin should shoot and some sounds to play with
enemyThree.prototype.maybeShoot = function () {
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

// Animation handling
enemyThree.prototype.spriteChange = function () {
  if (this.shootTimer < 75 && this.shootTimer > 0) {
    this.sprite = g_sprites.goblin[2+this.goblinFacing];
  } else if (this.cy < this.floor) {
    this.sprite = g_sprites.goblin[4+this.goblinFacing];
  } else {
    this.sprite = g_sprites.goblin[0+this.goblinFacing];
  }
};

// Death handling
enemyThree.prototype.deathHandler = function () {
  if (this.health === 0) {
    this.deathTimer--;
    if (this.deathTimer < 5) {
      this.sprite = g_sprites.golem[8];
    } else if (this.deathTimer < 10) {
      this.sprite = g_sprites.golem[6+this.goblinFacing];
    }

    if (this.deathTimer > 0) return 1;
    if (util.randRange(0, 10) < 6) {
      entityManager.generateHealthPickup({
        cx:this.cx,
        cy:this.cy-5,
      });
    }
    return 2;
  }
  if (this._isDeadNow) {
    this._isDeadNow = false;
    this.health--;
    this.shootTimer = 100;
    if (this.health === 0) {
      this.deathTimer = 30;
      this.sprite = g_sprites.goblin[6+this.goblinFacing];
      return 1;
    }
  }
};

enemyThree.prototype.calculateMovement = function () {
  return;
};

enemyThree.prototype.getRadius = function () {
  return this.scale * (this.sprite.width / 2) * 0.9;
};

enemyThree.prototype.takeBulletHit = function () {
  this.kill();
};


enemyThree.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;
  // pass my scale into the sprite, for drawing
  this.sprite.scale = this.scale;
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
};
