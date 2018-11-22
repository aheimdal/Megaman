// ======
// BULLET
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
function Bullet(descr) {

  // Common inherited setup logic from Entity
  this.setup(descr);

  // Make a noise when I am created (i.e. fired)
  AudioBank.playSound(AudioBank.bullet);
}

Bullet.prototype = new Entity();

// Initial, inheritable, default values
Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 1;
Bullet.prototype.velY = 1;

// Convert times from milliseconds to "nominal" time units.
Bullet.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

Bullet.prototype.update = function (du) {

  spatialManager.unregister(this);

  this.lifeSpan -= du;
  if (this.lifeSpan < 0 || this.cx < 0 || this.cx > 1000) return entityManager.KILL_ME_NOW;

  this.cx += this.velX * du;
  this.cy += this.velY * du;

  // Handle collisions
  var hitEntity = this.findHitEntity();
  if (!hitEntity.isHp) {
    if (hitEntity) {
      var canTakeHit = hitEntity.takeBulletHit;
      if (canTakeHit) canTakeHit.call(hitEntity);
      return entityManager.KILL_ME_NOW;
    }
  }
  // TODO: YOUR STUFF HERE! --- (Re-)Register
  return spatialManager.register(this);
};

Bullet.prototype.getRadius = function () {
  return 4;
};

Bullet.prototype.takeBulletHit = function () {
  this.kill();

  // When I am killed
};

Bullet.prototype.calculateMovement = function () {
  return;
};

Bullet.prototype.render = function (ctx) {
  g_sprites.bullet.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
  ctx.globalAlpha = 1;
};
