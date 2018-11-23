// ========================================
// Game Over Screen
// ========================================

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


// Variables for Game Over Screen
var gameOverScreen = {
  game        : "GAME",
  over        : "OVER",
  undertitle  : "Sucks to be you!!",
  backToMenu  : "Go back to the",
  backToMenu2 : "menu loser!",
  tryAgain    : "I dare you to",
  tryAgain2   : "try again!",
};

gameOverScreen.render = function (g_ctx) {
  // Background Image for the background around the Game Over screen
  document.body.style.backgroundImage = "url('images/Backgrounds/back02.jpg')";
  // Color for main screen
  g_ctx.fillStyle = "#17202A";
  // Colored rectangle for game background
  g_ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);

  // Game over title, first line
  // Apply color to letters
  g_ctx.fillStyle = "#EC7063";
  // Apply font and character size
  g_ctx.font = "200px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(gameOverScreen.game, g_canvas.width/2, g_canvas.height/2-150);
  // Apply black line around letters
  g_ctx.strokeText(gameOverScreen.game, g_canvas.width/2, g_canvas.height/2-150);

  // Game over title, second line
  // Apply color to letters
  g_ctx.fillStyle = "#EC7063";
  // Apply font and character size
  g_ctx.font = "200px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(gameOverScreen.over, g_canvas.width/2, g_canvas.height/2-25);
  // Apply black line around letters
  g_ctx.strokeText(gameOverScreen.over, g_canvas.width/2, g_canvas.height/2-25);

  // Undertitle
  // Apply color to letters
  g_ctx.fillStyle = "#EC7063";
  // Apply font and character size
  g_ctx.font = "100px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(gameOverScreen.undertitle, g_canvas.width/2, g_canvas.height/2+50);
  // Apply black line around letters
  g_ctx.strokeText(gameOverScreen.undertitle, g_canvas.width/2, g_canvas.height/2+50);

  // Back to Main Menu, first line
  // Apply color to letters
  g_ctx.fillStyle = "#EC7063";
  // Apply font and character size
  g_ctx.font = "60px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(gameOverScreen.backToMenu, g_canvas.width/2-200, g_canvas.height/2+180);
  // Apply black line around letters
  g_ctx.strokeText(gameOverScreen.backToMenu, g_canvas.width/2-200, g_canvas.height/2+180);

  // Back to Main Menu, second line
  // Apply color to letters
  g_ctx.fillStyle = "#EC7063";
  // Apply font and character size
  g_ctx.font = "60px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(gameOverScreen.backToMenu2, g_canvas.width/2-200, g_canvas.height/2+225);
  // Apply black line around letters
  g_ctx.strokeText(gameOverScreen.backToMenu2, g_canvas.width/2-200, g_canvas.height/2+225);

  // Try again same level, first line
  // Apply color to letters
  g_ctx.fillStyle = "#EC7063";
  // Apply font and character size
  g_ctx.font = "60px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(gameOverScreen.tryAgain, g_canvas.width/2+200, g_canvas.height/2+180);
  // Apply black line around letters
  g_ctx.strokeText(gameOverScreen.tryAgain, g_canvas.width/2+200, g_canvas.height/2+180);

  // Try again same level, second line
  // Apply color to letters
  g_ctx.fillStyle = "#EC7063";
  // Apply font and character size
  g_ctx.font = "60px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(gameOverScreen.tryAgain2, g_canvas.width/2+200, g_canvas.height/2+225);
  // Apply black line around letters
  g_ctx.strokeText(gameOverScreen.tryAgain2, g_canvas.width/2+200, g_canvas.height/2+225);

};

// Function to transfer us to Main Menu from Control Menu
function mainScreen() {
  main.GameState = 0;
}

// Function to let us retry current level
function startGame() {
  main.GameState = 1;
}
