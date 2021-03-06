// =================
// Animation HANDLING
// =================

var animationHandle = {

  //a counter to allow cycling
  runCounter : 0,

  //animation cycles for the protagonist and boss
  update : function (obj) {
    var status = obj.status();
    var pick = 0;
    var direction;

    //picked character or boss sprites
    if (obj === entityManager._char[0]) {
      if (status[0] === 1) {
        direction = g_sprites.CharR;
        if (this.runCounter > 0) {
          this.runCounter -= 2;
        } else {
          this.runCounter = 0;
        }
      } else {
        direction = g_sprites.CharL;
        if (this.runCounter > 0) {
          this.runCounter-=2;
        } else {
          this.runCounter = 0;
        }
      }

    } else {
      if (status[0] === 1) {
        direction = g_sprites.BossR;
      } else {
        direction = g_sprites.BossL;
      }
    }

    //checked what the object is doing and picked accordingly
    var moving = status[1];
    var shooting = status[2];
    var grounded = status[3];
    var hurt = status[4];
    if (!grounded) {
      if (shooting) { pick = 9; }
      else { pick = 8; }
    } else {
      if (!moving) {
        if (shooting) { pick = 4; }
        else { pick = 0; }
      } else {
        if (shooting) {
          pick = this.cycle(6, 5, 7);
        }
        else {
          pick = this.cycle(2, 1, 3);
        }
      }
    }
    if (hurt) {
      if (grounded) {
        pick = 11;
      }
      else pick = 10;
    }

    obj.changeSprite(direction[pick]);
  },

  // a cycle for running animations, crude
  cycle : function (x, y, z) {
    if (this.runCounter === 0) {
      this.runCounter = 110;
      return x;
    } else if (this.runCounter > 90 && this.runCounter < 111) {
      return x;
    } else if (this.runCounter <= 90) {
      this.runCounter = 210;
      return y;
    } else if (this.runCounter > 190 && this.runCounter < 211) {
      return y;
    } else if (this.runCounter <= 190) {
      this.runCounter = 310;
      return z;
    } else if (this.runCounter > 290 && this.runCounter < 311) {
      return z;
    } else if (this.runCounter <= 290) {
      this.runCounter = 410;
      return y;
    } else if (this.runCounter > 390 && this.runCounter < 411) {
      return y;
    } else {
      this.runCounter = 0;
      return y;
    }
  },
};
