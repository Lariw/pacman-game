const startButton = document.querySelector(".js-playButton");
const canvaContainer = document.querySelector(".canvasContainer");
const scoreContainer = document.querySelector(".scoreContainer");
const frontPageContainer = document.querySelector(".frontPage");

startButton.addEventListener("click", () => {
  canvaContainer.style.display = "flex";
  scoreContainer.style.display = "block";
  frontPageContainer.style.display = "none";
  startGame();
});
