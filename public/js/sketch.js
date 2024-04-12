function preload() {
  bonusEarnAudio = createAudio(
    "./assets/sounds/mixkit-bonus-earned-in-video-game-2058.wav",
  );
  killEnemyAudio = createAudio(
    "./assets/sounds/mixkit-game-blood-pop-slide-2363.wav",
  );
  playerLoseAudio = createAudio(
    "./assets/sounds/mixkit-player-losing-or-failing-2042.wav",
  );

  bulletShootAudio = createAudio("./assets/sounds/blaster-2-81267.mp3");
  enemyCharacterUp = loadImage("./assets/characters/enemy_up.png");
  enemyCharacterLeft = loadImage("./assets/characters/enemy_left.png");
  enemyCharacterDown = loadImage("./assets/characters/enemy_down.png");
  enemyCharacterRight = loadImage("./assets/characters/enemy_right.png");

  playerCharacterUp = loadImage("/assets/characters/player_up.png");
  playerCharacterLeft = loadImage("./assets/characters/player_left.png");
  playerCharacterDown = loadImage("./assets/characters/player_down.png");
  playerCharacterRight = loadImage("./assets/characters/player_right.png");

  healthGiftImg = loadImage("./assets/characters/health_gift.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createUICanvas = createGraphics(windowWidth, windowHeight);

  createPlayer("arrowKeys");
  createEnemyHandler();

  displayStartUI();
}

function draw() {
  frameRate(60);

  const [r, g, b] = canvasBackgroundColor;
  background(r, g, b);
  canvasBackgroundColor = [38, 68, 57];

  image(createUICanvas, 0, 0);
  createUICanvas.background(r, g, b);

  displayUI();
  playerActionHandler();
  enemyActionHandler();
  bulletsDisplayHandler();
  respawnEnemyHandler();
  createGiftItemsDelay();
  displayGifts();
}
