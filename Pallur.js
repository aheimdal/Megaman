// ==========
// Pallur STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
  0        1         2         3         4         5         6         7         8
  12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Pallur(descr) {
  this.setup(descr);
  //this.rememberResets();
};

Pallur.prototype = new Entity();

Pallur.prototype.rememberResets = function () {
  // Remember my reset positions
  // Gudjon fix
  this.cx = 300;
  this.cy = 420;
};

Pallur.prototype.cx = 300;
Pallur.prototype.cy = 420;
Pallur.prototype.halfWidth = 100;
Pallur.prototype.halfHeight = 10;


Pallur.prototype.update = function (du) {
  spatialManager.unregister(this);
  // if(this._isDeadNow){
  //     return entityManager.KILL_ME_NOW;
  // }
  spatialManager.register(this);
};


Pallur.prototype.render = function (ctx) {
  ctx.fillRect(this.cx - this.halfWidth, this.cy - this.halfHeight, this.halfWidth * 2, this.halfHeight * 2);
};


Pallur.prototype.collidesWithLR = function (prevX, prevY, nextX, nextY, rx, ry) {
  var pxLeft = this.cx - this.halfWidth;
  var pxRight = this.cx + this.halfWidth;
  var pyTop = this.cy - this.halfHeight;
  var pyBottom = this.cy + this.halfHeight;
  
  var cxLeftPrev = prevX - rx;
  var cxLeftNext = nextX - rx;
  var cxRightPrev = prevX + rx;
  var cxRightNext = nextX + rx;
  var cyTopPrev = prevY - rx;
  var cyTopNext = nextY - rx;
  var cyBottomPrev = prevY + rx;
  var cyBottomNext = nextY + ry;
  
  // jump right hit left paddle´s side
  // console.log("not here");
  if(cxRightPrev < pxLeft && cxRightNext >= pxLeft) {
    console.log("half inside");
    if(cyTopNext < pyTop && cyBottomNext > pyBottom) {
      console.log("hit body 1");
      return true;

    }
    if(cyTopNext > pyTop && cyTopNext < pyBottom) {
      console.log("hit body 2");
      return true;
    }
    if(cyBottomNext > pyTop && cyBottomNext < pyBottom) {
      console.log("hit body 3");
      return true;
    }
  }
  // jump left hit right paddle´s side
  if(cxLeftPrev > pxRight && cxLeftNext < pxRight) {
    if(cyTopNext < pyTop && cyBottomNext > pyBottom) {
      return true;
    }
    if(cyTopNext > pyTop && cyTopNext < pyBottom) {
      return true;
    }
    if(cyBottomNext > pyTop && cyBottomNext < pyBottom) {
      return true;
    }
    //   if((cyTopNext === pyTop && cyTopNext < pyBottom) || (cyTopNext === pyBottom && cyTopNext > pyTop)) {
    //     return true;
    //   }
    //   if((cyBottomNext === pyBottom && cyBottomNext > pyTop) || (cyBottomNext === pyTop && cyBottomNext < pyBottom)) {
    //     return true;
    //   }
  }

  return false;
};

Pallur.prototype.collidesWithTop = function (prevX, prevY, nextX, nextY, rx, ry) {
  var pxLeft = this.cx - this.halfWidth;
  var pxRight = this.cx + this.halfWidth;
  var pyTop = this.cy - this.halfHeight;
  var pyBottom = this.cy + this.halfHeight;
  
  var cxLeftPrev = prevX - rx;
  var cxLeftNext = nextX - rx;
  var cxRightPrev = prevX + rx;
  var cxRightNext = nextX + rx;
  var cyTopPrev = prevY - rx;
  var cyTopNext = nextY - rx;
  var cyBottomPrev = prevY + rx;
  var cyBottomNext = nextY + ry;
  if(cyBottomPrev < pyTop && cyBottomNext >= pyTop) {
    console.log("drop down");
    if(cxLeftNext > pxLeft && cxRightNext < pxRight) {
      console.log("drop 1");
      return true;
    }
    if(cxLeftNext < pxLeft && cxRightNext > pxLeft) {
      console.log("drop 2");
      return true;
    }
    if(cxRightNext > pxRight && cxLeftNext < pxRight) {
      console.log("drop 3");
      return true;
    }
    
  }
  return false;
};

Pallur.prototype.collidesWithBottom = function (prevX, prevY, nextX, nextY, rx, ry) {
  var pxLeft = this.cx - this.halfWidth;
  var pxRight = this.cx + this.halfWidth;
  var pyTop = this.cy - this.halfHeight;
  var pyBottom = this.cy + this.halfHeight;
  
  var cxLeftPrev = prevX - rx;
  var cxLeftNext = nextX - rx;
  var cxRightPrev = prevX + rx;
  var cxRightNext = nextX + rx;
  var cyTopPrev = prevY - rx;
  var cyTopNext = nextY - rx;
  var cyBottomPrev = prevY + rx;
  var cyBottomNext = nextY + ry;

  if(cyTopPrev >= pyBottom && cyTopNext < pyBottom) {
    console.log("hit mother fucker");
    if(cxLeftNext > pxLeft && cxRightNext < pxRight) {
      console.log("hit 1");
      return true;
    }
    if(cxRightNext >= pxLeft && cxLeftNext <= pxLeft) {
      console.log("hit 2");
      return true;
    }
    if(cxLeftNext <= pxRight && cxRightNext >= pxRight) {
      console.log("hit 3");
      return true;
    }
  }
  return false;
};
