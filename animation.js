

// =================
// Animation HANDLING
// =================

"use strict";

const SPRITE_SIZE = 32;

this._animateMain = 0;

var joe_sprite = function(frame_set, delay){
    this.count = 0;
    this.delay = delay;
    this.frame = 0;
    this.frame_index = 0;
    this.frame_set = frame_set;

};

//Images for animation on main character
sprite_sheet = {
frame_set = [
    "images/joe1.png", // Standing still
    ["images/joe2.png", // Run1 (Middle stage in running)
    "images/joe3.png", // Run2 (Stepping on right foot)
    "images/joe4.png"], // Run3 (Stepping on left foot)
    "images/joe5.png", // Standing shooting
    ["images/joe6.png", // Run1 shooting (Middle stage in running)
    "images/joe7.png", // Run2 shooting (Stepping on right foot)
    "images/joe8.png"], // Run3 shooting (Stepping on left foot)
    "images/joe9.png", // Jump
    "images/joe10.png" // Jump shooting
    ]
};

loop = function(time_stamp) {

    
    if(CHAR_Moving){
        // Joe is running
        if(CHAR_FACING){
            animation.change(sprite_sheet.frame_set[1,[0]], 15),
            animation.change(sprite_sheet.frame_set[1,[1]], 15),
            animation.change(sprite_sheet.frame_set[1,[0]], 15),
            animation.change(sprite_sheet.frame_set[1,[2]], 15)
        }
        if(!CHAR_FACING){
            // Á eftir að snúa honum við
            animation.change(sprite_sheet.frame_set[1,[0]], 15),
            animation.change(sprite_sheet.frame_set[1,[1]], 15),
            animation.change(sprite_sheet.frame_set[1,[0]], 15),
            animation.change(sprite_sheet.frame_set[1,[2]], 15)
        
        }
        //Joe is running and shooting
        if(CHAR_SHOOTING){
            if(CHAR_FACING){
                animation.change(sprite_sheet.frame_set[4,[0]], 15),
                animation.change(sprite_sheet.frame_set[4,[1]], 15),
                animation.change(sprite_sheet.frame_set[4,[0]], 15),
                animation.change(sprite_sheet.frame_set[4,[2]], 15)
            }
            if(!CHAR_FACING){
                // Á eftir að snúa honum við
                animation.change(sprite_sheet.frame_set[4,[0]], 15),
                animation.change(sprite_sheet.frame_set[4,[1]], 15),
                animation.change(sprite_sheet.frame_set[4,[0]], 15),
                animation.change(sprite_sheet.frame_set[4,[2]], 15)
            
            }   
        }

    }

    if(!isGrounded){
        // Joe is jumping
        if(CHAR_FACING){
            animation.change(sprite_sheet.frame_set[5], 15)
            
        }
        if(!CHAR_FACING){
            // Á eftir að snúa honum við
            animation.change(sprite_sheet.frame_set[5], 15)
        
        }
        // Joe is jumping and shooting
        if(CHAR_SHOOTING){
            if(CHAR_FACING){
                animation.change(sprite_sheet.frame_set[6], 15)
                
            }
            if(!CHAR_FACING){
                // Á eftir að snúa honum við
                animation.change(sprite_sheet.frame_set[6], 15)
            
            }   
        }
    }

    // Joe is just standing
    if(!CHAR_MOVING && !isGrounded){
        if(CHAR_FACING == true){
            
            animation.change(sprite_sheet.frame_set[0], 15)
    
        }
        if(CHAR_FACING == false){
            // Á eftir að snúa honum við
            animation.change(sprite_sheet.frame_set[0], 15)
            
        }
        // Joe is shooting standing
        if(CHAR_SHOOTING){
            if(CHAR_FACING == true){
            
                animation.change(sprite_sheet.frame_set[3], 15)
        
            }
            if(CHAR_FACING == false){
                // Á eftir að snúa honum við
                animation.change(sprite_sheet.frame_set[3], 15)
            }
        }
    }

}