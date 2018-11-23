// ========================================
// Controls Menu
// ========================================

// Variables for Control Menu Screen
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
  
  // Background Image for the background around the gamplay screen
  document.body.style.backgroundImage = "url('images/Backgrounds/back02.jpg')";
  // Color for main screen
  g_ctx.fillStyle = '#17202A';
  // Colored rectangle for game background
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


  // Undertitle where game is explained
  // First line
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
  
  // Second line
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


  // Run Left control
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

  // Run Right control
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

  // Jump control
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

  // Shoot control
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

  // Letter A, for running left
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

  // Letter D, for running right
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

  // Letter W, for jumping
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

  // Spacebar, for shooting
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

  // Back To main menu
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


  // Start Game
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

// Function to transfer us to Main Menu from Control Menu
function mainScreen(g_ctx) {
  main.GameState = 0;
}

// Function to let us start game from Control Menu
function startGame(g_ctx) {
  main.GameState = 1;
}
