const libpath = require('path');
const electron = require('electron');
const { app, BrowserWindow, globalShortcut, ipcMain } = electron;

class Rem {

	/**
	 * @param {Object} config
	 */
	constructor(config = {}) {
		/** @type {Electron.BrowserWindow} */
		this.browser = null;
		this.config = config;

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

		browser.loadURL(`file://${libpath.join(__dirname, 'dst/index.html')}`);
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