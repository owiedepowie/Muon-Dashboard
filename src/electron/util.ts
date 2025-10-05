import { ipcMain } from 'electron';
import type { WebContents } from 'electron';
import { getUIPath } from './pathResolver.js';
import { pathToFileURL } from 'url';
export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function ipcMainHandle<Key extends keyof EvenPayloadMapping>(
  key: Key, 
  handler: () => EvenPayloadMapping[Key]
) {
  ipcMain.handle(key, (event) => {
    if (event.senderFrame !== null) {
      validateEventFrame(event.senderFrame);
      return handler();
    }
  });
}
export function ipcWebContentsSend<Key extends keyof EvenPayloadMapping>(
  webContents: WebContents, 
  key: Key, 
  payload: EvenPayloadMapping[Key]
) {
  webContents.send(key, payload);
}

export function validateEventFrame(frame: Electron.WebFrameMain) {
  if (isDev() && new URL(frame.url).host === 'localhost:5123') {
    return;
  }
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error('nuh uh lil bro');
  }
}