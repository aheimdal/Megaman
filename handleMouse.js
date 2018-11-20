// ==============
// MOUSE HANDLING
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var g_mouseX = 0,
    g_mouseY = 0;

function handleMouse(evt) {
    
    g_mouseX = evt.clientX - g_canvas.offsetLeft;
    g_mouseY = evt.clientY - g_canvas.offsetTop;
    
    // If no button is being pressed, then bail
    var button = evt.buttons === undefined ? evt.which : evt.buttons;
    if (!button) return;

    console.log(g_mouseX);
    console.log(g_mouseY);

    if(g_mouseX >= 140 && g_mouseY >= 320 && g_mouseX <= 260 && g_mouseY <= 355){
        startGame();
    }

    if(g_mouseX >= 140 && g_mouseY >= 420 && g_mouseX <= 350 && g_mouseY <= 455){
        controlsMenu();
    }

    if(g_mouseX >= 585 && g_mouseY >= 490 && g_mouseX <= 820 && g_mouseY <= 530){
       startGame(); 
    }

    if(g_mouseX >= 195 && g_mouseY >= 490 && g_mouseX <= 410 && g_mouseY <= 530){
       mainScreen(); 
    }

}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);
