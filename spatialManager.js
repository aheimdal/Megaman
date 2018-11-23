/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

// ========================================
// Eslint villutékk
// ========================================
/* eslint-env browser */
/* eslint camelcase: [0] */
/* eslint-disable no-param-reassign */
/* eslint no-use-before-define: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-var: 0 */
/* eslint vars-on-top: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint object-shorthand: 0 */
/* eslint func-names: 0 */
/* eslint quotes: 0 */
/* eslint space-infix-ops: 0 */
/* eslint linebreak-style: 0 */
/* eslint no-shadow: 0 */
/* eslint no-plusplus: 0 */
/* eslint guard-for-in: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint block-scoped-var: 0 */
/* eslint no-redeclare: 0 */
/* eslint padded-blocks: 0 */
// ========================================

var spatialManager = {

  // "PRIVATE" DATA

  _nextSpatialID: 1, // make all valid IDs non-falsey (i.e. don't start at 0)

  _entities: [],

  // PUBLIC METHODS

  getNewSpatialID: function () {
    // Call a copy of our _spatialID
    var nextSpId = this._nextSpatialID;
    // Increment our _nextSpatialID
    this._nextSpatialID++;
    // Return our current Id
    return nextSpId;
  },

  register: function (entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();

    // Call object to add radius to object
    entity.radius = entity.getRadius();
    entity.posX = pos.posX;
    entity.posY = pos.posY;

    this._entities[spatialID] = entity;
  },

  unregister: function (entity) {
    var spatialID = entity.getSpatialID();

    // Delete radius from current object
    delete this._entities[spatialID];
  },

  findEntityInRange: function (posX, posY, radius) {
    var my_Entity = 0;

    // Iterate through _entities array for each object on canvas
    for (var ID in this._entities) {
      var myEnt = this._entities[ID];

      // If square() is within distSq space change myEnt to my_Entity
      if (util.square(myEnt.radius+radius) > util.distSq(posX, posY, myEnt.posX, myEnt.posY)) {
        my_Entity = myEnt;
      }
    }
    return my_Entity;
  },


  render: function (ctx) {
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
    for (var ID in this._platforms) {
        var e = this._platforms[ID];
        util.strokeBox(ctx, e.posX, e.posY, e.radius);
    }
    ctx.strokeStyle = oldStyle;
  },
};
