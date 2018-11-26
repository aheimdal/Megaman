
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
    songOne     : new Audio("sounds/songs/gameOSong.wav"),
    songTwo     : new Audio("sounds/songs/song1.wav"),
    songThree   : new Audio("sounds/songs/bossFight.wav"),
    songFour    : new Audio("sounds/songs/megaLag2.ogg"),

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

    //Misc sounds
    goblinThrow : new Audio("sounds/rockEvaporate.ogg"),
    bossThrow : new Audio("sounds/rockSplit.ogg"),

    //Death sounds
    charDeath : new Audio("sounds/die.wav"),

    //function for other .js to call for a specific sound
    playSound : function (choice) {
        if (this.isMuted) return;
        //added layer so bullets dont overlap too easily
        if (choice === this.bullet) {
                this.savedShot++;
                if (this.savedShot > 2) this.savedShot = 0;
                choice = this.bullet[this.savedShot];
                choice.load();
            }
        choice.play();
    },

    //a song function play a specific song
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

    //plays a song that should be playing if the player muted
    playCurrentSong : function () {
        this.playSong(this.savedSong);
    },

    //pauses songs
    pauseSong : function () {
        this.songOne.pause();
        this.songTwo.pause();
        this.songThree.pause();
        this.songFour.pause();
    }


}



