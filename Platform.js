// ==========
// Platform
// ==========

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
function Platform(descr) {

  // Common inherited setup logic from Entity
  this.setup(descr);

  this.sprite = g_sprites.tiles;
}

Platform.prototype = new Entity();

// Initial, inheritable, default values
Platform.prototype.cx = 170;
Platform.prototype.cy = 450;
Platform.prototype.radius = 25;
Platform.prototype.oneTime = 0;
Platform.prototype.scale = 0;


Platform.prototype.update = function (du) {

  spatialManager.unregister(this);

  if (this._isDeadNow) {
    return entityManager.KILL_ME_NOW;
  }

  return spatialManager.register(this);
};


Platform.prototype.getRadius = function () {
  return this.radius;
};

Platform.prototype.calculateMovement = function (entity) {
  var higherBound = this.cy - this.radius;
  var lowerBound = this.cy + this.radius;
  var leftBound = this.cx - this.radius;
  var rightBound = this.cx + this.radius;
  var radius = 45;

  // Hit
  if (entity.cx<leftBound-28) {
    entity.stopX();
    entity.cx = leftBound-radius;
  } else if (entity.cx>rightBound+28) {
    entity.stopX();
    entity.cx = rightBound + radius;
  } else if (entity.isFalling()) {
    entity.ground();
    entity.cy = higherBound - radius-1;
  } else if (entity.isJumping()&&(entity.cy<502)) {
    entity.fall();
    entity.cy = lowerBound + radius;
  } else if (entity.cx < this.cx) {
    entity.stopX();
    entity.cx = leftBound-radius+8;
  } else if (entity.cx > this.cx) {
    entity.stopX();
    entity.cx = rightBound + radius-8;
  }
};


Platform.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;
  // pass my scale into the sprite, for drawing
  this.sprite.scale = this.scale;
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
};
