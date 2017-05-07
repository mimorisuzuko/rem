const libpath = require('path');
const electron = require('electron');
const fs = require('fs');
const config = fs.existsSync(libpath.join(__dirname, 'rem.config.js')) ? require('./rem.config') : {};
const { app, BrowserWindow, globalShortcut, ipcMain } = electron;

/** @type {Electron.BrowserWindow} */
let browser = null;

app.disableHardwareAcceleration(true);

app.on('ready', () => {
	const { screen } = electron;
	const { size: { width: displayWidth, height: displayHeight } } = screen.getPrimaryDisplay();
	const width = 753;
	const height = 651;

	browser = new BrowserWindow({
		width,
		height,
		frame: false,
		x: displayWidth - width,
		y: displayHeight - height,
		transparent: true
	});
	browser.loadURL(`file://${libpath.join(__dirname, 'dst/index.html')}`);
	globalShortcut.register('Control+R', () => {
		if (browser.isVisible()) {
			browser.hide();
		} else {
			browser.show();
			browser.webContents.send('focus');
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') { app.quit(); }
});

ipcMain.on('blur', () => {
	browser.hide();
});

ipcMain.on('setup', (e) => {
	e.returnValue = config;
});

ipcMain.on('exec', (e, { func, querys, options }) => {
	config[func].exec(querys, options);
	browser.hide();
});