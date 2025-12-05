
import React, { useState } from 'react';
import { ShoppingBag, Upload, BarChart2, Menu, X, User as UserIcon, Globe } from 'lucide-react';
import { ViewState, User, DocSection } from '../../types';
import { useTranslation } from '../../i18n';

interface NavbarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  user: User;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();

  const navItems = [
    { id: 'marketplace', label: t('nav.marketplace'), icon: ShoppingBag },
    { id: 'upload', label: t('nav.upload'), icon: Upload },
    { id: 'dashboard', label: t('nav.dashboard'), icon: BarChart2 },
  ] as const;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => onChangeView('landing')} 
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 bg-primary-900 rounded-lg flex items-center justify-center text-white font-bold font-mono group-hover:bg-primary-800 transition-colors">
                N
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">NullPoint</span>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id as ViewState)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  currentView === item.id 
                    ? 'text-primary-700 bg-primary-50 px-3 py-1.5 rounded-full' 
                    : 'text-slate-600 hover:text-primary-600'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* User User & Actions */}
          <div className="hidden md:flex items-center space-x-4">
             {/* Language Switcher */}
             <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm text-slate-600 hover:text-primary-600 px-2 py-1 rounded-md hover:bg-slate-50 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase font-semibold">{language}</span>
            </button>

            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            <div className="flex flex-col items-end mr-2">
               <span className="text-xs text-slate-500 uppercase font-semibold">{t('nav.credits')}</span>
               <span className="text-sm font-bold text-emerald-600 font-mono">
                 ${user.credits.toLocaleString()}
               </span>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 ring-2 ring-white shadow-sm">
              <UserIcon className="w-5 h-5" />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-sm text-slate-600 uppercase font-bold"
              >
                {language}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onChangeView(item.id as ViewState);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentView === item.id
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

interface FooterProps {
  onNavigate: (view: ViewState, section?: DocSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-primary-900 font-bold text-xs">N</div>
             <span className="text-white font-bold text-lg">NullPoint</span>
          </div>
          <p className="text-slate-400 text-sm max-w-sm">
            {t('footer.desc')}
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">{t('footer.platform')}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors text-left">
                {t('nav.marketplace')}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('docs', 'verification')} className="hover:text-white transition-colors text-left">
                {t('docs.nav.verification')}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('docs', 'pricing')} className="hover:text-white transition-colors text-left">
                {t('docs.nav.pricing')}
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4">{t('footer.legal')}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button onClick={() => onNavigate('docs', 'privacy')} className="hover:text-white transition-colors text-left">
                {t('docs.nav.privacy')}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('docs', 'terms')} className="hover:text-white transition-colors text-left">
                {t('docs.nav.terms')}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('docs', 'ip-guidelines')} className="hover:text-white transition-colors text-left">
                {t('docs.nav.ip')}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 text-center">
        {t('footer.rights')}
      </div>
    </footer>
  );
};
