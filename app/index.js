const electron = require('electron');
const { app, globalShortcut, ipcMain } = electron;
const Single = require('./single-window');
const single = new Single();

app.disableHardwareAcceleration();

app.on('ready', () => {
	const { size: { width: screenWidth, height: screenHeight } } = electron.screen.getPrimaryDisplay();
	const width = 753;
	const height = 651;

	single.defaultOptions = {
		width,
		height,
		x: screenWidth - width,
		y: screenHeight - height,
		frame: false,
		transparent: true
	};

	globalShortcut.register('Control+R', () => {
		if (single.exist()) {
			if (single.visible()) {
				single.hide();
			} else {
				single.show();
				single.send('focus');
			}
		} else {
			single.create();
		}
	});
	single.create();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') { app.quit(); }
});

app.on('activate', () => {
	if (!single.exist()) { single.create(); }
});


app.on('browser-window-blur', () => {
	single.hide();
});

ipcMain.on('blur', (event) => {
	single.hide();

	event.returnValue = null;
});