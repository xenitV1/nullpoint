# NullPoint - Negatif Bilimsel Veri Pazarı (MVP)

NullPoint, başarısız bilimsel deneylerin (negatif bulgular) alınıp satıldığı kavramsal bir veri pazarı platformudur. Araştırmacıların "batık maliyetlerini" gelire dönüştürmesini ve diğer araştırmacıların aynı hataları tekrarlayarak zaman kaybetmesini önlemeyi amaçlar.

Bu proje, React ve TypeScript kullanılarak geliştirilmiş, tamamen işlevsel bir ön yüz (frontend) prototipidir. Arka uç (backend) bağlantısı yoktur; tüm veriler ve iş mantığı istemci tarafında (mock data) simüle edilmiştir.

## 🚀 Özellikler

*   **Pazar Yeri (Marketplace):** Detaylı filtreleme (Kategori, Aşama, Fiyat), arama ve sıralama özellikleri.
*   **Veri Görselleştirme:** Deney detaylarında kategoriye özel (Çizgi, Saçılım, Sütun) dinamik grafikler ve veri tabloları.
*   **Çoklu Dil Desteği (i18n):** İngilizce ve Türkçe arasında anlık geçiş.
*   **Dashboard:** Kullanıcı kredileri, satın alma geçmişi ve harcama analizleri.
*   **Yükleme Simülasyonu:** Çok adımlı (multi-step) veri yükleme formu.
*   **Dokümantasyon Sayfaları:** Gizlilik, IP hakları ve doğrulama süreçleri için bilgilendirici sayfalar.

## 🛠️ Teknoloji Yığını

*   **Core:** React 18, TypeScript
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **Charts:** Recharts
*   **State Management:** React Context API (i18n için) & Local State (useState/useReducer)
*   **Build/Bundler:** (Ortama göre Vite veya Create React App)

## 📂 Kurulum ve Çalıştırma

Bu proje modern bir Node.js ortamı gerektirir.

1.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    ```

2.  **Geliştirme Sunucusunu Başlatın:**
    ```bash
    npm start
    # veya
    npm run dev
    ```

3.  **Tarayıcıda Açın:**
    Uygulama genellikle `http://localhost:3000` veya `http://localhost:5173` adresinde çalışacaktır.

## 🧪 Mock Veri Yapısı

Uygulama, veritabanı yerine `constants.ts` dosyasında tanımlanan zengin bir mock veri seti kullanır. Sayfa her yenilendiğinde veriler sıfırlanır, ancak oturum süresince yapılan satın almalar ve yüklemeler state içinde tutulur.

## 📄 Lisans

Bu proje bir MVP prototipidir ve eğitim/sunum amaçlı hazırlanmıştır.
