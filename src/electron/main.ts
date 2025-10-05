import {ipcMainHandle, isDev} from './util.js';
import { getStaticData, pollResources } from './resourceManager.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';
import { createMenu } from './menu.js';

import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        },
        frame: false,
    });
    if(isDev()) {
        mainWindow.loadURL('http://localhost:5123');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(getUIPath());
    }

    pollResources(mainWindow);

    ipcMainHandle('getStaticData', () => {
        return getStaticData();
    });
    createMenu(mainWindow);
    mainWindow.on("enter-full-screen", () => mainWindow?.webContents.send("fullscreen-changed", true));
    mainWindow.on("leave-full-screen", () => mainWindow?.webContents.send("fullscreen-changed", false));

    globalShortcut.register("F11", () => {
        if (!mainWindow) return;
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
        mainWindow.webContents.send("fullscreen-changed", mainWindow.isFullScreen());
    });
});


ipcMain.on("minimize-window", () => mainWindow?.minimize());
ipcMain.on("maximize-window", () => {
  if (!mainWindow) return;
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});
ipcMain.on("close-window", () => mainWindow?.close());

ipcMain.handle("window:is-fullscreen", () => mainWindow?.isFullScreen() ?? false);

ipcMain.handle("window:toggle-fullscreen", () => {
    if (!mainWindow) return false;

    const newState = !mainWindow.isFullScreen();
    mainWindow.setFullScreen(newState);
    return newState;
});

app.on('will-quit', () => globalShortcut.unregisterAll());