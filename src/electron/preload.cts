import type { IpcRendererEvent } from "electron"
const { ipcRenderer } = require("electron");

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
    minimizeWindow: () => ipcRenderer.send("minimize-window"),
    maximizeWindow: () => ipcRenderer.send("maximize-window"),
    closeWindow: () => ipcRenderer.send('close-window'),
    subscribeStatistics: (callback) => {
        return ipcOn('statistics', (stats) => {
            callback(stats);
        });
    },
    getStaticData: () => ipcInvoke('getStaticData'),
    toggleFullscreen: () => ipcRenderer.invoke("window:toggle-fullscreen"),
    onFullscreenChange: (callback: (isFullscreen: boolean) => void) => {
        const listener = (_: IpcRendererEvent, isFullscreen: boolean) => callback(isFullscreen);
        ipcRenderer.on("fullscreen-changed", listener);
        return () => ipcRenderer.off("fullscreen-changed", listener);
    },
    isFullscreen: () => ipcRenderer.invoke("window:is-fullscreen"),
} satisfies Window['electron']);

function ipcInvoke<Key extends keyof EvenPayloadMapping>(
    key: Key,
): Promise<EvenPayloadMapping[Key]> {
    return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EvenPayloadMapping>(
    key: Key,
    callback: (payload: EvenPayloadMapping[Key]) => void
) {
    const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload)
    electron.ipcRenderer.on(key, cb);
    return () => electron.ipcRenderer.off(key, cb);
}