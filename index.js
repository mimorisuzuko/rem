/// <reference path="typings/index.d.ts" />

const electron = require('electron');
const {app, BrowserWindow, globalShortcut, ipcMain} = electron;

let mainWindow = null;

const createWindow = () => {
	const display = electron.screen.getPrimaryDisplay();
	const width = 753;
	const height = 651;
	const x = display.size.width - width;
	const y = display.size.height - height;
	mainWindow = new BrowserWindow({
		width,
		height,
		transparent: true,
		frame: false,
		resizable: false,
		x,
		y,
		alwaysOnTop: true
	});
	mainWindow.setIgnoreMouseEvents(true);
	mainWindow.loadURL(`file://${__dirname}/dst/index.html`);
	mainWindow.on('closed', () => mainWindow = null);
};

app.on('ready', () => {
	globalShortcut.register('Control+R', () => {
		if (mainWindow) {
			mainWindow[mainWindow.isVisible() ? 'hide' : 'show']();
		} else {
			createWindow();
		}
	});
	createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') { app.quit(); }
});

app.on('browser-window-blur', () => {
	mainWindow.hide();
});

ipcMain.on('hide', (event, mes) => {
	mainWindow.hide();
	event.returnValue = null;
});