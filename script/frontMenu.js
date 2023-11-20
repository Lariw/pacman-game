const startButton = document.querySelector(".js-playButton");
const canvaContainer = document.querySelector(".canvasContainer");
const scoreContainer = document.querySelector(".topContainer");
const frontPageContainer = document.querySelector(".frontPage");
const frontPageMenu = document.querySelector(".frontPage__menu");
const settingsBtn = document.querySelector(".js-settingsButton");
const viewMapBtn = document.querySelector(".js-mapsButton");
const settingSection = document.querySelector(".settings__menu");
const viewMapSection = document.querySelector(".viewMap__menu");
const menus = document.querySelector(".menus");
const returnBtn = document.querySelectorAll(".js-returnBtn");
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
const pauseGame = document.querySelector(".js-pauseGame");
const playGame = document.querySelector(".js-playGame");
const nextLevelBtn = document.querySelector(".js-gameMessage__nextLV");
const sounds = [
  ghostAudio,
  deathSound,
  gameOverSound,
  winningGameSound,
  cutSceneSound,
  chompSound,
  fruitSound,
  beforeStartSound,
];
let level = 1;

setTimeout(() => {
  readConfig();
  introAudio.play();
}, 1000);

musicVolumeInput.addEventListener("change", () => {
  introAudio.volume = musicVolumeInput.value;
});

soundsVolumeInput.addEventListener("change", () => {
  sounds.forEach((sound) => {
    sound.volume = soundsVolumeInput.value;
  });

  ghostAudio.play();
});

startButton.addEventListener("click", () => {
  canvaContainer.style.display = "flex";
  scoreContainer.style.display = "flex";
  menus.style.display = "none";
  introAudio.pause();
  startGame(level);
});

settingsBtn.addEventListener("click", () => {
  frontPageMenu.style.display = "none";
  settingSection.style.display = "block";
});

viewMapBtn.addEventListener("click", () => {
  frontPageMenu.style.display = "none";
  viewMapSection.style.display = "block";
  mainImage.style.display = "none";
});

returnBtn.forEach((el) => {
  el.addEventListener("click", () => {
    mainImage.style.display = "block";
    let control;
    frontPageMenu.style.display = "block";
    viewMapSection.style.display = "none";
    settingSection.style.display = "none";

    if (keyControlWSAD.checked) {
      control = "wsad";
    } else if (keyControlArrow.checked) {
      control = "arrow";
    }

    saveConfig(control, musicVolumeInput.value, soundsVolumeInput.value);
  });
});
nextLevelBtn.addEventListener("click", () => {
  level += 1;
  gameMessage.style.display = "none";
  beforeStartSound.play();
  setTimeout(() => {
    startGame(level);
  }, 4000);
});

mainImage.addEventListener("click", () => {
  ghostAudio.play();
});
