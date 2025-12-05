
export interface Experiment {
  id: string;
  title: string;
  category: ExperimentCategory;
  targetClass: string;
  failureStage: FailureStage;
  methodology: string;
  experimentDate: string;
  uploadDate: string;
  sampleSize: number;
  price: number;
  currency: string;
  sellerReputation: number;
  verificationStatus: 'AI Verified' | 'Peer Reviewed' | 'Replicated' | 'Unverified';
  confidenceScore: number;
  tags: string[];
  anonymizationLevel: 'High' | 'Medium' | 'Low';
  summary: string;
  dataFormat: string[];
  fileSize: string;
  downloads: number;
  featured: boolean;
  previewContent: PreviewData;
}

export interface PreviewData {
  headers: string[];
  rows: Record<string, string | number>[];
  chartType?: 'line' | 'bar' | 'scatter';
  chartData?: any[];
}

export type ExperimentCategory = 
  | 'Antiviral Drug Discovery'
  | 'Antibody Therapeutics'
  | 'CRISPR Gene Editing'
  | 'Battery Materials'
  | 'Oncology'
  | 'Material Science'
  | 'Other';

export type FailureStage = 
  | 'Target Validation'
  | 'Hit-to-Lead'
  | 'Lead Optimization'
  | 'Preclinical'
  | 'Clinical Phase I/II';

export interface User {
  userId: string;
  userName: string;
  userType: 'Academic' | 'Corporate' | 'Startup';
  credits: number;
  subscriptionTier: 'Free' | 'Startup' | 'Enterprise';
  purchaseHistory: PurchaseRecord[];
  uploadedExperiments: Experiment[];
}

export interface PurchaseRecord {
  expId: string;
  title: string;
  date: string;
  price: number;
}

export type ViewState = 'landing' | 'marketplace' | 'upload' | 'dashboard' | 'docs';

export type DocSection = 'verification' | 'pricing' | 'privacy' | 'terms' | 'ip-guidelines';
