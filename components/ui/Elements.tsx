
import React, { useState } from 'react';
import { Experiment } from '../../types';
import { ShieldCheck, FileText, Download, X, Star, Microscope, Table, Activity } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { 
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

// Badge Component
export const Badge: React.FC<{ children: React.ReactNode; color?: 'blue' | 'green' | 'red' | 'gray' }> = ({ 
  children, 
  color = 'gray' 
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-emerald-100 text-emerald-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-slate-100 text-slate-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      {children}
    </span>
  );
};

// Experiment Card
interface ExperimentCardProps {
  experiment: Experiment;
  onClick: () => void;
}

export const ExperimentCard: React.FC<ExperimentCardProps> = ({ experiment, onClick }) => {
  const { t } = useTranslation();

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full relative"
    >
      {experiment.featured && (
        <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          {t('common.featured')}
        </div>
      )}
      
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-2">
          <Badge color="blue">{experiment.category}</Badge>
          <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
            <Star className="w-3 h-3 fill-current" />
            {experiment.sellerReputation}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-primary-700 transition-colors line-clamp-2">
          {experiment.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-slate-500 gap-2">
            <Microscope className="w-4 h-4" />
            <span className="truncate">{experiment.failureStage}</span>
          </div>
          <div className="flex items-center text-sm text-slate-500 gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="truncate">{experiment.verificationStatus}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {experiment.dataFormat.map(fmt => (
            <span key={fmt} className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">
              {fmt}
            </span>
          ))}
          <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">
            {experiment.fileSize}
          </span>
        </div>
      </div>

      <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-lg font-bold text-slate-900 font-mono">
          ${experiment.price.toLocaleString()}
        </span>
        <button className="text-sm text-primary-600 font-medium hover:text-primary-800">
          {t('common.view_details')} →
        </button>
      </div>
    </div>
  );
};

// Detail Modal
interface ModalProps {
  experiment: Experiment | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (exp: Experiment) => void;
  userCredits: number;
}

