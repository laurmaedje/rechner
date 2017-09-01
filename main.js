const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron

var leval = require('./app/leval-js')
global.evaluate = leval.cwrap('evaluate', 'number', ['string'])

let window

app.on('ready', () => {
    debug = false;

    width = debug ? 720 : 320;
    height = 480;
    window = new BrowserWindow({width: width, height: height, minWidth: 320, minHeight: 480})

    if (debug)
        window.webContents.openDevTools()
    else
        window.setMenu(null)
    
    window.loadURL('file://' + __dirname + '/app/index.html') 

})

app.on('closed', () => {
    window = null
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
