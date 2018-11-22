// ====
// HealthPickup
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
/* eslint no-mixed-operators: 0 */
// ========================================


// A generic contructor which accepts an arbitrary descriptor object
function HealthPickup(descr) {

  // Common inherited setup logic from Entity
  this.setup(descr);
  // Default sprite and scale, if not otherwise specified
  this.sprite = g_sprites.healthPickup;
  this.scale  = 1;
}

HealthPickup.prototype = new Entity();

HealthPickup.prototype.cx = 200;
HealthPickup.prototype.cy = 470;
HealthPickup.prototype.isHp = true;

HealthPickup.prototype.update = function (du) {

  spatialManager.unregister(this);

  var maybeChar = this.findHitEntity();
  if (maybeChar === entityManager._char[0]) {
    entityManager._char[0].health++;
    return entityManager.KILL_ME_NOW;
  }

  return spatialManager.register(this);
};

HealthPickup.prototype.getRadius = function () {
  return this.scale * (this.sprite.width / 2) * 0.9;
};

HealthPickup.prototype.calculateMovement = function () {
  return;
};

HealthPickup.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;
  // pass my scale into the sprite, for drawing
  this.sprite.scale = this.scale;
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
};
