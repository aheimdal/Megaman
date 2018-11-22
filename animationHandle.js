// =================
// Animation HANDLING
// =================

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

var animationHandle = {

  runCounter : 0,

  update : function (obj) {
    var status = obj.status();
    var pick = 0;
    var direction;

    if (obj === entityManager._char[0]) {
      if (status[0] === 1) {
        direction = g_sprites.CharR;
        if (this.runCounter > 0) {
          this.runCounter -= 2;
        } else {
          this.runCounter = 0;
        }
      } else {
        direction = g_sprites.CharL;
        if (this.runCounter > 0) {
          this.runCounter-=2;
        } else {
          this.runCounter = 0;
        }
      }

    } else {
      if (status[0] === 1) {
        direction = g_sprites.BossR;
      } else {
        direction = g_sprites.BossL;
      }
    }

    var moving = status[1];
    var shooting = status[2];
    var grounded = status[3];
    var hurt = status[4];

    if (!grounded) {
      if (shooting) { pick = 9; }
      else { pick = 8; }
    } else {
      if (!moving) {
        if (shooting) { pick = 4; }
        else { pick = 0; }
      } else {
        if (shooting) {
          pick = this.cycle(6, 5, 7);
        }
        else {
          pick = this.cycle(2, 1, 3);
        }
      }
    }
    if (hurt) {
      if (grounded) {
        pick = 11;
      }
      else pick = 10;
    }

    obj.changeSprite(direction[pick]);
  },

  cycle : function (x, y, z) {
    if (this.runCounter === 0) {
      this.runCounter = 110;
      return x;
    } else if (this.runCounter > 90 && this.runCounter < 111) {
      return x;
    } else if (this.runCounter <= 90) {
      this.runCounter = 210;
      return y;
    } else if (this.runCounter > 190 && this.runCounter < 211) {
      return y;
    } else if (this.runCounter <= 190) {
      this.runCounter = 310;
      return z;
    } else if (this.runCounter > 290 && this.runCounter < 311) {
      return z;
    } else if (this.runCounter <= 290) {
      this.runCounter = 410;
      return y;
    } else if (this.runCounter > 390 && this.runCounter < 411) {
      return y;
    } else {
      this.runCounter = 0;
      return y;
    }
  },
};
