// =================
// Background HANDLING
// =================

"use strict";

this._nextMap = 0;
//The backgrounds images
this.maps = [
    "images/Backgrounds/cityscape.png",
    "images/Backgrounds/cityscape.png",
    "images/Backgrounds/cityscape.png",
    "images/Backgrounds/cityscape.png",
    "images/Backgrounds/cityscape.png",
    "images/Backgrounds/cityscape3.png",
    "images/Backgrounds/cityscape3.png",
    "images/Backgrounds/cityscape2.png",
    "images/Backgrounds/cityscape2.png",
    "images/Backgrounds/cityscape2.png"

];

var background = {

    //Returns the next background image
    getMap: function() {
        console.log(_nextMap)
        return maps[_nextMap];
    },

    setMap: function(numMap) {

        _nextMap = numMap;
       // console.log(numMap);
    },

    canvasSpaceGame: function(imgSrc) {
        //This is our browser background
        document.body.style.backgroundImage = "url('images/back02.jpg')";

        //Here we load the background
          var img=new Image();
          img.onload=start;
          img.src=imgSrc;
          function start(){
              ctx.drawImage(img,0,0);
          }
        },

    imgHeart: function(health){
            var img=new Image();
            img.src="images/Sprites & Tiles/hjarta2.png";
            if(health == 1)
                ctx.drawImage(img, 5, 5);

                else if(health == 2){
                ctx.drawImage(img, 5, 5);
                ctx.drawImage(img, 60, 5);
            }

                else if(health == 3){
                ctx.drawImage(img, 5, 5);
                ctx.drawImage(img, 60, 5);
                ctx.drawImage(img, 115, 5);
            }

               else if(health == 4){
                ctx.drawImage(img, 5, 5);
                ctx.drawImage(img, 60, 5);
                ctx.drawImage(img, 115, 5);
                ctx.drawImage(img, 170, 5);
            }
                else if(health == 5){
                ctx.drawImage(img, 5, 5);
                ctx.drawImage(img, 60, 5);
                ctx.drawImage(img, 115, 5);
                ctx.drawImage(img, 170, 5);
                ctx.drawImage(img, 225, 5);
            }

        },

};
