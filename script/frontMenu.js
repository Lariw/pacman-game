const startButton = document.querySelector(".js-playButton");
const canvaContainer = document.querySelector(".canvasContainer");
const scoreContainer = document.querySelector(".topContainer");
const frontPageContainer = document.querySelector(".frontPage");
const frontPageMenu = document.querySelector(".frontPage__menu");
const settingsBtn = document.querySelector(".js-settingsButton");
const settingSection = document.querySelector(".settings__menu");
const menus = document.querySelector(".menus");
const returnBtn = document.querySelector(".js-returnBtn");
const mainImage = document.querySelector(".js-frontPage_image");
const keyControlWSAD = document.querySelector(".js-keyControl-wsad");
const keyControlArrow = document.querySelector(".js-keyControl-arrow");
const introAudio = document.querySelector(".introAudio");
const ghostAudio = document.querySelector(".ghostSound");
const beforeStartSound = document.querySelector(".beforeStartSound");
const deathSound = document.querySelector(".deathSound");
const cutSceneSound = document.querySelector(".cutSceneSound");
const fruitSound = document.querySelector(".fruitSound");
const chompSound = document.querySelector(".chompSound");
const winningGameSound = document.querySelector(".winningGameSound");
const gameOverSound = document.querySelector(".gameOverSound");

const musicVolumeInput = document.querySelector(".musicVolumeInput");
const soundsVolumeInput = document.querySelector(".soundsVolumeInput");

musicVolumeInput.addEventListener("change", () => {
  introAudio.volume = musicVolumeInput.value;
});

soundsVolumeInput.addEventListener("change", () => {
  ghostAudio.volume = soundsVolumeInput.value;
  ghostAudio.play();
});

introAudio.play();

startButton.addEventListener("click", () => {
  canvaContainer.style.display = "flex";
  scoreContainer.style.display = "flex";
  menus.style.display = "none";
  introAudio.pause();
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

mainImage.addEventListener("click", () => {
  ghostAudio.play();
});
