// =================
// Background HANDLING
// =================

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
// ========================================


this._nextMap = 0;

// The backgrounds images
this.maps = [
  "images/cityscape.png",
  "images/cityscape.png",
  "images/cityscape.png",
  "images/cityscape.png",
  "images/cityscape.png",
  "images/cityscape3.png",
  "images/cityscape3.png",
  "images/cityscape2.png",
  "images/cityscape2.png",
  "images/cityscape2.png",
];

var background = {
  // Returns the next background image
  getMap: function () {
    return maps[_nextMap];
  },

  setMap: function (numMap) {
    _nextMap = numMap;
  },

  canvasSpaceGame: function (imgSrc) {
    // This is our browser background
    document.body.style.backgroundImage = "url('images/back02.jpg')";

    // Here we load the background
    var img = new Image();
    img.onload = start;
    img.src = imgSrc;
    function start() {
      ctx.drawImage(img, 0, 0);
    }
  },

  imgHeart: function (health) {
    var img = new Image();
    img.src = "images/hjarta2.png";
    if (health === 1) {
      ctx.drawImage(img, 5, 5);
    } else if (health === 2) {
      ctx.drawImage(img, 5, 5);
      ctx.drawImage(img, 60, 5);
    } else if (health === 3) {
      ctx.drawImage(img, 5, 5);
      ctx.drawImage(img, 60, 5);
      ctx.drawImage(img, 115, 5);
    } else if (health === 4) {
      ctx.drawImage(img, 5, 5);
      ctx.drawImage(img, 60, 5);
      ctx.drawImage(img, 115, 5);
      ctx.drawImage(img, 170, 5);
    } else if (health === 5) {
      ctx.drawImage(img, 5, 5);
      ctx.drawImage(img, 60, 5);
      ctx.drawImage(img, 115, 5);
      ctx.drawImage(img, 170, 5);
      ctx.drawImage(img, 225, 5);
    }
  },
};
