//===========================
// MAIN SCREEN
//===========================

// Variables for Start Screen
var startScreen = {
    title : "Run Gun Renegade",
    start : "Start",
    controls : "Controls"
};

startScreen.render = function(g_ctx)
    {   
        // Play title song
        AudioBank.playSong(4);
         // Background Image for the background around the gamplay screen
        document.body.style.backgroundImage = "url('images/Backgrounds/back02.jpg')";
        // Color for main screen
        g_ctx.fillStyle = "#17202A";
        // Colored rectangle for game background
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
        g_ctx.fillText(startScreen.start, g_canvas.width/2-300, g_canvas.height/2+50);
        //console.log("Apply black line around letters");
        g_ctx.strokeText(startScreen.start, g_canvas.width/2-300, g_canvas.height/2+50);


        // Controls Menu
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

// Function to let us start a new game
function startGame(g_ctx){
    main.GameState = 1;
}

// Function to transfer us to Control Menu from Main Menu
function controlsMenu(g_ctx){
    main.GameState = 2;
}
