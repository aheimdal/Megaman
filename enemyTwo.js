// ====
// ENEMYONE
// ====

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
// ========================================


// A generic contructor which accepts an arbitrary descriptor object
function enemyTwo(descr) {

  // Common inherited setup logic from Entity
  this.setup(descr);

  // Default sprite and scale, if not otherwise specified
  this.sprite = g_sprites.golem[0];
  this.scale  = 3;

}

enemyTwo.prototype = new Entity();

enemyTwo.prototype.cx = 700;
enemyTwo.prototype.cy = 470;
enemyTwo.prototype.leftBound = 200;
enemyTwo.prototype.rightBound = 750;
enemyTwo.prototype.velX = -2.5;
enemyTwo.prototype.turnAroundTimer = 2;
enemyTwo.prototype.health = 25;

enemyTwo.prototype.update = function (du) {

  spatialManager.unregister(this);

  var maybeChar = this.findHitEntity();
  if (maybeChar === entityManager._char[0]) {
    entityManager._char[0].kill();
  }

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

  this.turnAround();

  this.turnAroundTimer--;
  if (this.turnAroundTimer <= 0) {
    this.cx += this.velX * du;
    var spriteNumber = animationHandle.cycle(0, 1, 1);
    if (this.velX < 0) {
      this.sprite = g_sprites.golem[spriteNumber];
    } else {
      this.sprite = g_sprites.golem[spriteNumber+2];
    }
  }

  // console.log(this.getRadius());

  return spatialManager.register(this);
};

enemyTwo.prototype.getRadius = function () {
  return 40.8;
};

enemyTwo.prototype.takeBulletHit = function () {
  this.kill();
};

enemyTwo.prototype.turnAround = function () {
  if (this.cx <= this.leftBound) {
    this.cx++;
    this.sprite = g_sprites.golem[5];
    this.turnAroundTimer = 30;
    this.velX = 2.5;
  }
  if (this.cx >= this.rightBound) {
    this.cx--;
    this.sprite = g_sprites.golem[4];
    this.turnAroundTimer = 30;
    this.velX = -2.5;
  }
};

enemyTwo.prototype.calculateMovement = function () {
  return;
};

enemyTwo.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;
  // pass my scale into the sprite, for drawing
  this.sprite.scale = this.scale;
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
};
