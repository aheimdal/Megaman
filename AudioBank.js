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
// ========================================

// =================
// Audio Bank
// =================

var AudioBank = {

  // Mute variable
  isMuted : false,
  savedSong : -1,
  savedShot : 0,

  // Songs
  songOne     : new Audio("sounds/songs/megaLag1.ogg"),
  songTwo     : new Audio("sounds/songs/megaLag2.ogg"),
  songThree   : new Audio("sounds/songs/Superboy.ogg"),
  songFour    : new Audio("sounds/songs/Off Limits.ogg"),

  // Projectile sounds
  bullet :  [
    new Audio("sounds/gunsounds/luger.wav"),
    new Audio("sounds/gunsounds/luger.wav"),
    new Audio("sounds/gunsounds/luger.wav"),
  ],

  // Goblin sounds
  gobGrunt1 : new Audio("sounds/goblins/goblin-2.wav"),
  gobGrunt2 : new Audio("sounds/goblins/goblin-6.wav"),
  gobGrunt3 : new Audio("sounds/goblins/goblin-7.wav"),

  // Orangutan sounds
  // Misc sounds
  goblinThrow : new Audio("sounds/rockEvaporate.ogg"),
  bossThrow : new Audio("sounds/rockSplit.ogg"),

  // Death sounds
  charDeath : new Audio("sounds/die.wav"),

  playSound : function (choice) {
    if (this.isMuted) return;
    if (choice === this.bullet) {
      this.savedShot++;
      if (this.savedShot > 2) this.savedShot = 0;
      choice = this.bullet[this.savedShot];
      choice.load();
    }
    choice.play();
  },

  playSong : function (x) {
    this.savedSong = x;
    this.pauseSong();
    if (this.isMuted) {
      this.pauseSong();
      return;
    }
    if (x === 1) this.songOne.play();
    if (x === 2) this.songTwo.play();
    if (x === 3) this.songThree.play();
    if (x === 4) this.songFour.play();
  },

  playCurrentSong : function () {
    this.playSong(this.savedSong);
  },

  pauseSong : function () {
    this.songOne.pause();
    this.songTwo.pause();
    this.songThree.pause();
    this.songFour.pause();
  },
};
