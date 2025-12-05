
import React, { useState, useMemo } from 'react';
import { Experiment } from '../../types';
import { ExperimentCard, DetailModal } from '../components/ui/Elements';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from '../i18n';

interface MarketplaceProps {
  experiments: Experiment[];
  onPurchase: (exp: Experiment) => void;
  userCredits: number;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ experiments, onPurchase, userCredits }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStage, setSelectedStage] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);

  // Filter Logic
  const filteredExperiments = useMemo(() => {
    return experiments.filter(exp => {
      const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            exp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || exp.category === selectedCategory;
      const matchesStage = selectedStage === 'All' || exp.failureStage === selectedStage;
      const matchesPrice = exp.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesStage && matchesPrice;
    });
  }, [experiments, searchQuery, selectedCategory, selectedStage, maxPrice]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header & Search */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">{t('market.title')}</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder={t('market.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="inline-flex items-center px-6 py-3 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50">
               <SlidersHorizontal className="h-4 w-4 mr-2" />
               {t('market.sort')}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{t('market.filter.categories')}</h3>
              <div className="space-y-2">
                {['All', 'Antiviral Drug Discovery', 'Oncology', 'Antibody Therapeutics', 'Material Science', 'CRISPR Gene Editing'].map(cat => (
                  <label key={cat} className="flex items-center">
                    <input 
                      type="radio" 
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300"
                    />
                    <span className="ml-2 text-sm text-slate-600 truncate">{cat === 'All' ? t('market.filter.all') : cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{t('market.filter.stage')}</h3>
              <div className="space-y-2">
                 {['All', 'Target Validation', 'Hit-to-Lead', 'Lead Optimization', 'Preclinical'].map(stage => (
                   <label key={stage} className="flex items-center">
                     <input 
                       type="radio" 
                       name="stage"
                       checked={selectedStage === stage}
                       onChange={() => setSelectedStage(stage)}
                       className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300"
                     />
                     <span className="ml-2 text-sm text-slate-600 truncate">{stage === 'All' ? t('market.filter.all') : stage}</span>
                   </label>
                 ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{t('market.filter.price')}: ${(maxPrice/1000).toFixed(0)}k</h3>
              <input 
                type="range" 
                min="0" 
                max="50000" 
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>$0</span>
                <span>$50k+</span>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
             <div className="mb-4 text-sm text-slate-500">
               {t('market.showing')} {filteredExperiments.length} {t('market.results')}
             </div>
             
             {filteredExperiments.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                 {filteredExperiments.map(exp => (
                   <ExperimentCard 
                     key={exp.id} 
                     experiment={exp} 
                     onClick={() => setSelectedExperiment(exp)}
                   />
                 ))}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                  <div className="text-slate-300 mb-4">
                    <Filter className="w-12 h-12" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">{t('market.empty.title')}</h3>
                  <p className="text-slate-500">{t('market.empty.desc')}</p>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <DetailModal 
        experiment={selectedExperiment}
        isOpen={!!selectedExperiment}
        onClose={() => setSelectedExperiment(null)}
        onPurchase={onPurchase}
        userCredits={userCredits}
      />
    </div>
  );
};
