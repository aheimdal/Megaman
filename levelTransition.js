


var levelTransition = {

levelIndex : 1,

changeLevel : function() {
    this.levelIndex++;
    entityManager.clearLevel();
    entityManager._char[0].cx = 50;
    entityManager._char[0].cy = 502;
    if (this.levelIndex) background.canvasSpaceGame(background.setMap());
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
            radius: 30
        });
    }
    entityManager.generatePlatform({
        cx:445,
        cy:400
    });
    entityManager.generatePlatform({
        cx:395,
        cy:400
    });
    for (var i = 25; i < 250; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 300
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
                cy : 400
            });
        }
    }

    entityManager.generateEnemyThree({
        cx : 275,
        cy : 333,
        floor : 333
    })

    entityManager.generateEnemyTwo({
        cx : 600,
        cy : 500,
        leftBound : 300,
        rightBound : 900
    });
    for (var i = 340; i < 600; i+=25) {
        entityManager.generateSpikes({
            cx : i,
            cy : 360
        })
    }
    for (var i = 125; i<600; i +=50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 200
        });
    }
    entityManager.generatePlatform({
        cx : 350,
        cy : 316
    });
    entityManager.generateEnemyTwo({
        cx : 300,
        cy : 100,
        leftBound : 180,
        rightBound : 520
    })
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