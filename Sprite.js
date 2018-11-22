// ============
// SPRITE STUFF
// ============

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


// Construct a "sprite" from the given `image`,
//
function Sprite(image) {
  this.image = image;

  this.width = image.width;
  this.height = image.height;
  this.scale = 1;
}

Sprite.prototype.drawAt = function (ctx, x, y) {
  ctx.drawImage(this.image, x, y);
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
  if (rotation === undefined) rotation = 0;

  var w = this.width;
  var h = this.height;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.scale(this.scale, this.scale);

  // drawImage expects "top-left" coords, so we offset our destination
  // coords accordingly, to draw our sprite centred at the origin
  ctx.drawImage(this.image, -w/2, -h/2);
  ctx.restore();
};

Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {

  // Get "screen width"
  var sw = g_canvas.width;

  // Draw primary instance
  this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);

  // Left and Right wraps

  this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
  this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {

  // Get "screen height"
  var sh = g_canvas.height;

  // Draw primary instance
  this.drawCentredAt(ctx, cx, cy, rotation);

  // Top and Bottom wraps
  this.drawCentredAt(ctx, cx, cy - sh, rotation);
  this.drawCentredAt(ctx, cx, cy + sh, rotation);
};
