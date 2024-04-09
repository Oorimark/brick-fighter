class Bullet {
  constructor(x, y, speed = 10, playerDirection, playerType) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = 5;
    this.playerType = playerType;
    this.bulletStepFlag = false;
    this.bulletStepInterval = 500;
    this.playerDirection = playerDirection;
  }

  display() {
    fill(200);
    noStroke();
    rect(this.x, this.y, this.size);
  }

  stepMovement() {
    this.y += this.speed;
    setTimeout(() => {
      this.bulletStepFlag = true;
    }, this.bulletStepInterval);
  }

  move() {
    switch (this.playerDirection) {
      case "LEFT":
        this.x -= this.speed;
        break;
      case "RIGHT":
        this.x += this.speed;
        break;
      case "UP":
        this.y -= this.speed;
        break;
      case "DOWN":
        this.y += this.speed;
        break;
    }
  }
}
