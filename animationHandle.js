

// =================
// Animation HANDLING
// =================

"use strict";

const SPRITE_SIZE = 32;

this._animateMain = 0;

var animationHandle = {


shootRunCounter : 0,
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

cycle : function(x) {
    if (x === 1) {
        if (this.runCounter === 0) {
            this.runCounter = 110;
            return 1;
        }
        else if (this.runCounter > 90 && 
            this.runCounter < 111) {
            return 1;
        } 
        else if (this.runCounter <= 90) {
            this.runCounter = 210;
            return 2;
        }

        else if (this.runCounter > 190 &&
            this.runCounter < 211) {return 2;}

        else if (this.runCounter <= 190) {
            this.runCounter = 310;
            return 3;
        }
        else if (this.runCounter > 290 &&
            this.runCounter < 311) {return 3;}
        else {
            this.runCounter = 0;
            return 3;
        }
    } else {
        if (this.shootRunCounter === 0) {
            this.shootRunCounter = 110;
            return 5;
        }
        if (this.shootRunCounter > 90 && 
            this.shootRunCounter < 111) {
            return 5;
        }
        if (this.shootRunCounter <= 90) {
            this.shootRunCounter = 210;
            return 6;
        }
        if (this.shootRunCounter > 190 &&
            this.shootRunCounter < 211) {
            return 6;
        }
        if (this.shootRunCounter <= 190) {
            this.shootRunCounter = 310;
            return 7;
        }
        if (this.shootRunCounter > 290 &&
            this.shootRunCounter < 311) {
            return 7;
        } else {
            this.shootRunCounter = 0;
            return 7;
        }
    }
}


}



