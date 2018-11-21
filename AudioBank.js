

// =================
// Audio Bank
// =================

"use strict";

var AudioBank = {

    //Mute variable
    isMuted : false,

    //Songs
    songOne : new Audio("sounds/songs/megaLag1.ogg"),
    songTwo : new Audio("sounds/songs/megaLag2.ogg"),

    //Projectile sounds
    bullet : new Audio("sounds/gunsounds/luger.wav"),

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
        //choice.load();
        if (!this.isMuted) choice.play();
    },

    playSong : function (x) {
        this.songOne.loop = true;
        this.songTwo.loop = true;
        this.songThree.loop = true;
        this.songFour.loop = true;
        if (this.isMuted) {
            this.pauseSong();
            return;
        }
        if (x === 1) this.songOne.play();
        if (x === 2) this.songTwo.play();
        if (x === 3) this.songThree.play();
        if (x === 4) this.songFour.play();
    },

    pauseSong : function () {
        this.songOne.pause();
        this.songTwo.pause();
        this.songThree.pause();
        this.songFour.pause();
    }


}



