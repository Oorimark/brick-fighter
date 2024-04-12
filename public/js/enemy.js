class Enemy extends Box {
  speed = 20;
  health = 100;
  healthDecayRate = 10;
  playerType = "Enemy";

  x = random(width);
  y = random(height * 0.2, height * 0.4); // keeps the height at 20% - 40%

  constructor(_id) {
    super(Enemy.x, Enemy.y, Enemy.speed, enemyCharacterDown);
    this._id = _id;
    this.bulletSpeed = 20;
    this.moveByStepFlag = true;
    this.moveStepDelay = 2000; // milliseconds
    this.stepCounter = 0;
    this.directions = ["LEFT", "RIGHT", "UP", "DOWN"];
  }

  direction(type) {
    switch (type) {
      case "LEFT":
        this.characterImg = enemyCharacterLeft;
        this.x -= this.speed;
        break;
      case "RIGHT":
        this.characterImg = enemyCharacterRight;
        this.x += this.speed;
        break;
      case "UP":
        this.characterImg = enemyCharacterUp;
        this.y -= this.speed;
        break;
      case "DOWN":
        this.characterImg = enemyCharacterDown;
        this.y += this.speed;
    }

    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);

    setTimeout(() => {
      this.moveByStepFlag = true;
    }, this.moveStepDelay);
  }

  move() {
    const direction = random(this.directions);

    if (this.moveByStepFlag) {
      this.moveByStepFlag = false;
      startGame && this.shoot(direction);
      this.direction(direction);
    }
  }

  shoot(direction) {
    this.shooting(
      this.x,
      this.y,
      this.bulletSpeed,
      this.playerType,
      null,
      direction,
    );
  }

  checkIncomingBullet() {
    playerBullets.forEach((bullet, idx) => {
      let d = dist(bullet.x, bullet.y, this.x, this.y);
      if (d <= this.size) {
        this.health -= this.healthDecayRate;
        canvasBackgroundColor = [43, 137, 103];
        if (this.health <= 0) {
          killEnemyAudio.play();
          this.remove();
        } else {
          killEnemyAudio.stop();
        }
        playerBullets.splice(idx, 1);
      }
    });
  }

  remove() {
    enemys = enemys.filter((enemy) => enemy._id !== this._id);
  }
}
