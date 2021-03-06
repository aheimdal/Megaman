// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

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
// ========================================


var util = {


  // RANGES
  // ======

  clampRange: function (value, lowBound, highBound) {
    if (value < lowBound) {
      value = lowBound;
    } else if (value > highBound) {
      value = highBound;
    }
    return value;
  },

  wrapRange: function (value, lowBound, highBound) {
    while (value < lowBound) {
      value += (highBound - lowBound);
    }
    while (value > highBound) {
      value -= (highBound - lowBound);
    }
    return value;
  },

  isBetween: function (value, lowBound, highBound) {
    if (value < lowBound) { return false; }
    if (value > highBound) { return false; }
    return true;
  },


  // RANDOMNESS
  // ==========

  randRange: function (min, max) {
    return (min + Math.random() * (max - min));
  },


  // MISC
  // ====

  square: function (x) {
    return x*x;
  },

  roundDown: function (x) {
    return Math.floor(x);
  },


  // DISTANCES
  // =========

  distSq: function (x1, y1, x2, y2) {
    return this.square(x2-x1) + this.square(y2-y1);
  },

  wrappedDistSq: function (x1, y1, x2, y2, xWrap, yWrap) {
    var dx = Math.abs(x2-x1);
    var dy = Math.abs(y2-y1);
    if (dx > xWrap/2) {
      dx = xWrap - dx;
    }
    if (dy > yWrap/2) {
      dy = yWrap - dy;
    }
    return this.square(dx) + this.square(dy);
  },


  // CANVAS OPS
  // ==========

  clearCanvas: function (ctx) {

  },

  strokeCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
  },

  fillCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  },

  strokeBox: function (ctx, x, y, r) {
    ctx.strokeRect(x-r, y-r, r*2, r*2);
  },

  fillBox: function (ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
  },
};
