// GENERIC RENDERING

var g_doRender = true;

var g_lvl1 = false;
var g_lvl2 = false;
var g_lvl3 = false;
var g_lvl4 = false;
var g_lvl5 = false;
var g_lvl6 = false;

var lvl1 = '1'.charCodeAt(0);
var lvl2 = '2'.charCodeAt(0);
var lvl3 = '3'.charCodeAt(0);
var lvl4 = '4'.charCodeAt(0);
var lvl5 = '5'.charCodeAt(0);
var lvl6 = '6'.charCodeAt(0);

function render(ctx) {

    // Process various option toggles
    if (eatKey(lvl1)) g_lvl1 = !g_lvl1;
    if (eatKey(lvl2)) g_lvl2 = !g_lvl2;
    if (eatKey(lvl3)) g_lvl3 = !g_lvl3;
    if (eatKey(lvl4)) g_lvl4 = !g_lvl4;
    if (eatKey(lvl5)) g_lvl5 = !g_lvl5;
    if (eatKey(lvl6)) g_lvl6 = !g_lvl6;


    if (g_lvl1) {
        levelTransition.levelIndex = -1;
        entityManager.clearLevel();
        levelTransition.setStageZero();
        g_lvl1 = !g_lvl1;
    }

    if (g_lvl2) {
        entityManager.clearLevel();
        levelTransition.setStageOne();
        levelTransition.levelIndex = 0;
        entityManager._char[0].cx = 50;
        entityManager._char[0].cy = 502;
        g_lvl2 = !g_lvl2;
    }

    if (g_lvl3) {
        entityManager.clearLevel();
        levelTransition.setStageTwo();
        levelTransition.levelIndex = 1;
        entityManager._char[0].cx = 50;
        entityManager._char[0].cy = 502;
        g_lvl3 = !g_lvl3;
    }

    if (g_lvl4) {
        entityManager.clearLevel();
        levelTransition.setStageThree();
        levelTransition.levelIndex = 2;
        g_lvl4 = !g_lvl4;
    }

    if (g_lvl5) {
        entityManager.clearLevel();
        levelTransition.setStageFour();
        entityManager._char[0].cx = 50;
        entityManager._char[0].cy = -45;
        levelTransition.levelIndex = 3;
        g_lvl5 = !g_lvl5;
    }

    if (g_lvl6) {
        entityManager.clearLevel();
        levelTransition.setStageBoss();
        entityManager._char[0].cx = 50;
        entityManager._char[0].cy = 502;
        levelTransition.levelIndex = 4;
        g_lvl6 = !g_lvl6;
    }

    // The core rendering of the actual game / simulation
    if (g_doRender) renderSimulation(ctx);

}
