import { app, BrowserWindow, Menu } from "electron";
import { isDev } from "./util.js";

export function createMenu(mainWindow: BrowserWindow) {
    if(isDev()) {
        Menu.setApplicationMenu(
        Menu.buildFromTemplate([{
            label: "View",
            type: "submenu",
            submenu: [{
                label: "Quit",
                click: app.quit
            }, 
            {
            label: "DevTools",
            click: () => {
                mainWindow.webContents.toggleDevTools();
            },
            visible: isDev(),
            },
            ]
         }])
        );
    } else {
        Menu.setApplicationMenu(null); // Disable default menu in production
    }
}