

// =================
// Audio Bank
// =================

"use strict";

var AudioBank = {

    //Mute variable
    isMuted : false,
    savedSong : -1,
    savedShot : 0,

    //Songs
    songOne     : new Audio("sounds/songs/megaLag1.ogg"),
    songTwo     : new Audio("sounds/songs/megaLag2.ogg"),
    songThree   : new Audio("sounds/songs/Superboy.ogg"),
    songFour    : new Audio("sounds/songs/Off Limits.ogg"),

    //Projectile sounds
    bullet :  [
        new Audio("sounds/gunsounds/luger.wav"),
        new Audio("sounds/gunsounds/luger.wav"),
        new Audio("sounds/gunsounds/luger.wav")
    ],

    //Goblin sounds
    gobGrunt1 : new Audio("sounds/goblins/goblin-2.wav"),
    gobGrunt2 : new Audio("sounds/goblins/goblin-6.wav"),
    gobGrunt3 : new Audio("sounds/goblins/goblin-7.wav"),

    //Orangutan sounds


    //Misc sounds
    goblinThrow : new Audio("sounds/rockEvaporate.ogg"),
    bossThrow : new Audio("sounds/rockSplit.ogg"),

    //Death sounds
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
    }


}



