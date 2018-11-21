
"use strict";

var gameOverScreen = {
    game        : "GAME",
    over        : "OVER",
    undertitle  : "Sucks to be you!!",
    backToMenu  : "Go back to the",
    backToMenu2 : "menu loser!",
    tryAgain    : "I dare you to",
    tryAgain2   : "try again!"
};

gameOverScreen.render = function(g_ctx)
    {
        
        document.body.style.backgroundImage = "url('images/back02.jpg')";

        g_ctx.fillStyle = "#17202A";
        
        g_ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);

        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "200px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(gameOverScreen.game, g_canvas.width/2, g_canvas.height/2-150);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(gameOverScreen.game, g_canvas.width/2, g_canvas.height/2-150);

        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "200px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(gameOverScreen.over, g_canvas.width/2, g_canvas.height/2-25);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(gameOverScreen.over, g_canvas.width/2, g_canvas.height/2-25);

        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "100px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(gameOverScreen.undertitle, g_canvas.width/2, g_canvas.height/2+50);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(gameOverScreen.undertitle, g_canvas.width/2, g_canvas.height/2+50);

        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "60px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(gameOverScreen.backToMenu, g_canvas.width/2-200, g_canvas.height/2+180);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(gameOverScreen.backToMenu, g_canvas.width/2-200, g_canvas.height/2+180);
        
                //console.log("Apply color to letters");
                g_ctx.fillStyle = "#EC7063";
                //console.log("Apply font and character size");
                g_ctx.font = "60px VT323";
                //console.log("Align Center");
                g_ctx.textAlign = "center";
                //console.log("Write text, apply centered location");
                g_ctx.fillText(gameOverScreen.backToMenu2, g_canvas.width/2-200, g_canvas.height/2+225);
                //console.log("Apply black line around letters");
                g_ctx.strokeText(gameOverScreen.backToMenu2, g_canvas.width/2-200, g_canvas.height/2+225);
        
        // Controls
        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "60px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(gameOverScreen.tryAgain, g_canvas.width/2+200, g_canvas.height/2+180);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(gameOverScreen.tryAgain, g_canvas.width/2+200, g_canvas.height/2+180);

                // Controls
        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "60px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(gameOverScreen.tryAgain2, g_canvas.width/2+200, g_canvas.height/2+225);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(gameOverScreen.tryAgain2, g_canvas.width/2+200, g_canvas.height/2+225);

    }

    function mainScreen(g_ctx){
        main.GameState = 0;
    }
    
    function startGame(g_ctx){
        main.GameState = 1;
    }