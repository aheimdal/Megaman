
"use strict";

var startScreen = {
    title : "Run Gun Renegade",
    start : "Start",
    controls : "Controls"
};

startScreen.render = function(ctx)
    {
        document.body.style.backgroundImage = "url('images/back02.jpg')";

        g_ctx.fillStyle = "#17202A";
        
        g_ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);
        
        // Title

        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "100px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(startScreen.title, g_canvas.width/2, g_canvas.height/2-200)
        //console.log("Apply black line around letters");
        g_ctx.strokeText(startScreen.title, g_canvas.width/2, g_canvas.height/2-200);
    
    
        // Start
    
        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "60px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        var hlutur1 = g_ctx.fillText(startScreen.start, g_canvas.width/2-300, g_canvas.height/2+50);
        hlutur1;
        //console.log("Apply black line around letters");
        g_ctx.strokeText(startScreen.start, g_canvas.width/2-300, g_canvas.height/2+50);


        // Controls
        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "60px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(startScreen.controls, g_canvas.width/2-265, g_canvas.height/2+150);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(startScreen.controls, g_canvas.width/2-265, g_canvas.height/2+150);
   
    }
/*
    hlutur1.onclick = function(){startgame};

function startgame(){
    GameState = 1;
}*/