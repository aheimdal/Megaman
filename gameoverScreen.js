
"use strict";

var gameOverScreen = {
    game : "GAME",
    over : "OVER",
    undertitle : "Sucks to be you!!"
};

gameOverScreen.render = function(g_ctx)
    {
        
        document.body.style.backgroundImage = "url('images/back02.jpg')";

        g_ctx.fillStyle = "#17202A";
        
        g_ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);

        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "250px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(gameOverScreen.game, g_canvas.width/2, g_canvas.height/2-50);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(gameOverScreen.game, g_canvas.width/2, g_canvas.height/2-50);

        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "250px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(gameOverScreen.over, g_canvas.width/2, g_canvas.height/2+100);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(gameOverScreen.over, g_canvas.width/2, g_canvas.height/2+100);

                        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "100px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(gameOverScreen.undertitle, g_canvas.width/2, g_canvas.height/2+200);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(gameOverScreen.undertitle, g_canvas.width/2, g_canvas.height/2+200);

    }
