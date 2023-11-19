const { app, BrowserWindow, ipcMain } = require("electron");


function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 820,
    icon: "assets/icons/icon_256.ico",
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("html/index.html");

  ipcMain.on("closeApp", () => {
    if (win) {
      win.close();
    }
  });

  ipcMain.on("minimizeApp", () => {
    if (win) {
      win.minimize();
    }
  });

  ipcMain.on("maximizeRestoreApp", () => {
    if (win) {
      if (win.isMaximized()) {
        win.restore();
      } else {
        win.maximize();
      }
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
