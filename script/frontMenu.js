const startButton = document.querySelector(".js-playButton");
const canvaContainer = document.querySelector(".canvasContainer");
const scoreContainer = document.querySelector(".topContainer");
const frontPageContainer = document.querySelector(".frontPage");
const frontPageMenu = document.querySelector(".frontPage__menu");
const settingsBtn = document.querySelector(".js-settingsButton");
const settingSection = document.querySelector(".settings__menu");
const menus = document.querySelector(".menus");
const returnBtn = document.querySelector(".js-returnBtn");

const keyControlWSAD = document.querySelector(".js-keyControl-wsad");
const keyControlArrow = document.querySelector(".js-keyControl-arrow");

startButton.addEventListener("click", () => {
  canvaContainer.style.display = "flex";
  scoreContainer.style.display = "flex";
  menus.style.display = "none";
  startGame();
});

settingsBtn.addEventListener("click", () => {
  frontPageMenu.style.display = "none";
  settingSection.style.display = "block";
});

returnBtn.addEventListener("click", () => {
  frontPageMenu.style.display = "block";
  settingSection.style.display = "none";
});
