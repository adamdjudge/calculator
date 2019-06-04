// setup
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// global window
let mainWindow;

// function to create main window
function createMainWindow() {
    // initialize
    mainWindow = new BrowserWindow({
        width: 320,
        height: 480,
        webPreferences: {
            nodeIntegration: true
        },
        show: false,
        icon: __dirname+'/../img/calc.ico',
        title: 'Calculator',
        resizable: false,
        maximizable: false
    });
    // load html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'calc.html'),
        protocol: 'file',
        slashes: true
    }));
    //mainWindow.webContents.openDevTools()
    // erase window object and quit when closed
    mainWindow.on('closed', () => {mainWindow = null; app.quit();});
    // show when loaded
    mainWindow.on('ready-to-show', () => {mainWindow.show();});
}

// start when ready
app.on('ready', createMainWindow);