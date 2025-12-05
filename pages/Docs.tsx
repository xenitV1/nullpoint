
import React from 'react';
import { DocSection } from '../../types';
import { Shield, FileText, DollarSign, Lock, Scale } from 'lucide-react';
import { useTranslation } from '../i18n';

interface DocsProps {
  activeSection: DocSection;
  onSectionChange: (section: DocSection) => void;
}

export const Docs: React.FC<DocsProps> = ({ activeSection, onSectionChange }) => {
  const { t, language } = useTranslation();

  const sections = [
    { id: 'verification', label: t('docs.nav.verification'), icon: Shield },
    { id: 'pricing', label: t('docs.nav.pricing'), icon: DollarSign },
    { id: 'privacy', label: t('docs.nav.privacy'), icon: Lock },
    { id: 'terms', label: t('docs.nav.terms'), icon: FileText },
    { id: 'ip-guidelines', label: t('docs.nav.ip'), icon: Scale },
  ] as const;

  const renderContent = () => {
    // Note: Ideally these large text blocks would be in the i18n file too,
    // but for readability here, we will switch content based on language prop.
    const isEn = language === 'en';

    switch (activeSection) {
      case 'verification':
        return (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <h1 className="text-3xl font-bold text-slate-900">{t('docs.nav.verification')}</h1>
            <p className="text-lg text-slate-600">
              {isEn ? 
                "NullPoint uses a 3-step verification process to ensure the integrity of negative results." : 
                "NullPoint, negatif sonuçların bütünlüğünü sağlamak için 3 adımlı bir doğrulama süreci kullanır."}
            </p>
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{isEn ? "1. AI Format Validation" : "1. AI Format Doğrulaması"}</h3>
              <p className="text-slate-600">
                {isEn ? 
                 "Our automated system checks uploaded CSV, SDF, and PDF files for data consistency, missing values, and potential corruption. We ensure standard scientific formatting matches the claimed methodology." :
                 "Otomatik sistemimiz, yüklenen CSV, SDF ve PDF dosyalarını veri tutarlılığı, eksik değerler ve olası bozulmalar açısından kontrol eder. Standart bilimsel formatların iddia edilen metodolojiyle eşleştiğinden emin oluruz."}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{isEn ? "2. Statistical Plausibility Check" : "2. İstatistiksel Olasılık Kontrolü"}</h3>
              <p className="text-slate-600">
                {isEn ?
                "Algorithms analyze the control groups and standard deviations. \"Too perfect\" negative data or statistically impossible distributions are flagged for manual review." :
                "Algoritmalar kontrol gruplarını ve standart sapmaları analiz eder. \"Fazla mükemmel\" negatif veriler veya istatistiksel olarak imkansız dağılımlar manuel inceleme için işaretlenir."}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{isEn ? "3. Peer Review (Optional)" : "3. Akran Değerlendirmesi (İsteğe Bağlı)"}</h3>
              <p className="text-slate-600">
                {isEn ?
                "Sellers can request a blind peer review. Two vetted experts in the specific field review the methodology and raw data (under NDA) to certify the experiment was conducted correctly, even if it failed." :
                "Satıcılar kör akran değerlendirmesi talep edebilir. İlgili alandaki iki onaylanmış uzman, deneyin başarısız olsa bile doğru şekilde yürütüldüğünü onaylamak için metodolojiyi ve ham verileri (NDA altında) inceler."}
              </p>
            </div>
          </div>
        );
      case 'pricing':
        return (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <h1 className="text-3xl font-bold text-slate-900">{t('docs.nav.pricing')}</h1>
            <p className="text-lg text-slate-600">
              {isEn ? 
              "We operate on a transparent credit-based system. 1 Credit = $1.00 USD." :
              "Şeffaf bir kredi tabanlı sistemle çalışıyoruz. 1 Kredi = 1,00 USD."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="border border-slate-200 rounded-xl p-6">
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">{isEn ? "Startup Tier" : "Başlangıç Seviyesi"}</div>
                <div className="text-3xl font-bold text-slate-900 mt-2">$1,499<span className="text-base text-slate-400 font-normal">/mo</span></div>
                <ul className="mt-4 space-y-2 text-slate-600">
                  <li>• {isEn ? "1,600 Credits included monthly" : "Aylık 1.600 Kredi dahil"}</li>
                  <li>• {isEn ? "Access to Marketplace" : "Pazar Yerine Erişim"}</li>
                  <li>• {isEn ? "5% Discount on Direct Purchases" : "Doğrudan Satın Alımlarda %5 İndirim"}</li>
                  <li>• {isEn ? "5 Team Seats" : "5 Takım Üyesi"}</li>
                </ul>
              </div>
              <div className="border border-slate-200 rounded-xl p-6 bg-slate-900 text-white">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wide">{isEn ? "Enterprise Tier" : "Kurumsal Seviye"}</div>
                <div className="text-3xl font-bold text-white mt-2">{isEn ? "Custom" : "Özel"}</div>
                <ul className="mt-4 space-y-2 text-slate-300">
                  <li>• {isEn ? "Unlimited Seats" : "Sınırsız Kullanıcı"}</li>
                  <li>• {isEn ? "API Access for Data Integration" : "Veri Entegrasyonu için API Erişimi"}</li>
                  <li>• {isEn ? "Private Cloud Hosting Option" : "Özel Bulut Barındırma Seçeneği"}</li>
                  <li>• {isEn ? "Dedicated Account Manager" : "Özel Hesap Yöneticisi"}</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <h1 className="text-3xl font-bold text-slate-900">{t('docs.nav.privacy')}</h1>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p>
                {isEn ? 
                "At NullPoint, we understand that failed experiments often contain proprietary structures and sensitive IP." :
                "NullPoint'te, başarısız deneylerin genellikle tescilli yapılar ve hassas fikri mülkiyet içerdiğini anlıyoruz."}
              </p>
              
              <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">{isEn ? "How we protect your IP" : "IP'nizi nasıl koruyoruz"}</h3>
              <p>{isEn ? "Before any dataset goes live, it passes through our \"Sanitizer Engine\":" : "Herhangi bir veri seti yayına girmeden önce \"Temizleyici Motorumuzdan\" geçer:"}</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>{isEn ? "Structure Masking:" : "Yapı Maskeleme:"}</strong> {isEn ? "Exact molecular structures for proprietary scaffolds are generalized to Markush structures unless explicitly open-sourced." : "Tescilli iskeleler için kesin moleküler yapılar, açık kaynaklı olmadığı sürece Markush yapılarına genelleştirilir."}</li>
                <li><strong>{isEn ? "Metadata Stripping:" : "Metadata Temizleme:"}</strong> {isEn ? "All researcher names, lab locations, and internal project codes are stripped from metadata." : "Tüm araştırmacı isimleri, laboratuvar konumları ve dahili proje kodları metadata'dan temizlenir."}</li>
                <li><strong>{isEn ? "Time-Shifting:" : "Zaman Kaydırma:"}</strong> {isEn ? "Exact timestamps are fuzzed by ±7 days to prevent correlation attacks." : "Korelasyon saldırılarını önlemek için kesin zaman damgaları ±7 gün kaydırılır."}</li>
              </ul>
            </div>
          </div>
        );
      case 'ip-guidelines':
        return (
           <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <h1 className="text-3xl font-bold text-slate-900">{t('docs.nav.ip')}</h1>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p>
                {isEn ? 
                "By purchasing data on NullPoint, you are acquiring a license to use the data for R&D purposes, not the ownership of the original experiment." :
                "NullPoint üzerinde veri satın alarak, orijinal deneyin mülkiyetini değil, verileri Ar-Ge amaçlı kullanma lisansını edinirsiniz."}
              </p>
              
              <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">{isEn ? "Seller Rights" : "Satıcı Hakları"}</h3>
              <p>{isEn ? "The seller retains copyright and patent rights to the underlying invention." : "Satıcı, temel buluş üzerindeki telif hakkı ve patent haklarını saklı tutar."}</p>

              <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">{isEn ? "Buyer Usage" : "Alıcı Kullanımı"}</h3>
              <p>{isEn ? "Buyers may:" : "Alıcılar şunları yapabilir:"}</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>{isEn ? "Use data to train internal ML models." : "Verileri dahili ML modellerini eğitmek için kullanmak."}</li>
                <li>{isEn ? "Use data to avoid redundant experiments." : "Gereksiz deneylerden kaçınmak için verileri kullanmak."}</li>
                <li>{isEn ? "Cite the dataset in internal reports." : "Veri setini dahili raporlarda alıntılamak."}</li>
              </ul>
            </div>
          </div>
        );
      case 'terms':
      default:
        return (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <h1 className="text-3xl font-bold text-slate-900">{t('docs.nav.terms')}</h1>
            <p className="text-sm text-slate-400">{isEn ? "Last updated: September 2025" : "Son güncelleme: Eylül 2025"}</p>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p>{isEn ? "Welcome to NullPoint. By accessing our marketplace, you agree to these terms." : "NullPoint'e hoş geldiniz. Pazar yerimize erişerek bu şartları kabul etmiş olursunuz."}</p>
              
              <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">{isEn ? "1. Nature of Goods" : "1. Malların Doğası"}</h3>
              <p>{isEn ? "NullPoint facilitates the exchange of \"Negative Scientific Data\". We do not guarantee that the data is error-free, only that it has passed our verification checks." : "NullPoint, \"Negatif Bilimsel Veri\" alışverişini kolaylaştırır. Verilerin hatasız olduğunu garanti etmiyoruz, yalnızca doğrulama kontrollerimizden geçtiğini garanti ediyoruz."}</p>

              <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">{isEn ? "2. Refunds" : "2. İadeler"}</h3>
              <p>{isEn ? "Due to the digital nature of the data, all sales are final once the download link has been generated." : "Verilerin dijital doğası gereği, indirme bağlantısı oluşturulduktan sonra tüm satışlar kesindir."}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900">{t('docs.title')}</h1>
          <p className="mt-4 text-xl text-slate-500">{t('docs.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Nav */}
          <div className="w-full md:w-64 flex-shrink-0">
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <nav className="flex flex-col">
                  {sections.map(item => (
                    <button
                      key={item.id}
                      onClick={() => onSectionChange(item.id as DocSection)}
                      className={`flex items-center gap-3 px-4 py-4 text-sm font-medium transition-colors border-l-4 text-left ${
                        activeSection === item.id 
                          ? 'border-primary-600 bg-primary-50 text-primary-700' 
                          : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-primary-600' : 'text-slate-400'}`} />
                      {item.label}
                    </button>
                  ))}
                </nav>
             </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
             {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
