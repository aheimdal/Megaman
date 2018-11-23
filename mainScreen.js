// ===========================
//  MAIN SCREEN
// ===========================

// ========================================
// Eslint villutékk
// ========================================
/* eslint-env browser */
/* eslint camelcase: [0] */
/* eslint-disable no-param-reassign */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-var: 0 */
/* eslint func-names: 0 */
/* eslint quotes: 0 */
/* eslint space-infix-ops: 0 */
// ========================================

//  Variables for Start Screen
var startScreen = {
  title: "Run Gun Renegade",
  start: "Start",
  controls: "Controls",
};

startScreen.render = function (g_ctx) {
  // Play title song
  AudioBank.playSong(4);
  // Background Image for the background around the Main screen
  document.body.style.backgroundImage = "url('images/Backgrounds/back02.jpg')";
  // Color for main screen
  g_ctx.fillStyle = "#17202A";
  // Colored rectangle for game background
  g_ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);

  //  Title
  // Apply color to letters
  g_ctx.fillStyle = "#EC7063";
  // Apply font and character size
  g_ctx.font = "100px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(startScreen.title, g_canvas.width/2, g_canvas.height/2-200);
  // Apply black line around letters
  g_ctx.strokeText(startScreen.title, g_canvas.width/2, g_canvas.height/2-200);


  //  Start
  // Apply color to letters
  g_ctx.fillStyle = "#EC7063";
  // Apply font and character size
  g_ctx.font = "60px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(startScreen.start, g_canvas.width/2-300, g_canvas.height/2+50);
  // Apply black line around letters
  g_ctx.strokeText(startScreen.start, g_canvas.width/2-300, g_canvas.height/2+50);


  //  Controls Menu
  // Apply color to letters
  g_ctx.fillStyle = "#EC7063";
  // Apply font and character size
  g_ctx.font = "60px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(startScreen.controls, g_canvas.width/2-265, g_canvas.height/2+150);
  // Apply black line around letters
  g_ctx.strokeText(startScreen.controls, g_canvas.width/2-265, g_canvas.height/2+150);
};

// Function to let us start a new game
function startGame(g_ctx) {
  main.GameState = 1;
  levelTransition.levelIndex = -1;
}

// Function to transfer us to Control Menu from Main Menu
function controlsMenu(g_ctx) {
  main.GameState = 2;
  levelTransition.levelIndex = -1;
}
