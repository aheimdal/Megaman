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
    this._entities[spatialID] = entity;
},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    // TODO: YOUR STUFF HERE!
    // Delete radius from current object
    delete this._entities[spatialID];
},

findEntityInRange: function(posX, posY, radius) {
    var my_Entity = 0;

    // TODO: YOUR STUFF HERE!
    // Iterate through _entities array for each object on canvas
    for (var ID in this._entities) {
        var myEnt = this._entities[ID];
        // If square() is within distSq space change myEnt to my_Entity
        if(util.square(myEnt.radius+radius) > util.distSq(posX, posY, 
                                            myEnt.posX, myEnt.posY)){
            my_Entity = myEnt;
        }

    }
    return my_Entity;
},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    
    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.posX, e.posY, e.radius);
    }
    ctx.strokeStyle = oldStyle;
}

}
