const { app, BrowserWindow } = require('electron');
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
  const w = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });

  w.loadURL(
    NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : `file://${libpath.join(__dirname, 'dst/index.html')}`
  );

  w.on('closed', () => {
    browserWindow = null;
  });

  browserWindow = w;
};

app.on('ready', () => {
  create();
  installExtension(REACT_DEVELOPER_TOOLS).catch(console.error);
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
  if (!browserWindow) {
    create();
  }
});
