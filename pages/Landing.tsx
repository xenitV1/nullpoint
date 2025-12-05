
import React from 'react';
import { ArrowRight, Activity, Shield, DollarSign } from 'lucide-react';
import { Badge } from '../components/ui/Elements';
import { useTranslation } from '../i18n';

interface LandingProps {
  onGetStarted: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-20 pb-32">
        <div className="absolute inset-0 z-0 opacity-20">
            {/* Abstract Background */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="#0f172a" />
               <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#1e3a8a" opacity="0.5" />
            </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge color="blue">{t('landing.badge')}</Badge>
          <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            {t('landing.hero.title')} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              {t('landing.hero.title_accent')}
            </span>
          </h1>
          <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto">
            {t('landing.hero.subtitle')}
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-bold text-lg shadow-lg shadow-primary-900/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              {t('landing.cta.browse')} <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-lg border border-slate-700 transition-all flex items-center justify-center"
            >
              {t('landing.cta.upload')}
            </button>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-slate-800 pt-10">
            <div>
               <div className="text-4xl font-bold text-white mb-1">1,247</div>
               <div className="text-slate-400 text-sm uppercase tracking-wider">{t('landing.stats.results')}</div>
            </div>
            <div>
               <div className="text-4xl font-bold text-emerald-400 mb-1">$4.2M</div>
               <div className="text-slate-400 text-sm uppercase tracking-wider">{t('landing.stats.saved')}</div>
            </div>
             <div>
               <div className="text-4xl font-bold text-white mb-1">89%</div>
               <div className="text-slate-400 text-sm uppercase tracking-wider">{t('landing.stats.verification')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">{t('landing.why.title')}</h2>
            <p className="mt-4 text-slate-600">{t('landing.why.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl transition-shadow">
               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                 <Activity className="w-6 h-6 text-blue-600" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">{t('landing.card.accelerate.title')}</h3>
               <p className="text-slate-600">{t('landing.card.accelerate.desc')}</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl transition-shadow">
               <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                 <DollarSign className="w-6 h-6 text-emerald-600" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">{t('landing.card.monetize.title')}</h3>
               <p className="text-slate-600">{t('landing.card.monetize.desc')}</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-xl transition-shadow">
               <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                 <Shield className="w-6 h-6 text-purple-600" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">{t('landing.card.ip.title')}</h3>
               <p className="text-slate-600">{t('landing.card.ip.desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
