const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')

let window

function createWindow() {
  window = new BrowserWindow({
    width: 1280,
    height: 960,
    icon: __dirname + '/res/logo.png',
    minWidth: 710,
    minHeight: 480,
    darkTheme: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    },
    backgroundColor: '#151515'
  })

  window.loadFile('splash.html').then(() => {
    setTimeout(()=>{
      window.loadURL('https://music.youtube.com/')
    }, 3000)
  });

  window.webContents.on('did-finish-load', () => {
    fs.readFile(`${__dirname}/css/style.css`, 'utf-8', (e, data) => {
      if (e) alert(e)

      var formattedData = data.replace(/\s{2,10}/g, ' ').trim()
      window.webContents.insertCSS(formattedData);
    })

    try {
      fs.readFile(`${__dirname}/js/window_buttons.js`, 'utf-8', (e, data) => {
        if (e) console.error(e)

        var formattedData = data.replace(/\s{2,10}/g, ' ').trim()
        window.webContents.executeJavaScript(formattedData)
      })
    } catch (e) {
      console.error(e);
    }

    setThumbar(true);

    try {
      fs.readFile(`${__dirname}/js/thumbar.js`, 'utf-8', (e, data) => {
        if (e) console.error(e)

        var demData = data.replace(/\s{2,10}/g, ' ').trim()
        window.webContents.executeJavaScript(demData)
      })
    } catch (e) {
      console.error(e);
    }

    window.on('closed', () => window = null)
  })
}

ipcMain.on('togglePlayPause', (e, args) => {
  setThumbar(args == 'Pause');
});

function setThumbar(isPaused) {
  var playPauseButton;

  if (isPaused) {
    playPauseButton = {
      tooltip: 'Play',
      icon: path.join(__dirname, '/res/thumbar-play.png'),
      click () {
        window.webContents.send('thumbar-play')
      }
    }
  } else {
    playPauseButton = {
      tooltip: 'Pause',
      icon: path.join(__dirname, '/res/thumbar-pause.png'),
      click () {
        window.webContents.send('thumbar-play')
      }
    }
  }

  window.setThumbarButtons([
    {
      tooltip: 'Previous',
      icon: path.join(__dirname, '/res/thumbar-previous.png'),
      click () {
        window.webContents.send('thumbar-previous')
      }
    },
    playPauseButton,
    {
      tooltip: 'Next',
      icon: path.join(__dirname, '/res/thumbar-next.png'),
      click () {
        window.webContents.send('thumbar-next')
      }
    }
  ]);
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (window === null) createWindow()
})