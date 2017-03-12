const libpath = require('path');
const _ = require('lodash');
const { BrowserWindow } = require('electron');

class SingleWindow {

	/**
	 * @param {Electron.BrowserWindowOptions} defaultOptions
	 */
	constructor(defaultOptions = {}) {

		/** @type {Electron.BrowserWindow} */
		this.window = null;
		this.defaultOptions = defaultOptions;
		this.onClosed = this.onClosed.bind(this);
	}

	hide() {
		if (!this.exist()) { return; }

		this.window.hide();
	}

	show() {
		if (!this.exist()) { return; }

		this.window.show();
	}

	visible() {
		return this.exist() ? this.window.isVisible() : null;
	}

	toggleVisible() {
		if (this.visible()) {
			this.hide();
		} else {
			this.show();
		}
	}

	/**
	 * @param {string} name
	 * @param {any} args
	 */
	send(name, args) {
		if (!this.exist()) { return; }

		this.window.webContents.send(name, args);
	}

	/**
	 * @param {Electron.BrowserWindowOptions} o
	 */
	create(o) {
		const window = new BrowserWindow(_.assign(o, this.defaultOptions));

		window.loadURL(`file://${libpath.join(__dirname, 'dst/index.html')}`);
		window.on('closed', this.onClosed);
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

module.exports = SingleWindow;