
import React, { useState } from 'react';
import { Upload as UploadIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslation } from '../i18n';

interface UploadProps {
  onUploadComplete: () => void;
}

export const Upload: React.FC<UploadProps> = ({ onUploadComplete }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Antiviral Drug Discovery',
    stage: 'Lead Optimization',
    summary: '',
    price: 5000,
    anonymization: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      onUploadComplete();
    }, 2000);
  };

  const steps = [
    { num: 1, title: t('upload.step.1') },
    { num: 2, title: t('upload.step.2') },
    { num: 3, title: t('upload.step.3') },
    { num: 4, title: t('upload.step.4') }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
             <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
             {steps.map((s) => (
               <div key={s.num} className={`flex flex-col items-center gap-2 bg-slate-50 px-2`}>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                   step >= s.num ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-500'
                 }`}>
                   {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                 </div>
                 <span className={`text-xs font-medium ${step >= s.num ? 'text-slate-900' : 'text-slate-400'}`}>
                   {s.title}
                 </span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">{t('upload.title')}</h1>
            
            {isSubmitting ? (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                <h3 className="text-xl font-medium text-slate-900">{t('upload.loading.title')}</h3>
                <p className="text-slate-500 mt-2">{t('upload.loading.desc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t('upload.form.title')}</label>
                      <input 
                        required
                        type="text" 
                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border"
                        placeholder="e.g. Failed Kinase Inhibitor Screen Phase 1"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('upload.form.category')}</label>
                        <select 
                          className="w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border"
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                          <option>Antiviral Drug Discovery</option>
                          <option>Oncology</option>
                          <option>Material Science</option>
                          <option>CRISPR Gene Editing</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('upload.form.stage')}</label>
                        <select 
                          className="w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border"
                          value={formData.stage}
                          onChange={(e) => setFormData({...formData, stage: e.target.value})}
                        >
                          <option>Target Validation</option>
                          <option>Hit-to-Lead</option>
                          <option>Lead Optimization</option>
                          <option>Preclinical</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                   <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                     <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">{t('upload.form.summary')}</label>
                       <textarea 
                         required
                         rows={6}
                         className="w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2 border"
                         placeholder={t('upload.form.summary_ph')}
                         value={formData.summary}
                         onChange={(e) => setFormData({...formData, summary: e.target.value})}
                       />
                       <p className="mt-2 text-xs text-slate-500">{t('upload.form.min_words')}</p>
                     </div>
                   </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-10 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                      <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
                      <p className="mt-2 text-sm text-slate-600">{t('upload.dropzone')}</p>
                      <button type="button" className="mt-4 text-primary-600 font-medium text-sm hover:underline">{t('upload.browse')}</button>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <span className="font-bold">{t('upload.anon.title')}</span> {t('upload.anon.desc')}
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                   <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                     <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                       <h3 className="font-bold text-slate-900 mb-4">{t('upload.review.title')}</h3>
                       <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                         <div className="sm:col-span-2">
                           <dt className="text-sm font-medium text-slate-500">{t('upload.form.title')}</dt>
                           <dd className="mt-1 text-sm text-slate-900">{formData.title || "Untitled Experiment"}</dd>
                         </div>
                         <div>
                           <dt className="text-sm font-medium text-slate-500">{t('upload.form.category')}</dt>
                           <dd className="mt-1 text-sm text-slate-900">{formData.category}</dd>
                         </div>
                         <div>
                           <dt className="text-sm font-medium text-slate-500">{t('upload.review.suggested_price')}</dt>
                           <dd className="mt-1 text-sm font-bold text-emerald-600">${formData.price}</dd>
                         </div>
                       </dl>
                     </div>
                     
                     <div className="flex items-center gap-3">
                       <input 
                         type="checkbox" 
                         required 
                         id="confirm" 
                         className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                       />
                       <label htmlFor="confirm" className="text-sm text-slate-700">
                         {t('upload.certify')}
                       </label>
                     </div>
                   </div>
                )}

                <div className="mt-8 flex justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
                    >
                      {t('upload.back')}
                    </button>
                  )}
                  <div className="ml-auto">
                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step + 1)}
                        disabled={step === 1 && !formData.title}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
                      >
                        {t('upload.next')}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
                      >
                        {t('upload.submit')}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
