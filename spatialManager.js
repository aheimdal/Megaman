/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],
_platforms : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {
    // TODO: YOUR STUFF HERE!

    // Call a copy of our _spatialID
    var nextSpId = this._nextSpatialID;
    // Increment our _nextSpatialID
    this._nextSpatialID++;
    // Return our current Id
    return nextSpId;
},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();

    // TODO: YOUR STUFF HERE!

    // Call object to add radius to object
    entity.radius = entity.getRadius();
    entity.posX = pos.posX;
    entity.posY = pos.posY;

    // Give our current object the added radius
  //  if (entity.isPlatform) {this._platforms[spatialID] = entity;}
    /*else {*/this._entities[spatialID] = entity;//}
},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    // TODO: YOUR STUFF HERE!
    // Delete radius from current object
    if (entity.isPlatform) {delete this._platforms[spatialID];}
    else {delete this._entities[spatialID];}
},

findEntityInRange: function(posX, posY, radius) {
    var my_Entity = 0;

    // Iterate through _entities array for each object on canvas
    //console.log("bla bla")
    for (var ID in this._entities) {
        //console.log("bla 3")
        var myEnt = this._entities[ID];
        //console.log("1:"+myEnt.radius);
        //console.log("2:"+radius);
        // If square() is within distSq space change myEnt to my_Entity
        if(util.square(myEnt.radius+radius) > util.distSq(posX, posY,
                                            myEnt.posX, myEnt.posY)){
            my_Entity = myEnt;
        }

    }
    return my_Entity;
},

findPlatformInRange: function(posX, posY, radius) {
    var my_Platform = 0;

    for (var ID in this._platforms) {
        var myPlat = this._platforms[ID];

        //Checked if it centre circles collide.
        if(util.square(myPlat.radius+radius) > util.distSq(posX,posY,
                                            myPlat.posX, myPlat.posY)
        ||radius > util.distSq( //upper left corner check
            posX, posY, myPlat.posX-myPlat.radius, myPlat.posY-myPlat.radius)
        ||radius > util.distSq( //upp right corner check
            posX, posY, myPlat.posX-myPlat.radius, myPlat.posY+myPlat.radius)
        ||radius > util.distSq( //lower left corner check
            posX, posY, myPlat.posX+myPlat.radius, myPlat.posY-myPlat.radius)
        ||radius > util.distSq( //lower right corner check
            posX, posY, myPlat.posX+myPlat.radius, myPlat.posY+myPlat.radius)){
                my_Platform = myPlat;
        }
    }

    return my_Platform;
},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";

    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.posX, e.posY, e.radius);
    }
    for (var ID in this._platforms) {
        var e = this._platforms[ID];
        util.strokeBox(ctx, e.posX, e.posY, e.radius);
    }
    ctx.strokeStyle = oldStyle;

}

}
