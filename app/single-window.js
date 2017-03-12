const libpath = require('path');
const { BrowserWindow } = require('electron');

module.exports = class SingleWindow {
	constructor() {

		/** @type {Electron.BrowserWindow} */
		this.window = null;
	}

	toggleVisible() {
		if (!this.exist()) { return; }

		const { window } = this;

		if (window.isVisible()) {
			window.hide();
		} else {
			window.show();
		}
	}

	create() {
		const window = new BrowserWindow({
			width: 800,
			height: 600
		});
		
		window.loadURL(`file://${libpath.join(__dirname, 'dst/index.html')}`);
		window.on('closed', this.onClosed.bind(this));
		this.window = window;
	}

	onClosed() {
		this.window = null;
	}

	/**
	 * @returns {boolean}
	 */
	exist() {
		const { window } = this;

		return window !== null;
	}
};