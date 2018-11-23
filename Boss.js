// ====
// Boss
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Boss(descr) {
  // Common inherited setup logic from Entity
  this.setup(descr);

  // Default sprite and scale, if not otherwise specified
  this.sprite = g_sprites.BossL[1];
  this.scale  = 5;
}

Boss.prototype = new Entity();

//a lot of globals because everybody loves globals
Boss.prototype.cx = 951;
Boss.prototype.cy = 470;
Boss.prototype.velX = -5;
Boss.prototype.velY = 0;
Boss.prototype.shootTimer = 50; //Timer inbetween shots
Boss.prototype.jumpTimer = 30;  // Timer inbetween jumps
Boss.prototype.speed;           //How fast the boss goes
Boss.prototype.health = 75;
Boss.prototype.bossFacing;
Boss.prototype.deathTimer; //Timer for how long death should be animated

Boss.prototype.update = function (du) {

  spatialManager.unregister(this);

  //Checked for death and if so death animations
  var dead = this.deathHandler();

  if (dead === 1) return 1;
  if (dead === 2) {
    main.GameState = 4;
    levelTransition.levelIndex = -1;
    return entityManager.KILL_ME_NOW;
  }

  this.damageHandler();

  //Calculates what "phase" the boss should be in
  this.phase();
  if (this.phaseNumber === 0) this.movementPhaseOne(du);
  else if (this.phaseNumber === 1) this.movementPhaseTwo(du);
  else if (this.phaseNumber === 2)  this.movementPhaseThree(du);

  //upgrades the cx and cy coordinates
  this.calculateMovementReal(du);

  animationHandle.update(this);
  //    Þarf að vera return hérna??    já skoðaðu entityManager.update
  return spatialManager.register(this);
};


Boss.prototype.getRadius = function () {
  return 70;
};

Boss.prototype.takeBulletHit = function () {
  this.kill();
};

Boss.prototype.damageHandler = function () {
  var maybeChar = this.findHitEntity();
  if (maybeChar === entityManager._char[0]) {
    entityManager._char[0].kill();
  }

  if (this._isDeadNow) {
    this._isDeadNow = false;
    this.health--;
    background.imgHeartBoss(this.health);
    //Dropped health randomly
    //10% chance when hurt
    if (util.randRange(0, 10) < 1) {
      entityManager.generateHealthPickup({
        cx : this.cx,
        cy : 480,
      });
    }
  }
};

//Phase one, boss runs and shoots, faster if hes hurt
Boss.prototype.movementPhaseOne = function (du) {
  if (this.cx > 950) {
    this.speed = -3;
  }
  if (this.cx < 50) {
    this.speed = 3;
  }

  this.velX = this.speed * ((75 + (5 * (76-this.health)))/this.health);
  if (this.velX < 0) this.bossFacing = -1;
  else this.bossFacing = 1;

  this.maybeFire(du);
};

//Phase two, boss runs and jumps, faster if hes hurt
Boss.prototype.movementPhaseTwo = function (du) {
  if (this.cx > 950) {
    this.speed = -4;
  }
  if (this.cx < 50) {
    this.speed = 4;
  }
  if (this.jumpTimer) this.jumpTimer--;
  if (this.cy === 470 && this.jumpTimer === 0) {
    this.jumpTimer = 100 * (this.health/50);
    this.velY = -19;
  }


  this.velX = this.speed * (50/this.health);
  if (this.velX < 0) this.bossFacing = -1;
  else this.bossFacing = 1;
};

//Phase 3, shoot, run and jump combined, faster if hes hurt
Boss.prototype.movementPhaseThree = function (du) {
  if (this.cx > 950) {
    this.speed = -5;
  }
  if (this.cx < 50) {
    this.speed = 5;
  }
  if (this.jumpTimer) this.jumpTimer--;
  if (this.cy === 470 && this.jumpTimer === 0) {
    this.jumpTimer = 70;
    this.velY = -19;
  }

  this.maybeFire(du);
  this.velX = this.speed;
  if (this.velX < 0) this.bossFacing = -1;
  else this.bossFacing = 1;

};

//Calculated cx and cy coordinates from the phases
Boss.prototype.calculateMovementReal = function (du) {
  if (this.shootTimer >= 20
      && this.shootTimer
      <= 40 * ((this.health*0.06666)+1/1)-20 || this.cy < 470) {
    this.cx += this.velX * du;
  }
  if (this.cy < 470) this.velY += 1;
  this.cy += this.velY * du;
  if (this.cy > 470) {
    this.cy = 470;
    this.velY = 0;
  }
  if (this.jumpTimer < 0) this.jumpTimer = 0;
  if (this.shootTimer < 0) this.shootTimer = 0;
};

//Checked for phase and timer if boss should shoot
Boss.prototype.maybeFire = function () {
  if (this.shootTimer) this.shootTimer--;
  if (this.shootTimer === 0) {
    this.shootTimer = 40 * ((this.health*0.06666)+1/1);
    entityManager.fireBossShoot(
      this.cx+(50*this.bossFacing),
      this.cy+17,
      14*this.bossFacing,
      -14,
      0,
    );
  }
};

Boss.prototype.phaseNumber = 0;
//Checked for state
Boss.prototype.phase = function () {
  if (this.health > 50) this.phaseNumber = 0;
  else if (this.health > 25) {
    if (this.cx > 950 || this.cx < 50) {
      this.phaseNumber = 1;
      this.shootTimer = 60;
    }
  } else if (this.health > 0) {
    if (this.cx > 950 || this.cx < 50) {
      this.phaseNumber = 2;
    }
  }
};

//A status function for the animationHandler,
//returns a matrix with information
Boss.prototype.status = function () {
  var isShooting = this.shootTimer < 20 || this.shootTimer > 40 * ((this.health*0.06666)+1/1) - 20;
  var isMoving = (this.shootTimer >= 20 && this.shootTimer <= 40 * ((this.health*0.06666)+1/1)-20 || this.cy < 470);
  return  [this.bossFacing, // positive number for right, negative for left
           isMoving, // True if moving, else false
           isShooting, // True if shooting, else false
           (this.cy === 470), // True if on grounds, else jumping/falling
           false];  //A boss never shows weakness, ea if hurt
};

Boss.prototype.changeSprite = function (varImage) {
  this.sprite = varImage;
};

//Handles death explosion
Boss.prototype.deathHandler = function () {
    if (this.health === 0) {
      this.deathTimer--;
      if (this.deathTimer < 5)
        this.sprite = g_sprites.golem[8];
      else if (this.deathTimer % 4 === 0) 
        this.sprite = g_sprites.golem[6];
      else if (this.deathTimer % 7 === 0)
        this.sprite = g_sprites.golem[7];
      if (this.deathTimer) return 1;
      return 2;
    }
    if (this._isDeadNow) {
      this._isDeadNow = false;
      this.health--;
      if (util.randRange(0,10) < 1) {
        entityManager.generateHealthPickup({
          cx:this.cx,
          cy:this.cy-5
        });
      }    
      if (this.health === 0) this.deathTimer = 100;
    }
  }

Boss.prototype.calculateMovement = function () {
  return;
};

Boss.prototype.render = function (ctx) {
  var origScale = this.sprite.scale;
  // pass my scale into the sprite, for drawing
  this.sprite.scale = this.scale;
  this.sprite.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
};
