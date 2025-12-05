
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'tr';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Nav & Footer
    "nav.marketplace": "Marketplace",
    "nav.upload": "Upload Data",
    "nav.dashboard": "Dashboard",
    "nav.credits": "Credits",
    "footer.desc": "The world's first marketplace for verified negative scientific data. We turn failed experiments into global assets.",
    "footer.platform": "Platform",
    "footer.legal": "Legal",
    "footer.rights": "© 2025 NullPoint Inc. All rights reserved. Mock Application.",

    // Landing
    "landing.badge": "Now in Beta",
    "landing.hero.title": "Stop Repeating",
    "landing.hero.title_accent": "Failed Experiments",
    "landing.hero.subtitle": "Access verified negative research data. Save millions in R&D costs by learning what doesn't work before you start.",
    "landing.cta.browse": "Browse Marketplace",
    "landing.cta.upload": "Upload Your Data",
    "landing.stats.results": "Negative Results Shared",
    "landing.stats.saved": "R&D Costs Saved",
    "landing.stats.verification": "Verification Rate",
    "landing.why.title": "Why buy failure?",
    "landing.why.subtitle": "Negative data is just as valuable as positive data—if you have it before you start.",
    "landing.card.accelerate.title": "Accelerate R&D",
    "landing.card.accelerate.desc": "Skip the dead ends. Teams utilizing NullPoint reduce early-stage screening time by an average of 40%.",
    "landing.card.monetize.title": "Monetize Sunk Costs",
    "landing.card.monetize.desc": "Turn your failed experiments into a revenue stream. Recoup up to 15% of your project budget.",
    "landing.card.ip.title": "IP Protected",
    "landing.card.ip.desc": "Our military-grade anonymization protocol ensures your proprietary target structures remain confidential.",

    // Marketplace
    "market.title": "Marketplace",
    "market.search.placeholder": "Search by target, drug class, or keywords...",
    "market.sort": "Sort",
    "market.filter.categories": "Categories",
    "market.filter.stage": "Failure Stage",
    "market.filter.price": "Max Price",
    "market.filter.all": "All",
    "market.showing": "Showing",
    "market.results": "results",
    "market.empty.title": "No experiments found",
    "market.empty.desc": "Try adjusting your filters or search query.",
    
    // Dashboard
    "dash.title": "Researcher Dashboard",
    "dash.card.credits": "Available Credits",
    "dash.card.buy_more": "Buy More Credits",
    "dash.card.purchased": "Total Purchased",
    "dash.card.savings": "Lifetime savings",
    "dash.card.uploaded": "Uploaded Data",
    "dash.card.pending": "Pending Review",
    "dash.history.title": "Purchase History",
    "dash.history.export": "Export CSV",
    "dash.history.empty": "No purchases yet.",
    "dash.chart.title": "Spending by Category",
    "dash.plan.title": "Startup Plan",
    "dash.plan.renew": "Your plan renews on Dec 20, 2025.",
    "dash.plan.manage": "Manage Subscription",

    // Upload
    "upload.title": "Upload Experiment Data",
    "upload.step.1": "Basic Info",
    "upload.step.2": "Methodology",
    "upload.step.3": "Data Files",
    "upload.step.4": "Review",
    "upload.loading.title": "Verifying & Encrypting...",
    "upload.loading.desc": "Please wait while we process your dataset securely.",
    "upload.form.title": "Experiment Title",
    "upload.form.category": "Category",
    "upload.form.stage": "Failure Stage",
    "upload.form.summary": "Abstract / Summary",
    "upload.form.summary_ph": "Describe the hypothesis, methodology, and why the results were negative...",
    "upload.form.min_words": "Minimum 100 words required for verification.",
    "upload.dropzone": "Drag and drop CSV, SDF, or PDF files here",
    "upload.browse": "Or browse files",
    "upload.anon.title": "Anonymization Active:",
    "upload.anon.desc": "Our system will automatically strip PII and specific proprietary structure codes.",
    "upload.review.title": "Summary Review",
    "upload.review.suggested_price": "Suggested Price",
    "upload.certify": "I certify that I have the rights to this data and it contains accurate negative findings.",
    "upload.back": "Back",
    "upload.next": "Next Step",
    "upload.submit": "Submit for Verification",

    // Docs
    "docs.title": "Documentation & Resources",
    "docs.subtitle": "Everything you need to know about buying and selling failed experiments.",
    "docs.nav.verification": "Verification Process",
    "docs.nav.pricing": "Pricing & Credits",
    "docs.nav.privacy": "Privacy Policy",
    "docs.nav.terms": "Terms of Service",
    "docs.nav.ip": "IP Guidelines",

    // Common / Elements
    "common.view_details": "View Details",
    "common.purchase": "Purchase Data",
    "common.insufficient": "Insufficient Credits",
    "common.need_more": "You need",
    "common.more_credits": "more credits",
    "common.downloaded": "Purchased",
    "common.featured": "FEATURED",
    "common.uploaded": "Uploaded",
    "common.downloads": "Downloads",
    "common.included_data": "Included Data",
    "common.metadata": "Metadata",
    "common.seller_score": "Seller Score",
    
    // Toast
    "toast.success.purchase": "Successfully purchased",
    "toast.error.credits": "Insufficient credits",
    "toast.success.upload": "Experiment submitted successfully for review!",
  },
  tr: {
    // Nav & Footer
    "nav.marketplace": "Pazar Yeri",
    "nav.upload": "Veri Yükle",
    "nav.dashboard": "Panel",
    "nav.credits": "Krediler",
    "footer.desc": "Dünyanın ilk doğrulanmış negatif bilimsel veri pazarı. Başarısız deneyleri küresel varlıklara dönüştürüyoruz.",
    "footer.platform": "Platform",
    "footer.legal": "Yasal",
    "footer.rights": "© 2025 NullPoint Inc. Tüm hakları saklıdır. Mock Uygulama.",

    // Landing
    "landing.badge": "Beta Sürüm",
    "landing.hero.title": "Tekrar Etmeyi Bırakın:",
    "landing.hero.title_accent": "Başarısız Deneyler",
    "landing.hero.subtitle": "Doğrulanmış negatif araştırma verilerine erişin. Başlamadan önce neyin işe yaramadığını öğrenerek Ar-Ge maliyetlerinden milyonlarca tasarruf edin.",
    "landing.cta.browse": "Pazara Göz At",
    "landing.cta.upload": "Veri Yükle",
    "landing.stats.results": "Paylaşılan Negatif Sonuç",
    "landing.stats.saved": "Kurtarılan Ar-Ge Maliyeti",
    "landing.stats.verification": "Doğrulama Oranı",
    "landing.why.title": "Neden başarısızlık satın alınır?",
    "landing.why.subtitle": "Negatif veriler, eğer başlamadan önce elinizde varsa, en az pozitif veriler kadar değerlidir.",
    "landing.card.accelerate.title": "Ar-Ge'yi Hızlandırın",
    "landing.card.accelerate.desc": "Çıkmaz sokakları atlayın. NullPoint kullanan ekipler, erken aşama tarama sürelerini ortalama %40 azaltır.",
    "landing.card.monetize.title": "Batık Maliyetleri Gelire Dönüştürün",
    "landing.card.monetize.desc": "Başarısız deneylerinizi bir gelir akışına dönüştürün. Proje bütçenizin %15'ine kadarını geri kazanın.",
    "landing.card.ip.title": "Fikri Mülkiyet Korumalı",
    "landing.card.ip.desc": "Askeri düzeydeki anonimleştirme protokolümüz, özel hedef yapılarınızın gizli kalmasını sağlar.",

    // Marketplace
    "market.title": "Pazar Yeri",
    "market.search.placeholder": "Hedef, ilaç sınıfı veya anahtar kelime ile ara...",
    "market.sort": "Sırala",
    "market.filter.categories": "Kategoriler",
    "market.filter.stage": "Başarısızlık Aşaması",
    "market.filter.price": "Maks Fiyat",
    "market.filter.all": "Tümü",
    "market.showing": "Gösteriliyor",
    "market.results": "sonuç",
    "market.empty.title": "Deney bulunamadı",
    "market.empty.desc": "Filtrelerinizi veya arama teriminizi değiştirmeyi deneyin.",

    // Dashboard
    "dash.title": "Araştırmacı Paneli",
    "dash.card.credits": "Mevcut Krediler",
    "dash.card.buy_more": "Kredi Satın Al",
    "dash.card.purchased": "Toplam Satın Alınan",
    "dash.card.savings": "Ömür boyu tasarruf",
    "dash.card.uploaded": "Yüklenen Veriler",
    "dash.card.pending": "İnceleme Bekliyor",
    "dash.history.title": "Satın Alma Geçmişi",
    "dash.history.export": "CSV İndir",
    "dash.history.empty": "Henüz satın alma yok.",
    "dash.chart.title": "Kategoriye Göre Harcama",
    "dash.plan.title": "Girişim Planı",
    "dash.plan.renew": "Planınız 20 Ara 2025'te yenileniyor.",
    "dash.plan.manage": "Aboneliği Yönet",

    // Upload
    "upload.title": "Deney Verisi Yükle",
    "upload.step.1": "Temel Bilgiler",
    "upload.step.2": "Metodoloji",
    "upload.step.3": "Veri Dosyaları",
    "upload.step.4": "İnceleme",
    "upload.loading.title": "Doğrulanıyor & Şifreleniyor...",
    "upload.loading.desc": "Veri setinizi güvenli bir şekilde işlerken lütfen bekleyin.",
    "upload.form.title": "Deney Başlığı",
    "upload.form.category": "Kategori",
    "upload.form.stage": "Başarısızlık Aşaması",
    "upload.form.summary": "Özet / Abstract",
    "upload.form.summary_ph": "Hipotezi, metodolojiyi ve sonuçların neden negatif olduğunu açıklayın...",
    "upload.form.min_words": "Doğrulama için en az 100 kelime gereklidir.",
    "upload.dropzone": "CSV, SDF veya PDF dosyalarını buraya sürükleyin",
    "upload.browse": "veya dosyalara göz atın",
    "upload.anon.title": "Anonimleştirme Aktif:",
    "upload.anon.desc": "Sistemimiz PII ve özel yapı kodlarını yayınlanmadan önce otomatik olarak temizleyecektir.",
    "upload.review.title": "Özet İnceleme",
    "upload.review.suggested_price": "Önerilen Fiyat",
    "upload.certify": "Bu verilerin haklarına sahip olduğumu ve doğru negatif bulgular içerdiğini onaylıyorum.",
    "upload.back": "Geri",
    "upload.next": "Sonraki Adım",
    "upload.submit": "Doğrulama İçin Gönder",

    // Docs
    "docs.title": "Dokümantasyon & Kaynaklar",
    "docs.subtitle": "Başarısız deneyleri almak ve satmak hakkında bilmeniz gereken her şey.",
    "docs.nav.verification": "Doğrulama Süreci",
    "docs.nav.pricing": "Fiyatlandırma & Krediler",
    "docs.nav.privacy": "Gizlilik Politikası",
    "docs.nav.terms": "Hizmet Şartları",
    "docs.nav.ip": "Fikri Mülkiyet (IP)",

    // Common / Elements
    "common.view_details": "Detayları Gör",
    "common.purchase": "Veriyi Satın Al",
    "common.insufficient": "Yetersiz Kredi",
    "common.need_more": "İhtiyacınız var:",
    "common.more_credits": "kredi daha",
    "common.downloaded": "Satın Alındı",
    "common.featured": "ÖNE ÇIKAN",
    "common.uploaded": "Yüklendi",
    "common.downloads": "İndirme",
    "common.included_data": "Dahil Olan Veriler",
    "common.metadata": "Metadata",
    "common.seller_score": "Satıcı Puanı",

    // Toast
    "toast.success.purchase": "Başarıyla satın alındı",
    "toast.error.credits": "Yetersiz kredi",
    "toast.success.upload": "Deney doğrulama için başarıyla gönderildi!",
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
