var app = require('app');
var Menu = require('menu');
var BrowserWindow = require('browser-window');
require('./setting').initialize();
var mainWindow = null;
var menu = Menu.buildFromTemplate([
  {
    label: 'File',
    submenu: [
      { label: 'Exit', accelerator: 'Ctrl+Q', click: function () { app.quit(); } },
      { label: 'Toggle DevTools', accelerator: 'F12', click: function () { BrowserWindow.getFocusedWindow().toggleDevTools(); } }
    ]
  }
]);
Menu.setApplicationMenu(menu);
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') app.quit();
});
app.on('ready', function () {
  mainWindow = new BrowserWindow({ width: 600, height: 800 });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
