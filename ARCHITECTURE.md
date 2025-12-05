# NullPoint Mimari Dokümantasyonu

Bu belge, NullPoint uygulamasının teknik yapısını, tasarım kararlarını ve veri akışını açıklar.

## 1. Dizin Yapısı

Proje, özellik tabanlı ve modüler bir yapıda organize edilmiştir:

```
src/
├── components/
│   └── ui/
│       ├── Elements.tsx   # Yeniden kullanılabilir UI bileşenleri (Kartlar, Modallar, Rozetler)
│       └── Layout.tsx     # Sayfa iskeleti (Navbar, Footer)
├── pages/
│   ├── Dashboard.tsx      # Kullanıcı paneli ve grafikler
│   ├── Docs.tsx           # Statik içerikli dokümantasyon sayfaları
│   ├── Landing.tsx        # Karşılama sayfası (Hero section)
│   ├── Marketplace.tsx    # Ana listeleme, filtreleme mantığı
│   └── Upload.tsx         # Çok adımlı form yapısı
├── constants.ts           # Mock veriler ve veri üretim fonksiyonları
├── i18n.tsx               # Dil yönetimi (Context API)
├── types.ts               # TypeScript arayüzleri ve tip tanımları
├── App.tsx                # Ana yönlendirme (Router) ve global state yönetimi
└── index.tsx              # Uygulama giriş noktası
```

## 2. Mimari Kararlar

### A. State Yönetimi (Durum Yönetimi)
Proje bir MVP olduğu için Redux veya Zustand gibi harici kütüphaneler yerine **React Built-in State** ve **Prop Drilling** yöntemleri tercih edilmiştir.
*   **Global Veri (Kullanıcı, Deneyler):** `App.tsx` en üst katmanında tutulur ve alt bileşenlere prop olarak geçilir.
*   **Dil Yönetimi:** Uygulamanın her yerinden erişilmesi gerektiği için `React Context API` (`I18nProvider`) kullanılmıştır.
*   **Lokal State:** Formlar, modal aç/kapa durumları ve filtreler ilgili bileşenlerin kendi içinde `useState` ile yönetilir.

### B. Veri Modeli ve Mocking
Gerçek bir Backend olmadığı için "Database" görevi gören `constants.ts` dosyası bulunur.
*   **Dinamik Veri Üretimi:** `generateExperiments` fonksiyonu, uygulama başladığında rastgele ama tutarlı veri setleri üretir.
*   **Data Preview:** Deney detaylarında gösterilen tablolar ve grafik verileri, deneyin kategorisine (Antiviral, Battery vb.) göre algoritmik olarak oluşturulur.

### C. Routing (Yönlendirme)
React Router yerine, basit bir **State-Based Routing** kullanılmıştır (`currentView` state'i).
*   `ViewState` tipi (`'landing' | 'marketplace' | ...`) hangi bileşenin render edileceğini belirler.
*   Bu yöntem, tek sayfa uygulaması (SPA) hissini korurken kurulum karmaşıklığını azaltır.

## 3. Veri Akışı

1.  **Başlatma:** `App.tsx` yüklenir, `INITIAL_USER` ve `MOCK_EXPERIMENTS` verileri state'e alınır.
2.  **Görüntüleme:** Kullanıcı `Marketplace` sayfasına girer. Filtreleme işlemleri `Marketplace.tsx` içinde `useMemo` kullanılarak anlık yapılır.
3.  **Etkileşim (Satın Alma):**
    *   Kullanıcı "Purchase" butonuna basar.
    *   `handlePurchase` fonksiyonu tetiklenir.
    *   Kullanıcı kredisinden düşülür -> Satın alma geçmişine eklenir -> Deneyin indirme sayısı artırılır.
    *   Tüm bu güncellemeler React State update batching ile tek seferde yapılır.

## 4. UI/UX Tasarım Prensipleri

*   **Tailwind CSS:** Hızlı prototipleme ve tutarlı tasarım sistemi için kullanıldı.
*   **Renk Paleti:** Bilimsel güvenilirlik için `Slate` (Gri), `Deep Blue` (Lacivert) ve başarı/onay durumları için `Emerald` (Zümrüt Yeşili) kullanıldı.
*   **Responsive:** Grid sistemi (`grid-cols-1 md:grid-cols-3`) ile mobil ve masaüstü uyumluluğu sağlandı.
