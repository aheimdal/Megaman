// =================
// Background HANDLING
// =================

"use strict";


function canvasSpaceGame() { 
    
    // Get the canvas element. 
    g_canvas = document.getElementById("myCanvas"); 
    // Make sure you got it. 
    if (g_canvas.getContext) 

    // If you have it, create a canvas user interface element. 
    { 
      // Specify 2d canvas type. 
      g_ctx = g_canvas.getContext("2d"); 

      // Paint it black. 
      /*ctx.fillStyle = "black"; 
      ctx.rect(0, 0, 300, 300); 
      ctx.fill(); 
*/
      // Paint the starfield. 
      //stars(); 

      document.body.style.backgroundColor = "#f3f3f3";
      document.body.style.backgroundImage = "url('images/Mega.png')";   


      var img=new Image();
      img.onload=start;
      img.src="images/bak2.png";
      function start(){
          ctx.drawImage(img,0,0);
      }
      
      
    } 
  } 

/****************
 * Trying to add Background music
 * 
 * B_Music.prototype = new Entity();
 * 
 * B_Music.prototype = new Audio("./sounds/megaLag1.ogg");
****************/