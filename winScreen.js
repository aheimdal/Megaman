// ========================================
// Winning Screen
// ========================================

// Variables for Winning Screen
var winScreen = {
  game        : "WINNER WINNER",
  over        : "CHICKEN DINNER!",
  backToMenu  : "Go back to Menu",
  tryAgain    : "Go again",
  underline1  : "Congratulations, you are now one step closer towards",
  underline2  : "becoming America's next top model.",
};

winScreen.render = function (g_ctx) {
  // Background Image for the background around the Winning screen
  document.body.style.backgroundImage = "url('images/Backgrounds/back02.jpg')";
  // Color for Winning Screen
  g_ctx.fillStyle = "#17202A";
  // Colored rectangle for game background
  g_ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);

  // Apply color to letters
  g_ctx.fillStyle = "#e0b100";
  // Apply font and character size
  g_ctx.font = "150px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(winScreen.game, g_canvas.width/2, g_canvas.height/2-150);
  // Apply black line around letters
  g_ctx.strokeText(winScreen.game, g_canvas.width/2, g_canvas.height/2-150);

  // Apply color to letters
  g_ctx.fillStyle = "#e0b100";
  // Apply font and character size
  g_ctx.font = "150px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(winScreen.over, g_canvas.width/2+15, g_canvas.height/2-25);
  // Apply black line around letters
  g_ctx.strokeText(winScreen.over, g_canvas.width/2+15, g_canvas.height/2-25);

  // Apply color to letters
  g_ctx.fillStyle = "#EC7063";
  // Apply font and character size
  g_ctx.font = "40px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(winScreen.backToMenu, g_canvas.width/2-200, g_canvas.height/2+100);
  // Apply black line around letters
  g_ctx.strokeText(winScreen.backToMenu, g_canvas.width/2-200, g_canvas.height/2+100);

  // Apply color to letters
  g_ctx.fillStyle = "#EC7063";
  // Apply font and character size
  g_ctx.font = "40px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(winScreen.tryAgain, g_canvas.width/2+200, g_canvas.height/2+100);
  // Apply black line around letters
  g_ctx.strokeText(winScreen.tryAgain, g_canvas.width/2+200, g_canvas.height/2+100);

  // Controls
  // Apply color to letters
  g_ctx.fillStyle = "#fd1eff";
  // Apply font and character size
  g_ctx.font = "40px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(winScreen.underline1, g_canvas.width/2+10, g_canvas.height/2+180);
  // Apply black line around letters
  g_ctx.strokeText(winScreen.underline1, g_canvas.width/2+10, g_canvas.height/2+180);

  // Controls
  // Apply color to letters
  g_ctx.fillStyle = "#fd1eff";
  // Apply font and character size
  g_ctx.font = "40px VT323";
  // Align Center
  g_ctx.textAlign = "center";
  // Write text, apply centered location
  g_ctx.fillText(winScreen.underline2, g_canvas.width/2+10, g_canvas.height/2+225);
  // Apply black line around letters
  g_ctx.strokeText(winScreen.underline2, g_canvas.width/2+10, g_canvas.height/2+225);

};

//Player can go back to the main screen
function mainScreen() {
    entityManager._char[0].health = 5;
    main.GameState = 0;
}
//Player can Start the game again.
function startGame() {
    entityManager._char[0].health = 5;
    main.GameState = 1;
}
