// ======
// BossShoot
// ======

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
// ========================================


// A generic contructor which accepts an arbitrary descriptor object
function BossShoot(descr) {

  // Common inherited setup logic from Entity
  this.setup(descr);

  // Make a noise when I am created (i.e. fired)
  AudioBank.playSound(AudioBank.bossThrow);

}

BossShoot.prototype = new Entity();

// Initial, inheritable, default values
BossShoot.prototype.rotation = 0;
BossShoot.prototype.cx = 200;
BossShoot.prototype.cy = 200;
BossShoot.prototype.velX = 1;
BossShoot.prototype.velY = 1;
BossShoot.prototype.health = 4;

BossShoot.prototype.update = function (du) {

  spatialManager.unregister(this);

  this.lifeSpan -= du;
  if (this.cx < 0 || this.cx > 1000 || this.cy > 1000) return entityManager.KILL_ME_NOW;

  this.velY += 1;
  this.cx += this.velX * du;
  this.cy += this.velY * du;

  // Handle collisions
  if (this._isDeadNow && this.health === 0) return entityManager.KILL_ME_NOW;
  if (this._isDeadNow) {
    this._isDeadNow = false;
    this.health--;
  }

  var maybeChar = this.findHitEntity();
  if (maybeChar === entityManager._char[0]) {
    entityManager._char[0].kill();
    return entityManager.KILL_ME_NOW;
  }

  return spatialManager.register(this);
};

BossShoot.prototype.getRadius = function () {
  return 12;
};

BossShoot.prototype.takeBulletHit = function () {
  this.kill();
};

BossShoot.prototype.calculateMovement = function () {
  return;
};

BossShoot.prototype.render = function (ctx) {

  g_sprites.bottleboli.drawCentredAt(ctx, this.cx, this.cy, this.rotation);

  ctx.globalAlpha = 1;
};
