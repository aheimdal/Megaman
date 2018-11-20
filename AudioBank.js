

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
        if (!this.isMuted) {
            choice.load();
            choice.play();
        }
    },

    playSong : function () {
        this.songTwo.load();
        this.songTwo.play();
    }


}



