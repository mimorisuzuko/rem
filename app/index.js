const { app, globalShortcut } = require('electron');
const Single = require('./single-window');
const single = new Single();

app.on('ready', () => {
	globalShortcut.register('Control+R', () => {
		if (single.exist()) {
			single.toggleVisible();
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