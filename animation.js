

// =================
// Background HANDLING
// =================

"use strict";

this._animateMain = 0;

//Images for animation on main character
this.joeMove = [
    "images/joe1.png", 
    "images/joe2.png", 
    "images/joe3.png", 
    "images/joe4.png", 
    "images/joe5.png",
    "images/joe6.png",
    "images/joe7.png",
    "images/joe8.png",
    "images/joe9.png",
    "images/joe10.png"
    ]

var joe_sprite = {

    //Returns the next animation image
    getSprite: function(){
        return joeMove[_animateMain];
    }, 

    setSprite: function(){
        _animateMain++;
    },

    animationMain: function(joeSrc){

        var animate = new Image();
        animate.onload=start;
        animate.src=joeSrc;
        
    }
};

