// ======
// BULLET
// ======

// A generic contructor which accepts an arbitrary descriptor object
function Bullet(descr) {

  // Common inherited setup logic from Entity
  this.setup(descr);

  // Make a noise when I am created (i.e. fired)
  AudioBank.playSound(AudioBank.bullet);
}

Bullet.prototype = new Entity();

// Initial, inheritable, default values
Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 1;
Bullet.prototype.velY = 1;

// Convert times from milliseconds to "nominal" time units.
Bullet.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

Bullet.prototype.update = function (du) {

  spatialManager.unregister(this);

  this.lifeSpan -= du;
  if (this.lifeSpan < 0 || this.cx < 0 || this.cx > 1000) return entityManager.KILL_ME_NOW;

  this.cx += this.velX * du;
  this.cy += this.velY * du;

  // Handle collisions
  var hitEntity = this.findHitEntity();
  if (!hitEntity.isHp) {
    if (hitEntity) {
      var canTakeHit = hitEntity.takeBulletHit;
      if (canTakeHit) canTakeHit.call(hitEntity);
      return entityManager.KILL_ME_NOW;
    }
  }
  // TODO: YOUR STUFF HERE! --- (Re-)Register
  return spatialManager.register(this);
};

Bullet.prototype.getRadius = function () {
  return 4;
};

Bullet.prototype.takeBulletHit = function () {
  this.kill();

  // When I am killed
};

Bullet.prototype.calculateMovement = function () {
  return;
};

Bullet.prototype.render = function (ctx) {
  g_sprites.bullet.drawCentredAt(ctx, this.cx, this.cy, this.rotation);
  ctx.globalAlpha = 1;
};
