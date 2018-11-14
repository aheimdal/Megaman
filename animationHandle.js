

// =================
// Animation HANDLING
// =================

"use strict";

const SPRITE_SIZE = 32;

this._animateMain = 0;

var animationHandle = {


//shootRunCounter : 0,
runCounter : 0,

update : function(obj) {
    var status = obj.status();
    var pick = 0;

    if (status[0] === 1) {var direction = g_sprites.CharR;}
    else {var direction = g_sprites.CharL;}
    var moving = status[1];
    var shooting = status[2];
    var grounded = status[3];

    
    if (!grounded) {
        if (shooting) {pick = 9;}
        else {pick = 8;}
    } else {
        if (!moving) {
            if (shooting) {pick = 4;}
            else {pick = 0};
        } else {
            if (shooting) {
                if (this.runCounter > 0) this.runCounter = 0;
                pick = this.cycle(5);
                if (this.shootRunCounter > 0) {this.shootRunCounter-=2;}
                else {this.shootRunCounter = 0;}
            }
            else {
                if (this.shootRunCounter > 0) this.shootRunCounter = 0;
                pick = this.cycle(1);
                if (this.runCounter > 0) {this.runCounter-=2;}
                else {this.runCounter = 0;}
            }
        }
    }

    obj.changeSprite(direction[pick]);
},

cycle : function(x,y,z) {
    if (x === 1) {
        if (this.runCounter === 0) {
            this.runCounter = 110;
            return x;
        }
        else if (this.runCounter > 90 && 
            this.runCounter < 111) {
            return x;
        } 
        else if (this.runCounter <= 90) {
            this.runCounter = 210;
            return y;
        }

        else if (this.runCounter > 190 &&
            this.runCounter < 211) {return y;}

        else if (this.runCounter <= 190) {
            this.runCounter = 310;
            return z;
        }
        else if (this.runCounter > 290 &&
            this.runCounter < 311) {return z;}
        else {
            this.runCounter = 0;
            return z;
        }
    } 
}


}



