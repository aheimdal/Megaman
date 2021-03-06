///////////////////////
// Level Transition
///////////////////////

//A very barebones level transitioner
var levelTransition = {

  levelIndex : -1,

  changeLevel : function () {
    this.levelIndex++;
    entityManager.clearLevel();
    if (!entityManager._char[0]) return;
    entityManager._char[0].cx = 50;
    entityManager._char[0].cy = 502;
    if (this.levelIndex >= 0) background.canvasSpaceGame(background.setMap(this.levelIndex));
    switch (this.levelIndex) {
    case 0: this.setStageZero();
    AudioBank.playSong(2);  
      break;
    case 1: this.setStageOne();
    AudioBank.playSong(2);
      break;
    case 2: this.setStageTwo();
    AudioBank.playSong(2);
      break;
    case 3: this.setStageThree();
    AudioBank.playSong(2);  
      break;
    case 4: this.setStageFour();
    AudioBank.playSong(2);
      break;
    case 5: this.setStageFive();
    AudioBank.playSong(2);
      break;
    case 6: this.setStageSix();
    AudioBank.playSong(2);
      break;
    case 7: this.setStageSeven();
    AudioBank.playSong(2);
      break;
    case 8: this.setStageBoss();
    AudioBank.pauseSong();
    AudioBank.playSong(3);
      break;
    default: break;
    }
  },

  setStageZero : function () {

    // platforms under ground spikes
    for (var i = 300; i < 800; i += 60) {
      entityManager.generatePlatform({
        cx : i,
        cy : 590,
        scale:0.1,
      });
      entityManager.generatePlatform({
        cx : i+50,
        cy : 590,
        scale:0.1,
      });
      entityManager.generatePlatform({
        cx : i+100,
        cy : 590,
        scale:0.1,
      });
    }
    // Here is the wall
    for (var i = 650; i > 100; i -= 60) {
      entityManager.generatePlatform({
        cx:500,
        cy:i,
        radius: 30,
        scale: 0.12,
      });
    }

    entityManager.generatePlatform({
      cx:555,
      cy:400,
      scale:0.1,
    });
    entityManager.generatePlatform({
      cx:535,
      cy:250,
      scale:0.1,
    });
    entityManager.generatePlatform({
      cx:445,
      cy:400,
      scale:0.1,
    });
    entityManager.generatePlatform({
      cx:445,
      cy:400,
      scale:0.1,
    });
    entityManager.generatePlatform({
      cx:395,
      cy:400,
      scale: 0.1,
    });
    for (var i = 25; i < 250; i += 50) {
      entityManager.generatePlatform({
        cx : i,
        cy : 300,
        scale:0.1,
      });
    }
    // First part  of ground
    for (var i = -120; i < 325; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 574,
            scale:0.1
        });
    }
    // Second part of ground
    for (var i = 717; i < 1150; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 574,
            scale:0.1
        });
    }
    // Ground spikes
    for (var i = 550; i<700; i+=25) {
      entityManager.generateSpikes({
        cx : i,
        cy : 550,
      });
      entityManager.generateSpikes({
        cx : i-225,
        cy : 550,
      });
    }

    entityManager.generateEnemyThree({
      cx : 50,
      cy : 233,
      floor : 233,
    });
    entityManager.generateEnemyThree({
      cx : 930,
      cy : 508,
      floor : 508,
    });
  },

