// ==============
// MOUSE HANDLING
// ==============

// ========================================
// Eslint villutékk
// ========================================
/* eslint no-var: 0 */
/* eslint camelcase: 0 */
/* eslint vars-on-top: 0 */
/* eslint no-undef: 0 */
/* eslint quotes: 0 */
// ========================================

var g_mouseX = 0;
var g_mouseY = 0;
// When a menu come up, player can chose what he clicks on
function handleMouse(evt) {
  g_mouseX = evt.clientX - g_canvas.offsetLeft;
  g_mouseY = evt.clientY - g_canvas.offsetTop;

  // If no button is being pressed, then bail
  var button = evt.buttons === undefined ? evt.which : evt.buttons;
  if (!button) return;

  // If mouse is clicked within in certain area on Main Menu to Start Game
  if (g_mouseX >= 140 && g_mouseY >= 320 && g_mouseX <= 260 && g_mouseY <= 355) {
    if (main.GameState === 0) startGame();
  }
  // If mouse is clicked within in certain area on Main Menu to go to Control Screen
  if (g_mouseX >= 140 && g_mouseY >= 420 && g_mouseX <= 350 && g_mouseY <= 455) {
    if (main.GameState === 0) controlsMenu();
  }
  // If mouse is clicked within in certain area on Control Menu to Start Game
  if (g_mouseX >= 585 && g_mouseY >= 490 && g_mouseX <= 820 && g_mouseY <= 530) {
    if (main.GameState === 2) startGame();
  }
  // If mouse is clicked within in certain area on Control Menu to Main Menu
  if (g_mouseX >= 195 && g_mouseY >= 490 && g_mouseX <= 410 && g_mouseY <= 530) {
    if (main.GameState === 2) mainScreen();
  }
  // If mouse is clicked within in certain area on Winning Screen to Restart Game
  if (g_mouseX >= 550 && g_mouseY >= 450 && g_mouseX <= 860 && g_mouseY <= 530) {
    if (main.GameState === 3) startGame();
  }
  // If mouse is clicked within in certain area on Winning Screen to Main Menu
  if (g_mouseX >= 135 && g_mouseY >= 450 && g_mouseX <= 470 && g_mouseY <= 530) {
    if (main.GameState === 3) mainScreen();
  }
  // If mouse is clicked within in certain area on Game Over Screen to Main Menu
  if (g_mouseX >= 180 && g_mouseY >= 378 && g_mouseX <= 418 && g_mouseY <= 400) {
    if (main.GameState === 4) mainScreen();
  }
  // If mouse is clicked within in certain area on Game Over Screen to Try Again
  if (g_mouseX >= 637 && g_mouseY >= 378 && g_mouseX <= 765 && g_mouseY <= 400) {
    if (main.GameState === 4) startGame();
  }
}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);
