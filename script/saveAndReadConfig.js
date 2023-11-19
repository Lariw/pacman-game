const fs = require("fs");
const path = require("path");

const pathToConfig = path.join(__dirname, "../../", "config", "config.txt");

const saveConfig = (gameControl, musicVol, soundVol) => {
  const config = {
    control: gameControl,
    musicVolume: musicVol,
    soundVolume: soundVol,
  };

  fs.writeFileSync(pathToConfig, JSON.stringify(config, null, 2));
};

const readConfig = () => {
  if (fs.existsSync(pathToConfig)) {
    const configFromFile = fs.readFileSync(pathToConfig, "utf-8");
    try {
      const configTab = JSON.parse(configFromFile);
      sounds.forEach((sound) => {
        sound.volume = configTab.soundVolume;
      });

      introAudio.volume = configTab.musicVolume;
      musicVolumeInput.value = configTab.musicVolume;
      soundsVolumeInput.value = configTab.soundVolume;
      if (configTab.control == "wsad") {
        keyControlWSAD.checked = true;
        keyControlArrow.checked = false;
      } else if ((configTab.control = "arrow")) {
        keyControlArrow.checked = true;
        keyControlWSAD.checked = false;
      }
    } catch (error) {
      console.error("Error with parse", error.message);
    }
  } else {
    console.log("File doesnt exist");
  }
};
