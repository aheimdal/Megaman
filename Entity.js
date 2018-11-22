// ======
// ENTITY
// ======
/*

Provides a set of common functions which can be "inherited" by all other
game Entities.

JavaScript's prototype-based inheritance system is unusual, and requires
some care in use. In particular, this "base" should only provide shared
functions... shared data properties are potentially quite confusing.

*/

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
// ========================================


function Entity() {

  /*
  // Diagnostics to check inheritance stuff
  this._entityProperty = true;
  console.dir(this);
  */

}

Entity.prototype.setup = function (descr) {

  // Apply all setup properies from the (optional) descriptor
  for (var property in descr) {
    this[property] = descr[property];
  }

  // Get my (unique) spatial ID
  this._spatialID = spatialManager.getNewSpatialID();

  // I am not dead yet!
  this._isDeadNow = false;
};

Entity.prototype.setPos = function (cx, cy) {
  this.cx = cx;
  this.cy = cy;
};

Entity.prototype.getPos = function () {
  return { posX : this.cx, posY : this.cy };
};

Entity.prototype.getRadius = function () {
  return 0;
};

Entity.prototype.getSpatialID = function () {
  return this._spatialID;
};

Entity.prototype.kill = function () {
  this._isDeadNow = true;
};

Entity.prototype.findHitEntity = function () {
  var pos = this.getPos();
  return spatialManager.findEntityInRange(
    pos.posX, pos.posY, this.radius,
  );
};

Entity.prototype.findHitPlatform = function () {
  var pos = this.getPos();
  return spatialManager.findPlatformInRange(
    pos.posX, pos.posY, this.radius,
  );
};

// This is just little "convenience wrapper"
Entity.prototype.isColliding = function () {
  return this.findHitEntity();
};

Entity.prototype.isCollidingPlatform = function () {
  return this.findHitPlatform();
};

Entity.prototype.wrapPosition = function () {
  this.cx = util.wrapRange(this.cx, 0, g_canvas.width);
  this.cy = util.wrapRange(this.cy, 0, g_canvas.height);
};
