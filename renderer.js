const { ipcRenderer } = require('electron');

class WatermarkApp {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.originalImage = null;
        this.logoImage = null;
        this.currentColor = '#ffffff';
        this.currentOpacity = 0.5;
        this.currentSize = 0.6;
        this.currentPosition = 0.04;
        this.originalFileName = '';
        this.quickMode = false;
        
        this.init();
    }

    async init() {
        this.setupCanvas();
        this.setupEventListeners();
        await this.loadLogo();
    }

    setupCanvas() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Canvas kalite ayarlarını maksimuma çıkar
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
    }

    setupEventListeners() {
        // Görsel seçme butonu
        document.getElementById('selectImageBtn').addEventListener('click', () => {
            this.selectImage();
        });

        // Yeni görsel butonu
        document.getElementById('newImageBtn').addEventListener('click', () => {
            this.selectImage();
        });

        // Hızlı çıktı modu toggle
        const quickModeToggle = document.getElementById('quickModeToggle');
        quickModeToggle.addEventListener('change', (e) => {
            this.quickMode = e.target.checked;
            if (this.quickMode) {
                this.showQuickModeNotification();
            }
        });

        // Upload area'ya tıklama
        const uploadArea = document.getElementById('uploadArea');
        uploadArea.addEventListener('click', () => {
            this.selectImage();
        });

        // Drag & Drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.loadImageFile(files[0]);
            }
        });

        // Renk paleti
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', (e) => {
                if (!e.target.classList.contains('custom-color')) {
                    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
                    e.target.classList.add('active');
                    this.currentColor = e.target.dataset.color;
                    this.updateWatermark();
                }
            });
        });

        // Custom renk seçici
        const customColorPicker = document.getElementById('customColorPicker');
        customColorPicker.addEventListener('change', (e) => {
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
            document.querySelector('.custom-color').classList.add('active');
            this.currentColor = e.target.value;
            this.updateWatermark();
        });

        // Şeffaflık slider
        const opacitySlider = document.getElementById('opacitySlider');
        const opacityValue = document.getElementById('opacityValue');
        opacitySlider.addEventListener('input', (e) => {
            this.currentOpacity = parseFloat(e.target.value);
            opacityValue.textContent = Math.round(this.currentOpacity * 100) + '%';
            this.updateWatermark();
        });

        // Boyut slider
        const sizeSlider = document.getElementById('sizeSlider');
        const sizeValue = document.getElementById('sizeValue');
        sizeSlider.addEventListener('input', (e) => {
            this.currentSize = parseFloat(e.target.value);
            sizeValue.textContent = Math.round(this.currentSize * 100) + '%';
            this.updateWatermark();
        });

        // Pozisyon slider
        const positionSlider = document.getElementById('positionSlider');
        const positionValue = document.getElementById('positionValue');
        positionSlider.addEventListener('input', (e) => {
            this.currentPosition = parseFloat(e.target.value);
            positionValue.textContent = Math.round(this.currentPosition * 100) + '%';
            this.updateWatermark();
        });

        // Sıfırla butonu
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetSettings();
        });

        // İndir butonu
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadImage();
        });
    }

    async loadLogo() {
        try {
            const logoData = await ipcRenderer.invoke('get-logo');
            if (logoData) {
                this.logoImage = new Image();
                this.logoImage.onload = () => {
                    console.log('Logo yüklendi');
                };
                this.logoImage.src = logoData;
            } else {
                console.error('Logo dosyası bulunamadı');
            }
        } catch (error) {
            console.error('Logo yüklenirken hata:', error);
        }
    }

    async selectImage() {
        try {
            const imagePath = await ipcRenderer.invoke('select-image');
            if (imagePath) {
                this.loadImageFromPath(imagePath);
            }
        } catch (error) {
            console.error('Görsel seçilirken hata:', error);
        }
    }

    loadImageFromPath(imagePath) {
        const img = new Image();
        img.onload = () => {
            this.originalImage = img;
            this.originalFileName = imagePath.split('\\').pop().split('/').pop();
            this.setupCanvasSize();
            
            if (this.quickMode) {
                // Hızlı mod: Otomatik işle ve kaydet
                this.processQuickMode();
            } else {
                // Normal mod: Editörü göster
                this.showEditor();
                this.updateWatermark();
            }
        };
        img.onerror = () => {
            alert('Görsel yüklenirken hata oluştu!');
        };
        img.src = imagePath;
    }

    loadImageFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Lütfen geçerli bir görsel dosyası seçin!');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.originalImage = img;
                this.originalFileName = file.name;
                this.setupCanvasSize();
                
                if (this.quickMode) {
                    // Hızlı mod: Otomatik işle ve kaydet
                    this.processQuickMode();
                } else {
                    // Normal mod: Editörü göster
                    this.showEditor();
                    this.updateWatermark();
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    setupCanvasSize() {
        if (!this.originalImage) return;

        // Orijinal boyutları sakla
        this.originalWidth = this.originalImage.width;
        this.originalHeight = this.originalImage.height;

        // Görüntüleme için boyutlandırma (sadece CSS ile)
        const maxDisplayWidth = 800;
        const maxDisplayHeight = 600;
        
        let displayWidth = this.originalWidth;
        let displayHeight = this.originalHeight;
        
        // Orantılı görüntüleme boyutlandırması
        if (displayWidth > maxDisplayWidth || displayHeight > maxDisplayHeight) {
            const ratio = Math.min(maxDisplayWidth / displayWidth, maxDisplayHeight / displayHeight);
            displayWidth *= ratio;
            displayHeight *= ratio;
        }

        // Canvas'ı ORİJİNAL boyutlarda ayarla (kalite kaybı olmasın)
        this.canvas.width = this.originalWidth;
        this.canvas.height = this.originalHeight;
        
        // Sadece görüntüleme boyutunu CSS ile ayarla
        this.canvas.style.width = displayWidth + 'px';
        this.canvas.style.height = displayHeight + 'px';
        this.canvas.style.maxWidth = '100%';
        this.canvas.style.maxHeight = '100%';
    }

    showEditor() {
        // Upload section'ı gizle
        document.querySelector('.upload-section').style.display = 'none';
        // Editor section'ı göster
        document.getElementById('editorSection').style.display = 'flex';
    }

    updateWatermark() {
        if (!this.originalImage || !this.logoImage) return;

        // Canvas'ı temizle
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Orijinal görseli FULL boyutunda çiz (kalite kaybı olmasın)
        this.ctx.drawImage(this.originalImage, 0, 0, this.originalWidth, this.originalHeight);

        // Logo boyutunu ORİJİNAL görsel boyutuna göre hesapla (çok daha büyük)
        const logoBaseSize = Math.min(this.originalWidth, this.originalHeight) * 0.4; // Görsel boyutunun %40'ı
        const logoWidth = logoBaseSize * this.currentSize;
        const logoHeight = (logoBaseSize * this.logoImage.height / this.logoImage.width) * this.currentSize;

        // Logo pozisyonunu ORİJİNAL boyutlara göre hesapla
        const x = (this.originalWidth - logoWidth) / 2;
        const y = this.originalHeight - logoHeight - (this.originalHeight * this.currentPosition); // Kullanıcı ayarına göre

        // Renk filtresi uygula ve filtrelenmiş logoyu al
        const filteredLogo = this.applyColorFilter();

        // Şeffaflık ayarla
        this.ctx.globalAlpha = this.currentOpacity;

        // Filtrelenmiş logoyu çiz
        if (filteredLogo) {
            this.ctx.drawImage(filteredLogo, x, y, logoWidth, logoHeight);
        } else {
            this.ctx.drawImage(this.logoImage, x, y, logoWidth, logoHeight);
        }

        // Alpha'yı sıfırla
        this.ctx.globalAlpha = 1.0;
    }

    applyColorFilter() {
        if (!this.logoImage) return null;

        // Geçici canvas oluştur
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        tempCanvas.width = this.logoImage.width;
        tempCanvas.height = this.logoImage.height;

        // Logoyu geçici canvas'a çiz
        tempCtx.drawImage(this.logoImage, 0, 0);

        // Renk filtresi uygula
        tempCtx.globalCompositeOperation = 'source-in';
        tempCtx.fillStyle = this.currentColor;
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        // Filtrelenmiş canvas'ı döndür
        return tempCanvas;
    }

    resetSettings() {
        // Ayarları sıfırla
        this.currentColor = '#ffffff';
        this.currentOpacity = 0.5;
        this.currentSize = 0.6;
        this.currentPosition = 0.04;

        // UI'ı güncelle
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
        document.querySelector('.color-option[data-color="#ffffff"]').classList.add('active');
        
        document.getElementById('opacitySlider').value = 0.5;
        document.getElementById('opacityValue').textContent = '50%';
        
        document.getElementById('sizeSlider').value = 0.6;
        document.getElementById('sizeValue').textContent = '60%';
        
        document.getElementById('positionSlider').value = 0.04;
        document.getElementById('positionValue').textContent = '4%';
        
        document.getElementById('customColorPicker').value = '#ffffff';

        // Watermark'ı güncelle
        this.updateWatermark();
    }

    async downloadImage() {
        if (!this.canvas) return;

        try {
            // Canvas rendering kalitesini maksimuma çıkar
            this.ctx.imageSmoothingEnabled = true;
            this.ctx.imageSmoothingQuality = 'high';
            
            // Canvas'ı en yüksek kalitede PNG olarak al (kalite kaybı olmasın)
            const imageData = this.canvas.toDataURL('image/png');
            
            const result = await ipcRenderer.invoke('save-image', imageData, this.originalFileName);
            
            if (result.success) {
                alert(`Görsel başarıyla kaydedildi!\nOrijinal kalitede: ${this.originalWidth}x${this.originalHeight}\nKonum: ${result.path}`);
            } else {
                alert(`Hata: ${result.error}`);
            }
        } catch (error) {
            console.error('İndirme hatası:', error);
            alert('Görsel indirilirken hata oluştu!');
        }
    }

    showQuickModeNotification() {
        // Geçici bildirim göster
        const notification = document.createElement('div');
        notification.className = 'quick-mode-notification';
        notification.innerHTML = '⚡ Hızlı Çıktı Modu Aktif! Görsel seçer seçmez otomatik işlenecek.';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    async processQuickMode() {
        try {
            // Varsayılan ayarlarla watermark ekle
            this.updateWatermark();
            
            // Canvas'ı yüksek kalitede al
            this.ctx.imageSmoothingEnabled = true;
            this.ctx.imageSmoothingQuality = 'high';
            const imageData = this.canvas.toDataURL('image/png');
            
            // Masaüstüne hızlı kaydet
            const result = await ipcRenderer.invoke('quick-save-image', imageData, this.originalFileName);
            
            if (result.success) {
                // Başarı bildirimi göster
                this.showSuccessNotification(result.path);
            } else {
                alert(`Hata: ${result.error}`);
            }
        } catch (error) {
            console.error('Hızlı işleme hatası:', error);
            alert('Hızlı işleme sırasında hata oluştu!');
        }
    }

    showSuccessNotification(filePath) {
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="success-icon">✅</div>
            <div class="success-text">
                <strong>Başarılı!</strong><br>
                Fligranlanmış görsel masaüstüne kaydedildi
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
}

// Uygulama başlat
document.addEventListener('DOMContentLoaded', () => {
    new WatermarkApp();
});