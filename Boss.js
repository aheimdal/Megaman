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

};

Boss.prototype = new Entity();

Boss.prototype.cx = 951;
Boss.prototype.cy = 470;
Boss.prototype.velX = -5;
Boss.prototype.velY = 0;
Boss.prototype.shootTimer = 50;
Boss.prototype.jumpTimer = 30;
Boss.prototype.speed;
Boss.prototype.health = 75;
Boss.prototype.bossFacing;

Boss.prototype.update = function (du) {

    spatialManager.unregister(this);

    this.damageHandler();

    if (this.health === 0) {
        main.GameState = 4;
        return entityManager.KILL_ME_NOW;
    }

    this.phase();
    if (this.phaseNumber === 0) this.movementPhaseOne(du);
    else if (this.phaseNumber === 1) this.movementPhaseTwo(du);
    else if (this.phaseNumber === 2)  this.movementPhaseThree(du);

    console.log(this.cy);

    this.calculateMovementReal(du);

    animationHandle.update(this);

    spatialManager.register(this);
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
        if (util.randRange(0,10) < 1) {
            entityManager.generateHealthPickup({
                cx : this.cx,
                cy : 480
            })
        }
    }
};

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

Boss.prototype.calculateMovementReal = function (du) {
    if (this.shootTimer >= 20 &&
        this.shootTimer <= 40 * ((this.health*0.06666)+1/1)-20 ||
        this.cy < 470) {
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

Boss.prototype.maybeFire = function () {
    if (this.shootTimer) this.shootTimer--;
    if (this.shootTimer === 0) {
        this.shootTimer = 40 * ((this.health*0.06666)+1/1);
        entityManager.fireBossShoot(
            this.cx+(50*this.bossFacing),
            this.cy+17,
            14*this.bossFacing,
            -14,
            0
        );
    }
};

Boss.prototype.phaseNumber = 0;

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

Boss.prototype.status = function () {
    var isShooting = 
        this.shootTimer < 20 ||
        this.shootTimer > 
        40 * ((this.health*0.06666)+1/1) - 20;
    var isMoving =
        (this.shootTimer >= 20 &&
        this.shootTimer <= 40 * ((this.health*0.06666)+1/1)-20 ||
        this.cy < 470)
    return  [this.bossFacing,    //positive number for right, negative for left
            isMoving,    //True if moving, else false
            isShooting,         //True if shooting, else false
            (this.cy === 470),    //True if on grounds, else jumping/falling
            false];  
};

Boss.prototype.changeSprite = function(varImage) {
    this.sprite = varImage;
};

Boss.prototype.calculateMovement = function () {
    return;
};

Boss.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
