const SPACE_BAR = 32;

let player1;
let createUICanvas;

let healthGiftImg;
let dialogContainer;

let bonusEarnAudio;
let killEnemyAudio;
let playerLoseAudio;
let playerMoveAudio;
let bulletShootAudio;

let enemyCharacterUp;
let enemyCharacterDown;
let enemyCharacterRight;
let enemyCharacterLeft;

let playerCharacterUp;
let playerCharacterDown;
let playerCharacterLeft;
let playerCharacterRight;

let enemys = [];
let giftItems = [];
let enemyBullets = [];
let playerBullets = [];

let respawnPlayer = false;
let toggleCreateGiftItems = true;

let level = 1;
let enemyNumber = 2;
let screenBottomPadding = 55;
let canvasBackgroundColor = [38, 68, 57];

let startGame = JSON.parse(localStorage.getItem("dontShowStartPage"));
let highestLevel = localStorage.getItem("highestLevel") || level;
