// GENERIC RENDERING


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

var g_doRender = true;

var g_lvl1 = false;
var g_lvl2 = false;
var g_lvl3 = false;
var g_lvl4 = false;
var g_lvl5 = false;
var g_lvl6 = false;
var g_lvl7 = false;
var g_lvl8 = false;
var g_lvl9 = false;

var lvl1 = '1'.charCodeAt(0);
var lvl2 = '2'.charCodeAt(0);
var lvl3 = '3'.charCodeAt(0);
var lvl4 = '4'.charCodeAt(0);
var lvl5 = '5'.charCodeAt(0);
var lvl6 = '6'.charCodeAt(0);
var lvl7 = '7'.charCodeAt(0);
var lvl8 = '8'.charCodeAt(0);
var lvl9 = '9'.charCodeAt(0);

function render(ctx) {

  // Process various option toggles
  if (eatKey(lvl1)) g_lvl1 = !g_lvl1;
  if (eatKey(lvl2)) g_lvl2 = !g_lvl2;
  if (eatKey(lvl3)) g_lvl3 = !g_lvl3;
  if (eatKey(lvl4)) g_lvl4 = !g_lvl4;
  if (eatKey(lvl5)) g_lvl5 = !g_lvl5;
  if (eatKey(lvl6)) g_lvl6 = !g_lvl6;
  if (eatKey(lvl7)) g_lvl7 = !g_lvl7;
  if (eatKey(lvl8)) g_lvl8 = !g_lvl8;
  if (eatKey(lvl9)) g_lvl9 = !g_lvl9;

  if (g_lvl1) {
    levelTransition.levelIndex = -1;
    levelTransition.changeLevel();
    g_lvl1 = !g_lvl1;
  }

  if (g_lvl2) {
    levelTransition.levelIndex = 0;
    levelTransition.changeLevel();
    g_lvl2 = !g_lvl2;
  }

  if (g_lvl3) {
    levelTransition.levelIndex = 1;
    levelTransition.changeLevel();
    g_lvl3 = !g_lvl3;
  }

  if (g_lvl4) {
    levelTransition.levelIndex = 2;
    levelTransition.changeLevel();
    g_lvl4 = !g_lvl4;
  }

  if (g_lvl5) {
    levelTransition.levelIndex = 3;
    levelTransition.changeLevel();
    g_lvl5 = !g_lvl5;
  }

  if (g_lvl6) {
    levelTransition.levelIndex = 4;
    levelTransition.changeLevel();
    g_lvl6 = !g_lvl6;
  }

  if (g_lvl7) {
    levelTransition.levelIndex = 5;
    levelTransition.changeLevel();
    g_lvl7 = !g_lvl7;
  }

  if (g_lvl8) {
    levelTransition.levelIndex = 6;
    levelTransition.changeLevel();
    g_lvl8 = !g_lvl8;
  }
  if (g_lvl9) {
    levelTransition.levelIndex = 7;
    levelTransition.changeLevel();
    g_lvl9 = !g_lvl9;
  }

  // The core rendering of the actual game / simulation
  if (g_doRender) renderSimulation(ctx);
}
