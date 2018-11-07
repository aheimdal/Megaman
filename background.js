// =================
// Background HANDLING
// =================

"use strict";

g_canvas = document.getElementById("myCanvas"); 
g_ctx = g_canvas.getContext("2d"); 



function canvasSpaceGame(imgSrc) { 
 
      document.body.style.backgroundColor = "#f3f3f3";
      document.body.style.backgroundImage = "url('images/Mega.png')";   


      var img=new Image();
      img.onload=start;
      img.src=imgSrc;
      function start(){
          ctx.drawImage(img,0,0);
      }
    };
