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

var controlScreen = {
  title: 'Run Gun Renegade',
  undertitle: "List of controls for \"Run Gun Joe\" ",
  underunder: 'Tip: To reach next stage you need',
  underunder2: 'to clear current stage of all enemies.',
  run_left: 'To run left press: ',
  press_a: "\"A\"",
  run_right: 'To run right press: ',
  press_d: "\"D\"",
  jump: 'To jump press: ',
  press_w: "\"W\"",
  shoot: 'To shoot press: ',
  pressSpaceBar: "\"Spacebar\"",
  backToMenu: 'Main Menu',
  startGame: 'Start Game',
};

controlScreen.render = function (g_ctx) {
  document.body.style.backgroundImage = "url('images/back02.jpg')";
  g_ctx.fillStyle = '#17202A';
  g_ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);


  // Title
  g_ctx.fillStyle = '#EC7063';
  // Apply font and character size
  g_ctx.font = '100px VT323';
  // Align Center
  g_ctx.textAlign = 'center';
  // Write text, apply centered location
  g_ctx.fillText(startScreen.title, g_canvas.width/2, g_canvas.height/2-200);
  // Apply black line around letters
  g_ctx.strokeText(startScreen.title, g_canvas.width/2, g_canvas.height/2-200);


  // Start
  // Apply color to letters
  g_ctx.fillStyle = '#EC7063';
  // Apply font and character size
  g_ctx.font = '35px VT323';
  // Align Center
  g_ctx.textAlign = 'center';
  // Write text, apply centered location
  g_ctx.fillText(controlScreen.undertitle, g_canvas.width/2, g_canvas.height/2-150);
  // Apply black line around letters
  g_ctx.strokeText(controlScreen.undertitle, g_canvas.width/2, g_canvas.height/2-150);


  // Apply color to letters
  g_ctx.fillStyle = '#EC7063';
  // Apply font and character size
  g_ctx.font = '35px VT323';
  // Align Center
  g_ctx.textAlign = 'center';
  // Write text, apply centered location
  g_ctx.fillText(controlScreen.underunder, g_canvas.width/2, g_canvas.height/2-50);
  // Apply black line around letters
  g_ctx.strokeText(controlScreen.underunder, g_canvas.width/2, g_canvas.height/2-50);

  // Apply color to letters
  g_ctx.fillStyle = '#EC7063';
  // Apply font and character size
  g_ctx.font = '35px VT323';
  // Align Center
  g_ctx.textAlign = 'center';
  // Write text, apply centered location
  g_ctx.fillText(controlScreen.underunder2, g_canvas.width/2, g_canvas.height/2-20);
  // Apply black line around letters
  g_ctx.strokeText(controlScreen.underunder2, g_canvas.width/2, g_canvas.height/2-20);


  // Controls
  // Apply color to letters
  g_ctx.fillStyle = '#EC7063';
  // Apply font and character size
  g_ctx.font = '35px VT323';
  // Align Center
  g_ctx.textAlign = 'center';
  // Write text, apply centered location
  g_ctx.fillText(controlScreen.run_left, g_canvas.width/2-200, g_canvas.height/3+140);
  // Apply black line around letters'
  g_ctx.strokeText(controlScreen.run_left, g_canvas.width/2-200, g_canvas.height/3+140);

  // Apply color to letters
  g_ctx.fillStyle = '#EC7063';
  // Apply font and character size
  g_ctx.font = '35px VT323';
  // Align Center
  g_ctx.textAlign = 'center';
  // Write text, apply centered location
  g_ctx.fillText(controlScreen.run_right, g_canvas.width/2-200, g_canvas.height/3+170);
  // Apply black line around letters
  g_ctx.strokeText(controlScreen.run_right, g_canvas.width/2-200, g_canvas.height/3+170);

  // Apply color to letters
  g_ctx.fillStyle = '#EC7063';
  // Apply font and character size
  g_ctx.font = '35px VT323';
  // Align Center
  g_ctx.textAlign = 'center';
  // Write text, apply centered location
  g_ctx.fillText(controlScreen.jump, g_canvas.width/2-200, g_canvas.height/3+200);
  // Apply black line around letters
  g_ctx.strokeText(controlScreen.jump, g_canvas.width/2-200, g_canvas.height/3+200);

  // Apply color to letters
  g_ctx.fillStyle = '#EC7063';
  // Apply font and character size
  g_ctx.font = '35px VT323';
  // Align Center
  g_ctx.textAlign = 'center';
  // Write text, apply centered location
  g_ctx.fillText(controlScreen.shoot, g_canvas.width/2-200, g_canvas.height/3+230);
  // Apply black line around letters
  g_ctx.strokeText(controlScreen.shoot, g_canvas.width/2-200, g_canvas.height/3+230);

  // Apply color to letters
  g_ctx.fillStyle = '#EC7063';
  // Apply font and character size
  g_ctx.font = '35px VT323';
  // Align Center
  g_ctx.textAlign = 'center';
  // Write text, apply centered location
  g_ctx.fillText(controlScreen.press_a, g_canvas.width/2+200, g_canvas.height/3+140);
  // Apply black line around letters
  g_ctx.strokeText(controlScreen.press_a, g_canvas.width/2+200, g_canvas.height/3+140);

  // Apply color to letters
  g_ctx.fillStyle = '#EC7063';
  // Apply font and character size
  g_ctx.font = '35px VT323';
  // Align Center
  g_ctx.textAlign = 'center';
  // Write text, apply centered location
  g_ctx.fillText(controlScreen.press_d, g_canvas.width/2+200, g_canvas.height/3+170);
  // Apply black line around letters
  g_ctx.strokeText(controlScreen.press_d, g_canvas.width/2+200, g_canvas.height/3+170);

  // Apply color to letters
  g_ctx.fillStyle = '#EC7063';
  // Apply font and character size
  g_ctx.font = '35px VT323';
  // Align Center
  g_ctx.textAlign = 'center';
  // Write text, apply centered location
  g_ctx.fillText(controlScreen.press_w, g_canvas.width/2+200, g_canvas.height/3+200);
  // Apply black line around letters
  g_ctx.strokeText(controlScreen.press_w, g_canvas.width/2+200, g_canvas.height/3+200);

  // Apply color to letters
  g_ctx.fillStyle = '#EC7063';
  // Apply font and character size
  g_ctx.font = '35px VT323';
  // Align Center
  g_ctx.textAlign = 'center';
  // Write text, apply centered location
  g_ctx.fillText(controlScreen.pressSpaceBar, g_canvas.width/2+200, g_canvas.height/3+230);
  // Apply black line around letters
  g_ctx.strokeText(controlScreen.pressSpaceBar, g_canvas.width/2+200, g_canvas.height/3+230);

  // Apply color to letters
  g_ctx.fillStyle = '#EC7063';
  // Apply font and character size
  g_ctx.font = '60px VT323';
  // Align Center
  g_ctx.textAlign = 'center';
  // Write text, apply centered location
  g_ctx.fillText(controlScreen.backToMenu, g_canvas.width/2-200, g_canvas.height/2+225);
  // Apply black line around letters
  g_ctx.strokeText(controlScreen.backToMenu, g_canvas.width/2-200, g_canvas.height/2+225);


  // Controls
  // Apply color to letters
  g_ctx.fillStyle = '#EC7063';
  // Apply font and character size
  g_ctx.font = '60px VT323';
  // Align Center
  g_ctx.textAlign = 'center';
  // Write text, apply centered location
  g_ctx.fillText(controlScreen.startGame, g_canvas.width/2+200, g_canvas.height/2+225);
  // Apply black line around letters
  g_ctx.strokeText(controlScreen.startGame, g_canvas.width/2+200, g_canvas.height/2+225);
};

function mainScreen(g_ctx) {
  main.GameState = 0;
}

function startGame(g_ctx) {
  main.GameState = 1;
}
