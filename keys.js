// =================
// KEYBOARD HANDLING
// =================

// ========================================
// Eslint villutékk
// ========================================
/* eslint no-var: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-shadow: 0 */
/* eslint no-undef: 0 */
/* eslint quotes: 0 */
// ========================================

var keys = [];

function handleKeydown(evt) {
  keys[evt.keyCode] = true;
}

function handleKeyup(evt) {
  keys[evt.keyCode] = false;
}

// Inspects, and then clears, a key's state
//
// This allows a keypress to be "one-shot" e.g. for toggles
// ..until the auto-repeat kicks in, that is.
//
function eatKey(keyCode) {
  var isDown = keys[keyCode];
  keys[keyCode] = false;
  return isDown;
}

// A tiny little convenience function
function keyCode(keyChar) {
  return keyChar.charCodeAt(0);
}

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
