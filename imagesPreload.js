// Multi-Image Preloader

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
/* eslint key-spacing: 0 */
/* eslint indent: 0 */
/* eslint new-cap: 0 */
/* eslint no-continue: 0 */
/* eslint no-useless-return: 0 */
/* eslint prefer-destructuring: 0 */
/* eslint no-unused-expressions: 0 */
/* eslint brace-style: 0 */
/* eslint no-multi-spaces: 0 */
/* eslint no-lonely-if: 0 */
/* eslint no-else-return: 0 */
/* eslint no-mixed-operators: 0 */
/* eslint one-var: 0 */
/* eslint no-prototype-builtins: 0 */
// ========================================

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


// Extend the Image prototype (aka augment the "class")
// with my asyncLoad wrapper.
//
// I prefer this approach to setting onload/onerror/src directly.
//
Image.prototype.asyncLoad = function (src, asyncCallback) {

  // Must assign the callback handlers before setting `this.src`,
  // for safety (and caching-tolerance).
  //
  // Uses the same handler for success *and* failure,
  // because they share a lot of the same logic.
  //
  // NB: The failure case can be identified by the "degenerate" nature
  // of the resulting "loaded" image e.g. test for this.width === 0
  //
  this.onload = asyncCallback;
  this.onerror = asyncCallback;

  // NB: The load operation can be triggered from any point
  // after setting `this.src`.
  //
  // It *may* happen immediately (on some browsers) if the image is already
  // in-cache, but will most likely happen some time later when the load has
  // occurred and the resulting event is processesd in the queue.

  // console.log("requesting image src of ", src);
  this.src = src;
};


// imagePreload
//
// Horrible stuff to deal with the asynchronous nature of image-loading
// in the browser...
//
// It requires setting-up a bunch of handler callbacks and then waiting for them
// *all* to be exectued before finally triggering our own `completionCallback`.
//
// Makes use of "closures" to handle the necessary state-tracking between the
// intermediate callback handlers without resorting to global variables.
//
// IN  : `requiredImages` - an object of <name:uri> pairs for each image
// OUT : `loadedImages` - object to which our <name:Image> pairs will be added
// IN  : `completionCallback` - will be executed when everything is done
//
function imagesPreload(requiredImages,
                       loadedImages,
                       completionCallback) {

  var numImagesRequired,
      numImagesHandled = 0,
      currentName,
      currentImage,
      preloadHandler;

  // Count our `requiredImages` by using `Object.keys` to get all
  // "*OWN* enumerable properties" i.e. doesn't traverse the prototype chain
  numImagesRequired = Object.keys(requiredImages).length;

  // A handler which will be called when our required images are finally
  // loaded (or when the fail to load).
  //
  // At the time of the call, `this` will point to an Image object,
  // whose `name` property will have been set appropriately.
  //
  preloadHandler = function () {

    // console.log("preloadHandler called with this=", this);
    loadedImages[this.name] = this;

    if (this.width === 0) {
      // console.log("loading failed for", this.name);
    }

    // Allow this handler closure to eventually be GC'd (!)
    this.onload = null;
    this.onerror = null;

    numImagesHandled += 1;

    if (numImagesHandled === numImagesRequired) {
      // console.log("all preload images handled");
      // console.log("loadedImages=", loadedImages);
      // console.log("");
      // console.log("performing completion callback");

      completionCallback();

      // console.log("completion callback done");
      // console.log("");
    }
  };

  // The "for..in" construct "iterates over the enumerable properties
  // of an object, in arbitrary order."
  // -- unlike `Object.keys`, it traverses the prototype chain
  //
  for (currentName in requiredImages) {

    // Skip inherited properties from the prototype chain,
    // just to be safe, although there shouldn't be any...

    // I prefer this approach, but JSLint doesn't like "continue" :-(
    // if (!requiredImages.hasOwnProperty(currentName)) { continue; }

    if (requiredImages.hasOwnProperty(currentName)) {

      // console.log("preloading image", currentName);
      currentImage = new Image();
      currentImage.name = currentName;

      currentImage.asyncLoad(requiredImages[currentName], preloadHandler);
    }
  }
}