export const DetailModal: React.FC<ModalProps> = ({ experiment, isOpen, onClose, onPurchase, userCredits }) => {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<'summary' | 'preview'>('summary');

  // Reset tab when modal opens
  React.useEffect(() => {
    if (isOpen) setActiveTab('summary');
  }, [isOpen]);

  if (!isOpen || !experiment) return null;

  const canAfford = userCredits >= experiment.price;

  const renderChart = () => {
    const data = experiment.previewContent.chartData;
    const type = experiment.previewContent.chartType;
    
    if (!data || !type) return null;

    return (
      <div className="h-64 w-full mb-6 bg-slate-50 border border-slate-200 rounded-lg p-4">
        <div className="text-xs text-slate-400 font-bold uppercase mb-2">Visual Analysis Preview</div>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          ) : type === 'scatter' ? (
             <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" name="Concentration" fontSize={10} />
              <YAxis type="number" dataKey="y" name="Response" fontSize={10} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Results" data={data} fill="#059669" />
            </ScatterChart>
          ) : (
             <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col animate-[fadeIn_0.2s_ease-out]">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors text-slate-500 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex gap-2 mb-3">
              <Badge color="blue">{experiment.category}</Badge>
              <Badge color={experiment.verificationStatus === 'Peer Reviewed' ? 'green' : 'gray'}>
                {experiment.verificationStatus}
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              {experiment.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                {experiment.sellerReputation} {t('common.seller_score')}
              </span>
              <span>•</span>
              <span>{t('common.uploaded')} {experiment.uploadDate}</span>
              <span>•</span>
              <span>{experiment.downloads} {t('common.downloads')}</span>
            </div>
          </div>

          <div className="flex gap-6 border-b border-slate-100 mb-6">
            <button
              onClick={() => setActiveTab('summary')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'summary' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              {language === 'en' ? 'Summary & Details' : 'Özet & Detaylar'}
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'preview' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Activity className="w-4 h-4" />
              {language === 'en' ? 'Data Preview' : 'Veri Önizleme'}
            </button>
          </div>

          <div className="min-h-[300px]">
            {activeTab === 'summary' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-[fadeIn_0.2s_ease-out]">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Abstract</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {experiment.summary}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">{t('common.included_data')}</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-slate-600">
                        <FileText className="w-4 h-4 text-primary-500" />
                        Raw assay data (CSV)
                      </li>
                      <li className="flex items-center gap-2 text-slate-600">
                        <FileText className="w-4 h-4 text-primary-500" />
                        Protocol methodology (PDF)
                      </li>
                      <li className="flex items-center gap-2 text-slate-600">
                        <FileText className="w-4 h-4 text-primary-500" />
                        Statistical Analysis Report
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4">{t('common.metadata')}</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="block text-slate-400 text-xs">Target Class</span>
                        <span className="font-medium text-slate-700">{experiment.targetClass}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 text-xs">Stage</span>
                        <span className="font-medium text-slate-700">{experiment.failureStage}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 text-xs">Sample Size</span>
                        <span className="font-medium text-slate-700">{experiment.sampleSize}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400 text-xs">Confidence</span>
                        <div className="w-full bg-slate-200 h-2 rounded-full mt-1 overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full rounded-full" 
                            style={{ width: `${experiment.confidenceScore * 100}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-[fadeIn_0.2s_ease-out]">
                {/* Render Chart */}
                {renderChart()}

                <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                   <div className="overflow-x-auto">
                     <table className="min-w-full divide-y divide-slate-200 text-sm">
                       <thead className="bg-slate-100">
                         <tr>
                           {experiment.previewContent.headers.map((h, i) => (
                             <th key={i} className="px-4 py-3 text-left font-semibold text-slate-600 uppercase tracking-wider text-xs">
                               {h}
                             </th>
                           ))}
                         </tr>
                       </thead>
                       <tbody className="bg-white divide-y divide-slate-200">
                         {experiment.previewContent.rows.map((row, idx) => (
                           <tr key={idx} className="hover:bg-slate-50 transition-colors">
                             {experiment.previewContent.headers.map((h, i) => (
                               <td key={i} className="px-4 py-3 text-slate-600 whitespace-nowrap font-mono text-xs">
                                 {row[h]}
                               </td>
                             ))}
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   </div>
                   {/* Blur Footer to indicate more data */}
                   <div className="relative bg-slate-50 border-t border-slate-200 p-4 flex flex-col items-center justify-center gap-2 text-center">
                      <div className="absolute inset-x-0 bottom-full h-12 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
                      <p className="text-slate-500 text-xs font-medium">
                        {language === 'en' ? `+ ${experiment.sampleSize - 5} more rows available` : `+ ${experiment.sampleSize - 5} satır daha mevcut`}
                      </p>
                      <Badge color="gray">{language === 'en' ? 'Preview Mode' : 'Önizleme Modu'}</Badge>
                   </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
             <div>
               <div className="text-sm text-slate-500">Total Price</div>
               <div className="text-3xl font-bold text-slate-900 font-mono">${experiment.price.toLocaleString()}</div>
             </div>
             
             <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                <button
                  onClick={() => canAfford && onPurchase(experiment)}
                  disabled={!canAfford}
                  className={`w-full sm:w-auto px-8 py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all ${
                    canAfford 
                      ? 'bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-primary-500/30' 
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  {canAfford ? (
                    <>
                      <Download className="w-5 h-5" />
                      {t('common.purchase')}
                    </>
                  ) : (
                    <>{t('common.insufficient')}</>
                  )}
                </button>
                {!canAfford && (
                   <span className="text-xs text-red-500 font-medium">
                     {t('common.need_more')} ${(experiment.price - userCredits).toLocaleString()} {t('common.more_credits')}
                   </span>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
