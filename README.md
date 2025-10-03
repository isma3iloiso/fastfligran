# 🖼️ FastFligran - Hızlı Fligran Ekleme Uygulaması.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Electron](https://img.shields.io/badge/Electron-27.3.11-blue.svg)](https://electronjs.org/)
[![Platform](https://img.shields.io/badge/Platform-Windows-lightgrey.svg)](https://github.com/ismailakcay/fastfligran)

FastFligran, görsellerinize kolayca fligran ekleyebileceğiniz **basit ve pratik** bir desktop uygulamasıdır. Klasörünüzdeki `logo.png` dosyasını otomatik olarak fligran olarak kullanır ve görsellerinize profesyonel bir dokunuş katar.

## 🚀 Öne Çıkan Özellikler

⚡ **Hızlı Çıktı Modu**: Toggle ile açıp kapayabileceğiniz otomatik işleme modu  
🎨 **Sınırsız Renk**: 10 hazır renk + özel renk seçici  
📏 **Hassas Kontrol**: Boyut, şeffaflık ve pozisyon ayarları  
💾 **Kalite Korunur**: Orijinal çözünürlük %100 korunur  
🖱️ **Kolay Kullanım**: Sürükle-bırak destekli, kompakt arayüz

## 📸 Ekran Görüntüleri

> **Not**: Ekran görüntüleri yakında eklenecektir. Uygulamayı indirip test edebilirsiniz!

## 🎯 İki Kullanım Modu

### 1. 🎨 Normal Mod
- Görsel seç → Editör açılır → Ayarla → Kaydet
- Tam kontrol ve özelleştirme imkanı
- Canlı önizleme ile anlık görüntü

### 2. ⚡ Hızlı Çıktı Modu
- Toggle'ı aç → Görsel seç → Otomatik işle → Masaüstüne kaydet
- Seri işlem için ideal
- Varsayılan ayarlarla anında sonuç

## 🛠️ Kurulum

### Gereksinimler
- Windows 10/11
- Node.js (geliştirme için)

### Hızlı Başlangıç

1. **Repository'yi klonlayın:**
   ```bash
   git clone https://github.com/ismailakcay/fastfligran.git
   cd fastfligran
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Uygulamayı çalıştırın:**
   ```bash
   npm start
   ```

### EXE Dosyası Oluşturma

```bash
npm run build
```

Oluşturulan `FastFligran 1.0.0.exe` dosyası `dist/` klasöründe bulunur.

## 🎨 Kullanım

### Temel Kullanım
1. Uygulamayı başlatın
2. Görsel seçin (sürükle-bırak veya dosya seçici)
3. Renk, boyut, şeffaflık ve pozisyon ayarlarını yapın
4. "İndir" butonuna tıklayarak kaydedin

### Hızlı Çıktı Modu
1. ⚡ "Hızlı Çıktı Modu" toggle'ını açın
2. Görsel seçin
3. Otomatik olarak varsayılan ayarlarla işlenir
4. Masaüstüne timestamp'li dosya adıyla kaydedilir

## 🎛️ Özelleştirme Seçenekleri

| Özellik | Aralık | Varsayılan |
|---------|--------|------------|
| **Renk** | 10 hazır + özel | Beyaz |
| **Boyut** | %10 - %200 | %60 |
| **Şeffaflık** | %10 - %100 | %50 |
| **Pozisyon** | %2 - %30 (aşağıdan) | %4 |

## 📁 Desteklenen Formatlar

### Giriş
- JPG/JPEG
- PNG
- BMP
- GIF
- WebP

### Çıkış
- PNG (yüksek kalite, şeffaflık destekli)

## 🔧 Geliştirme

### Proje Yapısı
```
fastfligran/
├── main.js           # Ana Electron süreç
├── index.html        # Uygulama arayüzü
├── style.css         # Stil dosyası
├── renderer.js       # Uygulama mantığı
├── logo.png          # Varsayılan fligran
├── package.json      # Proje ayarları
└── README.md         # Bu dosya
```

### Geliştirme Komutları

```bash
# Geliştirme modunda çalıştır
npm start

# EXE dosyası oluştur
npm run build

# Dağıtım paketi oluştur
npm run dist
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👨‍💻 Geliştirici

**İsmail Akçay**
- Website: [apkdelisi.net](https://apkdelisi.net)
- GitHub: [@ismailakcay](https://github.com/ismailakcay)

## 🙏 Teşekkürler

- [Electron](https://electronjs.org/) - Cross-platform desktop uygulamaları için
- [Electron Builder](https://www.electron.build/) - Uygulama paketleme için

## 📊 İstatistikler

![GitHub stars](https://img.shields.io/github/stars/ismailakcay/fastfligran?style=social)
![GitHub forks](https://img.shields.io/github/forks/ismailakcay/fastfligran?style=social)
![GitHub issues](https://img.shields.io/github/issues/ismailakcay/fastfligran)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
