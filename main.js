const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  ipcMain.handle("checkFile", (e, file) => {
    try {
      if (fs.existsSync(`./${file}`)) {
        return true;
      } else return false;
    } catch (err) {
      console.error(err);
    }
  });
  ipcMain.handle("writeFile", (e, data) => {
    fs.writeFileSync(data.file, JSON.stringify(data.d));
    return "ok";
  });
  ipcMain.handle("readFile", (e, file) => {
    let text = JSON.parse(fs.readFileSync(file));

    return text;
  });
  win.loadFile("index.html");
};

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
