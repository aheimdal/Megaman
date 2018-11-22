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
// ========================================

var startScreen = {
  title: 'Run Gun Renegade',
  start: 'Start',
  controls: 'Controls',
};

startScreen.render = function (g_ctx) {
  document.body.style.backgroundImage = "url('images/back02.jpg')";

  g_ctx.fillStyle = '#17202A';

  g_ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);

  // Title

  g_ctx.fillStyle = '#EC7063';
  g_ctx.font = '100px VT323';
  g_ctx.textAlign = 'center';
  g_ctx.fillText(startScreen.title, g_canvas.width / 2, g_canvas.height / 2 - 200);
  g_ctx.strokeText(startScreen.title, g_canvas.width / 2, g_canvas.height / 2 - 200);


  // Start

  g_ctx.fillStyle = '#EC7063';
  g_ctx.font = '60px VT323';
  g_ctx.textAlign = 'center';
  g_ctx.fillText(startScreen.start, g_canvas.width / 2 - 300, g_canvas.height / 2 + 50);
  g_ctx.strokeText(startScreen.start, g_canvas.width / 2 - 300, g_canvas.height / 2 + 50);


  // Controls
  g_ctx.fillStyle = '#EC7063';
  g_ctx.font = '60px VT323';
  g_ctx.textAlign = 'center';
  g_ctx.fillText(startScreen.controls, g_canvas.width / 2 - 265, g_canvas.height / 2 + 150);
  g_ctx.strokeText(startScreen.controls, g_canvas.width / 2 - 265, g_canvas.height / 2 + 150);
};

function startGame(g_ctx) {
  main.GameState = 1;
}

function controlsMenu(g_ctx) {
  main.GameState = 2;
}
