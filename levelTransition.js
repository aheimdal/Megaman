


var levelTransition = {

levelIndex : -1,

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
                scale:0.1
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
            cy : 200,
            scale:0.1
        });
    }
    entityManager.generatePlatform({
        cx : 350,
        cy : 316,
        scale:0.1
    });
    entityManager.generateEnemyTwo({
        cx : 300,
        cy : 100,
        leftBound : 180,
        rightBound : 520
    })
},

setStageTwo : function() {
    entityManager.generateEnemyTwo({
        cx : 850,
        leftBound : 100,
        rightBound : 900,
        health : 10
    });
    entityManager.generateEnemyThree({
        cx : 620,
        cy : 280,
        floor : 280
    });
    entityManager.generatePlatform({
        cx : 620,
        cy : 346,
        scale:0.1
    });
    entityManager.generateEnemyThree({
        cx : 920,
        cy : 180,
        floor : 180
    });
    entityManager.generatePlatform({
        cx : 920,
        cy : 246,
        scale:0.1
    });
    for (var i = 250; i<1000; i+=300) {
        entityManager.generateSpikes({
            cx : i,
            cy : 540
        })
        entityManager.generateSpikes({
            cx : i+25,
            cy : 540
        })
        entityManager.generateSpikes({
            cx : i+50,
            cy : 540
        })
    }
},

setStageThree : function() {
    entityManager._char[0].cx = 500;
    entityManager._char[0].cy = 0;
    for (var i = 375; i<550; i+=50) {
        entityManager.generatePlatform({
            cx : 400,
            cy : i,
            scale:0.1
        });
        entityManager.generatePlatform({
            cx : 600,
            cy : i,
            scale:0.1
        });
    }
    for (var i = 150; i < 375; i+=50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 375,
            scale:0.1
        });
        entityManager.generatePlatform({
            cx : i+500,
            cy : 375,
            scale:0.1
        });
        entityManager.generatePlatform({
            cx : i-125,
            cy : 175,
            scale:0.1
        });
        entityManager.generatePlatform({
            cx : i-125+750,
            cy : 175,
            scale:0.1
        });
    }
    entityManager.generateEnemyThree({
        cx : 50,
        cy : 108,
        floor : 108
    });
    entityManager.generateEnemyThree({
        cx : 950,
        cy : 108,
        floor : 108
    });
    entityManager.generateEnemyThree({
        cx : 200,
        cy : 308,
        floor : 308
    });
    entityManager.generateEnemyThree({
        cx : 800,
        cy : 308,
        floor : 308
    });
    entityManager.generateEnemyTwo({
        cx : 100,
        cy : 500,
        leftBound : 100,
        rightBound : 300,
        health : 10
    });
    entityManager.generateEnemyTwo({
        cx : 900,
        cy : 500,
        leftBound : 700,
        rightBound : 900,
        health : 10
    });
},

setStageBoss : function() {
    entityManager.generateBoss();
},



}