setStageOne : function() {
    // Here is the second floor
    for (var i = -150; i<1200; i +=50) {
        if (i < 775 || i > 925) {
            entityManager.generatePlatform({
                cx : i,
                cy : 400,
                scale:0.1
            });
        }
    }
    // Here are the floor platforms
    for (var i = -150; i < 1150; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 574,
            scale:0.1
        });
    }
    // Generate the jumping goblin
    entityManager.generateEnemyFour({
        cx : 275,
        cy : 333,
        floor : 333
    })
    // Generate the lower golem
    entityManager.generateEnemyTwo({
      cx : 600,
      cy : 502,
      leftBound : 300,
      rightBound : 900,
    });
    // Here are the spikes
    for (var i = 340; i < 600; i+=25) {
      entityManager.generateSpikes({
        cx : i,
        cy : 358,
      });
    }
    // Here are the top floor platforms
    for (var i = 125; i<600; i +=50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 200,
            scale:0.1
        });
    }// Here is the platform in between the second and top floors
    entityManager.generatePlatform({
      cx : 350,
      cy : 316,
      scale:0.1,
    });
    // Here is the upper golem
    entityManager.generateEnemyTwo({
      cx : 300,
      cy : 130,
      leftBound : 180,
      rightBound : 520,
    });
  },

  setStageTwo : function () {
    // platforms under ground spikes
    for (var i = 100; i < 1000; i += 150) {
      entityManager.generatePlatform({
        cx : i,
        cy : 590,
        scale:0.1,
      });
      entityManager.generatePlatform({
        cx : i+50,
        cy : 590,
        scale:0.1,
      });
      entityManager.generatePlatform({
        cx : i+100,
        cy : 590,
        scale:0.1
    });
  }
    // Generate the golemn
    entityManager.generateEnemyTwo({
      cx : 850,
      cy : 502,
      leftBound : 100,
      rightBound : 900,
      health : 10,
    });
    // Here is the first part of the floor
    for (var i = -200; i < 235; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 574,
            scale:0.1
        });
    }
    // Here is the second part of the floor
    for (var i = 348; i < 530; i += 50) {
      entityManager.generatePlatform({
        cx : i,
        cy : 574,
        scale:0.1,
      });
    }
    // Here is the third part of the floor
    for (var i = 645; i < 838; i += 50) {
      entityManager.generatePlatform({
        cx : i,
        cy : 574,
        scale:0.1,
      });
    }
    // Here is the fourth part of the floor
    for (var i = 946; i < 1200; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 574,
            scale:0.1
        });
    }
    // Here is the lower jumping goblin
    entityManager.generateEnemyThree({
      cx : 620,
      cy : 280,
      floor : 280,
    });
    // Here is the platform for the lower jumping goblin
    entityManager.generatePlatform({
      cx : 620,
      cy : 346,
      scale:0.1,
    });
    // Here is the upper jumping goblin
    entityManager.generateEnemyThree({
      cx : 920,
      cy : 180,
      floor : 180,
    });
    // Here is the platform for the upper jumping goblin
    entityManager.generatePlatform({
      cx : 920,
      cy : 246,
      scale:0.1,
    });
    // Here are the spikes generated
    for (var i = 250; i<1000; i+=300) {
      entityManager.generateSpikes({
        cx : i,
        cy : 550,
      });
      entityManager.generateSpikes({
        cx : i+25,
        cy : 550,
      });
      entityManager.generateSpikes({
        cx : i+50,
        cy : 550,
      });
    }
  },

  setStageThree : function () {
    // Set where the charcter drops
    entityManager._char[0].cx = 500;
    entityManager._char[0].cy = 0;
    // here are the two walls generated
    for (var i = 375; i<550; i+=50) {
      entityManager.generatePlatform({
        cx : 400,
        cy : i,
        scale:0.1,
      });
      entityManager.generatePlatform({
        cx : 600,
        cy : i,
        scale:0.1,
      });
    }
    // Here are the floor platforms generated
    for (var i = -200; i < 1200; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 574,
            scale:0.1
        });
    }
    // Here are the two floors generated
    for (var i = 150; i < 375; i+=50) {
      entityManager.generatePlatform({
        cx : i,
        cy : 375,
        scale:0.1,
      });
      entityManager.generatePlatform({
        cx : i+500,
        cy : 375,
        scale:0.1,
      });
      entityManager.generatePlatform({
        cx : i-125,
        cy : 175,
        scale:0.1,
      });
      entityManager.generatePlatform({
        cx : i-125+750,
        cy : 175,
        scale:0.1,
      });
    }
    // Here are the jumping goblins made
    entityManager.generateEnemyThree({
      cx : 50,
      cy : 108,
      floor : 108,
    });
    entityManager.generateEnemyThree({
      cx : 950,
      cy : 108,
      floor : 108,
    });
    entityManager.generateEnemyThree({
      cx : 200,
      cy : 308,
      floor : 308,
    });
    entityManager.generateEnemyThree({
      cx : 800,
      cy : 308,
      floor : 308,
    });
    // Here are the golems made
    entityManager.generateEnemyTwo({
      cx : 100,
      cy : 500,
      leftBound : 100,
      rightBound : 300,
      health : 10,
    });
    entityManager.generateEnemyTwo({
        cx : 900,
        cy : 500,
        leftBound : 700,
        rightBound : 900,
        health : 10
    });
},
setStageFour : function(){
    // The charecter set to fall on the charecter platform
    entityManager._char[0].cy = -45;
    entityManager.generateEnemyThree({
      cx : 465,
      cy : 354,
      floor : 354,
    });
    // Here is the floor under the spikes
    for (var i = -200; i < 1200; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 574,
            scale:0.1
        });
    }
    // Here the jumping goblins are made
    entityManager.generateEnemyThree({
      cx : 805,
      cy : 354,
      floor : 354,
    });
    entityManager.generateEnemyThree({
      cx : 979,
      cy : 354,
      floor : 354,
    });

    entityManager.generateEnemyThree({
      cx : 505,
      cy : 130,
      floor : 134,
    });
    entityManager.generateEnemyThree({
      cx : 845,
      cy : 130,
      floor : 134,
    });
    // Here the spikes are generated
    for (var i = 12; i<1000; i+=75) {
      entityManager.generateSpikes({
        cx : i,
        cy : 532,
      });
      entityManager.generateSpikes({
        cx : i+25,
        cy : 532,
      });
      entityManager.generateSpikes({
        cx : i+50,
        cy : 532,
      });
    }
    // Here the lower platforms are made
    for (var i = 130; i < 1000; i+=170) {
      entityManager.generatePlatform({
        cx : i,
        cy : 420,
        scale:0.1,
      });
    }
    // Here the platform for the charecter is generated
    entityManager.generatePlatform({
      cx : 50,
      cy : 120,
      scale:0.1,
    });
    // Here the upper platforms are generated
    for (var i = 170; i < 1000; i+=170) {
      entityManager.generatePlatform({
        cx : i,
        cy : 200,
        scale:0.1,
      });
    }
},
setStageFive : function(){
    // Set where the charcter drops
    entityManager._char[0].cx = 500;
    entityManager._char[0].cy = -45;
    // Generate a non jumping goblin
    entityManager.generateEnemyFour({
      cx : 240,
      cy : 507,
      floor : 507,
    });
    // Generate a non jumping goblin
    entityManager.generateEnemyFour({
      cx : 450,
      cy : 507,
      floor : 507,
    });
    // Generate a non jumping goblin
    entityManager.generateEnemyFour({
      cx : 890,
      cy : 507,
      floor : 507,
    });
    // Generate a non jumping goblin
    entityManager.generateEnemyFour({
      cx : 50,
      cy : 383,
      floor : 383,
    });
    // Generate a non jumping goblin
    entityManager.generateEnemyFour({
      cx : 960,
      cy : 383,
      floor : 383,
    });
    // Here the floor platforms are generated
    for (var i = -200; i < 1200; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 574,
            scale:0.1
        });
    }
    // Here is the second middle floor platform from the left
    for (var i = 300; i < 450; i += 50) {
      entityManager.generatePlatform({
        cx : i,
        cy : 450,
        scale:0.1,
      });
    }
    // Here is the third middle floor platform from the left
    for (var i = 620; i < 750; i += 50) {
      entityManager.generatePlatform({
        cx : i,
        cy : 450,
        scale:0.1,
      });
    }
    // Here is the middle floor platform all the way to the right
    for (var i = 940; i < 1250; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 450,
            scale:0.1
        });
    }
    // Here is the second floor on the left
    entityManager.generatePlatform({
      cx : 75,
      cy : 450,
      scale:0.1,
    });
    entityManager.generatePlatform({
      cx : 25,
      cy : 450,
      scale:0.1,
    });
    entityManager.generatePlatform({
        cx : -25,
        cy : 450,
        scale:0.1
    });
    // Here is the top floor
    for (var i = 400; i < 600; i += 50) {
      entityManager.generatePlatform({
        cx : i,
        cy : 300,
        scale:0.1,
      });
    }

  },

  setStageSix : function () {
    // Set where the charcter drops
    entityManager._char[0].cx = 75;
    entityManager._char[0].cy = -45;
    // Here are two goblins that don't jump
    entityManager.generateEnemyFour({
      cx : 240,
      cy : 314,
      floor : 314,
    });
    entityManager.generateEnemyFour({
      cx : 650,
      cy : 314,
      floor : 314,
    });
    // Here are two golems
    entityManager.generateEnemyTwo({
      cx : 800,
      cy : 500,
      leftBound : 560,
      rightBound : 950,
      health : 10,
    });
    entityManager.generateEnemyTwo({
      cx : 100,
      cy : 500,
      leftBound : 50,
      rightBound : 364,
      health : 10,
    });
    // platforms under ground spikes
    entityManager.generatePlatform({
      cx : 425,
      cy : 590,
      scale:0.1,
    });
    entityManager.generatePlatform({
      cx : 475,
      cy : 590,
      scale:0.1,
    });
    entityManager.generatePlatform({
      cx : 525,
      cy : 590,
      scale:0.1,
    });
    // Here is the first part of the ground
    for (var i = -225; i < 400; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 574,
            scale:0.1
        });
    }
    // Here is the second part of the ground
    for (var i = 560; i < 1250; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 574,
            scale:0.1
        });
    }
    // Here is the top floor
    for (var i = -225; i < 725; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 200,
            scale:0.1
        });
    }
    // Here are the two middle floor platforms
    for (var i = 150; i < 340; i += 50) {
      entityManager.generatePlatform({
        cx : i,
        cy : 380,
        scale:0.1,
      });
    }
    for (var i = 610; i < 1250; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 380,
            scale:0.1
        });
    }

    // Spikes on ground

    for (var i = 415; i<450; i+=75) {
      entityManager.generateSpikes({
        cx : i,
        cy : 550,
      });
      entityManager.generateSpikes({
        cx : i+25,
        cy : 550,
      });
      entityManager.generateSpikes({
        cx : i+50,
        cy : 550,
      });
      entityManager.generateSpikes({
        cx : i+75,
        cy : 550,
      });
      entityManager.generateSpikes({
        cx : i+100,
        cy : 550,
      });
    }

    // Spikes on middle floor
    for (var i = 800; i<820; i+=75) {
      entityManager.generateSpikes({
        cx : i+25,
        cy : 337,
      });
      entityManager.generateSpikes({
        cx : i+50,
        cy : 337,
      });
    }
    // Spikes on the top floor
    for (var i = 630; i<650; i+=75) {
      entityManager.generateSpikes({
        cx : i+25,
        cy : 157,
      });
      entityManager.generateSpikes({
        cx : i+50,
        cy : 157,
      });
    }
  },
  setStageSeven : function () {
    // Set where the charcter drops
    entityManager._char[0].cx = 50;
    entityManager._char[0].cy = 503;
    // Here are two goblins that don't jump
    entityManager.generateEnemyFour({
      cx : 75,
      cy : 100,
      floor : 100,
    });
    entityManager.generateEnemyFour({
      cx : 950,
      cy : 100,
      floor : 100,
    });
    // Here are two golems
    entityManager.generateEnemyTwo({
      cx : 380,
      cy : 260,
      leftBound : 350,
      rightBound : 650,
      health : 10,
    });
    entityManager.generateEnemyTwo({
      cx : 640,
      cy : 260,
      leftBound : 350,
      rightBound : 650,
      health : 10,
    });
    // Here are two goblins that jump
    entityManager.generateEnemyThree({
      cx : 205,
      cy : 355,
      floor : 358,
    });
    entityManager.generateEnemyThree({
      cx : 790,
      cy : 358,
      floor : 358,
    });

    // Here is the ground
    for (var i = -225; i < 1250; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 574,
            scale:0.1
        });
    }
    // Here is the first part of the top floor
    for (var i = -225; i < 150; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 165,
            scale:0.1
        });
    }
    // Here is the second part of the top floor
    for (var i = 900; i < 1250; i += 50) {
        entityManager.generatePlatform({
            cx : i,
            cy : 165,
            scale:0.1
        });
    }
    // Here is the second floor
    for (var i = 125; i < 925; i += 50) {
      entityManager.generatePlatform({
        cx : i,
        cy : 525,
        scale:0.1,
      });
    }
    // Here is the third floor
    for (var i = 125; i < 925; i += 50) {
      entityManager.generatePlatform({
        cx : i,
        cy : 475,
        scale:0.1,
      });
    }
    for (var i = 200; i < 850; i += 50) {
      entityManager.generatePlatform({
        cx : i,
        cy : 425,
        scale:0.1,
      });
    }
    // Here is the fourth floor
    for (var i = 275; i < 775; i += 50) {
      entityManager.generatePlatform({
        cx : i,
        cy : 375,
        scale:0.1,
      });
    }
    // Here is the fifth floor
    for (var i = 350; i < 700; i += 50) {
      entityManager.generatePlatform({
        cx : i,
        cy : 325,
        scale:0.1,
      });
    }
  },

  // Here is the boss level
  setStageBoss : function() {
  // Here is the ground
  for (var i = -225; i < 1200; i += 50) {
      entityManager.generatePlatform({
        cx : i,
        cy : 574,
        scale:0.1,
      });
    }
    // Here is the boss generation
    entityManager.generateBoss();
  },

};
