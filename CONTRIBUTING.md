# 🤝 Katkıda Bulunma Rehberi

FastFligran projesine katkıda bulunmak istediğiniz için teşekkürler! Bu rehber, projeye nasıl katkıda bulunabileceğinizi açıklar.

## 🚀 Başlamadan Önce

- [GitHub hesabınız](https://github.com) olduğundan emin olun
- [Node.js](https://nodejs.org/) yüklü olduğundan emin olun
- [Git](https://git-scm.com/) yüklü olduğundan emin olun

## 📋 Katkı Türleri

### 🐛 Hata Bildirimi
- [Issues](https://github.com/ismailakcay/fastfligran/issues) sayfasından yeni bir issue oluşturun
- Hatayı detaylı şekilde açıklayın
- Mümkünse ekran görüntüsü ekleyin
- Sistem bilgilerinizi belirtin (Windows sürümü, vb.)

### 💡 Özellik Önerisi
- [Issues](https://github.com/ismailakcay/fastfligran/issues) sayfasından "Feature Request" etiketi ile issue oluşturun
- Özelliği detaylı şekilde açıklayın
- Neden gerekli olduğunu belirtin

### 🔧 Kod Katkısı

1. **Repository'yi fork edin**
   ```bash
   # GitHub'da fork butonuna tıklayın
   ```

2. **Yerel makinenize klonlayın**
   ```bash
   git clone https://github.com/KULLANICI_ADINIZ/fastfligran.git
   cd fastfligran
   ```

3. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

4. **Yeni bir branch oluşturun**
   ```bash
   git checkout -b feature/yeni-ozellik
   # veya
   git checkout -b bugfix/hata-duzeltmesi
   ```

5. **Değişikliklerinizi yapın**
   - Kod yazın
   - Test edin
   - Commit edin

6. **Commit mesajları**
   ```bash
   git commit -m "feat: yeni özellik eklendi"
   git commit -m "fix: hata düzeltildi"
   git commit -m "docs: dokümantasyon güncellendi"
   ```

7. **Push edin**
   ```bash
   git push origin feature/yeni-ozellik
   ```

8. **Pull Request oluşturun**
   - GitHub'da repository'nize gidin
   - "New Pull Request" butonuna tıklayın
   - Değişikliklerinizi detaylı şekilde açıklayın

## 📝 Kod Standartları

### JavaScript
- ES6+ syntax kullanın
- Anlamlı değişken isimleri kullanın
- Fonksiyonları küçük ve tek amaçlı tutun
- Yorumları Türkçe yazın

### CSS
- BEM metodolojisini takip edin
- Responsive tasarım prensiplerini uygulayın
- CSS değişkenlerini kullanın

### HTML
- Semantic HTML kullanın
- Accessibility standartlarına uyun
- Türkçe içerik için lang="tr" kullanın

## 🧪 Test Etme

Değişikliklerinizi test etmek için:

```bash
# Uygulamayı çalıştırın
npm start

# EXE dosyası oluşturun
npm run build
```

### Test Senaryoları
- [ ] Uygulama başarıyla açılıyor
- [ ] Görsel seçme çalışıyor
- [ ] Fligran ekleme çalışıyor
- [ ] Hızlı çıktı modu çalışıyor
- [ ] Dosya kaydetme çalışıyor
- [ ] Tüm kontroller çalışıyor

## 📚 Dokümantasyon

- README.md güncellemelerini unutmayın
- Yeni özellikler için kullanım örnekleri ekleyin
- Kod yorumlarını Türkçe yazın

## 🎯 Pull Request Checklist

- [ ] Kod çalışıyor ve test edildi
- [ ] Commit mesajları anlamlı
- [ ] Dokümantasyon güncellendi
- [ ] Değişiklikler açıklandı
- [ ] Conflict yok

## 🏷️ Etiketler

### Issue Etiketleri
- `bug` - Hata bildirimi
- `enhancement` - Yeni özellik
- `documentation` - Dokümantasyon
- `good first issue` - Yeni başlayanlar için
- `help wanted` - Yardım isteniyor

### PR Etiketleri
- `feat` - Yeni özellik
- `fix` - Hata düzeltmesi
- `docs` - Dokümantasyon
- `style` - Kod formatı
- `refactor` - Kod iyileştirmesi

## 💬 İletişim

- **Issues**: [GitHub Issues](https://github.com/ismailakcay/fastfligran/issues)
- **Email**: contact@apkdelisi.net
- **Website**: [apkdelisi.net](https://apkdelisi.net)

## 🙏 Teşekkürler

Katkılarınız için şimdiden teşekkürler! Her türlü katkı değerlidir:
- Kod katkısı
- Hata bildirimi
- Özellik önerisi
- Dokümantasyon iyileştirmesi
- Çeviri yardımı

---

**Not**: Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. Katkıda bulunarak, katkılarınızın da aynı lisans altında olduğunu kabul etmiş olursunuz.