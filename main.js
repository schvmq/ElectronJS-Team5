const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { loadItems, saveItems } = require("./storage"); //  Import from storage.js

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");
}

//  IPC Events
ipcMain.on("load-items", (event) => {
  const items = loadItems();
  event.sender.send("display-items", items);
});

ipcMain.on("add-item", (event, newItem) => {
  const items = loadItems();
  items.push(newItem);
  saveItems(items);
  event.sender.send("display-items", items);
});

ipcMain.on("delete-item", (event, index) => {
  const items = loadItems();
  items.splice(index, 1);
  saveItems(items);
  event.sender.send("display-items", items);
});

app.whenReady().then(createWindow);
