// ==========
// Platform
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Platform(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.sprite = g_sprites.tiles;

};

Platform.prototype = new Entity();

// Initial, inheritable, default values
Platform.prototype.cx = 170;
Platform.prototype.cy = 450;
Platform.prototype.radius = 25;
Platform.prototype.oneTime = 0;
Platform.prototype.scale = 0;


Platform.prototype.update = function (du) {
    spatialManager.unregister(this);
    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }
    spatialManager.register(this);

};

// function to get radius
Platform.prototype.getRadius = function () {
    return this.radius;
};

// function for calculation of movement
Platform.prototype.calculateMovement = function (entity) {
    // set variables to work with
    var higherBound = this.cy - this.radius;
    var lowerBound = this.cy + this.radius;
    var leftBound = this.cx - this.radius;
    var rightBound = this.cx + this.radius;
    var radius = 45;

    ///// Here the collision is resolved/////
    if(entity.cx<leftBound-28){// pushes the entity to the left of the platform
      // if it came from the left
      entity.stopX();
      entity.cx = leftBound-radius;
    }else if(entity.cx>rightBound+28){// pushes the entity to the right of the
      // platform if it came from the left
      entity.stopX();
      entity.cx = rightBound + radius;
    }else if (entity.isFalling()) {// pushes the entity up one pixel over the
      // platform if the entity is jumping
      entity.ground()
      entity.cy = higherBound - radius-1;
    }else if(entity.isJumping()&&(entity.cy<502)){// pushes the entity just
      // below the platform if it is jumping and is not on the ground
      entity.fall();
      entity.cy = lowerBound + radius;
    }else if(entity.cx<this.cx){// if the entity is on the ground and is to the
      // left of the center of the platform it is pushed to
      // the left of the platform
      entity.stopX();
      entity.cx = leftBound-radius+8;
    }else if(entity.cx>this.cx){// if the entity is on the ground and is to the
      // right of the center of the platform it is pushed to the
      // right of the platform
      entity.stopX();
      entity.cx = rightBound + radius-8;
    }
};

// function that renders platforms
Platform.prototype.render = function (ctx) {
              this.sprite.scale = this.scale;// set the scale of the sprite
              this.sprite.drawCentredAt(// draw the platform
                  ctx, this.cx, this.cy, this.rotation
              );

};
