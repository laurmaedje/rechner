const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron

let window

app.on('ready', () => {
    width = 320;
    height = 480;
    window = new BrowserWindow({width: width, height: height, minWidth: 320, minHeight: 480})

    window.setMenu(null)
    
    window.loadURL('file://' + __dirname + '/app/index.html') 

})

app.on('window-all-closed', () => {
    app.quit()
})

