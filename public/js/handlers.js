function playerActionHandler() {
  if (respawnPlayer) showPlayers[0] = true;
  if (showPlayers[0]) {
    respawnPlayer = false;
    player1.display();
    player1.shoot();
    player1.directional();
    player1.checkIncomingBullet();
    player1.checkIncomingGifts();
  } else {
    playerLoseAudio.play();
  }
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

function bulletsCleaner() {
  enemyBullets = enemyBullets.filter((bullet) => bullet.y < height);
  playerBullets = playerBullets.filter((bullet) => bullet.y > 0);
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
  p.style("color", "white", "font-size", 540);

  setTimeout(() => {
    p.remove();
  }, 3000);
}

function dialogBox(children) {
  dialogContainer = createDiv();

  dialogContainer.style("position", "fixed");
  dialogContainer.style("background", "#ffffff90");
  dialogContainer.style("backdrop-filter", "blur(1rem)");
  dialogContainer.style("width", "100%");
  dialogContainer.style("z-index", "99");
  dialogContainer.style("top", "0");
  dialogContainer.style("display", "flex");
  dialogContainer.style("flex-direction", "column");
  dialogContainer.style("justify-content", "center");
  dialogContainer.style("align-items", "center");
  dialogContainer.style("height", "100vh");

  children.forEach((child) => {
    dialogContainer.child(child);
  });
}

function startScreenUI() {
  const headerContainer = createDiv();

  const header = createP("Brick Fighter");
  const headerParagraph = createP("Use the instruction below to play the game");

  header.style("text-align", "center");
  header.style("font-size", "2rem");
  header.style("font-weight", "bold");

  headerContainer.style("margin-block", "2rem");

  headerContainer.child(header);
  headerContainer.child(headerParagraph);

  const instruct1 = createP("Use the Right Arrow to move →");
  const instruct2 = createP("Use the Down Arrow to move Down ↓");
  const instruct3 = createP("Use the Up Arrow to move ↑");
  const instruct4 = createP("Use the Left Arrow to move ←");
  const instruct5 = createP("Use the Space Bar to shoot");
  const extra = createP("You can try it!");

  const proceedBtn = createButton("Start Game");
  proceedBtn.mousePressed(function () {
    startGame = true;
    dialogContainer.remove();
  });

  const showAgainContainer = createDiv();

  const showAgainText = createP("Don't show Again");
  const showAgainCheckBox = createCheckbox();

  showAgainCheckBox.mouseClicked(function () {
    showAgainCheckBox.checked()
      ? localStorage.setItem("dontShowStartPage", JSON.stringify(true))
      : localStorage.setItem("dontShowStartPage", JSON.stringify(false));
  });

  showAgainContainer.style("display", "flex");
  showAgainContainer.style("justify-content", "center");
  showAgainContainer.style("align-items", "center");

  showAgainContainer.child(showAgainCheckBox);
  showAgainContainer.child(showAgainText);

  return [
    headerContainer,
    instruct1,
    instruct2,
    instruct3,
    instruct4,
    instruct5,
    extra,
    proceedBtn,
    showAgainContainer,
  ];
}

function displayStartUI() {
  if (!JSON.parse(localStorage.getItem("dontShowStartPage")))
    dialogBox(startScreenUI());
}

function gameOverUI() {
  const p = createP("Hey, You Lose!");
  const continueBtn = createButton("Continue");
  continueBtn.mousePressed(function () {
    respawnPlayer = true;
    dialogContainer.remove();
  });

  return [p, continueBtn];
}

function displayGameOver() {
  dialogBox(gameOverUI());
}
