// =================
// Background HANDLING
// =================

"use strict";

this._nextMap = 0;
//The backgrounds images
this.maps = ["images/bak6.png","images/bak7.png","images/bak9.png","images/bak8.png","images/cityscape2.png","images/cityscape.png","images/cityscape2.png","images/cityscape2.png","images/cityscape2.png"];

var background = {

    //Returns the next background image
    getMap: function() {

        return maps[_nextMap];
    },

    setMap: function(numMap) {

        _nextMap = numMap;
        console.log(numMap);
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
            img.src="images/hjarta2.png";
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
