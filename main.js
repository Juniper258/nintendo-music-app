const { app, BrowserWindow, session, components } = require('electron')
const path = require('path')

const NINTENDO_MUSIC_URL = 'https://music.nintendo.com'
const CHROME_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'

let mainWindow

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'nintendo_music.ico'),
    title: 'Nintendo Music',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      partition: 'persist:nintendo-music',
      enableDRM: true,
    }
  })

  mainWindow.loadURL(NINTENDO_MUSIC_URL, { userAgent: CHROME_UA })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        width: 800,
        height: 700,
        parent: mainWindow,
        autoHideMenuBar: true,
        webPreferences: {
          partition: 'persist:nintendo-music',
          sandbox: false,
          contextIsolation: true,
          nodeIntegration: false,
          enableDRM: true,
        }
      }
    }
  })

  mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(true)
  })

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setUserAgent(CHROME_UA)
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.commandLine.appendSwitch('no-sandbox')
app.commandLine.appendSwitch('enable-widevine')

app.whenReady().then(async () => {
  app.userAgentFallback = CHROME_UA
  await components.whenReady()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
