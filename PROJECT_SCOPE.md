# Proje Kapsamı ve Amacı: NullPoint

## 1. Problem Tanımı
Bilimsel araştırmalarda "Pozitif Yayın Önyargısı" (Positive Publication Bias) nedeniyle, başarısızlıkla sonuçlanan deneyler (negatif bulgular) genellikle yayınlanmaz ve rafa kaldırılır. Bu durum iki büyük soruna yol açar:
1.  **Mali Kayıp:** Araştırma şirketleri başarısız olan projelere yatırdıkları parayı geri kazanamazlar (Batık Maliyet).
2.  **Zaman Kaybı:** Dünyanın başka bir yerindeki diğer araştırmacılar, daha önce denenmiş ve başarısız olmuş bir yöntemi tekrar denerler.

## 2. Çözüm: NullPoint
NullPoint, negatif verilerin değerli bir varlık (asset) olarak işlem gördüğü bir pazar yeridir.

*   **Satıcılar (Akademisyenler/Startuplar):** Başarısız deneylerini (raw data, metodoloji) sisteme yükler, anonimleştirir ve satarak gelir elde ederler.
*   **Alıcılar (Büyük İlaç Şirketleri/Kurumlar):** Kendi Ar-Ge süreçlerinde zaman kaybetmemek için bu "neyin çalışmadığını gösteren" verileri satın alırlar. Makine öğrenmesi modellerini eğitmek için negatif veriye ihtiyaç duyarlar.

## 3. Hedef Kitle (Personas)

*   **Dr. Demo Researcher (Satıcı):** Akademik fonu bitmek üzere olan, elinde yayınlanmamış binlerce başarısız deney verisi bulunan bir araştırmacı. Verilerini satarak laboratuvarına yeni fon sağlamak istiyor.
*   **PharmaCorp R&D Lead (Alıcı):** Yeni bir ilaç molekülü üzerinde çalışıyor. Rakiplerinin 2 yıl önce bu molekülü deneyip başarısız olduğunu öğrenmek için 15.000$ ödemeye hazır; çünkü bu bilgi onlara 2 yıl ve 2 Milyon $ kazandıracak.

## 4. MVP (Minimum Viable Product) Kapsamı

Bu prototip, iş fikrinin temel fonksiyonlarını doğrulamak için tasarlanmıştır:

### Dahil Olan Özellikler (In Scope)
*   **Veri Listeleme:** Kategorize edilmiş deney kartları.
*   **Detaylı İnceleme:** Veri setinin kalitesini anlamak için önizleme tabloları ve grafikler.
*   **Satın Alma Simülasyonu:** Kredi sistemi ile anlık satın alma deneyimi.
*   **Doğrulama Göstergeleri:** "Peer Reviewed", "AI Verified" gibi güven sinyalleri.
*   **Veri Yükleme Akışı:** Satıcıların veri giriş sürecinin (Metadata, Dosya, Anonimleştirme) simülasyonu.

### Dahil Olmayan Özellikler (Out of Scope - Gelecek Fazlar)
*   Gerçek dosya barındırma (AWS S3 vb.).
*   Gerçek ödeme sistemi entegrasyonu (Stripe).
*   Blockchain tabanlı IP (Fikri Mülkiyet) takibi.
*   Gerçek kullanıcı kimlik doğrulama (Auth0).

## 5. Başarı Kriterleri
Kullanıcının şu akışı sorunsuz tamamlayabilmesi projenin başarısıdır:
`Ana Sayfa -> İlgili Deneyi Arama -> Detayları İnceleme (Grafik/Tablo) -> Kredi ile Satın Alma -> Dashboard'da Görüntüleme`
