class Box {
  constructor(x, y, speed, characterImg) {
    this.x = x;
    this.y = y - bottomPadding;
    this.speed = speed;
    this.size = 39;
    this.color = color;
    this.characterImg = characterImg;
  }

  display() {
    image(this.characterImg, this.x, this.y);
  }

  shooting(x, y, speed, playerType, shootKeyType, playerDirection) {
    if (playerType === "Enemy") {
      enemyBullets.push(
        new Bullet(
          x + this.size / 2,
          y + this.size,
          speed,
          playerDirection,
          playerType,
        ),
      );
    } else {
      if (keyIsDown(shootKeyType)) {
        bulletShootAudio.play();
        playerBullets.push(
          new Bullet(x + this.size / 2, y + this.size, speed, playerDirection),
        );
      } else {
        bulletShootAudio.stop();
      }
    }
  }
}
