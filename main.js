// ========
// MAINLOOP
// ========


/*

The mainloop is one big object with a fairly small public interface
(e.g. init, iter, gameOver), and a bunch of private internal helper methods.

The "private" members are identified as such purely by the naming convention
of having them begin with a leading underscore. A more robust form of privacy,
with genuine name-hiding *is* possible in JavaScript (via closures), but I
haven't adopted it here.

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
/* eslint no-useless-return: 0 */
/* eslint prefer-destructuring: 0 */
/* eslint no-unused-expressions: 0 */
/* eslint brace-style: 0 */
/* eslint no-multi-spaces: 0 */
/* eslint no-lonely-if: 0 */
/* eslint no-else-return: 0 */
/* eslint no-mixed-operators: 0 */
/* eslint one-var: 0 */
/* eslint no-prototype-builtins: 0 */
// ========================================


var main = {
  // "Frame Time" is a (potentially high-precision) frame-clock for animations
  _frameTime_ms : null,
  _frameTimeDelta_ms : null,
};

main.GameState = 0;

// Perform one iteration of the mainloop
main.iter = function (frameTime) {
  // Use the given frameTime to update all of our game-clocks
  this._updateClocks(frameTime);
  // Perform the iteration core to do all the "real" work
  this._iterCore(this._frameTimeDelta_ms);
  // Check if audio should be playing
  this._checkMute();
  // Request the next iteration if needed
  if (!this._isGameOver) this._requestNextIteration();
};

main._updateClocks = function (frameTime) {
  // First-time initialisation
  if (this._frameTime_ms === null) this._frameTime_ms = frameTime;
  // Track frameTime and its delta
  this._frameTimeDelta_ms = frameTime - this._frameTime_ms;
  this._frameTime_ms = frameTime;
};

main._iterCore = function (dt) {

  // Handle QUIT
  if (requestedQuit()) {
    this.gameOver();
    return;
  }

  if (this.GameState === 0) {
    startScreen.render(g_ctx);
  }

  if (this.GameState === 1) {
    update(dt);
    render(g_ctx);
  }

  if (this.GameState === 2) {
    controlScreen.render(g_ctx);
  }

  if (this.GameState === 3) {
    gameOverScreen.render(g_ctx);
  }

  if (this.GameState === 4) {
    winScreen.render(g_ctx);
  }
};

main._isGameOver = false;

main.gameOver = function () {
  this._isGameOver = true;
};

// Simple voluntary quit mechanism
//
var KEY_QUIT = 'Q'.charCodeAt(0);
function requestedQuit() {
  return keys[KEY_QUIT];
}

// Annoying shim for Firefox and Safari
window.requestAnimationFrame = window.requestAnimationFrame // Chrome
  || window.mozRequestAnimationFrame // Firefox
  || window.webkitRequestAnimationFrame; // Safari

// This needs to be a "global" function, for the "window" APIs to callback to
function mainIterFrame(frameTime) {
  main.iter(frameTime);
}

main._requestNextIteration = function () {
  window.requestAnimationFrame(mainIterFrame);
};

// Mainloop-level debug-rendering

var TOGGLE_MUTE = 'M'.charCodeAt(0);

main._doTimerShow = false;

main._checkMute = function () {
  if (eatKey(TOGGLE_MUTE)) {
    AudioBank.isMuted = !AudioBank.isMuted;
    if (AudioBank.isMuted) AudioBank.pauseSong();
    else AudioBank.playCurrentSong();
  }

};

main.init = function () {
  // Grabbing focus is good, but it sometimes screws up jsfiddle,
  // so it's a risky option during "development"
  //
  // window.focus(true);

  // We'll be working on a black background here,
  // so let's use a fillStyle which works against that...
  //
  g_ctx.fillStyle = "white";

  this._requestNextIteration();
};
