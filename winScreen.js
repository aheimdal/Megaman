
"use strict";

var winScreen = {
    game        : "WINNER WINNER",
    over        : "CHICKEN DINNER!",
    backToMenu  : "Go back to Menu",
    tryAgain    : "Go again",
    underline1  : "Congratulations, you are now one step closer towards",
    underline2  : "becoming America's next top model."
};

winScreen.render = function(g_ctx)
    {
        document.body.style.backgroundImage = "url('images/back02.jpg')";

        g_ctx.fillStyle = "#17202A";
        
        g_ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);

        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#e0b100";
        //console.log("Apply font and character size");
        g_ctx.font = "150px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(winScreen.game, g_canvas.width/2, g_canvas.height/2-150);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(winScreen.game, g_canvas.width/2, g_canvas.height/2-150);

        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#e0b100";
        //console.log("Apply font and character size");
        g_ctx.font = "150px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(winScreen.over, g_canvas.width/2+15, g_canvas.height/2-25);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(winScreen.over, g_canvas.width/2+15, g_canvas.height/2-25);

       //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "40px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(winScreen.backToMenu, g_canvas.width/2-200, g_canvas.height/2+100);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(winScreen.backToMenu, g_canvas.width/2-200, g_canvas.height/2+100);
        
        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "40px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(winScreen.tryAgain, g_canvas.width/2+200, g_canvas.height/2+100);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(winScreen.tryAgain, g_canvas.width/2+200, g_canvas.height/2+100);
       
        // Controls
        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#fd1eff";
        //console.log("Apply font and character size");
        g_ctx.font = "40px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(winScreen.underline1, g_canvas.width/2+10, g_canvas.height/2+180);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(winScreen.underline1, g_canvas.width/2+10, g_canvas.height/2+180);

                // Controls
        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#fd1eff";
        //console.log("Apply font and character size");
        g_ctx.font = "40px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(winScreen.underline2, g_canvas.width/2+10, g_canvas.height/2+225);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(winScreen.underline2, g_canvas.width/2+10, g_canvas.height/2+225);

    }

    function mainScreen(){
        spatialManager.unregister(entityManager._char[0]);
        
        main.GameState = 0;
    };
    
    function startGame(){
        main.GameState = 1;
    };