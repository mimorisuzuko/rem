const {
    app,
    BrowserWindow,
    screen,
    ipcMain,
    globalShortcut
} = require('electron');
const libpath = require('path');
const {
    env: { NODE_ENV }
} = process;
const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS
} = require('electron-devtools-installer');

/** @type {Electron.BrowserWindow} */
let browserWindow = null;

const create = () => {
    const {
        size: { width, height }
    } = screen.getPrimaryDisplay();
    const remWidth = 753;
    const remHeight = 651;

    browserWindow = new BrowserWindow({
        width: remWidth,
        height: remHeight,
        x: width - remWidth,
        y: height - remHeight,
        transparent: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    });

    browserWindow.loadURL(
        NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : `file://${libpath.join(__dirname, 'dst/index.html')}`
    );

    browserWindow.on('closed', () => {
        browserWindow = null;
    });
};

app.on('ready', () => {
    create();
    installExtension(REACT_DEVELOPER_TOOLS).catch(console.error);

    globalShortcut.register('Alt+Space', () => {
        browserWindow.show();
    });
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (!browserWindow) {
        create();
    }
});

ipcMain.addListener('hide', () => {
    browserWindow.hide();
});
