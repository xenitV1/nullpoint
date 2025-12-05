
import React, { useState } from 'react';
import { Navbar, Footer } from './components/ui/Layout';
import { Landing } from './pages/Landing';
import { Marketplace } from './pages/Marketplace';
import { Dashboard } from './pages/Dashboard';
import { Upload } from './pages/Upload';
import { Docs } from './pages/Docs';
import { ViewState, User, Experiment, DocSection } from './types';
import { INITIAL_USER, MOCK_EXPERIMENTS } from './constants';
import { useTranslation } from './i18n';

const App: React.FC = () => {
  const { t } = useTranslation();
  
  // Global App State
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [activeDocSection, setActiveDocSection] = useState<DocSection>('privacy');
  
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [experiments, setExperiments] = useState<Experiment[]>(MOCK_EXPERIMENTS);
  
  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Show toast helper
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Navigation Helper
  const handleNavigate = (view: ViewState, docSection?: DocSection) => {
    setCurrentView(view);
    if (view === 'docs' && docSection) {
      setActiveDocSection(docSection);
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  };

  // Actions
  const handlePurchase = (experiment: Experiment) => {
    if (user.credits >= experiment.price) {
      // Create Purchase Record
      const newRecord = {
        expId: experiment.id,
        title: experiment.title,
        date: new Date().toISOString().split('T')[0],
        price: experiment.price
      };

      // Update User State
      setUser(prev => ({
        ...prev,
        credits: prev.credits - experiment.price,
        purchaseHistory: [newRecord, ...prev.purchaseHistory]
      }));

      // Update Experiment Stats (Mock backend update)
      setExperiments(prev => prev.map(e => 
        e.id === experiment.id ? { ...e, downloads: e.downloads + 1 } : e
      ));

      showToast(`${t('toast.success.purchase')} "${experiment.title}"`, 'success');
    } else {
      showToast(t('toast.error.credits'), 'error');
    }
  };

  const handleUploadComplete = () => {
    showToast(t('toast.success.upload'), 'success');
    
    // Add a mock pending experiment to user profile
    const newMockUpload: Experiment = {
        id: `pending_${Date.now()}`,
        title: "Pending Review Experiment",
        category: "Other",
        price: 0,
        // ... fill minimal required mock data
        targetClass: "Unknown", failureStage: "Target Validation", methodology: "Pending",
        experimentDate: "2023", uploadDate: "Today", sampleSize: 0, currency: "USD",
        sellerReputation: 5, verificationStatus: "Unverified", confidenceScore: 0,
        tags: [], anonymizationLevel: "High", summary: "Processing...", dataFormat: [],
        fileSize: "0 MB", downloads: 0, featured: false,
        previewContent: {
          headers: ["Status", "Note"],
          rows: [{ "Status": "Processing", "Note": "Data verification in progress" }],
          chartType: 'bar',
          chartData: []
        }
    };
    
    setUser(prev => ({
        ...prev,
        uploadedExperiments: [...prev.uploadedExperiments, newMockUpload]
    }));
    
    setCurrentView('dashboard');
  };

  // Render View Logic
  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <Landing onGetStarted={() => handleNavigate('marketplace')} />;
      case 'marketplace':
        return (
          <Marketplace 
            experiments={experiments} 
            onPurchase={handlePurchase} 
            userCredits={user.credits} 
          />
        );
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'upload':
        return <Upload onUploadComplete={handleUploadComplete} />;
      case 'docs':
        return <Docs activeSection={activeDocSection} onSectionChange={setActiveDocSection} />;
      default:
        return <Landing onGetStarted={() => handleNavigate('marketplace')} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-slate-50">
      <Navbar 
        currentView={currentView} 
        onChangeView={(view) => handleNavigate(view)} 
        user={user} 
      />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Global Toast Notification */}
      {toast && (
        <div className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-xl z-50 text-white font-medium animate-[slideIn_0.3s_ease-out] ${
          toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
        }`}>
           <div className="flex items-center gap-3">
             {toast.type === 'success' ? (
               <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
             ) : (
               <div className="w-2 h-2 bg-white rounded-full" />
             )}
             {toast.message}
           </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
