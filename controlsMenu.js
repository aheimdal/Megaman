
"use strict";

var controlScreen = {
    title : "Run Gun Renegade",
    undertitle : "List of controls for \"Run Gun Joe\" ",
    run_left : "To run left press: ",
    press_a : "\"A\"",
    run_right : "To run right press: ",
    press_d : "\"D\"",
    jump : "To jump press: ",
    press_w : "\"W\"",
    shoot : "To shoot press: ",
    pressSpaceBar : "\"Spacebar\"",
    backToMenu : "Main Menu",
    startGame : "Start Game"
};

controlScreen.render = function(g_ctx)
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
        g_ctx.font = "35px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(controlScreen.undertitle, g_canvas.width/2, g_canvas.height/2-150);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(controlScreen.undertitle, g_canvas.width/2, g_canvas.height/2-150);


        // Controls
        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "35px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(controlScreen.run_left, g_canvas.width/2-200, g_canvas.height/3+140);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(controlScreen.run_left, g_canvas.width/2-200, g_canvas.height/3+140);

        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "35px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(controlScreen.run_right, g_canvas.width/2-200, g_canvas.height/3+170);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(controlScreen.run_right, g_canvas.width/2-200, g_canvas.height/3+170);

        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "35px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(controlScreen.jump, g_canvas.width/2-200, g_canvas.height/3+200);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(controlScreen.jump, g_canvas.width/2-200, g_canvas.height/3+200);

        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "35px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(controlScreen.shoot, g_canvas.width/2-200, g_canvas.height/3+230);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(controlScreen.shoot, g_canvas.width/2-200, g_canvas.height/3+230);

                //console.log("Apply color to letters");
                g_ctx.fillStyle = "#EC7063";
                //console.log("Apply font and character size");
                g_ctx.font = "35px VT323";
                //console.log("Align Center");
                g_ctx.textAlign = "center";
                //console.log("Write text, apply centered location");
                g_ctx.fillText(controlScreen.press_a, g_canvas.width/2+200, g_canvas.height/3+140);
                //console.log("Apply black line around letters");
                g_ctx.strokeText(controlScreen.press_a, g_canvas.width/2+200, g_canvas.height/3+140);
        
                //console.log("Apply color to letters");
                g_ctx.fillStyle = "#EC7063";
                //console.log("Apply font and character size");
                g_ctx.font = "35px VT323";
                //console.log("Align Center");
                g_ctx.textAlign = "center";
                //console.log("Write text, apply centered location");
                g_ctx.fillText(controlScreen.press_d, g_canvas.width/2+200, g_canvas.height/3+170);
                //console.log("Apply black line around letters");
                g_ctx.strokeText(controlScreen.press_d, g_canvas.width/2+200, g_canvas.height/3+170);
        
                //console.log("Apply color to letters");
                g_ctx.fillStyle = "#EC7063";
                //console.log("Apply font and character size");
                g_ctx.font = "35px VT323";
                //console.log("Align Center");
                g_ctx.textAlign = "center";
                //console.log("Write text, apply centered location");
                g_ctx.fillText(controlScreen.press_w, g_canvas.width/2+200, g_canvas.height/3+200);
                //console.log("Apply black line around letters");
                g_ctx.strokeText(controlScreen.press_w, g_canvas.width/2+200, g_canvas.height/3+200);
        
                //console.log("Apply color to letters");
                g_ctx.fillStyle = "#EC7063";
                //console.log("Apply font and character size");
                g_ctx.font = "35px VT323";
                //console.log("Align Center");
                g_ctx.textAlign = "center";
                //console.log("Write text, apply centered location");
                g_ctx.fillText(controlScreen.pressSpaceBar, g_canvas.width/2+200, g_canvas.height/3+230);
                //console.log("Apply black line around letters");
                g_ctx.strokeText(controlScreen.pressSpaceBar, g_canvas.width/2+200, g_canvas.height/3+230);

                //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "60px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(controlScreen.backToMenu, g_canvas.width/2-200, g_canvas.height/2+225);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(controlScreen.backToMenu, g_canvas.width/2-200, g_canvas.height/2+225);


        // Controls
        //console.log("Apply color to letters");
        g_ctx.fillStyle = "#EC7063";
        //console.log("Apply font and character size");
        g_ctx.font = "60px VT323";
        //console.log("Align Center");
        g_ctx.textAlign = "center";
        //console.log("Write text, apply centered location");
        g_ctx.fillText(controlScreen.startGame, g_canvas.width/2+200, g_canvas.height/2+225);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(controlScreen.startGame, g_canvas.width/2+200, g_canvas.height/2+225);
    }

function mainScreen(g_ctx){
    main.GameState = 0;
}

function startGame(g_ctx){
    main.GameState = 1;
    AudioBank.playSong(2);
}