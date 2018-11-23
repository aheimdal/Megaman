// ======
// Rocket
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
function Rocket(descr) {

  // Common inherited setup logic from Entity
  this.setup(descr);

  // Make a noise when I am created (i.e. fired)
  AudioBank.playSound(AudioBank.goblinThrow);

}

Rocket.prototype = new Entity();

// Initial, inheritable, default values
Rocket.prototype.rotation = 0;
Rocket.prototype.cx = 200;
Rocket.prototype.cy = 200;
Rocket.prototype.velX = 1;
Rocket.prototype.velY = 1;
Rocket.prototype.health = 4;

// Convert times from milliseconds to "nominal" time units.
Rocket.prototype.lifeSpan = 1000 / NOMINAL_UPDATE_INTERVAL;

Rocket.prototype.update = function (du) {

  spatialManager.unregister(this);

  this.lifeSpan -= du;
  if (this.cx < 0 || this.cx > 1000 || this.cy > 1000) return entityManager.KILL_ME_NOW;

  this.cx += this.velX * du;
  if (this.lifeSpan < 0) {
    this.velY += 1;
    this.cy += this.velY * du;
  }

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

Rocket.prototype.getRadius = function () {
  return 12;
};

Rocket.prototype.takeBulletHit = function () {
  this.kill();
};

Rocket.prototype.calculateMovement = function () {
  return;
};

Rocket.prototype.calculateMovement = function () {
    return;
}

Rocket.prototype.render = function (ctx) {

  g_sprites.rocket.drawCentredAt(ctx, this.cx, this.cy, this.rotation);

  ctx.globalAlpha = 1;
};
