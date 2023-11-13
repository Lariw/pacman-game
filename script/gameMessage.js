const gameMessage = document.querySelector(".js-gameMessage");
const closeMessageBtn = document.querySelector(".js-closeGameMessage");
const returnToMenu = document.querySelector(".js-gameMessage__returnMenu");
const messageContent = document.querySelector(".js-message__content");
const retryButton = document.querySelector(".js-gameMessage__retry");
const loseElements = document.querySelector(".game-lose");
const winElements = document.querySelector(".game-win");
const lifeCount = document.querySelector(".js-lifeCount");
const life1 = document.querySelector(".life1");
const life2 = document.querySelector(".life2");
const life3 = document.querySelector(".life3");
let hearts = 3;
let collisionHandled = false;

closeMessageBtn.addEventListener("click", () => {
  gameMessage.style.display = "none";
});

const showGameMessage = (message) => {
  gameMessage.style.display = "block";

  if (message == "lose") {
    messageContent.innerText = "You lose !";
    winElements.style.display = "none";
    hearts -= 1;
    lifeCount.innerText = hearts;

    if (hearts == 2) {
      life3.style.color = "black";
    } else if (hearts == 1) {
      life2.style.color = "black";
    } else if (hearts == 0) {
      life1.style.color = "black";
      gameMessage.style.display = "block";
      messageContent.innerText = "GAME OVER";
      winElements.style.display = "none";
      loseElements.style.display = "none";
      gameOverSound.play();
    }
  } else {
    messageContent.innerText = "You win !";
    loseElements.style.display = "none";
    winElements.style.display = "block";
  }
};

retryButton.addEventListener("click", () => {
  gameMessage.style.display = "none";
  beforeStartSound.play();
  setTimeout(() => {
    startGame();
  }, 4000);
});

returnToMenu.addEventListener("click", () => {
  location.reload();
});
