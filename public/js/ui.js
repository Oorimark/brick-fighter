function dialogBox(children) {
  dialogContainer = createDiv();
  dialogContainer.class("dialog-container");

  children.forEach((child) => {
    dialogContainer.child(child);
  });
}

function startScreenUI() {
  const headerContainer = createDiv();
  headerContainer.style("margin-block", "2rem");

  const header = createP("Brick Fighter");
  header.class("start-screen-header");

  const headerParagraph = createP("Use the instruction below to play the game");

  headerContainer.child(header);
  headerContainer.child(headerParagraph);

  const instruct1 = createP("Use the Right Arrow to move →");
  const instruct2 = createP("Use the Down Arrow to move Down ↓");
  const instruct3 = createP("Use the Up Arrow to move ↑");
  const instruct4 = createP("Use the Left Arrow to move ←");
  const instruct5 = createP("Use the Space Bar to shoot");
  const extra = createP("-- You can try it! --");

  const proceedBtn = createButton("Start Game");
  proceedBtn.mousePressed(function () {
    startGame = true;
    dialogContainer.remove();
  });

  const showAgainContainer = createDiv();
  showAgainContainer.class("show-again-container");

  const showAgainText = createP("Don't show Again");
  const showAgainCheckBox = createCheckbox();

  showAgainCheckBox.mouseClicked(function () {
    showAgainCheckBox.checked()
      ? localStorage.setItem("dontShowStartPage", JSON.stringify(true))
      : localStorage.setItem("dontShowStartPage", JSON.stringify(false));
  });

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
  if (!JSON.parse(localStorage.getItem("dontShowStartPage")) && !minWidthError)
    dialogBox(startScreenUI());
}

function gameOverUI() {
  const p = createP("Hey, You Lose!");
  const score = createP("Your Level is: " + level);

  const continueBtn = createButton("Continue");
  continueBtn.mousePressed(function () {
    createPlayer("arrowKeys");
    dialogContainer.remove();
  });

  return [p, score, continueBtn];
}

function displayGameOver() {
  dialogBox(gameOverUI());
}
