
"use strict";

var startScreen = true;

var start_screen = (function(input)
    {
        var canvas = document.getElementById("startingCanvas");
        var ctx = canvas.getContext("2d");
        ctx.font = "50px Arial";
        ctx.fillText("Starting Menu",500,300);
    }
);