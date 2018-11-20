


var levelTransition = {

levelIndex : -1,

changeLevel : function() {
    this.levelIndex++;
    entityManager.clearLevel();
    entityManager._char[0].cx = 50;
    entityManager._char[0].cy = 502;
    switch (this.levelIndex) {
        case 0: this.setStageZero();
                break;
        case 1: this.setStageOne();
                break;
        case 2: this.setStageTwo();
                break;
        case 3: this.setStageThree();
                break;
        case 4: this.setStageBoss();
                break;
    }
},

setStageZero : function() {
    for (var i = 500; i > 100; i -= 60) {
        entityManager.generatePlatform({
            cx:500,
            cy:i,
            radius: 30,
            scale: 0.12

        });
    }
    entityManager.generatePlatform({
        cx:445,
        cy:400,
        scale:0.1
    });
    entityManager.generatePlatform({
        cx:395,
        cy:400,
        scale: 0.1
    });
    for (var i = 25; i < 250; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 300,
            scale:0.1
        });
    }
    for (var i = 600; i<700; i+=25) {
        entityManager.generateSpikes({
            cx : i,
            cy : 520
        })
    }
    entityManager.generateEnemyThree({
        cx : 50,
        cy : 233,
        floor : 233
    });
    entityManager.generateEnemyThree({
        cx : 930,
        cy : 500,
        floor : 500
    });
},

setStageOne : function() {
    for (var i = 25; i<1000; i +=50) {
        if (i < 775 || i > 925) {
            entityManager.generatePlatform({
                cx : i,
                cy : 400,
                radius : 25
            });
        }
    }

    entityManager.generateEnemyTwo({
        cx : 600,
        leftBound : 300,
        rightBound : 900
    });
},

setStageTwo : function() {
    var i;
},

setStageThree : function() {
    var i;
},

setStageBoss : function() {
    entityManager.generateBoss();
},



}
