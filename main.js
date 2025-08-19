const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'logo.png'),
    title: 'FastFligran - Fligran Ekleme Uygulaması',
    resizable: true,
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    menuBarVisible: false
  });

  mainWindow.loadFile('index.html');

  // Menü çubuğunu tamamen kaldır
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setMenu(null);

  // Geliştirme modunda DevTools'u aç
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Dosya seçme dialog'u
ipcMain.handle('select-image', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Görsel Dosyaları', extensions: ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'webp'] }
    ]
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

// Dosya kaydetme dialog'u
ipcMain.handle('save-image', async (event, imageData, originalFileName) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: `fligranli_${originalFileName}`,
    filters: [
      { name: 'PNG Dosyası', extensions: ['png'] }
    ]
  });
  
  if (!result.canceled) {
    try {
      // Base64 veriyi dosyaya yaz
      const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
      fs.writeFileSync(result.filePath, base64Data, 'base64');
      return { success: true, path: result.filePath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  return { success: false, error: 'Kaydetme iptal edildi' };
});

// Logo dosyasını oku
ipcMain.handle('get-logo', () => {
  const logoPath = path.join(__dirname, 'logo.png');
  if (fs.existsSync(logoPath)) {
    const logoData = fs.readFileSync(logoPath);
    return `data:image/png;base64,${logoData.toString('base64')}`;
  }
  return null;
});

// Hızlı kaydetme - masaüstüne direkt kaydet
ipcMain.handle('quick-save-image', async (event, imageData, originalFileName) => {
  try {
    const desktopPath = path.join(os.homedir(), 'Desktop');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const fileName = `fligranli_${timestamp}_${originalFileName}`;
    const filePath = path.join(desktopPath, fileName);
    
    // Base64 veriyi dosyaya yaz
    const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(filePath, base64Data, 'base64');
    
    return { success: true, path: filePath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});