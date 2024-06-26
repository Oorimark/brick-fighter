function createPlayer(keyType) {
  player1 = new Player(width / 2, height, keyType, 1);
}

function playerActionHandler() {
  player1.display();
  player1.shoot();
  player1.directional();
  player1.checkIncomingBullet();
  player1.checkIncomingGifts();
}

function enemyActionHandler() {
  if (enemys.length) {
    enemys.forEach((enemy) => {
      enemy.display();
      enemy.move(); // moves and shoot
      enemy.checkIncomingBullet();
    });
  }
}

function bulletsDisplayHandler() {
  if (enemyBullets.length || playerBullets.length) {
    enemyBullets.forEach((bullet) => {
      bullet.display();
      bullet.move();
    });

    playerBullets.forEach((bullet) => {
      bullet.display();
      bullet.move();
    });
  }
}

function createEnemyHandler() {
  let counter = 0;
  while (counter++ < enemyNumber) {
    const _id = random(1000, 2000);
    enemys.push(new Enemy(_id));
  }
}

function respawnEnemyHandler() {
  if (!enemys.length) {
    level++;
    enemyNumber += 2; // multiply enemy by 2
    player1.health += 25; // Add 40 to player health
    createEnemyHandler(); // create more enemys
  }
}

function displayUI() {
  createUICanvas.fill(255);
  createUICanvas.text("HIGHEST LEVEL: " + highestLevel, 50, 50);
  createUICanvas.text("LEVEL: " + level, 50, 70);
  createUICanvas.text(
    "PLAYER HEALTH: " + player1.displayHealth(),
    width - 150,
    50,
  );
}

function createGiftItems() {
  giftItems.push(new HealthGift());
}

function createGiftItemsDelay() {
  if (level > 2 && toggleCreateGiftItems) {
    toggleCreateGiftItems = false;
    createHealthGiftItemHanlder();
  }
}

function createHealthGiftItemHanlder() {
  interval = random([20, 30, 45]);

  setTimeout(() => {
    createGiftItems();
    toggleCreateGiftItems = true;
  }, interval * 1000);
}

function displayGifts() {
  giftItems.forEach((item) => {
    item.display();
    item.move();
  });
}

function displayGiftScore(score) {
  let p = createP("+" + score + "%");

  p.position(width_ / 2, height_ / 2);
  p.style("color", "white");
  p.style("font-size", 540);

  setTimeout(() => {
    p.remove();
  }, 3000);
}
