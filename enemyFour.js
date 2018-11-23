// ==========
// ENEMY FOUR
// =========

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
enemyFour.prototype.deathTimer;

enemyFour.prototype.update = function (du) {

  spatialManager.unregister(this);

  var dead = this.deathHandler();

  if (dead === 1) return 1;
  if (dead === 2) return entityManager.KILL_ME_NOW;

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
    this.shootTimer = 200;
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

enemyFour.prototype.deathHandler = function () {
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
    this.shootTimer = 85;
    if (this.health === 0) {
      this.deathTimer = 30;
      this.sprite = g_sprites.goblin[6+this.goblinFacing];
      return 1;
    }
  }
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
