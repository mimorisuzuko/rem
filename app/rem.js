const libpath = require('path');
const electron = require('electron');
const pug = require('pug');
const fs = require('fs');
const _ = require('lodash');
const { app, BrowserWindow, globalShortcut, ipcMain } = electron;

const targetPath = libpath.join(__dirname, 'dst/index.html');
fs.writeFileSync(targetPath, pug.compileFile(libpath.join(__dirname, '../src/index.pug'), { self: true })({
	cwd: process.cwd()
}));

class Rem {

	/**
	 * @param {Object} config
	 */
	constructor(config = {}) {
		/** @type {Electron.BrowserWindow} */
		this.browser = null;
		this.config = _.fromPairs(_.map(_.toPairs(
			_.merge({
				wnwn: {
					description: 'Change the mode of Rem to wnwn',
					exec: () => {
						this.browser.webContents.send('mode', { mode: 'wnwn' });
					}
				},
				mjmj: {
					description: 'Change the mode of Rem to mjmj',
					exec: () => {
						this.browser.webContents.send('mode', { mode: 'mjmj' });
					}
				}
			}, config)
		), ([k, v]) => {
			if (_.has(v, 'minQuerysLength')) {
				return [k, v];
			}

			v.minQuerysLength = 0;
			return [k, v];
		}));

		app.on('ready', this.onReady.bind(this));
		ipcMain.on('blur', this.onBlur.bind(this));
		ipcMain.on('setup', this.onSetup.bind(this));
		ipcMain.on('exec', this.onExec.bind(this));
	}

	onReady() {
		const { screen } = electron;
		const { size: { width: displayWidth, height: displayHeight } } = screen.getPrimaryDisplay();
		const width = 753;
		const height = 651;
		const browser = new BrowserWindow({
			width,
			height,
			frame: false,
			x: displayWidth - width,
			y: displayHeight - height,
			transparent: true
		});

		browser.loadURL(`file://${targetPath}`);
		globalShortcut.register('Control+R', this.onToggle.bind(this));
		this.browser = browser;
	}

	onToggle() {
		const { browser } = this;

		if (browser.isVisible()) {
			browser.hide();
		} else {
			browser.show();
			browser.webContents.send('focus');
		}
	}

	/**
	 * @param {Electron.IpcMainEvent} e
	 */
	onSetup(e) {
		e.returnValue = this.config;
	}

	onBlur() {
		this.browser.hide();
	}

	/**
	 * @param {Electron.IpcMainEvent} e
	 * @param {func: string, querys: string[], options: Object} args;
	 */
	onExec(e, args) {
		const { config, browser } = this;
		const { func, querys, options } = args;

		config[func].exec(querys, options);
		browser.hide();
	}
}

app.disableHardwareAcceleration(true);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') { app.quit(); }
});

module.exports = Rem;