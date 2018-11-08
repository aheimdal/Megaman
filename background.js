// =================
// Background HANDLING
// =================

"use strict";

this._nextMap = 0;
//The backgrounds images
this.maps = ["images/bak6.png","images/bak7.png","images/bak9.png","images/bak8.png"];

var background = {

    //Returns the next background image
    getMap: function() {
        
        return maps[_nextMap];
    },

    setMap: function() {
        
        _nextMap++;
    },

    canvasSpaceGame: function(imgSrc) { 
        //This is our browser background
        document.body.style.backgroundImage = "url('images/Mega.png')"; 
    
        //Here we load the background
          var img=new Image();
          img.onload=start;
          img.src=imgSrc;
          function start(){
              ctx.drawImage(img,0,0);
          }
        }

};
