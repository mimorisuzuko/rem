const electron = require('electron');
const _ = require('lodash');
const { app, globalShortcut, ipcMain } = electron;
const Single = require('./single-window');
const single = new Single();

class Rem {

	/**
	 * @param {Object} userCommands
	 */
	constructor(userCommands) {
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
			_.forEach(_.keys(userCommands), (a) => {
				ipcMain.on(`__${a}__`, () => {
					userCommands[a].f();
					console.log('executed');
				});
			});
			single.create();
			single.window.webContents.once('did-finish-load', () => single.send('setup-user-commands', userCommands));
		});

		app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') { app.quit(); }
		});

		app.on('activate', () => {
			single.show();
		});

		app.on('browser-window-blur', () => {
			single.hide();
		});

		ipcMain.on('blur', (event) => {
			single.hide();

			event.returnValue = null;
		});
	}
}

module.exports = Rem;