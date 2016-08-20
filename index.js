/// <reference path="typings/index.d.ts" />

const electron = require('electron');
const {app, BrowserWindow} = electron;

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
		'always-on-top': true
	});
	mainWindow.loadURL(`file://${__dirname}/dst/index.html`);
	mainWindow.webContents.openDevTools();

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) { createWindow(); }
});