class Player extends Box {
  speed = 20;
  health = 10;
  healthDecayRate = 10;

  constructor(x, y, selectedKey, playerNumber) {
    super(x, y, Player.speed, playerCharacterUp);
    this.bulletSpped = 20;
    this.playerKey = playerKeys[selectedKey];
    this.playerNumber = playerNumber;
    this.receivedHealthGift = 0;
    this.direction = "UP";
  }

  _boundaryConstrainer() {
    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  directional() {
    const { LEFT, RIGHT, UP, DOWN } = this.playerKey;

    if (keyIsDown(LEFT)) {
      if (this.direction !== "LEFT") {
        this.direction = "LEFT";
        this.characterImg = playerCharacterLeft;
      } else {
        this.x += this.speed * -1;
      }
    } else if (keyIsDown(RIGHT)) {
      if (this.direction !== "RIGHT") {
        this.direction = "RIGHT";
        this.characterImg = playerCharacterRight;
      } else {
        this.speed < 0 && this.speed * -1;
        this.x += this.speed;
      }
    } else if (keyIsDown(UP)) {
      if (this.direction !== "UP") {
        this.direction = "UP";
        this.characterImg = playerCharacterUp;
      } else {
        this.y -= this.speed;
      }
    } else if (keyIsDown(DOWN)) {
      if (this.direction !== "DOWN") {
        this.characterImg = playerCharacterDown;
        this.direction = "DOWN";
      } else {
        this.y += this.speed;
      }
    }

    this._boundaryConstrainer();
  }

  shoot() {
    this.shooting(
      this.x,
      this.y - this.size / 2,
      this.bulletSpped,
      null,
      this.playerKey.SHOOT,
      this.direction,
    );
  }

  checkIncomingBullet() {
    enemyBullets.forEach((bullet, idx) => {
      let d = dist(bullet.x, bullet.y, this.x, this.y);
      if (d <= this.size / 2) {
        canvasBackgroundColor = [130, 29, 29];
        this.health -= this.healthDecayRate;
        if (this.health <= 0) {
          this.remove();
          displayGameOver();
          enemyBullets.splice(idx, 1);
          parseInt(highestLevel) < level &&
            localStorage.setItem("highestLevel", level);
        }
      }
    });
  }

  checkIncomingGifts() {
    giftItems.forEach((gift, idx) => {
      let d = dist(this.x, this.y, gift.x, gift.y);
      if (d <= this.size) {
        bonusEarnAudio.play();
        this.health += gift.value;
        this.receivedHealthGift = gift.value;
        displayGiftScore(gift.value);
        giftItems.splice(idx, 1);
      }
    });
  }

  remove() {
    showPlayers[this.playerNumber - 1] = false;
  }

  displayHealth() {
    if (this.health < 0) return "0%";
    return int((this.health / 100) * 100) + "%";
  }
}
