
import React from 'react';
import { User } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Download, Package } from 'lucide-react';
import { Badge } from '../components/ui/Elements';
import { useTranslation } from '../i18n';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const { t } = useTranslation();
  // Mock Data for Charts
  const purchaseData = [
    { name: 'Antiviral', value: 4000 },
    { name: 'Oncology', value: 3000 },
    { name: 'CRISPR', value: 2000 },
    { name: 'Other', value: 1000 },
  ];
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#64748b'];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">{t('dash.title')}</h1>
        
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
             <div className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-2">{t('dash.card.credits')}</div>
             <div className="text-4xl font-bold text-emerald-600 font-mono">${user.credits.toLocaleString()}</div>
             <button className="mt-4 text-sm text-primary-600 font-medium hover:text-primary-800">{t('dash.card.buy_more')} →</button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
             <div className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-2">{t('dash.card.purchased')}</div>
             <div className="text-4xl font-bold text-slate-900">{user.purchaseHistory.length}</div>
             <div className="mt-4 text-xs text-slate-400">{t('dash.card.savings')}: ~$240,000</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
             <div className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-2">{t('dash.card.uploaded')}</div>
             <div className="text-4xl font-bold text-slate-900">{user.uploadedExperiments.length}</div>
             <div className="mt-4 text-xs text-slate-400">1 {t('dash.card.pending')}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">{t('dash.history.title')}</h3>
                <button className="text-sm text-slate-500 hover:text-slate-900">{t('dash.history.export')}</button>
              </div>
              
              <div className="divide-y divide-slate-100">
                {user.purchaseHistory.length > 0 ? (
                  user.purchaseHistory.map((item, idx) => (
                    <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-primary-600">
                          <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{item.title}</div>
                          <div className="text-xs text-slate-500">{item.date} • ID: {item.expId}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-mono text-sm font-medium text-slate-600">-${item.price}</span>
                        <Badge color="green">{t('common.downloaded')}</Badge>
                        <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-slate-100 rounded-full transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-slate-500">{t('dash.history.empty')}</div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Analytics */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-slate-900 mb-6">{t('dash.chart.title')}</h3>
              <div className="h-64 w-full" style={{ minHeight: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={purchaseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {purchaseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 text-xs mt-4">
                 {purchaseData.map((entry, index) => (
                   <div key={index} className="flex items-center gap-1">
                     <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[index]}}></div>
                     <span className="text-slate-500">{entry.name}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-bold mb-2">{t('dash.plan.title')}</h3>
              <p className="text-slate-400 text-sm mb-6">{t('dash.plan.renew')}</p>
              
              <ul className="space-y-3 mb-6 text-sm">
                 <li className="flex items-center gap-2">✓ 20,000 credits/mo</li>
                 <li className="flex items-center gap-2">✓ 5 Team Members</li>
                 <li className="flex items-center gap-2">✓ API Access</li>
              </ul>
              
              <button className="w-full py-2 bg-white text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors">
                {t('dash.plan.manage')}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
